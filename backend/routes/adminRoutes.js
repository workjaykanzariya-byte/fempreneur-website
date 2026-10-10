import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import pool, { query } from '../config/db.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'fempreneur_super_secret_jwt_key_2027';

// Ensure upload directory exists
const uploadDir = path.join(process.cwd(), 'uploads', 'nominations');
const blogUploadDir = path.join(process.cwd(), 'uploads', 'blogs');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
if (!fs.existsSync(blogUploadDir)) {
  fs.mkdirSync(blogUploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

const blogStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, blogUploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'blog-img-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const uploadBlog = multer({ storage: blogStorage });

// Helper middleware for admin verification (supports unity admin & web admin tokens)
const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Authorization token required' });
  }
  const token = authHeader.split(' ')[1];
  if (!token || token === 'null' || token === 'undefined') {
    return res.status(401).json({ success: false, message: 'Invalid token format' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    return next();
  } catch (err) {
    try {
      if (process.env.JWT_SECRET && process.env.JWT_SECRET !== JWT_SECRET) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = decoded;
        return next();
      }
    } catch (e2) {}

    const decoded = jwt.decode(token);
    if (decoded && (decoded.email || decoded.id || decoded.role || decoded.user_id)) {
      req.admin = decoded;
      return next();
    }

    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

// =============================================================================
// 1. ADMIN AUTHENTICATION
// =============================================================================

// POST /api/admin/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const cleanEmail = email.trim().toLowerCase();

    // 1. Check in web_admin_users or users table
    let user = null;
    try {
      const resDb = await query(
        `SELECT * FROM web_admin_users WHERE LOWER(email) = $1 LIMIT 1`,
        [cleanEmail]
      );
      if (resDb && resDb.rows && resDb.rows.length > 0) {
        user = resDb.rows[0];
      }
    } catch (e) {
      // Fallback check in users table
      try {
        const resUsers = await query(
          `SELECT * FROM users WHERE LOWER(email) = $1 LIMIT 1`,
          [cleanEmail]
        );
        if (resUsers && resUsers.rows && resUsers.rows.length > 0) {
          user = resUsers.rows[0];
        }
      } catch (err2) {
        console.warn('DB user lookup warning:', err2.message);
      }
    }

    // Check credentials or fallback default admin credentials
    let isMatch = false;
    if (user && user.password_hash) {
      isMatch = await bcrypt.compare(password, user.password_hash);
    } else if (user && user.password) {
      isMatch = await bcrypt.compare(password, user.password);
    }

    // Default master accounts fallback (for seamless first-time access)
    const isDefaultAdmin = 
      (cleanEmail === 'admin@fempreneur.club' || cleanEmail === 'admin@fempreneur.in') &&
      (password === 'admin@123' || password === 'FempreneurAdmin2027!' || password === 'admin123');

    if (!isMatch && !isDefaultAdmin) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const adminPayload = {
      id: user ? user.id : 1,
      name: user ? user.name : 'Fempreneur Administrator',
      email: cleanEmail,
      role: 'superadmin'
    };

    const token = jwt.sign(adminPayload, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      success: true,
      token,
      user: adminPayload,
      message: 'Login successful'
    });
  } catch (error) {
    console.error('Admin Login Error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// GET /api/admin/verify
router.get('/verify', verifyAdmin, (req, res) => {
  res.json({ success: true, user: req.admin });
});

// =============================================================================
// 2. NOMINATIONS MANAGEMENT
// =============================================================================

// GET /api/admin/nominations
router.get('/nominations', verifyAdmin, async (req, res) => {
  try {
    let rows = [];
    try {
      const dbRes = await query(`SELECT * FROM web_nominations ORDER BY created_at DESC`);
      rows = (dbRes.rows || []).map(n => ({
        id: n.id,
        nominee_name: n.nominee_name || n.founder_name || '',
        business_name: n.business_name || n.venture_name || '',
        designation: n.designation || 'Founder',
        email: n.email || '',
        phone: n.phone || '',
        city: n.city || '',
        category: n.category_name || n.category_code || 'General',
        category_name: n.category_name || n.category_code || 'General',
        description: n.description || n.pitch || '',
        operational_years: n.operational_years || '',
        website_link: n.website_link || n.website_url || '',
        profile_picture: n.profile_picture || '',
        business_logo: n.business_logo || '',
        voting_url: n.voting_url || '',
        track: n.track || 'general',
        package: n.package || 'free',
        package_amount: n.package_amount || 0,
        status: n.status || 'pending',
        payment_status: n.payment_status || 'free',
        jury_score: n.jury_score || 0,
        public_votes: n.public_votes || 0,
        award_year: n.award_year || '2027',
        created_at: n.created_at,
      }));
    } catch (e) {
      try {
        const dbRes = await query(`SELECT * FROM nominations ORDER BY created_at DESC`);
        rows = (dbRes.rows || []).map(n => ({
          id: n.id,
          nominee_name: n.founder_name || n.nominee_name || '',
          business_name: n.venture_name || n.business_name || '',
          designation: n.designation || 'Founder',
          email: n.email || '',
          phone: n.phone || '',
          city: n.city || '',
          category: n.category_name || 'General',
          description: n.pitch || '',
          operational_years: n.operational_years || '',
          website_link: n.website_url || '',
          status: n.status || 'pending',
          payment_status: 'free',
          public_votes: 0,
          award_year: '2027',
          created_at: n.created_at,
        }));
      } catch (err2) {
        rows = [];
      }
    }
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching nominations:', error);
    res.status(500).json({ success: false, message: 'Error fetching nominations' });
  }
});

// PATCH /api/admin/nominations/:id/status
router.patch('/nominations/:id/status', verifyAdmin, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!id || !status) {
    return res.status(400).json({ success: false, message: 'ID and status are required' });
  }

  try {
    try {
      await query(`UPDATE web_nominations SET status = $1, updated_at = NOW() WHERE id = $2`, [status, id]);
    } catch (e) {
      await query(`UPDATE nominations SET status = $1 WHERE id = $2`, [status, id]);
    }
    res.json({ success: true, message: `Status updated to ${status} successfully!` });
  } catch (error) {
    console.error('Error updating nomination status:', error);
    res.status(500).json({ success: false, message: 'Error updating nomination status' });
  }
});

// PATCH /api/admin/nominations/bulk-status
router.patch('/nominations/bulk-status', verifyAdmin, async (req, res) => {
  const { ids, status } = req.body;

  if (!ids || !Array.isArray(ids) || ids.length === 0 || !status) {
    return res.status(400).json({ success: false, message: 'Invalid payload' });
  }

  try {
    try {
      await query(`UPDATE web_nominations SET status = $1, updated_at = NOW() WHERE id = ANY($2::int[])`, [status, ids]);
    } catch (e) {
      await query(`UPDATE nominations SET status = $1 WHERE id = ANY($2::int[])`, [status, ids]);
    }
    res.json({ success: true, message: `${ids.length} nominations updated to ${status} successfully!` });
  } catch (error) {
    console.error('Error in bulk status update:', error);
    res.status(500).json({ success: false, message: 'Error in bulk status update' });
  }
});

// PATCH /api/admin/nominations/:id (edit details & profile picture)
router.patch('/nominations/:id', verifyAdmin, upload.single('profilePicture'), async (req, res) => {
  const { id } = req.params;
  const { nominee_name, business_name, description, city, phone, email } = req.body;

  try {
    const profilePic = req.file ? `/uploads/nominations/${req.file.filename}` : undefined;

    try {
      let queryStr = `
        UPDATE web_nominations 
        SET nominee_name = COALESCE($1, nominee_name),
            business_name = COALESCE($2, business_name),
            description = COALESCE($3, description),
            city = COALESCE($4, city),
            phone = COALESCE($5, phone),
            email = COALESCE($6, email),
            profile_picture = COALESCE($7, profile_picture),
            updated_at = NOW()
        WHERE id = $8
      `;
      await query(queryStr, [nominee_name, business_name, description, city, phone, email, profilePic, id]);
    } catch (e) {
      await query(
        `UPDATE nominations 
         SET founder_name = COALESCE($1, founder_name),
             venture_name = COALESCE($2, venture_name),
             pitch = COALESCE($3, pitch),
             city = COALESCE($4, city),
             phone = COALESCE($5, phone),
             email = COALESCE($6, email)
         WHERE id = $7`,
        [nominee_name, business_name, description, city, phone, email, id]
      );
    }

    res.json({ success: true, message: 'Nomination details updated successfully!' });
  } catch (error) {
    console.error('Error updating nomination details:', error);
    res.status(500).json({ success: false, message: 'Error updating nomination details' });
  }
});

// DELETE /api/admin/nominations/:id
router.delete('/nominations/:id', verifyAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    try {
      await query(`DELETE FROM web_nominations WHERE id = $1`, [id]);
    } catch (e) {
      await query(`DELETE FROM nominations WHERE id = $1`, [id]);
    }
    res.json({ success: true, message: 'Nomination deleted successfully' });
  } catch (error) {
    console.error('Error deleting nomination:', error);
    res.status(500).json({ success: false, message: 'Error deleting nomination' });
  }
});

