#!/usr/bin/env node
import { createHmac } from "node:crypto"
import "./resume-crypto.mjs"

function getPasswordSecretFromEnv() {
  const secret = process.env.RESUME_PASSWORD_SECRET
  if (!secret) {
    throw new Error("RESUME_PASSWORD_SECRET is not set")
  }
  return secret
}

function getCurrentAuthEpoch(now = new Date()) {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
  })
  const parts = formatter.formatToParts(now)
  const year = parts.find((part) => part.type === "year")?.value
  const month = parts.find((part) => part.type === "month")?.value
  if (!year || !month) {
    throw new Error("Failed to resolve auth epoch")
  }
  return `${year}-${month}`
}

function deriveMonthlyPassword(secret, epoch) {
  return createHmac("sha256", secret)
    .update(`resume-auth:${epoch}`)
    .digest("base64url")
    .slice(0, 24)
}

const epoch = getCurrentAuthEpoch()
const password = deriveMonthlyPassword(getPasswordSecretFromEnv(), epoch)
console.log(`${epoch} password: ${password}`)
