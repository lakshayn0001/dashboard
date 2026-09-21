/**
 * assets/js/shell.js
 * Universal Application Shell for Lakshay Nagpal's Cockpit Dashboard.
 * 
 * Renders into <div id="app-shell">:
 * - 1 Unified Responsive Sidebar (Desktop fixed + Mobile slide-over drawer)
 * - 1 Unified Top Navigation Bar
 * - Canonical navigation: Today, Calendar, CAT, Germany, Career, Learn
 * - Active-page dynamic sub-navigation ("On this page")
 * - Dynamic profile badges (loaded from data/profile.json if present; hidden otherwise)
 * - Footer with LinkedIn, GitHub, Portfolio
 */

(function () {
  'use strict';

  // Canonical Navigation Structure
  const NAV_ITEMS = [
    { label: 'Today', href: 'index.html', key: 'today', icon: '⚡' },
    { label: 'Calendar', href: 'deadlines_calendar.html', key: 'calendar', icon: '🗓️' },
    { label: 'CAT', href: 'cat_2026_syllabus_roadmap.html', key: 'cat', icon: '🐯' },
    { label: 'Germany', href: 'german_universities_evaluation.html', key: 'germany', icon: '🇩🇪' },
    { label: 'German Learner', href: 'german_learner.html', key: 'german_learner', icon: '🗣️' },
    { label: 'Career', href: 'profile.html', key: 'career', icon: '👤' },
    {
      label: 'Learn',
      href: 'learning_hub.html',
      key: 'learn',
      icon: '🧠',
      matchPaths: ['learning_hub.html', 'typescript_curriculum.html', 'dsa_master_tracker.html']
    }
  ];

  // Per-Page "On this page" Anchor Definitions
  const SUB_NAV_CONFIG = {
    'index.html': [
      { label: "Today's Agenda", href: '#section-daily-plan', icon: '📅' },
      { label: 'All Things To Do', href: '#section-master-todos', icon: '✅' },
      { label: 'Strategic Portals', href: '#section-portals', icon: '🚀' }
    ],
    'deadlines_calendar.html': [
      { label: 'Countdown & Status', href: '#quick-stats', icon: '⚡' },
      { label: 'Official Deadlines', href: '#official-deadlines', icon: '🏛️' },
      { label: 'Prerequisite Tasks', href: '#prerequisite-tasks', icon: '📋' },
      { label: 'Clash & Decision Branch', href: '#clash-analysis', icon: '⚔️' },
      { label: '14-Week Action Blueprint', href: '#week-by-week', icon: '🗓️' },
      { label: 'Daily Allocation Matrix', href: '#daily-allocation', icon: '⏰' }
    ],
    'cat_2026_syllabus_roadmap.html': [
      { label: 'Official Syllabus Truth', href: '#official', icon: '📜' },
      { label: 'Target Institutes Audit', href: '#shortlisting', icon: '🎯' },
      { label: 'CAT Test Architecture', href: '#structure', icon: '🏗️' },
      { label: 'Daily Workload Loop', href: '#loop', icon: '🔄' },
      { label: 'What to Actively Ignore', href: '#ignore', icon: '🚫' },
      { label: 'Sectional Checklists', href: '#checklists', icon: '📝' },
      { label: 'Practice Portals', href: '#links', icon: '🔗' },
      { label: '72-Day Master Timetable', href: '#timetable', icon: '📅' }
    ],
    'german_universities_evaluation.html': [
      { label: 'Executive Summary Verdict', href: '#executive-summary', icon: '⚖️' },
      { label: 'Profile & Bavarian Grade Audit', href: '#profile', icon: '🎓' },
      { label: 'MSc vs MBA Comparison', href: '#degrees', icon: '📊' },
      { label: 'Target University Shortlist', href: '#universities', icon: '🏛️' },
      { label: 'Tuition & Living Costs', href: '#costs', icon: '💶' },
      { label: 'Career Transition & Salaries', href: '#transition', icon: '💼' },
      { label: 'Strategic Q&A Overview', href: '#qa', icon: '❓' }
    ],
    'german_learner.html': [
      { label: 'Alphabet & Sounds', href: '#alphabet', icon: '🔤' },
      { label: 'Greetings & Basics', href: '#basics', icon: '👋' },
      { label: 'Pronouns & Questions', href: '#pronouns', icon: '❓' },
      { label: 'Calendar & Time', href: '#calendar-time', icon: '📅' },
      { label: 'Noun Gender Gym', href: '#nouns', icon: '🏷️' },
      { label: 'Verbs & Conjugation', href: '#verbs', icon: '⚡' },
      { label: 'Adjectives & Opposites', href: '#adjectives', icon: '🎨' },
      { label: 'Conjunctions & Syntax', href: '#conjunctions', icon: '🧩' },
      { label: 'Dialogue Bank (49)', href: '#dialogues', icon: '💬' },
      { label: '8-Week Roadmap', href: '#roadmap', icon: '🗓️' }
    ],
    'profile.html': [
      { label: 'Candidate Identity & Bio', href: '#profile-header', icon: '👤' },
      { label: 'Technical Stack & Internals', href: '#tech-stack', icon: '💻' },
      { label: 'Professional Work Experience', href: '#experience', icon: '💼' },
      { label: 'Verified Qualifications', href: '#qualifications', icon: '📜' },
      { label: 'Application Field Shortcuts', href: '#quick-copy', icon: '⚡' },
      { label: 'Cold Email Generator', href: '#cold-email', icon: '✉️' },
      { label: 'Global Job Portals (99 Sites)', href: '#job-portals', icon: '🌐' }
    ],
    'learning_hub.html': [
      { label: 'Track 0: DSA Problem Bank (247 Qs)', href: '#dsa-track', icon: '⚡' },
      { label: 'Track 1: Production TypeScript', href: '#typescript-track', icon: '📘' },
      { label: 'Track 2: System Design', href: '#system-design-track', icon: '🏗️' },
      { label: 'Track 3: Cloud & DevOps', href: '#cloud-devops-track', icon: '☁️' },
      { label: 'Track 4: Applied AI Systems', href: '#applied-ai-track', icon: '🤖' },
      { label: 'Track 5: Database Engineering', href: '#databases-track', icon: '🗄️' }
    ],
    'typescript_curriculum.html': [
      { label: 'Curriculum Hero & Studio', href: '#scratchpad', icon: '⚡' },
      { label: 'Levels 1–4: Core to Internals', href: '#section-0', icon: '📘' },
      { label: 'Levels 5–7: React, Node & API', href: '#section-4', icon: '⚛️' },
      { label: 'Levels 8–10: Production & Interview', href: '#section-7', icon: '🎯' },
      { label: 'Appendices A–G: Practice & Katas', href: '#section-10', icon: '📋' }
    ],
    'dsa_master_tracker.html': [
      { label: 'Master Stats & Coverage', href: '#stats', icon: '📊' },
      { label: '6-Phase Order Roadmap', href: '#roadmap', icon: '🗺️' },
      { label: 'Company Weight Matrix', href: '#company-matrix', icon: '🏢' },
      { label: 'Pattern Cheat Sheet', href: '#cheat-sheet', icon: '⚡' },
      { label: 'Curated Problem Library', href: '#problems', icon: '📚' }
    ]
  };

  function getCurrentPageName() {
    let path = window.location.pathname || '';
    if (!path || path.endsWith('/')) return 'index.html';
    const segs = path.split('/');
    const last = segs[segs.length - 1];
    return last || 'index.html';
  }

  function isItemActive(item, currentPage) {
    if (item.href === currentPage) return true;
    if (item.matchPaths && item.matchPaths.includes(currentPage)) return true;
    return false;
  }

  function renderShell() {
    const mountEl = document.getElementById('app-shell');
    if (!mountEl) return;

    const currentPage = getCurrentPageName();
    let currentNavLabel = 'Cockpit';
    for (const item of NAV_ITEMS) {
      if (isItemActive(item, currentPage)) {
        currentNavLabel = item.label;
        break;
      }
    }

    // Build Navigation HTML
    let navHtml = '';
    NAV_ITEMS.forEach(item => {
      const active = isItemActive(item, currentPage);
      navHtml += `
        <a href="${item.href}" class="shell-nav-item ${active ? 'active is-active' : ''}" data-nav-key="${item.key}">
          <span class="shell-nav-icon">${item.icon}</span>
          <span class="shell-nav-text">${item.label}</span>
        </a>
      `;

      // Sub-items appear ONLY under the active page
      if (active) {
        const subItems = SUB_NAV_CONFIG[currentPage] || [];
        if (subItems.length > 0) {
          navHtml += `<div class="shell-subnav shell-sub-nav">`;
          subItems.forEach(sub => {
            navHtml += `
              <a href="${sub.href}" class="shell-subnav-item" onclick="handleSubNavClick(event, '${sub.href}')">
                <span>${sub.icon}</span>
                <span>${sub.label}</span>
              </a>
            `;
          });
          navHtml += `</div>`;
        }
      }
    });

    // Shell Markup
    mountEl.innerHTML = `
      <!-- Backdrop for mobile drawer -->
      <div id="shell-backdrop" class="hidden" onclick="toggleShellDrawer(false)"></div>

      <!-- Desktop & Mobile Sidebar Drawer -->
      <aside id="shell-sidebar">
        <div>
          <!-- Brand Header: No hardcoded VERIFIED chip or stat badges -->
          <div class="shell-brand">
            <a href="profile.html" class="shell-profile-row" title="View Full Candidate Profile & Bio">
              <img src="assets/lakshay_photo.jpg" alt="Lakshay Nagpal" class="shell-avatar" onerror="this.style.display='none'; document.getElementById('shell-avatar-fallback').style.display='flex';" />
              <div id="shell-avatar-fallback" class="shell-avatar-fallback" style="display:none;">LN</div>
              <div class="shell-brand-info">
                <div class="shell-candidate-name">Lakshay Nagpal</div>
                <div class="shell-candidate-role">Full-Stack Engineer</div>
              </div>
            </a>
            <!-- Dynamic Badges: populated ONLY if data/profile.json is present -->
            <div id="shell-badges"></div>
          </div>

          <!-- Navigation Scroll Container -->
          <div class="shell-nav-scroll">
            <div class="shell-section-label">Navigation</div>
            ${navHtml}
          </div>
        </div>

        <!-- Sidebar Footer: LinkedIn, GitHub, Portfolio -->
        <div class="shell-footer">
          <a href="https://www.linkedin.com/in/lakshay-nagpal/" target="_blank" rel="noreferrer" class="shell-footer-link" title="LinkedIn Profile">
            LinkedIn
          </a>
          <a href="https://github.com/lakshayn0001" target="_blank" rel="noreferrer" class="shell-footer-link" title="GitHub Profile">
            GitHub
          </a>
          <a href="https://lakshayn0001.github.io/Portfolio/" target="_blank" rel="noreferrer" class="shell-footer-link" title="Developer Portfolio">
            Portfolio
          </a>
        </div>
      </aside>

      <!-- Sticky Top Navigation Bar -->
      <header id="shell-topbar">
        <div class="shell-topbar-left">
          <button id="shell-menu-btn" class="shell-menu-toggle" onclick="toggleShellDrawer(true)" aria-label="Open Navigation Menu">
            <svg style="width: 18px; height: 18px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          <div class="shell-page-crumb">
            <a href="index.html" class="text-stone-700 hover:text-stone-950 font-bold transition-colors">Cockpit</a>
            <span class="shell-page-crumb-sep">/</span>
            <span class="shell-page-crumb-name">${currentNavLabel}</span>
          </div>
        </div>

        <div class="shell-topbar-right">
          <a href="assets/Lakshay_Nagpal_Resume_Original.pdf" download="Lakshay_Nagpal_Resume_Original.pdf" class="shell-topbar-btn" title="Download Full-Stack Resume PDF">
            <span>📥</span>
            <span>Resume</span>
          </a>
          <a href="assets/Lakshay_Nagpal_Resume_German.pdf" download="Lakshay_Nagpal_Resume_German.pdf" class="shell-topbar-btn hidden sm:inline-flex" title="Download German CV PDF">
            <span>🇩🇪</span>
            <span>German CV</span>
          </a>
          <a href="https://lakshayn0001.github.io/Portfolio/" target="_blank" rel="noreferrer" class="shell-topbar-btn" title="Open Portfolio">
            <span>🌐</span>
            <span class="hidden md:inline">Portfolio ↗</span>
          </a>
        </div>
      </header>
    `;

    // Attempt to load profile badges dynamically from data/profile.json
    loadProfileBadges();

    // Setup drawer listeners
    setupDrawerListeners();
  }

  async function loadProfileBadges() {
    const badgeEl = document.getElementById('shell-badges');
    if (!badgeEl) return;
    try {
      const res = await fetch('data/profile.json');
      if (res.ok) {
        const data = await res.json();
        if (data && data.badges && Array.isArray(data.badges) && data.badges.length > 0) {
          badgeEl.innerHTML = data.badges
            .map(b => `<span class="shell-badge-pill">${b}</span>`)
            .join('');
          badgeEl.style.display = 'flex';
          return;
        }
      }
    } catch (e) {
      // Profile data absent; badges remain hidden
    }
    badgeEl.style.display = 'none';
  }

  function toggleShellDrawer(open) {
    const sidebar = document.getElementById('shell-sidebar');
    const backdrop = document.getElementById('shell-backdrop');
    if (!sidebar || !backdrop) return;

    if (open) {
      sidebar.classList.add('is-open');
      backdrop.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    } else {
      sidebar.classList.remove('is-open');
      backdrop.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }

  function handleSubNavClick(e, href) {
    // If mobile, close drawer after click
    if (window.innerWidth < 1024) {
      toggleShellDrawer(false);
    }
  }

  function setupDrawerListeners() {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        toggleShellDrawer(false);
      }
    });

    // Expose global drawer toggle for backward compatibility if any button calls toggleSidebar
    window.toggleShellDrawer = toggleShellDrawer;
    window.toggleSidebar = (open) => toggleShellDrawer(open);
  }

  // Auto-init on DOMContentLoaded or immediate if document ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderShell);
  } else {
    renderShell();
  }

})();