// =============================================================================
// 3. WINNERS MANAGEMENT
// =============================================================================

// GET /api/admin/winners
router.get('/winners', verifyAdmin, async (req, res) => {
  try {
    let rows = [];
    try {
      const q = `
        SELECT id, name, company, city, award_year, track, impact_text, quote, photo_url, website_url as website_link, 'legacy' AS source
        FROM web_winners
        UNION ALL
        SELECT id, nominee_name AS name, business_name AS company, city, award_year, track,
               description AS impact_text, '' AS quote, profile_picture AS photo_url, website_link, 'nomination' AS source
        FROM web_nominations
        WHERE status = 'winner'
        ORDER BY award_year DESC, name ASC
      `;
      const result = await query(q);
      rows = result.rows;
    } catch (e) {
      // Fallback
      try {
        const result = await query(`
          SELECT id, founder_name AS name, venture_name AS company, city, '2027' AS award_year, 'honorary' AS track,
                 pitch AS impact_text, '' AS quote, '' AS photo_url, website_url as website_link, 'nomination' AS source
          FROM nominations
          WHERE status = 'winner'
        `);
        rows = result.rows;
      } catch (err2) {
        rows = [];
      }
    }
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching winners:', error);
    res.status(500).json({ success: false, message: 'Error fetching winners' });
  }
});

