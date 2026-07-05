import { createDecipheriv, createHmac, timingSafeEqual } from "node:crypto"
import type { ResumeEncryptedEnvelope } from "@/data/resume/types"

export const RESUME_ENC_VERSION = 1
export const RESUME_ENC_ALGORITHM = "aes-256-gcm"

export function getEncryptionKeyFromEnv(): Buffer {
  const raw = process.env.RESUME_ENCRYPTION_KEY
  if (!raw) {
    throw new Error("RESUME_ENCRYPTION_KEY is not set")
  }

  const key = Buffer.from(raw, "base64")
  if (key.length !== 32) {
    throw new Error("RESUME_ENCRYPTION_KEY must decode to 32 bytes (base64)")
  }

  return key
}

export function decryptResumePayload(
  envelope: ResumeEncryptedEnvelope,
  key: Buffer,
): string {
  if (envelope.v !== RESUME_ENC_VERSION || envelope.alg !== RESUME_ENC_ALGORITHM) {
    throw new Error("Unsupported resume encryption envelope")
  }

  const decipher = createDecipheriv(
    RESUME_ENC_ALGORITHM,
    key,
    Buffer.from(envelope.iv, "base64"),
  )
  decipher.setAuthTag(Buffer.from(envelope.tag, "base64"))

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(envelope.ciphertext, "base64")),
    decipher.final(),
  ])

  return decrypted.toString("utf8")
}

export function signResumeSession(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("base64url")
}

export function verifyResumeSession(
  payload: string,
  signature: string,
  secret: string,
): boolean {
  const expected = signResumeSession(payload, secret)
  const expectedBuffer = Buffer.from(expected)
  const signatureBuffer = Buffer.from(signature)

  if (expectedBuffer.length !== signatureBuffer.length) {
    return false
  }

  return timingSafeEqual(expectedBuffer, signatureBuffer)
}
