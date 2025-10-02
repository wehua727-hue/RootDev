/* eslint-env node */
/* global process, Buffer */
import { createServer } from 'node:http'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || '0.0.0.0'

// Telegram configuration (set on Render dashboard)
const TELEGRAM_BOT_TOKEN = process.env.BOT_TOKEN
const TELEGRAM_CHAT_ID = process.env.CHAT_ID

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

const server = createServer(async (req, res) => {
	// Basic CORS support
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

	if (req.method === 'OPTIONS') {
		res.writeHead(204)
		res.end()
		return
	}

	// Health endpoint
	if (
		req.method === 'GET' &&
		(req.url === '/health' || req.url === '/healthz')
	) {
		res.setHeader('Content-Type', 'application/json; charset=utf-8')
		res.writeHead(200)
		res.end(JSON.stringify({ status: 'ok' }))
		return
	}

	// Telegram relay endpoint
	if (req.method === 'POST' && req.url === '/api/telegram') {
		try {
			const chunks = []
			for await (const chunk of req) {
				chunks.push(chunk)
			}
			const raw = Buffer.concat(chunks).toString('utf-8')
			const body = raw ? JSON.parse(raw) : {}

			const { name, email, subject, message } = body

			if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
				res.setHeader('Content-Type', 'application/json; charset=utf-8')
				res.writeHead(500)
				res.end(JSON.stringify({ error: 'Server not configured' }))
				return
			}

			const formatted = [
				'Yangi xabar Portfolio veb-saytidan!',
				'',
				`Ism: ${name || ''}`,
				`Email: ${email || ''}`,
				`Mavzu: ${subject || ''}`,
				'',
				'Xabar:',
				message || '',
			].join('\n')

			const tgResponse = await fetch(
				`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: formatted }),
				}
			)

			if (!tgResponse.ok) {
				const text = await tgResponse.text()
				res.setHeader('Content-Type', 'application/json; charset=utf-8')
				res.writeHead(502)
				res.end(JSON.stringify({ error: 'Telegram API error', details: text }))
				return
			}

			res.setHeader('Content-Type', 'application/json; charset=utf-8')
			res.writeHead(200)
			res.end(JSON.stringify({ ok: true }))
			return
		} catch {
			res.setHeader('Content-Type', 'application/json; charset=utf-8')
			res.writeHead(400)
			res.end(JSON.stringify({ error: 'Bad request' }))
			return
		}
	}

	// Static assets and SPA fallback
	res.setHeader('Content-Type', 'text/html; charset=utf-8')
	serveStatic(req, res)
})

server.listen(PORT, HOST, () => {
	console.log(`Server running at http://${HOST}:${PORT}/`)
})