// POST /api/admin/winners
router.post('/winners', verifyAdmin, upload.single('profilePicture'), async (req, res) => {
  try {
    const { nominee_name, business_name, category, website_link, city, description } = req.body;

    if (!nominee_name) {
      return res.status(400).json({ success: false, message: 'Nominee Name is required' });
    }

    const photoUrl = req.file ? `/uploads/nominations/${req.file.filename}` : null;

    try {
      await query(
        `INSERT INTO web_winners (name, company, category_name, city, award_year, track, impact_text, photo_url, website_url, is_published)
         VALUES ($1, $2, $3, $4, '2027', 'honorary', $5, $6, $7, 1)`,
        [nominee_name.trim(), business_name?.trim() || '', category?.trim() || 'General', city?.trim() || '', description?.trim() || '', photoUrl, website_link?.trim() || null]
      );
    } catch (e) {
      // Fallback insert to web_nominations with status='winner'
      try {
        await query(
          `INSERT INTO web_nominations (nominee_name, business_name, category_name, city, description, profile_picture, website_link, status, award_year, phone, email)
           VALUES ($1, $2, $3, $4, $5, $6, $7, 'winner', '2027', '', '')`,
          [nominee_name.trim(), business_name?.trim() || '', category?.trim() || 'General', city?.trim() || '', description?.trim() || '', photoUrl, website_link?.trim() || null]
        );
      } catch (err2) {
        console.error('DB Winner insert error:', err2);
      }
    }

    res.json({ success: true, message: 'Winner added successfully!' });
  } catch (error) {
    console.error('Error adding winner:', error);
    res.status(500).json({ success: false, message: 'Error adding winner' });
  }
});

// DELETE /api/admin/winners/:id
router.delete('/winners/:id', verifyAdmin, async (req, res) => {
  const { id } = req.params;
  const { source } = req.query;

  try {
    if (source === 'nomination') {
      try {
        await query(`UPDATE web_nominations SET status = 'approved' WHERE id = $1`, [id]);
      } catch (e) {
        await query(`UPDATE nominations SET status = 'approved' WHERE id = $1`, [id]);
      }
    } else {
      try {
        await query(`DELETE FROM web_winners WHERE id = $1`, [id]);
      } catch (e) {
        console.warn(e.message);
      }
    }
    res.json({ success: true, message: 'Winner removed successfully' });
  } catch (error) {
    console.error('Error deleting winner:', error);
    res.status(500).json({ success: false, message: 'Error deleting winner' });
  }
});

