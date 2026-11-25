import path from 'path';
import { spawn } from 'child_process';
import fs from 'fs';

/**
 * Automatically removes the background from the uploaded photo
 * and composites the subject onto the standard reference purple background template.
 * Operates safely and logs results.
 */
export const processWinnerImageAsync = (filePath) => {
  return new Promise((resolve) => {
    if (!filePath || !fs.existsSync(filePath)) {
      return resolve({ success: false, error: 'File does not exist' });
    }

    const scriptPath = path.join(process.cwd(), 'utils', 'process_image.py');
    if (!fs.existsSync(scriptPath)) {
      console.warn(`[ImageProcessor] Script not found at ${scriptPath}`);
      return resolve({ success: false, error: 'Processor script not found' });
    }

    console.log(`[ImageProcessor] Processing image: ${filePath}`);
    const pyProcess = spawn('python', [scriptPath, filePath]);

    let output = '';
    let errorOutput = '';

    pyProcess.stdout.on('data', (data) => {
      output += data.toString();
    });

    pyProcess.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    pyProcess.on('close', (code) => {
      if (code === 0) {
        console.log(`[ImageProcessor] Successfully processed ${filePath}: ${output.trim()}`);
        resolve({ success: true, output });
      } else {
        console.error(`[ImageProcessor] Failed processing ${filePath} (code ${code}): ${errorOutput.trim()}`);
        resolve({ success: false, error: errorOutput });
      }
    });

    pyProcess.on('error', (err) => {
      console.error(`[ImageProcessor] Process spawn error:`, err);
      resolve({ success: false, error: err.message });
    });
  });
};
