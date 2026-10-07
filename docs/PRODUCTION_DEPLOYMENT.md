# Fempreneur 2027 — Production Deployment Documentation

## 1. Production Architecture Overview
- **Domain**: `https://fempreneur.club`
- **Server IP**: `187.127.181.73`
- **Hosting Panel**: Virtualmin / Webmin
- **Web Server**: Apache 2.4 (VirtualHost reverse proxy & static file server)
- **Frontend**: React 19 Single Page Application (SPA), built via Vite 8, served directly by Apache with `.htaccess` rewrite rules.
- **Backend**: Node.js & Express.js REST API listening locally on `127.0.0.1:5001` (avoiding conflict with existing port 5000 services), proxied via Apache at `/api`.
- **Database**: PostgreSQL with dedicated database `fempreneur_2027` (isolated from other websites), initialized idempotently via `backend/models/initDb.js`.
- **Process Manager**: Systemd service (`fempreneur-backend.service`) running under dedicated user `fempreneur`.

---

## 2. Directory Structure on VPS (`/home/fempreneur`)

```text
/home/fempreneur/
├── public_html/                       <-- Public Frontend (Apache DocumentRoot)
│   ├── index.html
│   ├── .htaccess                      <-- SPA routing fallback, .env blocking & asset caching
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
    └── pre_deploy_20261002_1810/
        ├── public_html_backup.tar.gz
        ├── httpd.conf.bak
        └── ...
```

---

## 3. Environment Variables (`/home/fempreneur/apps/fempreneur/.env`)

| Variable Name | Description | Value Configured |
| :--- | :--- | :--- |
| `NODE_ENV` | Runtime environment | `production` |
| `PORT` | Local internal backend port | `5001` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://fempreneur_user:<DB_PASSWORD>@localhost:5432/fempreneur_2027` |
| `JWT_SECRET` | Cryptographically secure secret | Configured |
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
2. Restart backend with previous code: `sudo systemctl restart fempreneur-backend`.
3. Revert Apache configuration if modified: `sudo httpd -t && sudo systemctl reload httpd`.

---

## 9. Automated CI/CD Deployment

### Workflow Overview
* **Workflow File**: [`.github/workflows/deploy-production.yml`](file:///.github/workflows/deploy-production.yml)
* **Trigger**: Automatic on push/merge to the `main` branch, plus manual trigger (`workflow_dispatch`).
* **Concurrency**: Handled by group `production-deploy` (`cancel-in-progress: false`) to prevent concurrent deployments.
* **Target Environment**: Virtualmin Production VPS (`187.127.181.73`).

### Required GitHub Secrets

To enable automated deployments, configure the following secrets in your GitHub repository (**Settings > Secrets and variables > Actions > New repository secret**):

| Secret Name | Required | Description |
| :--- | :--- | :--- |
| `PROD_SSH_KEY` | **Yes** | Dedicated Ed25519 private key generated specifically for the `fempreneur` user |
| `PROD_SSH_HOST` | **Optional** | Server IP address (defaults to `187.127.181.73` in workflow) |
| `PROD_SSH_USER` | **Optional** | SSH account user (defaults to `fempreneur` in workflow) |
| `PROD_SSH_PORT` | **Optional** | SSH port (defaults to `22` in workflow) |
| `PROD_KNOWN_HOSTS`| **Optional** | Pinned host key line for strict host verification (embedded as default in workflow) |

### Deployment Pipeline Stages

1. **Frontend CI**:
   - Checks out code and installs dependencies using `npm --prefix frontend ci`.
   - Runs `oxlint` static code analysis.
   - Builds Vite production SPA with `VITE_API_URL=/api`.
   - Validates that `index.html` was produced and confirms zero occurrences of `localhost:5000` in compiled assets.

2. **Backend CI**:
   - Installs backend dependencies using `npm --prefix backend ci`.
   - Runs syntax check on `backend/server.js` using `node --check`.

3. **SSH & Security**:
   - Configures deployment SSH key with `chmod 600`.
   - Enforces strict SSH host key verification using the pinned host key.

4. **Pre-Deployment Safety Snapshot**:
   - Creates a snapshot of the current active `public_html` and `backend` in `/home/fempreneur/backups/ci_release_previous` on the server before applying changes.

5. **Frontend Deployment**:
   - Synchronizes `frontend/dist/` into `/home/fempreneur/public_html/` using `rsync` over SSH.
   - Explicitly excludes and preserves server-side `.htaccess`.

6. **Backend Deployment**:
   - Synchronizes backend source into `/home/fempreneur/apps/fempreneur/backend/` using `rsync`.
   - Strictly excludes `.env`, `.env*`, `logs/`, `.git`, and `node_modules/` to preserve server-side secrets and runtime data.

7. **Dependency Installation & Service Restart**:
   - Installs production dependencies via `npm ci --omit=dev --prefer-offline`.
   - Restarts `fempreneur-backend` using narrowly scoped passwordless sudo (`/etc/sudoers.d/fempreneur`).
   - Verifies the service enters `active (running)` state.

8. **Post-Deployment Verification**:
   - Probes `https://fempreneur.club/api/health` for HTTP 200 and `"PostgreSQL Connected"`.
   - Probes `https://fempreneur.club/` for HTTP 200.
   - Probes representative SPA routes (`/about`, `/awards`, `/nominate`, `/voting`, `/winners`, `/events`, `/contact`) for HTTP 200.
   - Probes static image and asset delivery.

9. **Automated Rollback**:
   - If any deployment or verification step fails, GitHub Actions triggers the rollback step (`if: failure()`).
   - Restores previous frontend and backend files from `/home/fempreneur/backups/ci_release_previous` and restarts the systemd service.

### How to Manually Trigger a Deployment
1. Navigate to your GitHub repository in your browser.
2. Click the **Actions** tab.
3. Select **Deploy Fempreneur 2027 to Production** from the left sidebar.
4. Click the **Run workflow** dropdown, select the `main` branch, and click **Run workflow**.

### Investigating Failed Runs
1. Click the failed run in the **Actions** tab.
2. Select the `build-and-deploy` job.
3. Expand the step that has a red `X` mark.
4. Check error messages:
   - If **Lint Frontend Code** fails: resolve lint errors in code.
   - If **Verify Frontend Build Artifacts** fails: ensure no localhost URLs are hardcoded in client code.
   - If **Configure SSH** fails: check that `PROD_SSH_KEY` is correctly set in GitHub Secrets.
   - If **Install Production Dependencies & Restart Service** fails: inspect `/home/fempreneur/apps/fempreneur/logs/backend-error.log` via SSH.
   - If **Live Production Verification Checks** fails: check the HTTP status code and response printed in the logs.
