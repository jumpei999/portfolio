import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const RESUME_ENC_VERSION = 1;
export const RESUME_ENC_ALGORITHM = 'aes-256-gcm';

const scriptsDir = dirname(fileURLToPath(import.meta.url));
export const portfolioRoot = join(scriptsDir, '..');
export const resumePrivateJsonPath = join(
  portfolioRoot,
  'src/data/resume/resume.private.json',
);
export const resumePrivateEncPath = join(
  portfolioRoot,
  'src/data/resume/resume.private.enc',
);
export const resumeSharedJsonPath = join(
  portfolioRoot,
  'src/data/resume/resume.shared.json',
);
export const resumePublicJsonPath = join(
  portfolioRoot,
  'src/data/resume/resume.public.json',
);

function loadEnvLocal() {
  const envPath = join(portfolioRoot, '.env.local');
  if (!existsSync(envPath)) {
    return;
  }

  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    const separatorIndex = trimmed.indexOf('=');
    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim();
    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

loadEnvLocal();

export function getEncryptionKeyFromEnv() {
  const raw = process.env.RESUME_ENCRYPTION_KEY;
  if (!raw) {
    throw new Error('RESUME_ENCRYPTION_KEY is not set');
  }

  const key = Buffer.from(raw, 'base64');
  if (key.length !== 32) {
    throw new Error('RESUME_ENCRYPTION_KEY must decode to 32 bytes (base64)');
  }

  return key;
}

export function encryptResumePayload(plaintext, key) {
  const iv = randomBytes(12);
  const cipher = createCipheriv(RESUME_ENC_ALGORITHM, key, iv);
  const encrypted = Buffer.concat([
    cipher.update(plaintext, 'utf8'),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();

  return {
    v: RESUME_ENC_VERSION,
    alg: RESUME_ENC_ALGORITHM,
    iv: iv.toString('base64'),
    tag: tag.toString('base64'),
    ciphertext: encrypted.toString('base64'),
  };
}

export function decryptResumePayload(envelope, key) {
  if (
    envelope.v !== RESUME_ENC_VERSION ||
    envelope.alg !== RESUME_ENC_ALGORITHM
  ) {
    throw new Error('Unsupported resume encryption envelope');
  }

  const decipher = createDecipheriv(
    RESUME_ENC_ALGORITHM,
    key,
    Buffer.from(envelope.iv, 'base64'),
  );
  decipher.setAuthTag(Buffer.from(envelope.tag, 'base64'));

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(envelope.ciphertext, 'base64')),
    decipher.final(),
  ]);

  return decrypted.toString('utf8');
}

export function readResumeEnvelope(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

export function writeResumeEnvelope(path, envelope) {
  writeFileSync(path, `${JSON.stringify(envelope, null, 2)}\n`, 'utf8');
}
