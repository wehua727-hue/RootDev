import { createServer } from 'node:http'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || '0.0.0.0'

// Simple static file server
import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'

const serveStatic = (req, res) => {
  let filePath = join(__dirname, 'dist', req.url)
  
  // If requesting a directory, serve index.html
  if (req.url.endsWith('/')) {
    filePath = join(filePath, 'index.html')
  } else if (!req.url.includes('.')) {
    // If requesting a route without extension, serve index.html
    filePath = join(__dirname, 'dist', 'index.html')
  }
  
  // Default to index.html for any file not found
  const serveIndex = () => {
    filePath = join(__dirname, 'dist', 'index.html')
    createReadStream(filePath).pipe(res)
  }
  
  stat(filePath)
    .then(() => {
      createReadStream(filePath).pipe(res)
    })
    .catch(() => {
      // File not found, serve index.html
      serveIndex()
    })
}

const server = createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  serveStatic(req, res)
})

server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`)
})