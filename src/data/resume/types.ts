export type Redactable<T> = {
  private: T
  public: T
}

export type ResumeEncryptedEnvelope = {
  v: number
  alg: "aes-256-gcm"
  iv: string
  tag: string
  ciphertext: string
}

export type ResumeQrLink = {
  label: string
  url: string
  qrSrc: string
}

export type ResumeProject = {
  id: string
  title: string
  period: string
  role: string
  teamSize?: string
  techStack: string
  achievements: Redactable<string>[]
}

export type ResumeExperienceSection = {
  id: string
  heading: Redactable<string>
  period: string
  department?: string
  position?: string
  introBullets?: string[]
  awards?: string[]
  managementBullets?: string[]
  seBullets?: string[]
  projects: ResumeProject[]
}

export type ResumeData = {
  meta: {
    lastUpdated: string
    documentTitle: string
  }
  links: {
    intro: string
    github: ResumeQrLink
    portfolio: ResumeQrLink
  }
  basicInfo: {
    name: Redactable<string>
    address: Redactable<string>
    phone: Redactable<string>
    email: Redactable<string>
    employmentType: string
  }
  summary: string
  skills: string[]
  experience: ResumeExperienceSection[]
}

export type PublicResumeData = {
  meta: ResumeData["meta"]
  links: ResumeData["links"]
  basicInfo: {
    name: string
    address: string
    phone: string
    email: string
    employmentType: string
  }
  summary: string
  skills: string[]
  experience: Array<{
    id: string
    heading: string
    period: string
    department?: string
    position?: string
    introBullets?: string[]
    awards?: string[]
    managementBullets?: string[]
    seBullets?: string[]
    projects: Array<{
      id: string
      title: string
      period: string
      role: string
      teamSize?: string
      techStack: string
      achievements: string[]
    }>
  }>
}