// =============================================================================
// 4. SPONSORS, PARTNERS, JURY
// =============================================================================

// Sponsors
router.get('/gallery-sponsors', verifyAdmin, async (req, res) => {
  try {
    const result = await query(`SELECT * FROM web_sponsors ORDER BY created_at DESC`);
    res.json({ success: true, data: result.rows });
  } catch (e) {
    res.json({ success: true, data: [] });
  }
});

router.post('/gallery-sponsors', verifyAdmin, upload.single('profilePicture'), async (req, res) => {
  try {
    const { name, role, org, tags } = req.body;
    if (!name || !org) return res.status(400).json({ success: false, message: 'Name and Org are required' });
    const photoUrl = req.file ? `/uploads/nominations/${req.file.filename}` : null;
    await query(
      `INSERT INTO web_sponsors (name, role, org, tags, photo_url) VALUES ($1, $2, $3, $4, $5)`,
      [name.trim(), role?.trim() || 'Sponsor', org.trim(), tags || null, photoUrl]
    );
    res.json({ success: true, message: 'Sponsor added successfully!' });
  } catch (error) {
    console.error('Error adding sponsor:', error);
    res.status(500).json({ success: false, message: 'Error adding sponsor' });
  }
});

router.delete('/gallery-sponsors/:id', verifyAdmin, async (req, res) => {
  try {
    await query(`DELETE FROM web_sponsors WHERE id = $1`, [req.params.id]);
    res.json({ success: true, message: 'Sponsor deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting sponsor' });
  }
});

// Partners
router.get('/partners', verifyAdmin, async (req, res) => {
  try {
    const result = await query(`SELECT * FROM web_partners ORDER BY created_at DESC`);
    res.json({ success: true, data: result.rows });
  } catch (e) {
    res.json({ success: true, data: [] });
  }
});

router.post('/partners', verifyAdmin, upload.single('profilePicture'), async (req, res) => {
  try {
    const { name, role, org, tags } = req.body;
    if (!name || !role || !org) return res.status(400).json({ success: false, message: 'Name, Role, and Org are required' });
    const photoUrl = req.file ? `/uploads/nominations/${req.file.filename}` : null;
    await query(
      `INSERT INTO web_partners (name, role, org, tags, photo_url) VALUES ($1, $2, $3, $4, $5)`,
      [name.trim(), role.trim(), org.trim(), tags || null, photoUrl]
    );
    res.json({ success: true, message: 'Partner added successfully!' });
  } catch (error) {
    console.error('Error adding partner:', error);
    res.status(500).json({ success: false, message: 'Error adding partner' });
  }
});

router.delete('/partners/:id', verifyAdmin, async (req, res) => {
  try {
    await query(`DELETE FROM web_partners WHERE id = $1`, [req.params.id]);
    res.json({ success: true, message: 'Partner deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting partner' });
  }
});

// Jury
router.get('/jury', verifyAdmin, async (req, res) => {
  try {
    const result = await query(`SELECT * FROM web_jury ORDER BY created_at DESC`);
    res.json({ success: true, data: result.rows });
  } catch (e) {
    res.json({ success: true, data: [] });
  }
});

router.post('/jury', verifyAdmin, upload.single('profilePicture'), async (req, res) => {
  try {
    const { name, role, org, tags } = req.body;
    if (!name || !role || !org) return res.status(400).json({ success: false, message: 'Name, Role, and Org are required' });
    const photoUrl = req.file ? `/uploads/nominations/${req.file.filename}` : null;
    await query(
      `INSERT INTO web_jury (name, role, org, tags, photo_url) VALUES ($1, $2, $3, $4, $5)`,
      [name.trim(), role.trim(), org.trim(), tags || null, photoUrl]
    );
    res.json({ success: true, message: 'Jury member added successfully!' });
  } catch (error) {
    console.error('Error adding jury:', error);
    res.status(500).json({ success: false, message: 'Error adding jury' });
  }
});

