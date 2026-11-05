// Posle build-a: renderuje React aplikaciju u statički HTML (da Google odmah vidi
// sav tekst, bez čekanja JavaScripta) i ubacuje strukturirane podatke.
import { readFileSync, writeFileSync, rmSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { resolve, dirname } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const server = resolve(root, 'dist-ssr/entry-server.js')
const { render, structuredData } = await import(pathToFileURL(server).href)

const file = resolve(root, 'dist/index.html')
const html = readFileSync(file, 'utf8')
  .replace('<!--app-html-->', render())
  .replace('<!--structured-data-->', structuredData())

writeFileSync(file, html)
rmSync(resolve(root, 'dist-ssr'), { recursive: true, force: true })
console.log('Prerender OK:', html.length, 'bytes')
