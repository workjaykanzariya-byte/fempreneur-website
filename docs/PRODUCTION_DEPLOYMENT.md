# Fempreneur 2027 — Production Deployment Documentation

## 1. Production Architecture Overview
- **Domain**: `https://fempreneur.club`
- **Server IP**: `187.127.181.73`
- **Hosting Panel**: Virtualmin / Webmin
- **Web Server**: Apache 2.4 (VirtualHost reverse proxy & static file server)
- **Frontend**: React 19 Single Page Application (SPA), built via Vite 8, served directly by Apache with `.htaccess` rewrite rules.
- **Backend**: Node.js & Express.js REST API listening locally on `127.0.0.1:5000`, proxied via Apache at `/api`.
- **Database**: PostgreSQL with connection pooling via `pg` (`node-postgres`), initialized idempotently via `backend/models/initDb.js`.
- **Process Manager**: PM2 (or systemd service `fempreneur-backend.service`) running under dedicated user `fempreneur`.

---

## 2. Directory Structure on VPS (`/home/fempreneur`)

```text
/home/fempreneur/
├── public_html/                       <-- Public Frontend (Apache DocumentRoot)
│   ├── index.html
│   ├── .htaccess                      <-- SPA routing fallback & asset caching
│   ├── favicon.svg
│   ├── fempreneur-logo.png
│   ├── assets/                        <-- Bundled CSS & JS
│   │   ├── index-*.js
│   │   └── index-*.css
│   └── images/                        <-- Static visual assets & category artwork
│
├── apps/                              <-- Isolated Application Root (Restricted, Outside Web Root)
│   └── fempreneur/
│       ├── backend/                   <-- Backend Source Code
│       │   ├── config/
│       │   ├── controllers/
│       │   ├── middleware/
│       │   ├── models/
│       │   ├── routes/
│       │   ├── server.js
│       │   ├── package.json
│       │   └── package-lock.json
│       ├── .env                       <-- Production Environment Variables (chmod 600)
│       └── logs/                      <-- Application Output & Error Logs
│           ├── backend-out.log
│           └── backend-error.log
│
└── backups/                           <-- Deployment Backups (chmod 700)
    └── pre_deploy_YYYYMMDD_HHMMSS/
        ├── public_html_backup.tar.gz
        ├── apache_vhost_backup.conf
        └── db_dump.sql (if applicable)
```

---

## 3. Environment Variables (`/home/fempreneur/apps/fempreneur/.env`)

| Variable Name | Description | Example / Target Value |
| :--- | :--- | :--- |
| `NODE_ENV` | Runtime environment | `production` |
| `PORT` | Local internal backend port | `5000` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://fempreneur:<DB_PASSWORD>@localhost:5432/fempreneur_db` |
| `JWT_SECRET` | Cryptographically secure secret | 64+ char random string |
| `CORS_ORIGIN` | Allowed front-end origin | `https://fempreneur.club` |

*Note: The `.env` file must be stored in `/home/fempreneur/apps/fempreneur/.env` with file permissions `600` (readable only by the `fempreneur` user).*

---

## 4. Apache Configuration (`fempreneur.club.conf`)

Add the following reverse proxy directives inside the SSL VirtualHost block (`<VirtualHost 187.127.181.73:443>`):

```apache
# --- Fempreneur API Reverse Proxy Configuration ---
ProxyRequests Off
ProxyPreserveHost On
ProxyPass /api http://127.0.0.1:5000/api
ProxyPassReverse /api http://127.0.0.1:5000/api

<Location /api>
    Require all granted
</Location>
```

### Public HTML SPA Routing (`/home/fempreneur/public_html/.htaccess`)
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  # Exclude /api reverse proxy requests from SPA rewrites
  RewriteRule ^api - [L]
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

---

## 5. Process Manager (PM2 / Systemd)

### Using PM2 (Recommended)
```bash
# Navigate to backend
cd /home/fempreneur/apps/fempreneur/backend

# Install dependencies (production)
npm install --omit=dev

# Start backend under PM2
pm2 start server.js --name "fempreneur-backend"

# Save PM2 process list and configure auto-start on reboot
pm2 save
pm2 startup
```

### Using Systemd (Alternative)
File: `/etc/systemd/system/fempreneur-backend.service`
```ini
[Unit]
Description=Fempreneur 2027 Express Backend API
After=network.target postgresql.service

[Service]
Type=simple
User=fempreneur
WorkingDirectory=/home/fempreneur/apps/fempreneur/backend
EnvironmentFile=/home/fempreneur/apps/fempreneur/.env
ExecStart=/usr/bin/node server.js
Restart=on-failure
RestartSec=5s
StandardOutput=append:/home/fempreneur/apps/fempreneur/logs/backend-out.log
StandardError=append:/home/fempreneur/apps/fempreneur/logs/backend-error.log

[Install]
WantedBy=multi-user.target
```
Commands:
```bash
sudo systemctl daemon-reload
sudo systemctl enable fempreneur-backend
sudo systemctl start fempreneur-backend
```

---

## 6. Permissions and Ownership Matrix

| Directory / File | Owner | Group | Permissions | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| `/home/fempreneur/public_html` | `fempreneur` | `fempreneur` | `755` (dirs), `644` (files) | Readable by Apache |
| `/home/fempreneur/apps` | `fempreneur` | `fempreneur` | `750` | Isolated application directory |
| `/home/fempreneur/apps/fempreneur/.env` | `fempreneur` | `fempreneur` | `600` | Strictly private credentials |
| `/home/fempreneur/apps/fempreneur/logs` | `fempreneur` | `fempreneur` | `750` | Runtime application logs |
| `/home/fempreneur/backups` | `fempreneur` | `fempreneur` | `700` | Restricted backup archives |

---

## 7. Step-by-Step Manual Update Guide (Future Deployments)

When publishing a future update:

### Step 1: Build Frontend Locally
```bash
cd frontend
npm run build
```

### Step 2: Upload Files to Server
```bash
# Upload frontend to public_html
rsync -avz --delete frontend/dist/ fempreneur@187.127.181.73:/home/fempreneur/public_html/

# Upload backend to apps directory
rsync -avz --exclude 'node_modules' --exclude '.env' backend/ fempreneur@187.127.181.73:/home/fempreneur/apps/fempreneur/backend/
```

### Step 3: Reload Services on Server
```bash
ssh fempreneur@187.127.181.73
cd /home/fempreneur/apps/fempreneur/backend
npm install --omit=dev
pm2 reload fempreneur-backend
```

---

## 8. Rollback Procedure
If any deployment issue arises:
1. Restore previous `public_html` from `/home/fempreneur/backups/pre_deploy_<timestamp>/public_html_backup.tar.gz`.
2. Reload PM2 with previous code: `pm2 reload fempreneur-backend`.
3. Revert Apache configuration if modified: `sudo apachectl configtest && sudo systemctl reload apache2`.