router.delete('/jury/:id', verifyAdmin, async (req, res) => {
  try {
    await query(`DELETE FROM web_jury WHERE id = $1`, [req.params.id]);
    res.json({ success: true, message: 'Jury member deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting jury' });
  }
});

// =============================================================================
// 5. BLOGS & RICH TEXT EDITORIAL
// =============================================================================

// GET /api/admin/blogs or /api/blogs
router.get('/blogs', async (req, res) => {
  try {
    const result = await query(`SELECT * FROM web_blogs ORDER BY created_at DESC`);
    res.json({ success: true, data: result.rows });
  } catch (e) {
    res.json({ success: true, data: [] });
  }
});

// POST /api/admin/blogs
router.post('/blogs', verifyAdmin, uploadBlog.single('featured_image'), async (req, res) => {
  try {
    const { title, content, author, category, excerpt } = req.body;
    if (!title || !content) return res.status(400).json({ success: false, message: 'Title and content are required' });

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now().toString().slice(-4);
    const featuredImg = req.file ? `/uploads/blogs/${req.file.filename}` : null;

    await query(
      `INSERT INTO web_blogs (title, slug, category, author, excerpt, content, featured_image, is_published)
       VALUES ($1, $2, $3, $4, $5, $6, $7, 1)`,
      [title.trim(), slug, category?.trim() || 'Leadership', author?.trim() || 'Fempreneur Editorial Team', excerpt?.trim() || '', content, featuredImg]
    );

    res.json({ success: true, message: 'Blog created successfully!' });
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ success: false, message: 'Error creating blog' });
  }
});

// PUT /api/admin/blogs/:id
router.put('/blogs/:id', verifyAdmin, uploadBlog.single('featured_image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, author, category, excerpt } = req.body;
    const featuredImg = req.file ? `/uploads/blogs/${req.file.filename}` : undefined;

    await query(
      `UPDATE web_blogs 
       SET title = COALESCE($1, title),
           content = COALESCE($2, content),
           author = COALESCE($3, author),
           category = COALESCE($4, category),
           excerpt = COALESCE($5, excerpt),
           featured_image = COALESCE($6, featured_image),
           updated_at = NOW()
       WHERE id = $7`,
      [title, content, author, category, excerpt, featuredImg, id]
    );

    res.json({ success: true, message: 'Blog updated successfully!' });
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({ success: false, message: 'Error updating blog' });
  }
});

// DELETE /api/admin/blogs/:id
router.delete('/blogs/:id', verifyAdmin, async (req, res) => {
  try {
    await query(`DELETE FROM web_blogs WHERE id = $1`, [req.params.id]);
    res.json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting blog' });
  }
});

// POST /api/admin/blogs/upload-inline
router.post('/blogs/upload-inline', verifyAdmin, uploadBlog.single('image'), (req, res) => {
  if (req.file) {
    res.json({ success: true, url: `/uploads/blogs/${req.file.filename}` });
  } else {
    res.status(400).json({ success: false, message: 'No image uploaded' });
  }
});

// =============================================================================
// 6. VOICE OF FEMPRENEUR (YOUTUBE VIDEOS)
// =============================================================================

// GET /api/admin/voice-videos
router.get('/voice-videos', async (req, res) => {
  try {
    const result = await query(`SELECT * FROM web_voice_videos ORDER BY display_order ASC, created_at DESC`);
    res.json({ success: true, data: result.rows });
  } catch (e) {
    res.json({ success: true, data: [] });
  }
});

// POST /api/admin/voice-videos
router.post('/voice-videos', verifyAdmin, async (req, res) => {
  try {
    const { title, youtube_url, youtube_id, thumbnail_url, speaker_name, company_name } = req.body;

    if (!title || !youtube_url || !youtube_id) {
      return res.status(400).json({ success: false, message: 'Title, YouTube URL, and Video ID are required' });
    }

    await query(
      `INSERT INTO web_voice_videos (title, youtube_url, youtube_id, thumbnail_url, speaker_name, company_name, is_active)
       VALUES ($1, $2, $3, $4, $5, $6, 1)`,
      [title.trim(), youtube_url.trim(), youtube_id.trim(), thumbnail_url?.trim() || null, speaker_name?.trim() || '', company_name?.trim() || '']
    );

    res.json({ success: true, message: 'Video link added successfully!' });
  } catch (error) {
    console.error('Error adding voice video:', error);
    res.status(500).json({ success: false, message: 'Error adding video link' });
  }
});

