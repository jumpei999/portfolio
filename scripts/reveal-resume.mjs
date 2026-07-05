#!/usr/bin/env node
import { writeFileSync } from "node:fs"
import {
  decryptResumePayload,
  getEncryptionKeyFromEnv,
  readResumeEnvelope,
  resumePrivateEncPath,
  resumePrivateJsonPath,
} from "./resume-crypto.mjs"

const envelope = readResumeEnvelope(resumePrivateEncPath)
const plaintext = decryptResumePayload(envelope, getEncryptionKeyFromEnv())
JSON.parse(plaintext)
writeFileSync(resumePrivateJsonPath, `${plaintext.trimEnd()}\n`, "utf8")

console.log(`Revealed private overrides ${resumePrivateEncPath} -> ${resumePrivateJsonPath}`)
