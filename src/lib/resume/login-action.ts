'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  createResumeSessionCookieValue,
  getResumeSessionCookieOptions,
  RESUME_SESSION_COOKIE,
  verifyResumeLoginPassword,
} from '@/lib/resume/auth';

type LoginFormState = {
  error?: string;
};

export async function loginToPrivateResume(
  _previousState: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const password = formData.get('password');
  if (typeof password !== 'string' || password.length === 0) {
    return { error: 'パスワードを入力してください。' };
  }

  if (!verifyResumeLoginPassword(password)) {
    return { error: 'パスワードが正しくありません。' };
  }

  const cookieStore = await cookies();
  const now = new Date();
  cookieStore.set(
    RESUME_SESSION_COOKIE,
    createResumeSessionCookieValue(now),
    getResumeSessionCookieOptions(now),
  );

  redirect('/resume/private');
}
