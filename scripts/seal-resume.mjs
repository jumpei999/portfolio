#!/usr/bin/env node
import { readFileSync } from "node:fs"
import {
  encryptResumePayload,
  getEncryptionKeyFromEnv,
  resumePrivateEncPath,
  resumePrivateJsonPath,
  writeResumeEnvelope,
} from "./resume-crypto.mjs"

const plaintext = readFileSync(resumePrivateJsonPath, "utf8")
JSON.parse(plaintext)

const envelope = encryptResumePayload(plaintext, getEncryptionKeyFromEnv())
writeResumeEnvelope(resumePrivateEncPath, envelope)

console.log(`Sealed ${resumePrivateJsonPath} -> ${resumePrivateEncPath}`)
