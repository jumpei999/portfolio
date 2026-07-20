export type ResumeEncryptedEnvelope = {
  v: number;
  alg: 'aes-256-gcm';
  iv: string;
  tag: string;
  ciphertext: string;
};

export type ResumeTextSpan = { type: 'text'; value: string };
export type ResumeLinkSpan = { type: 'link'; label: string; href: string };
export type ResumeSpan = ResumeTextSpan | ResumeLinkSpan;
export type ResumeRichText = ResumeSpan[];

export type ResumeSkillGroup = {
  category: string;
  items: string[];
};

export type ResumeSeEntry = {
  client: string;
  title: string;
  period?: string;
  description: string;
  technologies?: string[];
};

export type ResumeQrLink = {
  label: string;
  url: string;
  qrSrc: string;
};

export type ResumeProject = {
  id: string;
  title: string;
  period: string;
  role: string;
  teamSize?: string;
  techStack: string[];
  achievements: ResumeRichText[];
};

export type ResumeExperienceSection = {
  id: string;
  heading: string;
  period: string;
  department?: string;
  position?: string;
  introBullets?: string[];
  awards?: string[];
  managementBullets?: string[];
  managementBulletAppend?: (ResumeRichText | undefined)[];
  seBullets?: ResumeSeEntry[];
  projects: ResumeProject[];
};

export type ResumeData = {
  meta: {
    lastUpdated: string;
    documentTitle: string;
  };
  links: {
    intro: ResumeRichText;
    github: ResumeQrLink;
    portfolio: ResumeQrLink;
  };
  basicInfo: {
    name: string;
    birthday: string;
    address: string;
    phone: string;
    email: string;
    employmentType: string;
  };
  summary: ResumeRichText[];
  skills: ResumeSkillGroup[];
  experience: ResumeExperienceSection[];
};

export type ResumePartial = {
  meta?: Partial<ResumeData['meta']>;
  links?: Partial<ResumeData['links']>;
  basicInfo?: Partial<ResumeData['basicInfo']>;
  summary?: ResumeRichText[];
  skills?: ResumeSkillGroup[];
  experience?: Array<
    Partial<Omit<ResumeExperienceSection, 'projects'>> & {
      id: string;
      projects?: Array<
        Partial<Omit<ResumeProject, 'achievements'>> & {
          id: string;
          achievements?: ResumeRichText[];
        }
      >;
    }
  >;
};
