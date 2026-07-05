import { readFile } from "node:fs/promises"
import { join } from "node:path"
import shared from "@/data/resume/resume.shared.json"
import publicOverrides from "@/data/resume/resume.public.json"
import type { ResumeData, ResumePartial } from "@/data/resume/types"
import {
  decryptResumePayload,
  getEncryptionKeyFromEnv,
} from "@/lib/resume/crypto"
import { resolveResume } from "@/lib/resume/merge-resume"

const encryptedResumePath = join(
  process.cwd(),
  "src/data/resume/resume.private.enc",
)

async function loadPrivateOverrides(): Promise<ResumePartial> {
  const raw = await readFile(encryptedResumePath, "utf8")
  const envelope = JSON.parse(raw)
  const plaintext = decryptResumePayload(envelope, getEncryptionKeyFromEnv())
  return JSON.parse(plaintext) as ResumePartial
}

export async function getPublicResume(): Promise<ResumeData> {
  return resolveResume(
    shared as ResumePartial,
    publicOverrides as ResumePartial,
  )
}

export async function getPrivateResume(): Promise<ResumeData> {
  const privateOverrides = await loadPrivateOverrides()
  return resolveResume(shared as ResumePartial, privateOverrides)
}
