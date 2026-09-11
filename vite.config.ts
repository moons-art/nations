import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig, Plugin} from 'vite';

function imageUploadPlugin(): Plugin {
  return {
    name: 'point-image-uploader',
    configureServer(server) {
      server.middlewares.use('/api/upload-point-image', (req, res) => {
        if (req.method === 'POST') {
          const chunks: any[] = [];
          req.on('data', chunk => chunks.push(chunk));
          req.on('end', () => {
            try {
              const body = JSON.parse(Buffer.concat(chunks).toString());
              const { pointId, dataBase64, originalName } = body;
              if (!pointId || !dataBase64) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Missing pointId or dataBase64' }));
                return;
              }
              const matches = dataBase64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
              const buffer = Buffer.from(matches ? matches[2] : dataBase64, 'base64');
              const publicDir = path.join(process.cwd(), 'public');
              if (!fs.existsSync(publicDir)) {
                fs.mkdirSync(publicDir, { recursive: true });
              }

              const primaryFile = path.join(publicDir, `core-point-${pointId}.png`);
              fs.writeFileSync(primaryFile, buffer);

              if (originalName) {
                fs.writeFileSync(path.join(publicDir, originalName), buffer);
              }

              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, file: `/core-point-${pointId}.png` }));
            } catch (err: any) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err?.message || 'Server error' }));
            }
          });
        } else {
          res.statusCode = 405;
          res.end('Method Not Allowed');
        }
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), imageUploadPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
