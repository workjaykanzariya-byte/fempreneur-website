const { spawn } = require('child_process');
const path = require('path');

console.log('====================================================');
console.log('  🚀 Starting Fempreneur 2027 Full-Stack Platform');
console.log('  Frontend: http://localhost:5173');
console.log('  Backend:  http://localhost:5000');
console.log('====================================================');

// Start Express Backend
const backend = spawn('npm', ['run', 'dev'], {
  cwd: path.join(__dirname, 'backend'),
  stdio: 'inherit',
  shell: true,
});

// Start Vite Frontend
const frontend = spawn('npm', ['run', 'dev'], {
  cwd: path.join(__dirname, 'frontend'),
  stdio: 'inherit',
  shell: true,
});

function cleanup() {
  try { backend.kill(); } catch (e) {}
  try { frontend.kill(); } catch (e) {}
  process.exit();
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
