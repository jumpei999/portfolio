import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const messagesDir = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../src/messages",
)

function loadJson(filename) {
  const filePath = path.join(messagesDir, filename)
  return JSON.parse(fs.readFileSync(filePath, "utf8"))
}

function collectLeafPaths(value, prefix = "") {
  if (Array.isArray(value)) {
    return prefix ? [prefix] : []
  }

  if (value && typeof value === "object") {
    const paths = []

    for (const [key, child] of Object.entries(value)) {
      const next = prefix ? `${prefix}.${key}` : key
      paths.push(...collectLeafPaths(child, next))
    }

    return paths
  }

  return prefix ? [prefix] : []
}

function pathSet(obj) {
  return new Set(collectLeafPaths(obj))
}

const shared = loadJson("shared.json")
const ja = loadJson("ja.json")
const en = loadJson("en.json")

const jaPaths = pathSet(ja)
const enPaths = pathSet(en)
const sharedPaths = pathSet(shared)

let failed = false

const jaOnly = [...jaPaths]
  .filter((pathKey) => !enPaths.has(pathKey))
  .sort((a, b) => a.localeCompare(b))
const enOnly = [...enPaths]
  .filter((pathKey) => !jaPaths.has(pathKey))
  .sort((a, b) => a.localeCompare(b))

if (jaOnly.length > 0) {
  failed = true
  console.error("Keys in ja.json but not en.json:")
  for (const pathKey of jaOnly) {
    console.error(`  - ${pathKey}`)
  }
}

if (enOnly.length > 0) {
  failed = true
  console.error("Keys in en.json but not ja.json:")
  for (const pathKey of enOnly) {
    console.error(`  - ${pathKey}`)
  }
}

for (const { file, paths: localePaths } of [
  { file: "ja.json", paths: jaPaths },
  { file: "en.json", paths: enPaths },
]) {
  const overlap = [...sharedPaths]
    .filter((pathKey) => localePaths.has(pathKey))
    .sort((a, b) => a.localeCompare(b))

  if (overlap.length > 0) {
    failed = true
    console.error(`Leaf keys duplicated in shared.json and ${file}:`)
    for (const pathKey of overlap) {
      console.error(`  - ${pathKey}`)
    }
  }
}

if (failed) {
  process.exit(1)
}

console.log("i18n key check passed.")
