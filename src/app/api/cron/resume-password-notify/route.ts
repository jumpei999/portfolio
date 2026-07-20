import { NextResponse } from 'next/server';
import {
  deriveMonthlyPassword,
  getCurrentAuthEpoch,
  getLastDayOfMonth,
  getPasswordSecretFromEnv,
} from '@/lib/resume/monthly-password';
import { getSiteOrigin } from '@/lib/site-url';

function isAuthorized(request: Request): boolean {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    return false;
  }

  const authorization = request.headers.get('authorization');
  return authorization === `Bearer ${cronSecret}`;
}

function buildSlackMessage(epoch: string, password: string): string {
  const origin = getSiteOrigin();
  const lastDay = getLastDayOfMonth(epoch);

  return [
    `Resume プライベート版 — ${epoch} パスワード`,
    `パスワード: ${password}`,
    `ログイン: ${origin}/resume/private/login`,
    `有効期限: ${lastDay} 23:59 JST（翌月初に自動更新）`,
  ].join('\n');
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const webhookUrl = process.env.RESUME_SLACK_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json(
      { error: 'RESUME_SLACK_WEBHOOK_URL is not configured' },
      { status: 500 },
    );
  }

  const epoch = getCurrentAuthEpoch();
  const password = deriveMonthlyPassword(getPasswordSecretFromEnv(), epoch);
  const text = buildSlackMessage(epoch, password);

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    const body = await response.text();
    return NextResponse.json(
      { error: 'Slack notification failed', details: body },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, epoch });
}
