import assert from 'node:assert/strict'
import { createServer } from 'node:http'
import test from 'node:test'
import { createApiApp } from './index.js'

async function withServer(run) {
  const app = createApiApp()
  const server = createServer(app)

  await new Promise((resolve) => server.listen(0, resolve))
  const { port } = server.address()

  try {
    await run(`http://127.0.0.1:${port}`)
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()))
    })
  }
}

test('health endpoint reports PDF gallery size', async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/health`)
    const json = await response.json()

    assert.equal(response.status, 200)
    assert.equal(json.ok, true)
    assert.equal(json.pages, 71)
  })
})

test('portfolio endpoint exposes project phases and all rendered pages', async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/portfolio`)
    const json = await response.json()

    assert.equal(response.status, 200)
    assert.equal(json.project.name, 'FTCS')
    assert.equal(json.phases.length, 6)
    assert.equal(json.pages.length, 71)
    assert.ok(json.pages.some((page) => page.category === 'prototype'))
    assert.ok(json.pages.every((page) => page.set && page.setLabel))
    assert.ok(!json.pages.some((page) => /portfolio page|^page \d+/i.test(page.title)))
    assert.ok(json.pages.filter((page) => page.set === 'group-contract').length > 1)
  })
})

test('contact endpoint validates invalid and valid submissions', async () => {
  await withServer(async (baseUrl) => {
    const bad = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name: 'T', email: 'bad', message: 'short' })
    })
    const badJson = await bad.json()

    assert.equal(bad.status, 400)
    assert.equal(badJson.ok, false)

    const good = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        name: 'Tanav Gosala',
        email: 'tanav@example.com',
        message: 'I would like to learn more about the FTCS bottle design.'
      })
    })
    const goodJson = await good.json()

    assert.equal(good.status, 200)
    assert.equal(goodJson.ok, true)
    assert.match(goodJson.requestId, /^ftcs-/)
  })
})
