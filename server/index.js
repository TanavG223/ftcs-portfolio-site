import express from 'express'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import portfolioData from './data.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

export function createApiApp() {
  const app = express()
  app.disable('x-powered-by')
  app.use(express.json({ limit: '1mb' }))

  app.get('/api/health', (_req, res) => {
    res.json({
      ok: true,
      service: 'ftcs-portfolio-site',
      pages: portfolioData.pages.length
    })
  })

  app.get('/api/portfolio', (_req, res) => {
    res.json(portfolioData)
  })

  app.post('/api/contact', (req, res) => {
    const { name = '', email = '', message = '' } = req.body || {}
    const cleanName = String(name).trim()
    const cleanEmail = String(email).trim()
    const cleanMessage = String(message).trim()

    if (cleanName.length < 2) {
      return res.status(400).json({ ok: false, error: 'Please enter your name.' })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return res.status(400).json({ ok: false, error: 'Please enter a valid email.' })
    }

    if (cleanMessage.length < 12) {
      return res.status(400).json({ ok: false, error: 'Please write a longer message.' })
    }

    res.json({
      ok: true,
      requestId: `ftcs-${Date.now().toString(36)}`,
      message: 'Thanks. Your message was validated by the FTCS backend.'
    })
  })

  return app
}

async function startServer() {
  const app = createApiApp()
  const port = Number(process.env.PORT || 5173)
  const isProduction = process.env.NODE_ENV === 'production'

  if (isProduction) {
    const distPath = path.join(root, 'dist')

    if (!existsSync(distPath)) {
      throw new Error('Production build missing. Run npm run build before npm run preview.')
    }

    app.use(express.static(distPath))
    app.get(/.*/, (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'))
    })
  } else {
    const { createServer } = await import('vite')
    const vite = await createServer({
      root,
      server: { middlewareMode: true },
      appType: 'spa'
    })

    app.use(vite.middlewares)
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`FTCS portfolio running at http://localhost:${port}`)
  })
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  startServer().catch((error) => {
    console.error(error)
    process.exit(1)
  })
}
