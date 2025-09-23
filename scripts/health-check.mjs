#!/usr/bin/env node
// Simple health check for /api/stats (GET) and /api/contact (POST)
// Usage: node scripts/health-check.mjs [baseUrl]
// Default baseUrl: http://localhost:3000

import process from 'node:process';

const base = process.argv[2] || 'http://localhost:3000';

async function checkStats() {
  const res = await fetch(`${base}/api/stats`);
  if (!res.ok) throw new Error(`/api/stats failed: ${res.status}`);
  const json = await res.json();
  if (!('totalSubscribers' in json)) throw new Error('stats payload missing field');
  return 'stats ok';
}

async function checkContact() {
  const res = await fetch(`${base}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Health Bot',
      email: 'health@example.com',
      subject: 'Health Check',
      message: 'This is a synthetic health-check message. Please ignore.',
    })
  });
  if (res.status === 429) {
    return 'contact rate-limited (acceptable)';
  }
  if (!res.ok) throw new Error(`/api/contact failed: ${res.status}`);
  return 'contact ok';
}

(async () => {
  try {
    const stats = await checkStats();
    const contact = await checkContact();
    console.log('HEALTH CHECK PASS', { stats, contact });
  } catch (e) {
    console.error('HEALTH CHECK FAIL', e);
    process.exit(1);
  }
})();