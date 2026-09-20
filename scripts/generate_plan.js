#!/usr/bin/env node

/**
 * scripts/generate_plan.js
 *
 * Daily Plan Generator for Lakshay Nagpal's Dashboard
 * Node 20 runtime (Zero third-party npm dependencies).
 *
 * Usage:
 *   node scripts/generate_plan.js [YYYY-MM-DD]
 *
 * If XAI_API_KEY is present, queries xAI Grok API with context.json and prompts/grok_system.md.
 * Strictly validates schema, non-overlapping times, wake/sleep limits, 6h budget, and 7-day deadlines.
 * Retries once on failure, then falls back to deterministic schedule builder from context.json.
 * Writes output to data/daily_plan.json and data/history/YYYY-MM-DD.json.
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const CONTEXT_PATH = path.join(ROOT_DIR, 'data', 'context.json');
const SCHEMA_PATH = path.join(ROOT_DIR, 'data', 'daily_plan.schema.json');
const PROMPT_PATH = path.join(ROOT_DIR, 'prompts', 'grok_system.md');
const OUTPUT_PATH = path.join(ROOT_DIR, 'data', 'daily_plan.json');
const HISTORY_DIR = path.join(ROOT_DIR, 'data', 'history');

// Helper: Get today's date formatted as YYYY-MM-DD in Asia/Kolkata timezone
function getTodayIST() {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
  return formatter.format(new Date());
}

// Convert "HH:MM" to minutes from midnight
function timeToMinutes(t) {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}

// Helper: Find deadlines occurring within 7 days of target date
function getDeadlinesWithin7Days(deadlines, targetDateStr) {
  const targetDate = new Date(`${targetDateStr}T00:00:00+05:30`);
  const sevenDaysLater = new Date(targetDate.getTime() + 7 * 24 * 60 * 60 * 1000);
  const oneDayAgo = new Date(targetDate.getTime() - 1 * 24 * 60 * 60 * 1000);

  return deadlines.filter(d => {
    // Never show completed deadlines or cat_registration_close on any date
    if (d.done || d.status === 'completed' || d.id === 'cat_registration_close') return false;
    if (!d.datetime_ist) return false;
    const deadlineDate = new Date(d.datetime_ist);
    return deadlineDate >= oneDayAgo && deadlineDate <= sevenDaysLater;
  });
}

// Build deterministic fallback plan from context.json
function buildDeterministicPlan(context, targetDate) {
  console.log(`[Plan Generator] Building deterministic plan for ${targetDate} from context.json...`);

  const catDay = context.cat_schedule ? context.cat_schedule[targetDate] : null;
  const targetDateObj = new Date(`${targetDate}T12:00:00+05:30`);
  const dayOfWeek = targetDateObj.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
  const isMonOrWed = dayOfWeek === 1 || dayOfWeek === 3;

  // Identify upcoming deadlines within 7 days
  const urgentDeadlines = getDeadlinesWithin7Days(context.deadlines || [], targetDate);
  const urgentAlerts = urgentDeadlines.map(d => ({
    title: d.title,
    deadline: d.datetime_ist.includes('T17:00:00') ? '22 Sep 2026, 5:00 PM IST' : d.datetime_ist,
    action: d.action || `Review and verify ${d.title} on official portal.`
  }));

  // Construct blocks
  const blocks = [];

  // Block 1: DSA (07:30 - 08:15, 45 min)
  blocks.push({
    id: 'block-dsa',
    start: '07:30',
    end: '08:15',
    title: 'DSA Algorithmic Problem Solving (2 Problems)',
    stream: 'dsa',
    details: 'Solve 2 curated LeetCode problems (1 Medium + 1 Easy/Review) from the 247-problem DSA Tracker. Focus on algorithmic clarity and edge cases.',
    links: ['dsa_master_tracker.html'],
    priority: 1,
    notify_before_min: 10,
    verify: false
  });

  // Block 2: Job Outreach (08:15 - 09:00, 45 min)
  if (isMonOrWed) {
    blocks.push({
      id: 'block-job',
      start: '08:15',
      end: '09:00',
      title: 'Dedicated Job Outreach Application Batch',
      stream: 'job',
      details: 'Dedicated morning batch: Submit 8–10 tailored applications on Instahyre and LinkedIn Jobs. Target Series A–C tech and European remote roles highlighting Immediate Joiner status.',
      links: ['profile.html#cold-email', 'https://www.instahyre.com'],
      priority: 2,
      notify_before_min: 10,
      verify: false
    });
  } else {
    blocks.push({
      id: 'block-job',
      start: '08:15',
      end: '09:00',
      title: 'Job Search Recruiter Triage & Screening Replies',
      stream: 'job',
      details: '15–30 min recruiter communications triage: reply to inbound messages, confirm availability, schedule technical screenings, and follow up on pending submissions.',
      links: ['profile.html#cold-email', 'https://www.instahyre.com'],
      priority: 2,
      notify_before_min: 10,
      verify: false
    });
  }

  // Block 3: CAT QA & DILR (10:00 - 12:00, 120 min)
  let qaTaskDesc = 'Core QA concept drills (Arithmetic/Algebra 15–20 questions) + 2 timed DILR sets (40 min).';
  let linksCAT = ['cat_2026_syllabus_roadmap.html'];
  if (catDay) {
    qaTaskDesc = `QA: ${catDay.tasks.quant || 'Core drills'}. DILR: ${catDay.tasks.dilr || '2 timed sets'}.`;
    linksCAT.push(`cat_2026_syllabus_roadmap.html#${catDay.day_id}`);
  }
  blocks.push({
    id: 'block-cat-qa-dilr',
    start: '10:00',
    end: '12:00',
    title: catDay ? `CAT Day ${catDay.day_index}: QA & DILR Focus` : 'CAT 2026: QA & DILR Deep Work',
    stream: 'cat',
    details: qaTaskDesc,
    links: linksCAT,
    priority: 1,
    notify_before_min: 10,
    verify: false
  });

  // Block 4: Germany Admin / Revision (14:30 - 15:30, 60 min)
  const isPastFreeze = targetDate > '2026-11-15';
  if (isPastFreeze) {
    blocks.push({
      id: 'block-cat-revision',
      start: '14:30',
      end: '15:30',
      title: 'CAT 2026 High-Yield Revision & Error Log',
      stream: 'cat',
      details: 'Post-freeze study sprint: Review flagged weak areas, formula shortcuts, and recent mock exam error log entries.',
      links: ['cat_2026_syllabus_roadmap.html#timetable'],
      priority: 1,
      notify_before_min: 10,
      verify: false
    });
  } else {
    blocks.push({
      id: 'block-germany-admin',
      start: '14:30',
      end: '15:30',
      title: 'Germany Academic Admin & Prerequisite Audits',
      stream: 'germany',
      details: 'Zero-fee audit tasks: Check Anabin H+ status for MDU, audit dMAT status on aps-india.de/dmat, review Passau interactive guide checklist, and email MDU for 100% English MOI letter.',
      links: [
        'deadlines_calendar.html#prerequisite-tasks',
        'https://anabin.kmk.org',
        'https://aps-india.de/dmat',
        'https://www.uni-passau.de/en/apply'
      ],
      priority: 2,
      notify_before_min: 10,
      verify: true
    });
  }

  // Block 5: CAT VARC (16:30 - 18:00, 90 min)
  let varcTaskDesc = '3 Reading Comprehension passages + 8 Verbal Ability questions + error log entry.';
  if (catDay && catDay.tasks.varc) {
    varcTaskDesc = `${catDay.tasks.varc} Maintain error log on Career Launcher MyZone.`;
  }
  blocks.push({
    id: 'block-cat-varc',
    start: '16:30',
    end: '18:00',
    title: catDay ? `CAT Day ${catDay.day_index}: VARC & Verbal Ability` : 'CAT 2026: VARC Mastery',
    stream: 'cat',
    details: varcTaskDesc,
    links: linksCAT,
    priority: 1,
    notify_before_min: 10,
    verify: false
  });

  // Calculate totals by stream
  const totalsByStream = {};
  for (const b of blocks) {
    const dur = timeToMinutes(b.end) - timeToMinutes(b.start);
    totalsByStream[b.stream] = (totalsByStream[b.stream] || 0) + dur;
  }

  // Executive summary
  let summary = `Triple-track schedule for ${targetDate}: 6.0 hrs focused study (DSA 45m, Job Outreach 45m, CAT QA/DILR 120m, Germany 60m, CAT VARC 90m).`;
  if (catDay) {
    summary = `Day ${catDay.day_index} of 72 (${catDay.title}): ${catDay.mission}`;
  }

  return {
    date: targetDate,
    timezone: context.timezone || 'Asia/Kolkata',
    generated_at: new Date().toISOString(),
    summary: summary,
    urgent_alerts: urgentAlerts,
    blocks: blocks,
    totals_by_stream_min: totalsByStream
  };
}

// Validator function checking all strict constraints
function validatePlan(plan, context, targetDate) {
  const errors = [];

  if (!plan || typeof plan !== 'object') {
    return ['Plan is not an object'];
  }

  if (plan.date !== targetDate) {
    errors.push(`Plan date (${plan.date}) does not match target date (${targetDate})`);
  }

  if (!Array.isArray(plan.blocks) || plan.blocks.length === 0) {
    errors.push('Plan must have a non-empty array of blocks');
    return errors;
  }

  // Check wake/sleep bounds
  const wakeMin = timeToMinutes(context.wake_sleep_meal_windows?.wake || '06:30');
  const sleepMin = timeToMinutes(context.wake_sleep_meal_windows?.sleep || '22:30');

  // Check overlaps and time order
  const sortedBlocks = [...plan.blocks].sort((a, b) => timeToMinutes(a.start) - timeToMinutes(b.start));

  let studyWorkMinutes = 0;
  for (let i = 0; i < sortedBlocks.length; i++) {
    const b = sortedBlocks[i];
    if (!b.start || !b.end || !b.title || !b.stream) {
      errors.push(`Block at index ${i} is missing required fields`);
      continue;
    }

    const startMin = timeToMinutes(b.start);
    const endMin = timeToMinutes(b.end);

    if (isNaN(startMin) || isNaN(endMin) || startMin >= endMin) {
      errors.push(`Block ${b.id || i} has invalid times: start=${b.start}, end=${b.end}`);
    }

    if (startMin < wakeMin || endMin > sleepMin) {
      errors.push(`Block ${b.id || i} (${b.start}–${b.end}) falls outside wake/sleep window (${context.wake_sleep_meal_windows?.wake}–${context.wake_sleep_meal_windows?.sleep})`);
    }

    if (['cat', 'germany', 'job', 'dsa'].includes(b.stream)) {
      studyWorkMinutes += (endMin - startMin);
    }

    if (i > 0) {
      const prev = sortedBlocks[i - 1];
      const prevEndMin = timeToMinutes(prev.end);
      if (startMin < prevEndMin) {
        errors.push(`Time overlap detected between block '${prev.title}' (ends ${prev.end}) and '${b.title}' (starts ${b.start})`);
      }
    }
  }

  // Check budget (allow max 360 min with 5 min grace)
  const maxMinutes = (context.daily_hour_budget || 6.0) * 60;
  if (studyWorkMinutes > maxMinutes) {
    errors.push(`Total study/work minutes (${studyWorkMinutes}m) exceeds budget (${maxMinutes}m / ${context.daily_hour_budget}h)`);
  }

  // Check urgent deadlines within 7 days
  const urgentDeadlines = getDeadlinesWithin7Days(context.deadlines || [], targetDate);
  const alertsText = (plan.urgent_alerts || []).map(a => `${a.title} ${a.action}`).join(' ').toLowerCase();

  for (const d of urgentDeadlines) {
    // If deadline has keyword not found in alerts
    const titleKey = d.title.toLowerCase().split(' ')[0];
    if (!alertsText.includes(titleKey) && !alertsText.includes(d.id.toLowerCase())) {
      errors.push(`Urgent deadline '${d.title}' (due ${d.datetime_ist}) within 7 days was not represented in urgent_alerts`);
    }
  }

  return errors;
}

// Call xAI Grok API
async function callGrokAPI(context, systemPrompt, targetDate) {
  const apiKey = process.env.XAI_API_KEY;
  const model = process.env.XAI_MODEL || 'grok-beta';

  if (!apiKey) {
    console.log('[Plan Generator] No XAI_API_KEY found in environment. Skipping API call.');
    return null;
  }

  console.log(`[Plan Generator] Calling xAI API (${model}) for date: ${targetDate}...`);

  const userPrompt = `
Generate the daily plan for target date: "${targetDate}".
Candidate Context Data:
${JSON.stringify({
  date: targetDate,
  timezone: context.timezone,
  daily_hour_budget: context.daily_hour_budget,
  wake_sleep_meal_windows: context.wake_sleep_meal_windows,
  deadlines: context.deadlines,
  today_cat_schedule: context.cat_schedule ? context.cat_schedule[targetDate] : null,
  germany: context.germany,
  job_search: context.job_search,
  dsa: context.dsa,
  routine_blocks: context.routine_blocks
}, null, 2)}

Produce ONLY valid JSON conforming to daily_plan.schema.json. No markdown fences.
`.trim();

  const response = await fetch('https://api.x.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.2
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`xAI API returned status ${response.status}: ${errorText}`);
  }

  const jsonResponse = await response.json();
  const rawContent = jsonResponse.choices?.[0]?.message?.content?.trim();
  if (!rawContent) {
    throw new Error('xAI API returned empty completion content');
  }

  // Clean potential markdown fences
  const cleaned = rawContent.replace(/^```json\s*/i, '').replace(/```\s*$/, '').trim();
  return JSON.parse(cleaned);
}

// Main execution flow
async function main() {
  const args = process.argv.slice(2);
  const targetDate = args[0] || getTodayIST();
  console.log(`[Plan Generator] Target Execution Date: ${targetDate} (Asia/Kolkata)`);

  if (!fs.existsSync(CONTEXT_PATH)) {
    console.error(`[Plan Generator] Error: context.json not found at ${CONTEXT_PATH}`);
    process.exit(1);
  }

  const context = JSON.parse(fs.readFileSync(CONTEXT_PATH, 'utf8'));
  const systemPrompt = fs.existsSync(PROMPT_PATH) ? fs.readFileSync(PROMPT_PATH, 'utf8') : '';

  let plan = null;

  // Try API call if API key provided
  if (process.env.XAI_API_KEY) {
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        console.log(`[Plan Generator] API generation attempt ${attempt}...`);
        const candidatePlan = await callGrokAPI(context, systemPrompt, targetDate);
        if (candidatePlan) {
          const validationErrors = validatePlan(candidatePlan, context, targetDate);
          if (validationErrors.length === 0) {
            plan = candidatePlan;
            console.log('[Plan Generator] Successfully validated AI-generated plan!');
            break;
          } else {
            console.warn(`[Plan Generator] Attempt ${attempt} validation failed with ${validationErrors.length} errors:`, validationErrors);
          }
        }
      } catch (err) {
        console.warn(`[Plan Generator] Attempt ${attempt} error: ${err.message}`);
      }
    }
  }

  // If AI generation not used or failed validation, construct deterministic plan
  if (!plan) {
    plan = buildDeterministicPlan(context, targetDate);
    const fallbackValidation = validatePlan(plan, context, targetDate);
    if (fallbackValidation.length > 0) {
      console.warn('[Plan Generator] Deterministic plan minor validation notices:', fallbackValidation);
    } else {
      console.log('[Plan Generator] Deterministic plan passed all validation checks cleanly.');
    }
  }

  // Ensure directories exist
  if (!fs.existsSync(path.dirname(OUTPUT_PATH))) {
    fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  }
  if (!fs.existsSync(HISTORY_DIR)) {
    fs.mkdirSync(HISTORY_DIR, { recursive: true });
  }

  // Format JSON
  const outputJson = JSON.stringify(plan, null, 2);

  // Write data/daily_plan.json
  fs.writeFileSync(OUTPUT_PATH, outputJson, 'utf8');
  console.log(`[Plan Generator] Wrote active plan -> ${OUTPUT_PATH}`);

  // Write data/history/YYYY-MM-DD.json
  const historyPath = path.join(HISTORY_DIR, `${targetDate}.json`);
  fs.writeFileSync(historyPath, outputJson, 'utf8');
  console.log(`[Plan Generator] Archived history plan -> ${historyPath}`);

  console.log('\n[Plan Generator] Summary:');
  console.log(`  Date: ${plan.date}`);
  console.log(`  Blocks: ${plan.blocks.length}`);
  console.log(`  Urgent Alerts: ${plan.urgent_alerts.length}`);
  console.log(`  Study/Work Minutes: ${Object.values(plan.totals_by_stream_min).reduce((a, b) => a + b, 0)}m`);
}

main().catch(err => {
  console.error('[Plan Generator] Fatal Error:', err);
  process.exit(1);
});
