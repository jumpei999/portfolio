import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { publicResumeData } from "@/data/resume/resume.public"
import type { PublicResumeData, ResumeData } from "@/data/resume/types"
import {
  decryptResumePayload,
  getEncryptionKeyFromEnv,
} from "@/lib/resume/crypto"

const encryptedResumePath = join(
  process.cwd(),
  "src/data/resume/resume.private.enc",
)

export async function getPublicResume(): Promise<PublicResumeData> {
  return publicResumeData
}

export async function getPrivateResume(): Promise<ResumeData> {
  const raw = await readFile(encryptedResumePath, "utf8")
  const envelope = JSON.parse(raw)
  const plaintext = decryptResumePayload(envelope, getEncryptionKeyFromEnv())
  return JSON.parse(plaintext) as ResumeData
}