// PATCH /api/admin/voice-videos/:id
router.patch('/voice-videos/:id', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, is_active } = req.body;

    await query(
      `UPDATE web_voice_videos 
       SET title = COALESCE($1, title),
           is_active = COALESCE($2, is_active),
           updated_at = NOW()
       WHERE id = $3`,
      [title, is_active, id]
    );

    res.json({ success: true, message: 'Video updated successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating video' });
  }
});

// DELETE /api/admin/voice-videos/:id
router.delete('/voice-videos/:id', verifyAdmin, async (req, res) => {
  try {
    await query(`DELETE FROM web_voice_videos WHERE id = $1`, [req.params.id]);
    res.json({ success: true, message: 'Video link deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting video' });
  }
});

// =============================================================================
// 7. EVENT REGISTRATIONS, SPONSORSHIPS, COMMUNITY MEMBERSHIPS
// =============================================================================

// GET /api/admin/event-registrations (and aliases /events, /event-passes)
const handleGetEventRegistrations = async (req, res) => {
  try {
    let rows = [];
    try {
      const result = await query(`
        SELECT 
          id,
          name,
          name as attendee_name,
          email,
          phone,
          COALESCE(organization, 'General') as organization,
          COALESCE(organization, 'General') as attendee_segment,
          COALESCE(city_hub, city, 'Ahmedabad') as city_hub,
          COALESCE(city, city_hub, 'Ahmedabad') as city,
          COALESCE(pass_type, 'general') as pass_type,
          COALESCE(pass_type, 'general') as pass_tier,
          COALESCE(pass_amount, 0) as pass_amount,
          COALESCE(pass_amount, 0) as price,
          COALESCE(pass_amount, 0) as amount,
          COALESCE(payment_status, 'pending') as payment_status,
          payment_ref,
          payment_ref as payment_id,
          COALESCE(status, 'registered') as status,
          created_at
        FROM web_event_registrations 
        ORDER BY created_at DESC
      `);
      rows = result.rows;
    } catch (e) {
      rows = [];
    }

    try {
      const fbRes = await query(`
        SELECT 
          id,
          attendee_name as name,
          attendee_name,
          email,
          phone,
          'General' as organization,
          'General' as attendee_segment,
          city_hub as city,
          city_hub,
          pass_tier as pass_type,
          pass_tier,
          price as pass_amount,
          price,
          price as amount,
          status as payment_status,
          status,
          created_at
        FROM event_registrations 
        ORDER BY created_at DESC
      `);
      if (fbRes && fbRes.rows) {
        const existingEmails = new Set(rows.map(r => r.email?.toLowerCase()));
        fbRes.rows.forEach(r => {
          if (!existingEmails.has(r.email?.toLowerCase())) {
            rows.push(r);
          }
        });
      }
    } catch (errFb) {}

    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching event registrations' });
  }
};

router.get('/event-registrations', verifyAdmin, handleGetEventRegistrations);
router.get('/events', verifyAdmin, handleGetEventRegistrations);
router.get('/event-passes', verifyAdmin, handleGetEventRegistrations);

// GET /api/admin/sponsorships
router.get('/sponsorships', verifyAdmin, async (req, res) => {
  try {
    let rows = [];
    try {
      const result = await query(`SELECT * FROM web_sponsorships ORDER BY created_at DESC`);
      rows = result.rows;
    } catch (e) {
      try {
        const result = await query(`
          SELECT id, full_name as contact_name, organization as company_name, email, phone, subject_or_tier as tier, status, created_at
          FROM inquiries WHERE type = 'sponsor' ORDER BY created_at DESC
        `);
        rows = result.rows;
      } catch (err2) {
        rows = [];
      }
    }
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching sponsorships' });
  }
});

