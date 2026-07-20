#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const resumeDir = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '../src/data/resume',
);

function loadJson(filename) {
  return JSON.parse(fs.readFileSync(path.join(resumeDir, filename), 'utf8'));
}

function pathsOrEmpty(prefix) {
  return prefix ? [prefix] : [];
}

function collectArrayPaths(value, prefix) {
  if (value.length === 0 || !value[0]?.id) {
    return pathsOrEmpty(prefix);
  }

  return value.flatMap((item) =>
    collectLeafPaths(
      item,
      prefix ? `${prefix}[id=${item.id}]` : `[id=${item.id}]`,
    ),
  );
}

function collectObjectPaths(value, prefix) {
  const paths = [];

  for (const [key, child] of Object.entries(value)) {
    if (key === 'id' && prefix.includes('[id=')) {
      continue;
    }
    const next = prefix ? `${prefix}.${key}` : key;
    paths.push(...collectLeafPaths(child, next));
  }

  return paths;
}

function collectLeafPaths(value, prefix = '') {
  if (Array.isArray(value)) {
    return collectArrayPaths(value, prefix);
  }

  if (value && typeof value === 'object') {
    return collectObjectPaths(value, prefix);
  }

  return pathsOrEmpty(prefix);
}

function pathSet(obj) {
  return new Set(collectLeafPaths(obj));
}

const shared = loadJson('resume.shared.json');
const publicOverrides = loadJson('resume.public.json');

const sharedPaths = pathSet(shared);
const publicPaths = pathSet(publicOverrides);

let failed = false;

const overlap = [...sharedPaths]
  .filter((pathKey) => publicPaths.has(pathKey))
  .sort((a, b) => a.localeCompare(b));

if (overlap.length > 0) {
  failed = true;
  console.error(
    'Leaf keys duplicated in resume.shared.json and resume.public.json:',
  );
  for (const pathKey of overlap) {
    console.error(`  - ${pathKey}`);
  }
}

const privatePath = path.join(resumeDir, 'resume.private.json');
if (fs.existsSync(privatePath)) {
  const privateOverrides = loadJson('resume.private.json');
  const privatePaths = pathSet(privateOverrides);

  const sharedPrivateOverlap = [...sharedPaths]
    .filter((pathKey) => privatePaths.has(pathKey))
    .sort((a, b) => a.localeCompare(b));

  if (sharedPrivateOverlap.length > 0) {
    failed = true;
    console.error(
      'Leaf keys duplicated in resume.shared.json and resume.private.json:',
    );
    for (const pathKey of sharedPrivateOverlap) {
      console.error(`  - ${pathKey}`);
    }
  }
}

if (failed) {
  process.exit(1);
}

console.log('Resume key check passed.');
