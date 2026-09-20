const fs = require('fs');
const path = require('path');

// Ensure data/ directory exists
if (!fs.existsSync('data')) fs.mkdirSync('data', { recursive: true });

// Read cat_2026_syllabus_roadmap.html
const catHtml = fs.readFileSync('cat_2026_syllabus_roadmap.html', 'utf8');
const catLines = catHtml.split('\n');

const dayLineNumbers = {};
catLines.forEach((line, idx) => {
  const m = line.match(/id=\"(day-\d+)\"/);
  if (m) dayLineNumbers[m[1]] = idx + 1;
});

const dayRegex = /<div id=\"(day-\d+)\"[\s\S]*?(?=<div id=\"day-\d+\"|<\/div>\s*<\/div>\s*<\/details>)/g;
let match;
const catSchedule = {};

while ((match = dayRegex.exec(catHtml)) !== null) {
  const block = match[0];
  const dayIdMatch = block.match(/id=\"(day-\d+)\"/);
  if (!dayIdMatch) continue;
  const dayId = dayIdMatch[1];
  const dayIndex = parseInt(dayId.replace('day-', ''), 10);

  const dateMatch = block.match(/<span class=\"text-xs font-semibold text-stone-600\">\s*([\s\S]*?)\s*<\/span>/);
  const rawDateStr = dateMatch ? dateMatch[1].trim() : null;

  const titleMatch = block.match(/<span class=\"px-2\.5 py-0\.5 rounded-full text-\[11px\] font-bold bg-amber-100\/90 text-amber-900 border border-amber-300\/80 shadow-2xs\">\s*([\s\S]*?)\s*<\/span>/);
  const title = titleMatch ? titleMatch[1].replace(/\s+/g, ' ').trim() : null;

  const missionMatch = block.match(/<strong class=\"text-stone-900\">Today's Mission:<\/strong>\s*([\s\S]*?)\s*<\/div>/);
  const mission = missionMatch ? missionMatch[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() : null;

  const varcMatch = block.match(/VARC Task[\s\S]*?<p class=\"text-xs text-stone-700 leading-relaxed\">\s*([\s\S]*?)\s*<\/p>/);
  const varc = varcMatch ? varcMatch[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() : null;

  const dilrMatch = block.match(/DILR Task[\s\S]*?<p class=\"text-xs text-stone-700 leading-relaxed\">\s*([\s\S]*?)\s*<\/p>/);
  const dilr = dilrMatch ? dilrMatch[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() : null;

  const quantMatch = block.match(/(?:QA|Quant) Task[\s\S]*?<p class=\"text-xs text-stone-700 leading-relaxed\">\s*([\s\S]*?)\s*<\/p>/);
  const quant = quantMatch ? quantMatch[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() : null;

  let isoDate = null;
  if (rawDateStr) {
    const d = new Date(rawDateStr);
    if (!isNaN(d.getTime())) {
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const dt = String(d.getDate()).padStart(2, '0');
      isoDate = y + '-' + m + '-' + dt;
    }
  }

  if (isoDate) {
    catSchedule[isoDate] = {
      day_index: dayIndex,
      day_id: dayId,
      date_formatted: rawDateStr,
      title: title,
      mission: mission,
      tasks: {
        varc: varc,
        dilr: dilr,
        quant: quant
      },
      source: 'cat_2026_syllabus_roadmap.html:' + (dayLineNumbers[dayId] || 2115)
    };
  }
}

const contextData = {
  timezone: 'Asia/Kolkata',
  timezone_source: 'deadlines_calendar.html:495',
  daily_hour_budget: 6.0,
  daily_hour_budget_minutes: 360,
  daily_hour_budget_source: 'deadlines_calendar.html:1821',
  wake_sleep_meal_windows: {
    wake: '06:30',
    sleep: '22:30',
    breakfast_window: { start: '09:00', end: '10:00' },
    lunch_window: { start: '12:00', end: '14:30' },
    tea_transition_window: { start: '15:30', end: '16:30' },
    evening_unwind_window: { start: '18:00', end: '22:30' },
    source: 'deadlines_calendar.html:1838-1909'
  },
  routine_blocks: [
    {
      id: 'block-dsa',
      start: '07:30',
      end: '08:15',
      duration_min: 45,
      stream: 'dsa',
      title: 'DSA / Algorithmic Freshness',
      details: 'Solve 2 LeetCode problems (1 Medium + 1 Easy/Review) from DSA Master Tracker.',
      priority: 1,
      notify_before_min: 10,
      source: 'deadlines_calendar.html:1838'
    },
    {
      id: 'block-job',
      start: '08:15',
      end: '09:00',
      duration_min: 45,
      stream: 'job',
      title: 'Job Search & Recruiter Outreach',
      details: 'Mon & Wed: Dedicated application batches (8–10 submissions). Tue/Thu/Fri: Recruiter triage & screening replies.',
      priority: 2,
      notify_before_min: 10,
      source: 'deadlines_calendar.html:1851'
    },
    {
      id: 'block-cat-qa-dilr',
      start: '10:00',
      end: '12:00',
      duration_min: 120,
      stream: 'cat',
      title: 'CAT QA & DILR Deep Work',
      details: 'Core QA concept drills (Arithmetic/Algebra: 15–20 high-yield questions) + 2 timed DILR sets (40 min).',
      priority: 1,
      notify_before_min: 10,
      source: 'deadlines_calendar.html:1864'
    },
    {
      id: 'block-germany-admin',
      start: '14:30',
      end: '15:30',
      duration_min: 60,
      stream: 'germany',
      title: 'Germany Academic Admin & Prerequisite Audit',
      details: 'APS & dMAT status check, MDU MOI letter request, credit share calculation, project abstract. (Replaced with CAT revision after 15 Nov freeze).',
      priority: 2,
      notify_before_min: 10,
      source: 'deadlines_calendar.html:1877'
    },
    {
      id: 'block-cat-varc',
      start: '16:30',
      end: '18:00',
      duration_min: 90,
      stream: 'cat',
      title: 'CAT VARC Mastery & Error Journaling',
      details: '3 Reading Comprehension passages (Philosophy, Economics, Tech) + 8 Verbal Ability questions + error journaling.',
      priority: 1,
      notify_before_min: 10,
      source: 'deadlines_calendar.html:1890'
    }
  ],
  deadlines: [
    {
      id: 'cat_registration_close',
      title: 'CAT 2026 Registration Close',
      datetime_ist: '2026-09-22T17:00:00+05:30',
      source_url: 'https://iimcat.ac.in',
      verified: true,
      urgent: true,
      action: 'Submit CAT 2026 registration, 6 city preferences, and fee payment (₹2,700 Gen) before 5:00 PM cutoff.',
      source: 'deadlines_calendar.html:482'
    },
    {
      id: 'dmat_status_check',
      title: 'dMAT Status Check (aps-india.de/dmat & g.a.s.t.)',
      datetime_ist: '2026-09-22T23:59:59+05:30',
      source_url: 'https://aps-india.de/dmat',
      verified: false,
      urgent: true,
      action: 'Check if dMAT registration is closed, exempt, or scheduled for next sitting; if closed, lock Winter 2027/28 branch.',
      source: 'deadlines_calendar.html:961'
    },
    {
      id: 'anabin_h_plus_check',
      title: 'Anabin H+ Check for MDU Rohtak',
      datetime_ist: '2026-09-22T23:59:59+05:30',
      source_url: 'https://anabin.kmk.org',
      verified: true,
      urgent: true,
      action: 'Verify MDU H+ institutional status and B.Tech CSE degree recognition on anabin.kmk.org; save PDF confirmation.',
      source: 'deadlines_calendar.html:943'
    },
    {
      id: 'passau_interactive_guide',
      title: 'Run Passau Interactive Guide',
      datetime_ist: '2026-09-22T23:59:59+05:30',
      source_url: 'https://www.uni-passau.de/en/apply',
      verified: true,
      urgent: true,
      action: 'Run Passau interactive application guide for M.Sc. CS/AI to confirm application route (direct portal vs uni-assist; no VPD).',
      source: 'deadlines_calendar.html:979'
    },
    {
      id: 'mdu_moi_ranking_email',
      title: 'Email MDU for MOI Letter & Cohort Ranking Doc',
      datetime_ist: '2026-09-22T23:59:59+05:30',
      source_url: null,
      verified: true,
      urgent: true,
      action: 'Send email to MDU Rohtak Registrar requesting 100% English Medium-of-Instruction letter and official cohort ranking certificate.',
      source: 'deadlines_calendar.html:997'
    },
    {
      id: 'aps_courier_dispatch',
      title: 'APS India Courier Document Dispatch',
      datetime_ist: '2026-10-02T23:59:59+05:30',
      source_url: 'https://aps-india.de/dmat',
      verified: false,
      urgent: false,
      action: 'Courier physical document packet (Semesters 1–8 marksheets, degree certificate, DigiLocker consent) to APS New Delhi.',
      source: 'deadlines_calendar.html:539'
    },
    {
      id: 'ielts_academic_booking_trigger',
      title: 'IELTS Academic Booking Trigger (Backup Deadline)',
      datetime_ist: '2026-10-15T23:59:59+05:30',
      source_url: 'https://www.uni-passau.de/en/apply',
      verified: true,
      urgent: false,
      action: 'If MDU 100% English MOI letter is not issued by 15 Oct, immediately book IELTS Academic slot for early November (target >= 6.5 / B2).',
      source: 'deadlines_calendar.html:592'
    },
    {
      id: 'cat_admit_card_release',
      title: 'CAT 2026 Admit Card Release',
      datetime_ist: '2026-11-05T23:59:59+05:30',
      source_url: 'https://iimcat.ac.in',
      verified: false,
      urgent: false,
      action: 'Download CAT admit card from iimcat.ac.in, note allocated slot (Slot 1, 2, or 3), and align mock tests with slot timing.',
      source: 'deadlines_calendar.html:671'
    },
    {
      id: 'passau_summer_freeze',
      title: 'Passau Application Freeze & Submission Window',
      datetime_ist: '2026-11-15T23:59:59+05:30',
      source_url: 'https://www.uni-passau.de/en/apply',
      verified: true,
      urgent: false,
      action: 'Submit completed Passau M.Sc. CS application before 15 Nov freeze to preserve 100% mental stamina for CAT exam.',
      source: 'deadlines_calendar.html:751'
    },
    {
      id: 'cat_exam_day',
      title: 'CAT 2026 Examination Day',
      datetime_ist: '2026-11-29T08:30:00+05:30',
      source_url: 'https://iimcat.ac.in',
      verified: true,
      urgent: false,
      action: 'National CAT exam: 68 questions in 120 minutes (VARC 24, DILR 22, QA 22). Report 1 hr before allocated slot.',
      source: 'deadlines_calendar.html:711'
    },
    {
      id: 'passau_buffer_close',
      title: 'Passau Summer 2027 Buffer Close',
      datetime_ist: '2026-12-15T23:59:59+05:30',
      source_url: 'https://www.uni-passau.de/en/apply',
      verified: true,
      urgent: false,
      action: 'Final administrative buffer for tracking receipt and portal confirmation (Passau portal window 1 Nov - 15 Dec).',
      source: 'deadlines_calendar.html:751'
    },
    {
      id: 'cat_results_scorecard',
      title: 'CAT 2026 Official Scorecard & Results',
      datetime_ist: '2027-01-07T23:59:59+05:30',
      source_url: 'https://iimcat.ac.in',
      verified: false,
      urgent: false,
      action: 'Download official CAT scorecard from iimcat.ac.in for DoMS IIT Delhi, IIT Madras, FMS, and CAP IIMs shortlists.',
      source: 'deadlines_calendar.html:798'
    }
  ],
  germany: {
    branch: 'unknown',
    dmat_status: 'unknown',
    target_university: 'University of Passau',
    programs: ['M.Sc. Computer Science', 'M.Sc. AI Engineering'],
    tuition: '€0 / semester (tuition-free public university)',
    english_proficiency_requirement: 'CEFR B2 (fulfilled by 100% English MOI from MDU or IELTS 5.5+)',
    academic_threshold: 'Bavarian grade 2.7 or better OR top 70% of graduating cohort',
    candidate_academic_standing: 'B.Tech CSE 70.56% (Bavarian formula equivalent ~2.4 / Gut)',
    passau_vpd_policy: 'Passau does not use uni-assist VPD; application is direct portal or guided by interactive tool',
    tasks: [
      {
        id: 'anabin_h_plus_check',
        title: 'Anabin H+ Check for MDU',
        status: 'pending',
        cost: '€0',
        source: 'deadlines_calendar.html:943'
      },
      {
        id: 'dmat_status_check',
        title: 'dMAT Status Check (aps-india.de/dmat & g.a.s.t.)',
        status: 'pending',
        cost: '€0',
        source: 'deadlines_calendar.html:961'
      },
      {
        id: 'passau_interactive_guide',
        title: 'Run Passau Interactive Guide',
        status: 'pending',
        cost: '€0',
        source: 'deadlines_calendar.html:979'
      },
      {
        id: 'mdu_moi_ranking_email',
        title: 'Email MDU for 100% English MOI letter & cohort ranking document',
        status: 'pending',
        cost: '€0',
        source: 'deadlines_calendar.html:997'
      },
      {
        id: 'compute_cs_credit_share',
        title: 'Compute CS Credit Share (~2/3 Rule)',
        status: 'pending',
        cost: '€0',
        source: 'deadlines_calendar.html:1017'
      }
    ],
    decision_branch: {
      if_dmat_unavailable: 'Lock Branch A: Move Germany track to Winter 2027/28 (Passau window 15 Apr - 31 May; eliminates 15 Dec clash; 100% focus on CAT 2026)',
      if_dmat_available_or_exempt: 'Lock Branch B: Proceed with Passau Summer 2027 application (submit during 09-15 Nov freeze week, buffer 01-15 Dec)',
      source: 'deadlines_calendar.html:636-641'
    },
    source: 'deadlines_calendar.html:602-647'
  },
  job_search: {
    weekly_applications_target: '15–20 Applications / Week',
    cadence: {
      monday_wednesday_batch: '08:15 – 09:00 AM: 8–10 tailored submissions (15–20/wk total)',
      tue_thu_fri_triage: '08:15 – 09:00 AM: Recruiter triage (replies, availability, interview scheduling)'
    },
    target_roles: ['Full-Stack Software Engineer', 'Software Developer – Integration'],
    primary_platforms: ['Instahyre', 'LinkedIn Jobs', 'Wellfound', 'Naukri', 'Cutshort'],
    candidate_advantage: 'Immediate Joiner (0 Days Notice)',
    weekly_screen_target: 2,
    source: 'deadlines_calendar.html:1858'
  },
  dsa: {
    daily_problem_target: 2,
    daily_breakdown: '1 Medium + 1 Easy/Review',
    daily_minutes: 45,
    time_slot: '07:30 – 08:15 AM',
    total_problems_in_tracker: 247,
    easy_count: 60,
    medium_count: 158,
    hard_count: 29,
    pattern_categories: 25,
    source: 'deadlines_calendar.html:1845',
    tracker_source: 'dsa_master_tracker.html:350'
  },
  cat_schedule: catSchedule
};

fs.writeFileSync('data/context.json', JSON.stringify(contextData, null, 2), 'utf8');
console.log('Successfully generated data/context.json. Days in schedule:', Object.keys(catSchedule).length);