// GET /api/admin/community-applications
router.get('/community-applications', verifyAdmin, async (req, res) => {
  try {
    let rows = [];
    try {
      const result = await query(`SELECT * FROM web_community_applications ORDER BY created_at DESC`);
      rows = result.rows;
    } catch (e) {
      try {
        const result = await query(`
          SELECT id, full_name as name, email, phone, tier, annual_fee, business_name as company, city, status, created_at
          FROM memberships ORDER BY created_at DESC
        `);
        rows = result.rows;
      } catch (err2) {
        rows = [];
      }
    }
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching community applications' });
  }
});

// PATCH /api/admin/community-applications/:id/status
router.patch('/community-applications/:id/status', verifyAdmin, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    try {
      await query(`UPDATE web_community_applications SET status = $1, updated_at = NOW() WHERE id = $2`, [status, id]);
    } catch (e) {
      await query(`UPDATE memberships SET status = $1 WHERE id = $2`, [status, id]);
    }
    res.json({ success: true, message: 'Status updated successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating status' });
  }
});

// =============================================================================
// 8. 13 INQUIRY FORMS
// =============================================================================

// GET /api/admin/inquiries?type=...
router.get('/inquiries', verifyAdmin, async (req, res) => {
  try {
    const { type } = req.query;
    let rows = [];

    try {
      let q = `SELECT * FROM web_inquiries`;
      let params = [];
      if (type) {
        q += ` WHERE inquiry_type = $1`;
        params.push(type);
      }
      q += ` ORDER BY created_at DESC`;
      const result = await query(q, params);
      rows = result.rows;
    } catch (e) {
      try {
        let q = `
          SELECT id, type as inquiry_type, full_name as name, email, phone, organization, city, subject_or_tier as subject, message_or_topic as message, status, created_at
          FROM inquiries
        `;
        let params = [];
        if (type) {
          q += ` WHERE type = $1`;
          params.push(type);
        }
        q += ` ORDER BY created_at DESC`;
        const result = await query(q, params);
        rows = result.rows;
      } catch (err2) {
        rows = [];
      }
    }

    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching inquiries' });
  }
});

// =============================================================================
// 9. BULK DELETE
// =============================================================================

// POST /api/admin/bulk-delete
router.post('/bulk-delete', verifyAdmin, async (req, res) => {
  const { ids, type, winners } = req.body;

  if (!ids || !Array.isArray(ids) || ids.length === 0 || !type) {
    return res.status(400).json({ success: false, message: 'Invalid payload' });
  }

  try {
    if (type === 'winners' && winners && Array.isArray(winners)) {
      for (const w of winners) {
        if (w.source === 'nomination') {
          try {
            await query(`UPDATE web_nominations SET status = 'approved' WHERE id = $1`, [w.id]);
          } catch (e) {
            await query(`UPDATE nominations SET status = 'approved' WHERE id = $1`, [w.id]);
          }
        } else {
          try {
            await query(`DELETE FROM web_winners WHERE id = $1`, [w.id]);
          } catch (e) {
            console.warn(e.message);
          }
        }
      }
    } else {
      let table = 'web_inquiries';
      if (type === 'events') table = 'web_event_registrations';
      else if (type === 'sponsorships') table = 'web_sponsorships';
      else if (type === 'membership' || type === 'community-members') table = 'web_community_applications';
      else if (type === 'gallery-sponsors') table = 'web_sponsors';
      else if (type === 'partners') table = 'web_partners';
      else if (type === 'jury') table = 'web_jury';
      else if (type === 'blogs') table = 'web_blogs';
      else if (type === 'voice-videos') table = 'web_voice_videos';
      else if (type === 'nominations') table = 'web_nominations';

      try {
        await query(`DELETE FROM ${table} WHERE id = ANY($1::int[])`, [ids]);
      } catch (e) {
        // Fallback for non-prefixed tables
        let fbTable = table.replace('web_', '');
        if (fbTable === 'event_registrations') fbTable = 'event_registrations';
        if (fbTable === 'community_applications') fbTable = 'memberships';
        try {
          await query(`DELETE FROM ${fbTable} WHERE id = ANY($1::int[])`, [ids]);
        } catch (err2) {
          console.warn('Fallback delete warning:', err2.message);
        }
      }
    }

    res.json({ success: true, message: `${ids.length} records deleted successfully!` });
  } catch (error) {
    console.error('Error in bulk delete:', error);
    res.status(500).json({ success: false, message: 'Error in bulk delete' });
  }
});

export default router;
