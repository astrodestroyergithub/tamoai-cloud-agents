// TamoAI Unified Always-On Cloud Agent Platform (Fuse, Pots, Gawk Bot)
(function() {
  'use strict';

  // SVG Data URIs for dynamic favicon switching across all resolutions & devices
  const FAVICON_SVGS = {
    hub: `data:image/svg+xml;utf8,` + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="tg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#6366f1"/><stop offset="50%" stop-color="#8b5cf6"/><stop offset="100%" stop-color="#ec4899"/></linearGradient></defs><rect width="64" height="64" rx="16" fill="#0f172a"/><rect x="3" y="3" width="58" height="58" rx="14" fill="none" stroke="url(#tg)" stroke-width="3"/><path d="M18 20h28v6H35v20h-6V26H18z" fill="url(#tg)"/><circle cx="46" cy="42" r="5" fill="#38bdf8"/></svg>`),
    fuse: `data:image/svg+xml;utf8,` + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="fg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0064e0"/><stop offset="50%" stop-color="#a855f7"/><stop offset="100%" stop-color="#ec4899"/></linearGradient></defs><rect width="64" height="64" rx="18" fill="url(#fg)"/><path d="M22 18h22v6H28v8h13v6H28v10h-6V18z" fill="#ffffff"/><circle cx="45" cy="43" r="5" fill="#fde047"/></svg>`),
    pots: `data:image/svg+xml;utf8,` + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="#10a37f"/><circle cx="22" cy="22" r="7" fill="#ffffff"/><circle cx="42" cy="22" r="7" fill="#a7f3d0"/><circle cx="22" cy="42" r="7" fill="#a7f3d0"/><circle cx="42" cy="42" r="7" fill="#ffffff"/><path d="M29 22h6M22 29v6M42 29v6M29 42h6" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/></svg>`),
    gawk: `data:image/svg+xml;utf8,` + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#09090b"/><rect x="2" y="2" width="60" height="60" rx="12" fill="none" stroke="#22c55e" stroke-width="2.5"/><path d="M18 46L46 18M24 18h22v22" fill="none" stroke="#ffffff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="20" cy="22" r="4" fill="#22c55e"/></svg>`)
  };

  const PAGE_TITLES = {
    hub: 'TamoAI Cloud OS — Parent Platform for Fuse, Pots & Gawk Bot',
    fuse: 'Fuse (by TamoAI) — Personal AI Agent on Fuse Secure VM',
    pots: 'Pots (by TamoAI) — Always-On Work Agents on Tamo-6 Astra',
    gawk: 'Gawk Bot (by TamoAI) — AI Teammates on Shared Cloud Computer'
  };

  // Global Application State
  const state = {
    activePlatform: 'hub', // 'hub' | 'fuse' | 'pots' | 'gawk'
    mobileMenuOpen: false,

    // FUSE (Meta Muse clone) state
    fuse: {
      agentName: 'Nova',
      commStyle: 'Warm & Proactive',
      avatarTheme: 'Aurora Orb',
      agentEmail: 'nova.fuse@agent.tamo.ai',
      planTier: 'Pro ($20/mo)',
      subTab: 'chat', // 'chat' | 'avatar' | 'sentinel' | 'commerce' | 'charm'
      vmView: 'browser', // 'browser' | 'terminal' | 'files'
      browserPage: 'expedia', // 'expedia' | 'shopify' | 'dental' | 'toolbuilder'
      humanTakeover: false,
      avatarCallActive: true,
      avatarMuted: false,
      charmActive: true,
      glassesWakeWord: true,
      macDesktopBridge: true,
      amazonGuardrailNotice: true,
      humanFallbackLayer: false,
      goals: [
        { id: 'g1', title: 'Monitor SFO → JFK nonstop under $340 & hold seat 14A', progress: 85, status: 'Awaiting $318 checkout approval', tool: 'expedia_fare_lock.py' },
        { id: 'g2', title: 'Reorder 2 bags of Ethiopian Yirgacheffe on Shopify store', progress: 100, status: 'Completed via Stripe Pass', tool: 'shopify_cart_agent' },
        { id: 'g3', title: 'Extract receipt from forwarded email & file Delta Dental claim', progress: 60, status: 'Filling PDF form in VM Browser', tool: 'claim_autofill.py' }
      ],
      sentinel: [
        { id: 's1', app: 'Gmail & Agent Inbox', category: 'Communication', level: 'Read & Write', icon: 'mail' },
        { id: 's2', app: 'WhatsApp & Messenger', category: 'Messaging', level: 'Ask First', icon: 'message-circle' },
        { id: 's3', app: 'Shopify Storefronts', category: 'Commerce Partner', level: 'Read & Write', icon: 'shopping-bag' },
        { id: 's4', app: 'Expedia & Flights', category: 'Travel Partner', level: 'Ask First', icon: 'plane' },
        { id: 's5', app: 'Stripe Checkout Vault', category: 'Payments', level: 'Ask First', icon: 'credit-card' },
        { id: 's6', app: 'Best Buy & Walmart', category: 'Retail Partner', level: 'Read Only', icon: 'package' },
        { id: 's7', app: 'Notion & GitHub', category: 'Productivity', level: 'Read & Write', icon: 'code' },
        { id: 's8', app: 'Amazon Retail', category: 'External Site', level: 'Blocked', icon: 'shield-alert' }
      ],
      messages: [
        { sender: 'agent', time: '09:41 AM', text: 'Good morning! While your laptop was asleep, my Fuse Secure VM tracked the SFO → JFK fare drop to $318 on Expedia and pre-filled passenger details.' },
        { sender: 'user', time: '09:43 AM', text: 'Awesome! Also I forwarded my dental cleaning invoice to nova.fuse@agent.tamo.ai. Can you file that claim and build a price tracker for my camera lens?' },
        { sender: 'agent', time: '09:44 AM', text: 'Got the forwarded PDF from nova.fuse@agent.tamo.ai! I built a custom Python scraper tool (`lens_price_watcher.py`) inside `/home/fuse/tools/` and opened the Delta Dental portal in our shared browser. Click "Take Control" anytime if you want to edit the form directly.' }
      ],
      terminalLogs: [
        '[09:40:12] fuse-secure-vm systemd[1]: Started Fuse Spark Daemon (8GB RAM isolated Linux VM).',
        '[09:41:04] sentinel-guard: Checked permission for expedia.com -> [ASK_BEFORE_CHECKOUT].',
        '[09:42:19] inbox-listener: Received forwarded message on nova.fuse@agent.tamo.ai (Attachment: dental_receipt_oct.pdf).',
        '[09:43:51] tool-synthesizer: Generated custom tool /home/fuse/tools/lens_price_watcher.py (0 syntax errors).',
        '[09:44:10] chromium-shared: Navigating to deltadentalins.com/claims/new (Session shared with owner).'
      ]
    },

    // POTS (OpenAI Dots clone) state
    pots: {
      activePotId: 'pot-primary',
      activeChannel: 'tamochat', // 'tamochat' | 'slack' | 'teams'
      rightPaneTab: 'activity', // 'activity' | 'computer' | 'governance'
      computerSubTab: 'browser', // 'browser' | 'terminal' | 'plugins'
      localComputerAccess: false,
      localAccessMinutesLeft: 30,
      autoReviewStrict: true,
      readOnlyResearch: true,
      agent365Sync: true,
      roster: [
        { id: 'pot-primary', name: 'Primary Work Pot', role: 'Executive & Cross-Stack Orchestrator', model: 'Tamo-6 Astra', status: 'Running Research', cpu: '28%', ram: '4.2 / 16 GB', badge: 'Pro Included' },
        { id: 'pot-sales', name: 'Sales Engineering Pot', role: 'Proposals, RFPs & Eval Sandboxes', model: 'Tamo-6 Astra', status: 'Waiting on 1 Approval', cpu: '41%', ram: '6.8 / 16 GB', badge: 'Agent 365 Specialist' },
        { id: 'pot-eng', name: 'Bug Triage & PR Pot', role: 'GitHub PRs, Linear & CI Diagnostics', model: 'Tamo-6 Astra', status: 'Compiling Test Suite', cpu: '64%', ram: '9.1 / 16 GB', badge: 'Agent 365 Specialist' },
        { id: 'pot-procure', name: 'Procurement & Legal Pot', role: 'Contract Redlines & Vendor SOC2', model: 'Tamo-6 Astra', status: 'Read-Only Audit', cpu: '19%', ram: '3.4 / 16 GB', badge: 'Agent 365 Specialist' }
      ],
      approvals: [
        { id: 'ap1', pot: 'Sales Engineering Pot', action: 'Update Acme Corp Q4 Enterprise Proposal in Google Slides & post diff to Slack #enterprise-deals', risk: 'Medium — Modifies shared client deck', channel: 'Slack & TamoChat', status: 'pending' },
        { id: 'ap2', pot: 'Bug Triage & PR Pot', action: 'Open Pull Request #418 on github.com/tamoai/cloud-runtime fixing race condition in WebSocket pool', risk: 'Low — Passes 142 unit tests in Cloud VM', channel: 'GitHub + Teams', status: 'pending' },
        { id: 'ap3', pot: 'Procurement & Legal Pot', action: 'Send DPA Clause 7.2 counter-proposal to legal@vendor-cloud.io via Outlook 365 connector', risk: 'High — External legal communication', channel: 'Microsoft Teams', status: 'pending' }
      ],
      questions: [
        { id: 'q1', pot: 'Sales Engineering Pot', question: 'Acme Corp asked for a 15% volume discount on annual seats over 250. Should I apply the Standard Tier-2 table or escalate to VP Finance?', options: ['Apply Standard Tier-2 (12%)', 'Approve 15% w/ 2-Year Lock', 'Escalate in Slack'] },
        { id: 'q2', pot: 'Bug Triage & PR Pot', question: 'Customer ticket #8821 reproduces only on Safari 18. Should I backport the polyfill to v2.4 branch as well?', options: ['Backport to v2.4', 'Target v2.5 Main Only'] }
      ],
      researchItems: [
        { title: 'Read-Only Synthesis: 18 Customer Interviews → Q4 Launch Messaging', summary: 'Extracted 6 recurring pain points across Gong transcripts, Notion docs, and Jira tickets without modifying source records.', time: '14m ago', apps: 'Gong • Notion • Jira' },
        { title: 'Continuous Competitor Pricing & SLA Drift Matrix', summary: 'Monitored 12 enterprise SaaS documentation portals and updated internal Snowflake staging view.', time: '42m ago', apps: 'Browser • Snowflake • Slack' },
        { title: 'PR #418 Regression Benchmark on Cloud Computer', summary: 'Ran headless Playwright + pytest suite across 4 worker nodes; p99 latency dropped from 184ms to 62ms.', time: '1h ago', apps: 'GitHub • Linux VM Terminal' }
      ],
      channelMessages: {
        tamochat: [
          { author: 'Primary Work Pot', time: '10:02 AM', text: 'I synchronized context from your Slack #product-launch-ops thread and Microsoft Teams Deal Desk channel. 3 background research tasks are complete in Read-Only mode, and 3 actions are gated in your Approval Queue.' },
          { author: 'You', time: '10:05 AM', text: 'Keep the Acme Corp proposal updated as the engineering scope changes, and let me inspect your Cloud Computer terminal.' },
          { author: 'Primary Work Pot', time: '10:06 AM', text: 'Understood. My Cloud Computer is live in the right panel — you can inspect the active browser session, terminal logs, or grant temporary Local Computer Access if you want me to read your local repo.' }
        ],
        slack: [
          { author: 'Sales Engineering Pot (APP)', time: '09:50 AM', text: '[#enterprise-deals] Hey team — I noticed Engineering updated the API rate limit spec in Linear (ENG-904). I have drafted the revised slide 14 for the Acme Corp proposal on my Cloud Computer. Awaiting 1-click approval in Activity View.' },
          { author: 'You (via Slack)', time: '09:54 AM', text: '@pot-sales Include the SOC2 Type II attestation badge on slide 15 too.' },
          { author: 'Sales Engineering Pot (APP)', time: '09:55 AM', text: 'Done! Pulled the latest SOC2 badge from Vanta plugin (Read-Only) and staged the preview.' }
        ],
        teams: [
          { author: 'Procurement & Legal Pot [Agent 365]', time: '09:30 AM', text: '[Enterprise Deal Desk] Completed read-only redline comparison of VendorCloud MSA v4. Flagged 2 indemnity deviations against our Microsoft Agent 365 policy standard.' },
          { author: 'You (via Teams)', time: '09:35 AM', text: 'Prepare the counter-redline and hold it in the approval queue until 2 PM.' }
        ]
      }
    },

    // GAWK BOT (xAI Grok Bot clone) state
    gawk: {
      activeBotId: 'bot-atlas',
      planName: 'SuperGawk Heavy ($300/mo)',
      weeklyTokensUsed: 14.8,
      weeklyTokensLimit: 20.0,
      vmSurface: 'screen', // 'screen' | 'terminal' | 'auth' | 'approvals'
      oktaPausedForHuman: true,
      webauthnForwarded: false,
      autoReviewClassifier: true,
      sharedVmWarningAck: true,
      bots: [
        { id: 'bot-atlas', name: 'atlas-dev', type: 'Personal Bot', role: 'Full-Stack Computer-Use Engineer', status: 'Active on Display :1', task: 'Refactoring Rust telemetry service & running E2E browser assertions', tokens: '6.4M tok' },
        { id: 'bot-hyperion', name: 'hyperion-growth', type: 'Personal Bot', role: 'CRM, LinkedIn & Outbound Operator', status: 'Paused: Human Sign-In (Okta 2FA)', task: 'Updating HubSpot pipeline & verifying enterprise lead list', tokens: '4.1M tok' },
        { id: 'bot-valkyrie', name: 'valkyrie-support', type: 'Personal Bot', role: 'Tier-2 Customer Support & Refund Triage', status: 'Gated by Auto-Review Classifier', task: 'Cross-checking Stripe webhook logs with Zendesk ticket #4910', tokens: '2.5M tok' },
        { id: 'bot-team-sre', name: 'team-sre-bot', type: 'Team Bot (Shared Memory)', role: '24/7 Incident & Runbook Teammate', status: 'Monitoring Grafana on Display :4', task: 'Executing scheduled chaos drill & syncing shared team memory', tokens: '1.8M tok' }
      ],
      secrets: [
        { key: 'STRIPE_RESTRICTED_KEY', service: 'Stripe API', status: 'Masked in Vault (••••94a1)' },
        { key: 'DATADOG_APP_TOKEN', service: 'Datadog Telemetry', status: 'Masked in Vault (••••7c0e)' },
        { key: 'GITHUB_PAT_FINEGRAINED', service: 'TamoCursor Git', status: 'OAuth Backend Managed' }
      ],
      approvals: [
        { id: 'gb1', bot: 'valkyrie-support', category: 'Purchases & Transfers', action: 'Issue $149.00 pro-rata SLA credit to customer acct_19x82 via Stripe Dashboard', classifierRisk: 'HIGH (0.91)', status: 'pending' },
        { id: 'gb2', bot: 'atlas-dev', category: 'Touching Production', action: 'Execute kubectl rollout restart deployment/edge-proxy in prod-us-east cluster', classifierRisk: 'CRITICAL (0.96)', status: 'pending' },
        { id: 'gb3', bot: 'hyperion-growth', category: 'Sending Messages / Invitations', action: 'Dispatch 18 personalized follow-up emails via authenticated Gmail browser session', classifierRisk: 'MEDIUM (0.74)', status: 'pending' }
      ],
      chatByBot: {
        'bot-atlas': [
          { from: 'bot', time: '23:58:10', text: 'Mounted shared workspace `/home/tamocursor/workspace`. Executed `cargo test --all` inside Linux VM (48 passed). Now driving Chromium on `:1` to verify the staging dashboard UI.' },
          { from: 'user', time: '23:59:02', text: 'Once the staging UI checks pass, stage the production rollout command but wait for my approval.' },
          { from: 'bot', time: '23:59:18', text: 'Staging checks passed (mouse click @ 642,318 verified latency chart). The production rollout command is queued in the LLM Auto-Review Classifier gate.' }
        ],
        'bot-hyperion': [
          { from: 'bot', time: '23:51:04', text: 'Opened HubSpot Enterprise portal in shared VM browser. Redirected to Okta SSO with hardware 2FA challenge.' },
          { from: 'bot', time: '23:51:09', text: 'HANDOFF REQUIRED: Step into the agent browser on Display :2 to complete Okta SSO or forward your WebAuthn security key. Session cookies will persist on this shared cloud machine.' }
        ],
        'bot-valkyrie': [
          { from: 'bot', time: '23:45:30', text: 'Inspected Zendesk #4910 and correlated with Stripe outage window. Prepared $149.00 credit in browser tab — paused by Auto-Review Classifier under [Purchases & Transfers].' }
        ],
        'bot-team-sre': [
          { from: 'bot', time: '23:40:12', text: '[SHARED TEAM MEMORY] Updated postmortem template from @maya private chat and pinned new Grafana alert threshold across all 14 team seats.' }
        ]
      }
    }
  };

  // Helper: Toast Notification (No native alert/confirm/prompt!)
  function showToast(title, detail, accentColor) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    const borderClass = accentColor === 'fuse' ? 'border-pink-500/60 bg-slate-900/95' :
                        accentColor === 'pots' ? 'border-emerald-500/60 bg-slate-900/95' :
                        accentColor === 'gawk' ? 'border-green-500/60 bg-zinc-950/95' :
                        'border-indigo-500/60 bg-slate-900/95';
    toast.className = `pointer-events-auto flex items-start gap-3 px-4 py-3 rounded-xl border ${borderClass} text-white shadow-2xl backdrop-blur-md transition-all duration-300 max-w-sm`;
    toast.innerHTML = `
      <div class="mt-0.5 w-2.5 h-2.5 rounded-full shrink-0 ${accentColor === 'fuse' ? 'bg-pink-400' : accentColor === 'pots' ? 'bg-emerald-400' : accentColor === 'gawk' ? 'bg-green-400' : 'bg-indigo-400'}"></div>
      <div class="flex-1 min-w-0">
        <div class="text-xs font-semibold tracking-wide">${escapeHtml(title)}</div>
        <div class="text-[11px] text-slate-300 mt-0.5 leading-relaxed">${escapeHtml(detail)}</div>
      </div>
    `;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(8px)';
      setTimeout(() => toast.remove(), 250);
    }, 3400);
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // Dynamic Favicon & Title Switcher
  function updateFaviconAndTitle(platform) {
    const link = document.getElementById('dynamic-favicon');
    const appleLink = document.getElementById('dynamic-apple-icon');
    const svgUri = FAVICON_SVGS[platform] || FAVICON_SVGS.hub;
    if (link) link.setAttribute('href', svgUri);
    if (appleLink) appleLink.setAttribute('href', svgUri);
    document.title = PAGE_TITLES[platform] || PAGE_TITLES.hub;

    // Update top status badge
    const badge = document.getElementById('active-favicon-indicator');
    if (badge) {
      const labels = {
        hub: 'TamoAI Parent Favicon Active',
        fuse: 'Fuse Aurora Favicon Active',
        pots: 'Pots Matrix Favicon Active',
        gawk: 'Gawk Terminal Favicon Active'
      };
      badge.textContent = labels[platform] || labels.hub;
    }
  }

  // Switch Top-Level Platform ('hub' | 'fuse' | 'pots' | 'gawk')
  function switchPlatform(platform) {
    state.activePlatform = platform;
    state.mobileMenuOpen = false;
    updateFaviconAndTitle(platform);
    try {
      window.location.hash = platform === 'hub' ? '#hub' : `#${platform}`;
    } catch (e) {}
    renderAll();
  }

  // Copy text helper with fallback
  function copyText(text, label) {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
          showToast('Copied to Clipboard', `${label}: ${text}`, state.activePlatform);
        }).catch(() => fallbackCopy(text, label));
      } else {
        fallbackCopy(text, label);
      }
    } catch (e) {
      fallbackCopy(text, label);
    }
  }

  function fallbackCopy(text, label) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    ta.remove();
    showToast('Copied to Clipboard', `${label}: ${text}`, state.activePlatform);
  }

  // =========================================================================
  // RENDERERS FOR EACH PLATFORM
  // =========================================================================

  function renderNav() {
    const navButtons = document.querySelectorAll('[data-platform-btn]');
    navButtons.forEach(btn => {
      const target = btn.getAttribute('data-platform-btn');
      const isActive = target === state.activePlatform;
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
      if (isActive) {
        btn.classList.add('ring-2', 'ring-white/40', 'bg-slate-800', 'text-white');
        btn.classList.remove('text-slate-300', 'bg-slate-900/60');
      } else {
        btn.classList.remove('ring-2', 'ring-white/40', 'bg-slate-800', 'text-white');
        btn.classList.add('text-slate-300', 'bg-slate-900/60');
      }
    });

    // Show/hide main view containers
    ['hub', 'fuse', 'pots', 'gawk'].forEach(view => {
      const el = document.getElementById(`view-${view}`);
      if (el) {
        if (view === state.activePlatform) {
          el.classList.remove('hidden');
        } else {
          el.classList.add('hidden');
        }
      }
    });

    const mobileDrawer = document.getElementById('mobile-nav-drawer');
    if (mobileDrawer) {
      if (state.mobileMenuOpen) {
        mobileDrawer.classList.remove('hidden');
      } else {
        mobileDrawer.classList.add('hidden');
      }
    }
  }

  // -------------------------------------------------------------------------
  // 1. RENDER FUSE (Meta Muse Clone)
  // -------------------------------------------------------------------------
  function renderFuse() {
    const f = state.fuse;

    // Header & Customization fields
    const nameEl = document.getElementById('fuse-agent-name-display');
    if (nameEl) nameEl.textContent = `${f.agentName} (Fuse Spark)`;
    const styleEl = document.getElementById('fuse-style-display');
    if (styleEl) styleEl.textContent = f.commStyle;
    const emailEl = document.getElementById('fuse-email-display');
    if (emailEl) emailEl.textContent = f.agentEmail;
    const planEl = document.getElementById('fuse-plan-display');
    if (planEl) planEl.textContent = f.planTier;

    // Sub-tabs
    document.querySelectorAll('[data-fuse-tab]').forEach(btn => {
      const t = btn.getAttribute('data-fuse-tab');
      if (t === f.subTab) {
        btn.className = 'px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow';
      } else {
        btn.className = 'px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:bg-slate-800/80 transition';
      }
    });

    ['chat', 'avatar', 'sentinel', 'commerce', 'charm'].forEach(pane => {
      const p = document.getElementById(`fuse-pane-${pane}`);
      if (p) p.classList.toggle('hidden', pane !== f.subTab);
    });

    // Render Goals
    const goalsContainer = document.getElementById('fuse-goals-list');
    if (goalsContainer) {
      goalsContainer.innerHTML = f.goals.map(g => `
        <div class="p-3 rounded-xl bg-slate-900/90 border border-purple-500/25 flex flex-col gap-1.5">
          <div class="flex items-center justify-between gap-2">
            <span class="text-xs font-semibold text-white">${escapeHtml(g.title)}</span>
            <span class="text-[10px] font-mono-code px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">${g.progress}%</span>
          </div>
          <div class="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div class="h-full fuse-gradient transition-all duration-300" style="width:${g.progress}%"></div>
          </div>
          <div class="flex items-center justify-between text-[11px] text-slate-400">
            <span>Status: <strong class="text-pink-300">${escapeHtml(g.status)}</strong></span>
            <span class="font-mono-code text-[10px] text-sky-300">Tool: ${escapeHtml(g.tool)}</span>
          </div>
        </div>
      `).join('');
    }

    // Render Chat Messages
    const chatBox = document.getElementById('fuse-chat-messages');
    if (chatBox) {
      chatBox.innerHTML = f.messages.map(m => `
        <div class="flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}">
          <div class="max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
            m.sender === 'user'
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-sm'
              : 'bg-slate-800/90 border border-slate-700/80 text-slate-100 rounded-bl-sm'
          }">
            <div class="flex items-center justify-between gap-3 mb-1 opacity-75 text-[10px]">
              <span class="font-semibold">${m.sender === 'user' ? 'You' : escapeHtml(f.agentName + ' • Fuse Spark')}</span>
              <span>${escapeHtml(m.time)}</span>
            </div>
            <div>${escapeHtml(m.text)}</div>
          </div>
        </div>
      `).join('');
      chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Render Sentinel Permissions
    const sentinelBox = document.getElementById('fuse-sentinel-list');
    if (sentinelBox) {
      sentinelBox.innerHTML = f.sentinel.map(item => {
        const badgeColor = item.level === 'Read & Write' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' :
                           item.level === 'Ask First' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' :
                           item.level === 'Read Only' ? 'bg-sky-500/20 text-sky-300 border-sky-500/40' :
                           'bg-rose-500/20 text-rose-300 border-rose-500/40';
        return `
          <div class="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <div>
              <div class="text-xs font-semibold text-white">${escapeHtml(item.app)}</div>
              <div class="text-[10px] text-slate-400">${escapeHtml(item.category)}</div>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-[10px] px-2 py-0.5 rounded-full border ${badgeColor}">${escapeHtml(item.level)}</span>
              <button type="button" data-sentinel-cycle="${item.id}" class="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-200 border border-slate-700 transition">
                Cycle Access
              </button>
            </div>
          </div>
        `;
      }).join('');
    }

    // Render Fuse Secure VM Right Panel
    const takeoverBtn = document.getElementById('fuse-takeover-btn');
    const takeoverStatus = document.getElementById('fuse-vm-control-badge');
    if (takeoverBtn && takeoverStatus) {
      if (f.humanTakeover) {
        takeoverBtn.textContent = 'Return Control to Fuse';
        takeoverBtn.className = 'px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500 text-slate-950 hover:bg-amber-400 transition shadow';
        takeoverStatus.textContent = 'HUMAN INTERVENTION ACTIVE — YOU ARE DRIVING VM';
        takeoverStatus.className = 'text-[10px] font-mono-code px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40';
      } else {
        takeoverBtn.textContent = 'Intervene / Take Control';
        takeoverBtn.className = 'px-3 py-1.5 rounded-lg text-xs font-semibold bg-pink-600 text-white hover:bg-pink-500 transition shadow';
        takeoverStatus.textContent = 'FUSE SPARK DRIVING SHARED BROWSER';
        takeoverStatus.className = 'text-[10px] font-mono-code px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40';
      }
    }

    // Browser page content inside Fuse Secure VM
    const urlInput = document.getElementById('fuse-vm-url');
    const viewport = document.getElementById('fuse-vm-viewport');
    if (viewport && urlInput) {
      if (f.browserPage === 'expedia') {
        urlInput.value = 'https://www.expedia.com/Checkout/Flight-SFO-JFK-DL419';
        viewport.innerHTML = `
          <div class="p-4 space-y-3 bg-slate-950/90 rounded-xl border border-slate-800">
            <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
              <div>
                <span class="text-[10px] uppercase tracking-wider text-sky-400 font-semibold">Expedia Partner Checkout • Fuse Secure VM</span>
                <h4 class="text-sm font-bold text-white mt-0.5">Delta Nonstop SFO → JFK • Seat 14A (Main Cabin Extra)</h4>
              </div>
              <div class="text-right">
                <div class="text-lg font-extrabold text-emerald-400">$318.00</div>
                <div class="text-[10px] text-slate-400">Saved $64 vs. yesterday</div>
              </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div class="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <div class="text-[10px] text-slate-400">Traveler Profile (Fuse Vault)</div>
                <div class="font-semibold text-slate-200 mt-0.5">Alex Rivera • Known Traveler #9841204</div>
              </div>
              <div class="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <div class="text-[10px] text-slate-400">Payment Method (Sentinel Gated)</div>
                <div class="font-semibold text-slate-200 mt-0.5">Stripe Pass •••• 4242 (No raw password exposed)</div>
              </div>
            </div>
            <div class="p-3 rounded-xl bg-purple-950/40 border border-purple-500/40 flex flex-wrap items-center justify-between gap-2">
              <div class="text-xs text-purple-200">
                <strong>Sentinel Gate:</strong> Checkout requires owner confirmation ($318.00).
              </div>
              <button type="button" id="fuse-approve-flight-btn" class="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition">
                Approve $318 Booking
              </button>
            </div>
          </div>
        `;
      } else if (f.browserPage === 'shopify') {
        urlInput.value = 'https://bluebottle-partner.myshopify.com/checkout/thank_you';
        viewport.innerHTML = `
          <div class="p-4 space-y-3 bg-slate-950/90 rounded-xl border border-slate-800">
            <div class="flex items-center justify-between border-b border-slate-800 pb-2">
              <span class="text-xs font-bold text-emerald-400">✓ Shopify Storefront Partner — Order #SHP-9042 Confirmed</span>
              <span class="text-[10px] font-mono-code text-slate-400">Sentinel: Read & Write Allowed</span>
            </div>
            <p class="text-xs text-slate-300">Fuse autonomously reordered <strong>2x Ethiopian Yirgacheffe Whole Bean (12oz)</strong> using your saved Shopify subscription preferences. Tracking number synced to your WhatsApp & Fuse Charm.</p>
          </div>
        `;
      } else if (f.browserPage === 'dental') {
        urlInput.value = 'https://www.deltadentalins.com/member/claims/submit-online';
        viewport.innerHTML = `
          <div class="p-4 space-y-3 bg-slate-950/90 rounded-xl border border-slate-800">
            <div class="flex items-center justify-between border-b border-slate-800 pb-2">
              <span class="text-xs font-bold text-sky-400">Delta Dental Member Claim Form • Auto-Filling from Agent Inbox</span>
              <span class="text-[10px] font-mono-code text-pink-300">Source: nova.fuse@agent.tamo.ai</span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div class="p-2 rounded bg-slate-900 border border-slate-800">Provider NPI: <strong class="text-white">1497821044 (SF Smile Studio)</strong></div>
              <div class="p-2 rounded bg-slate-900 border border-slate-800">Procedure Code: <strong class="text-white">D1110 — Adult Prophylaxis ($165)</strong></div>
            </div>
            <button type="button" id="fuse-submit-claim-btn" class="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition">
              Complete & Submit Claim Form
            </button>
          </div>
        `;
      } else {
        urlInput.value = 'file:///home/fuse/tools/lens_price_watcher.py';
        viewport.innerHTML = `
          <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono-code text-[11px] text-emerald-300 space-y-1">
            <div class="text-slate-400"># Built autonomously by Fuse Spark inside Fuse Secure VM (Ubuntu 24.04)</div>
            <div>import httpx, sqlite3</div>
            <div>TARGETS = ["bestbuy.com", "bhphotovideo.com", "adorama.com"] # Amazon skipped per Sentinel block</div>
            <div>def check_sony_24_70_gm2(threshold=1899.00):</div>
            <div>&nbsp;&nbsp;return {"best_price": 1848.00, "merchant": "Best Buy Partner API", "in_stock": True}</div>
            <div class="pt-2 text-sky-300">>>> Tool Output: Found $1,848.00 at Best Buy! Alert sent to Fuse Charm.</div>
          </div>
        `;
      }
    }
  }

  // -------------------------------------------------------------------------
  // 2. RENDER POTS (OpenAI Dots Clone)
  // -------------------------------------------------------------------------
  function renderPots() {
    const p = state.pots;
    const currentPot = p.roster.find(r => r.id === p.activePotId) || p.roster[0];

    // Render Pot Roster cards
    const rosterEl = document.getElementById('pots-roster-list');
    if (rosterEl) {
      rosterEl.innerHTML = p.roster.map(item => {
        const active = item.id === p.activePotId;
        return `
          <button type="button" data-select-pot="${item.id}" class="w-full text-left p-3 rounded-xl border transition flex flex-col gap-1 ${
            active
              ? 'bg-emerald-950/50 border-emerald-500/70 ring-1 ring-emerald-400/40'
              : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
          }">
            <div class="flex items-center justify-between gap-2">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span class="text-xs font-bold text-white">${escapeHtml(item.name)}</span>
              </div>
              <span class="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">${escapeHtml(item.badge)}</span>
            </div>
            <div class="text-[11px] text-slate-300">${escapeHtml(item.role)}</div>
            <div class="flex items-center justify-between text-[10px] font-mono-code text-slate-400 mt-1">
              <span>${escapeHtml(item.model)}</span>
              <span>CPU ${escapeHtml(item.cpu)} • RAM ${escapeHtml(item.ram)}</span>
            </div>
          </button>
        `;
      }).join('');
    }

    // Active Pot header
    const headerTitle = document.getElementById('pots-active-title');
    if (headerTitle) headerTitle.textContent = `${currentPot.name} — ${currentPot.role}`;

    // Channel buttons
    document.querySelectorAll('[data-pots-channel]').forEach(btn => {
      const ch = btn.getAttribute('data-pots-channel');
      if (ch === p.activeChannel) {
        btn.className = 'px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white shadow';
      } else {
        btn.className = 'px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800';
      }
    });

    // Channel Messages
    const chatList = document.getElementById('pots-channel-messages');
    if (chatList) {
      const msgs = p.channelMessages[p.activeChannel] || [];
      chatList.innerHTML = msgs.map(m => `
        <div class="p-3 rounded-xl bg-slate-900/90 border border-slate-800/90 space-y-1">
          <div class="flex items-center justify-between text-[10px] text-emerald-300 font-semibold">
            <span>${escapeHtml(m.author)}</span>
            <span class="text-slate-400 font-mono-code">${escapeHtml(m.time)}</span>
          </div>
          <div class="text-xs text-slate-200 leading-relaxed">${escapeHtml(m.text)}</div>
        </div>
      `).join('');
      chatList.scrollTop = chatList.scrollHeight;
    }

    // Right pane tabs ('activity' | 'computer' | 'governance')
    document.querySelectorAll('[data-pots-pane]').forEach(btn => {
      const tab = btn.getAttribute('data-pots-pane');
      if (tab === p.rightPaneTab) {
        btn.className = 'px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white shadow';
      } else {
        btn.className = 'px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:bg-slate-800';
      }
    });

    ['activity', 'computer', 'governance'].forEach(tab => {
      const el = document.getElementById(`pots-right-${tab}`);
      if (el) el.classList.toggle('hidden', tab !== p.rightPaneTab);
    });

    // Render Pending Approvals in Activity View
    const approvalsEl = document.getElementById('pots-approvals-list');
    if (approvalsEl) {
      const pendingCount = p.approvals.filter(a => a.status === 'pending').length;
      const countBadge = document.getElementById('pots-pending-count');
      if (countBadge) countBadge.textContent = `${pendingCount} Pending`;

      approvalsEl.innerHTML = p.approvals.map(a => `
        <div class="p-3 rounded-xl bg-slate-900/95 border ${a.status === 'approved' ? 'border-emerald-500/40' : a.status === 'rejected' ? 'border-rose-500/40' : 'border-amber-500/40'} space-y-2">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <span class="text-[11px] font-bold text-emerald-300">${escapeHtml(a.pot)}</span>
            <span class="text-[10px] font-mono-code px-2 py-0.5 rounded-full ${
              a.status === 'approved' ? 'bg-emerald-500/20 text-emerald-300' :
              a.status === 'rejected' ? 'bg-rose-500/20 text-rose-300' :
              'bg-amber-500/20 text-amber-300'
            }">${a.status.toUpperCase()}</span>
          </div>
          <div class="text-xs text-white font-medium">${escapeHtml(a.action)}</div>
          <div class="flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-400">
            <span>Safeguard: ${escapeHtml(a.risk)}</span>
            <span>Channel: ${escapeHtml(a.channel)}</span>
          </div>
          ${a.status === 'pending' ? `
            <div class="flex items-center gap-2 pt-1">
              <button type="button" data-pot-approve="${a.id}" class="px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition">Approve Action</button>
              <button type="button" data-pot-reject="${a.id}" class="px-3 py-1 rounded-lg bg-slate-800 hover:bg-rose-950 text-rose-300 border border-rose-500/30 text-xs transition">Reject</button>
            </div>
          ` : ''}
        </div>
      `).join('');
    }

    // Render Open Questions
    const questionsEl = document.getElementById('pots-questions-list');
    if (questionsEl) {
      questionsEl.innerHTML = p.questions.map(q => `
        <div class="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
          <div class="text-[11px] font-semibold text-sky-300">${escapeHtml(q.pot)} • Decision Needed</div>
          <div class="text-xs text-slate-100">${escapeHtml(q.question)}</div>
          <div class="flex flex-wrap gap-1.5">
            ${q.options.map(opt => `
              <button type="button" data-pot-answer="${q.id}" data-pot-option="${escapeHtml(opt)}" class="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-emerald-600 hover:text-white text-slate-200 text-[11px] border border-slate-700 transition">
                ${escapeHtml(opt)}
              </button>
            `).join('')}
          </div>
        </div>
      `).join('');
    }

    // Render Background Research
    const researchEl = document.getElementById('pots-research-list');
    if (researchEl) {
      researchEl.innerHTML = p.researchItems.map(r => `
        <div class="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
          <div class="flex items-center justify-between gap-2">
            <span class="text-xs font-semibold text-white">${escapeHtml(r.title)}</span>
            <span class="text-[10px] font-mono-code text-emerald-400">${escapeHtml(r.time)}</span>
          </div>
          <p class="text-[11px] text-slate-300">${escapeHtml(r.summary)}</p>
          <div class="text-[10px] font-mono-code text-slate-400">Connected Plugins: ${escapeHtml(r.apps)}</div>
        </div>
      `).join('');
    }

    // Local Computer Access toggle status
    const localBadge = document.getElementById('pots-local-access-badge');
    const localBtn = document.getElementById('pots-toggle-local-btn');
    if (localBadge && localBtn) {
      if (p.localComputerAccess) {
        localBadge.textContent = `LOCAL COMPUTER ACCESS GRANTED (${p.localAccessMinutesLeft}m TTL)`;
        localBadge.className = 'text-[10px] font-mono-code px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40';
        localBtn.textContent = 'Revoke Local Computer Access';
      } else {
        localBadge.textContent = 'CLOUD COMPUTER ONLY (ISOLATED)';
        localBadge.className = 'text-[10px] font-mono-code px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40';
        localBtn.textContent = 'Grant 30m Local Computer Access';
      }
    }
  }

  // -------------------------------------------------------------------------
  // 3. RENDER GAWK BOT (xAI Grok Bot Clone)
  // -------------------------------------------------------------------------
  function renderGawk() {
    const g = state.gawk;
    const activeBot = g.bots.find(b => b.id === g.activeBotId) || g.bots[0];

    // Bot Roster
    const rosterEl = document.getElementById('gawk-bot-roster');
    if (rosterEl) {
      rosterEl.innerHTML = g.bots.map(b => {
        const isSelected = b.id === g.activeBotId;
        return `
          <button type="button" data-select-gawk="${b.id}" class="w-full text-left p-3 rounded-xl border transition flex flex-col gap-1 ${
            isSelected
              ? 'bg-green-950/40 border-green-500/80 ring-1 ring-green-400/30'
              : 'bg-zinc-900/90 border-zinc-800 hover:border-zinc-700'
          }">
            <div class="flex items-center justify-between gap-2">
              <span class="font-mono-code text-xs font-bold text-green-400">${escapeHtml(b.name)}</span>
              <span class="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">${escapeHtml(b.type)}</span>
            </div>
            <div class="text-[11px] text-zinc-200 font-medium">${escapeHtml(b.role)}</div>
            <div class="flex items-center justify-between text-[10px] font-mono-code text-zinc-400 mt-1">
              <span class="truncate max-w-[180px]">${escapeHtml(b.status)}</span>
              <span class="text-amber-300">${escapeHtml(b.tokens)}</span>
            </div>
          </button>
        `;
      }).join('');
    }

    // Active Bot Header & Chat
    const botHeader = document.getElementById('gawk-active-bot-header');
    if (botHeader) {
      botHeader.textContent = `${activeBot.name} (${activeBot.type}) — ${activeBot.role}`;
    }

    const botTask = document.getElementById('gawk-active-bot-task');
    if (botTask) {
      botTask.textContent = `Current Task: ${activeBot.task}`;
    }

    const chatEl = document.getElementById('gawk-chat-messages');
    if (chatEl) {
      const msgs = g.chatByBot[g.activeBotId] || [];
      chatEl.innerHTML = msgs.map(m => `
        <div class="p-3 rounded-xl border font-mono-code text-xs ${
          m.from === 'user'
            ? 'bg-green-950/30 border-green-500/40 text-green-100 ml-6'
            : 'bg-zinc-900/95 border-zinc-800 text-zinc-200 mr-4'
        }">
          <div class="flex items-center justify-between text-[10px] text-zinc-400 mb-1">
            <span class="font-bold ${m.from === 'user' ? 'text-green-400' : 'text-sky-400'}">${m.from === 'user' ? 'OPERATOR' : escapeHtml(activeBot.name.toUpperCase() + ' [GAWK 4.6]')}</span>
            <span>${escapeHtml(m.time)}</span>
          </div>
          <div class="leading-relaxed">${escapeHtml(m.text)}</div>
        </div>
      `).join('');
      chatEl.scrollTop = chatEl.scrollHeight;
    }

    // Quota bar
    const quotaText = document.getElementById('gawk-token-quota-text');
    const quotaBar = document.getElementById('gawk-token-quota-bar');
    if (quotaText && quotaBar) {
      const pct = Math.min(100, Math.round((g.weeklyTokensUsed / g.weeklyTokensLimit) * 100));
      quotaText.textContent = `${g.weeklyTokensUsed.toFixed(1)}M / ${g.weeklyTokensLimit.toFixed(1)}M Weekly Tokens (${pct}%) • No Hard Cap`;
      quotaBar.style.width = `${pct}%`;
    }

    // VM Surface Tabs ('screen' | 'terminal' | 'auth' | 'approvals')
    document.querySelectorAll('[data-gawk-surface]').forEach(btn => {
      const s = btn.getAttribute('data-gawk-surface');
      if (s === g.vmSurface) {
        btn.className = 'px-3 py-1.5 rounded-lg text-xs font-mono-code font-semibold bg-green-500 text-zinc-950 shadow';
      } else {
        btn.className = 'px-3 py-1.5 rounded-lg text-xs font-mono-code text-zinc-300 hover:bg-zinc-800';
      }
    });

    ['screen', 'terminal', 'auth', 'approvals'].forEach(s => {
      const pane = document.getElementById(`gawk-surface-${s}`);
      if (pane) pane.classList.toggle('hidden', s !== g.vmSurface);
    });

    // Okta SSO / 2FA Human Takeover state inside Gawk Bot screen
    const oktaBanner = document.getElementById('gawk-okta-takeover-card');
    if (oktaBanner) {
      if (g.oktaPausedForHuman) {
        oktaBanner.innerHTML = `
          <div class="p-3.5 rounded-xl bg-amber-950/50 border border-amber-500/60 space-y-2">
            <div class="flex flex-wrap items-center justify-between gap-2">
              <span class="text-xs font-mono-code font-bold text-amber-300">⚠ HUMAN SIGN-IN HANDOFF: Okta SSO + 2FA Challenge on Display :2</span>
              <span class="text-[10px] font-mono-code px-2 py-0.5 rounded bg-amber-500/20 text-amber-200">hyperion-growth paused</span>
            </div>
            <p class="text-xs text-zinc-200">Gawk Bot handed you control of the shared Linux VM browser. Sign in to Okta SSO or forward your hardware WebAuthn passkey so session cookies persist across your Bot roster.</p>
            <div class="flex flex-wrap gap-2">
              <button type="button" id="gawk-complete-okta-btn" class="px-3 py-1.5 rounded-lg bg-green-500 hover:bg-green-400 text-zinc-950 font-mono-code font-bold text-xs transition">
                Step In & Complete Okta SSO + 2FA
              </button>
              <button type="button" id="gawk-forward-webauthn-btn" class="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-sky-300 border border-sky-500/40 font-mono-code text-xs transition">
                Forward WebAuthn YubiKey Passkey
              </button>
            </div>
          </div>
        `;
      } else {
        oktaBanner.innerHTML = `
          <div class="p-3 rounded-xl bg-green-950/30 border border-green-500/40 flex items-center justify-between">
            <span class="text-xs font-mono-code text-green-300">✓ Okta SSO Session Cookie Active on Shared VM (Available to all 4 Bots in roster)</span>
            <button type="button" id="gawk-reset-okta-btn" class="text-[11px] font-mono-code text-zinc-400 hover:text-white underline">Simulate 2FA Challenge</button>
          </div>
        `;
      }
    }

    // Secrets Vault list
    const secretsEl = document.getElementById('gawk-secrets-list');
    if (secretsEl) {
      secretsEl.innerHTML = g.secrets.map(sec => `
        <div class="flex items-center justify-between p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 font-mono-code text-xs">
          <div>
            <span class="text-green-400 font-semibold">${escapeHtml(sec.key)}</span>
            <span class="text-zinc-500 ml-2">(${escapeHtml(sec.service)})</span>
          </div>
          <span class="text-[11px] text-zinc-300">${escapeHtml(sec.status)}</span>
        </div>
      `).join('');
    }

    // LLM Auto-Review Classifier Approvals
    const gawkApprovalsEl = document.getElementById('gawk-approvals-list');
    if (gawkApprovalsEl) {
      gawkApprovalsEl.innerHTML = g.approvals.map(item => `
        <div class="p-3 rounded-xl bg-zinc-900 border ${item.status === 'approved' ? 'border-green-500/50' : item.status === 'denied' ? 'border-rose-500/50' : 'border-amber-500/50'} space-y-2 font-mono-code">
          <div class="flex flex-wrap items-center justify-between gap-2 text-xs">
            <span class="font-bold text-green-400">${escapeHtml(item.bot)} • [${escapeHtml(item.category)}]</span>
            <span class="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-amber-300">Classifier Risk: ${escapeHtml(item.classifierRisk)}</span>
          </div>
          <div class="text-xs text-zinc-100 font-sans">${escapeHtml(item.action)}</div>
          <div class="text-[10px] text-zinc-400">Note: An approval controls the proposed action. It does not reverse work already completed.</div>
          ${item.status === 'pending' ? `
            <div class="flex gap-2 pt-1">
              <button type="button" data-gawk-approve="${item.id}" class="px-3 py-1 rounded bg-green-500 hover:bg-green-400 text-zinc-950 font-bold text-xs">Allow Proposed Action</button>
              <button type="button" data-gawk-deny="${item.id}" class="px-3 py-1 rounded bg-zinc-800 hover:bg-rose-950 text-rose-300 border border-rose-500/40 text-xs">Block Action</button>
            </div>
          ` : `<div class="text-[11px] font-bold ${item.status === 'approved' ? 'text-green-400' : 'text-rose-400'}">STATUS: ${item.status.toUpperCase()}</div>`}
        </div>
      `).join('');
    }
  }

  function renderAll() {
    renderNav();
    renderFuse();
    renderPots();
    renderGawk();
  }

  // =========================================================================
  // EVENT DELEGATION & INTERACTIVITY
  // =========================================================================
  function setupEventListeners() {
    document.body.addEventListener('click', function(e) {
      const target = e.target.closest('button, [data-platform-btn]');
      if (!target) return;

      // 1. Platform switching
      if (target.hasAttribute('data-platform-btn')) {
        const p = target.getAttribute('data-platform-btn');
        switchPlatform(p);
        showToast(`Switched to ${p.toUpperCase()}`, PAGE_TITLES[p], p);
        return;
      }

      // Mobile menu toggle
      if (target.id === 'mobile-menu-toggle-btn') {
        state.mobileMenuOpen = !state.mobileMenuOpen;
        renderNav();
        return;
      }

      // Favicon preview buttons on Hub
      if (target.hasAttribute('data-preview-favicon')) {
        const fav = target.getAttribute('data-preview-favicon');
        updateFaviconAndTitle(fav);
        showToast('Live Browser Favicon Updated', `Switched browser tab icon to ${fav.toUpperCase()} SVG vector icon.`, fav);
        return;
      }

      // ---------------- FUSE HANDLERS ----------------
      if (target.hasAttribute('data-fuse-tab')) {
        state.fuse.subTab = target.getAttribute('data-fuse-tab');
        renderFuse();
        return;
      }

      if (target.hasAttribute('data-fuse-browser-page')) {
        state.fuse.browserPage = target.getAttribute('data-fuse-browser-page');
        renderFuse();
        return;
      }

      if (target.id === 'fuse-takeover-btn') {
        state.fuse.humanTakeover = !state.fuse.humanTakeover;
        renderFuse();
        showToast(
          state.fuse.humanTakeover ? 'You Took Control of Fuse Secure VM' : 'Returned Control to Fuse Spark',
          state.fuse.humanTakeover ? 'Direct mouse & keyboard streaming enabled on Ubuntu 24.04 cloud browser.' : 'Fuse Spark resumed autonomous execution.',
          'fuse'
        );
        return;
      }

      if (target.id === 'fuse-copy-email-btn') {
        copyText(state.fuse.agentEmail, 'Fuse Agent Email');
        return;
      }

      if (target.id === 'fuse-simulate-email-btn') {
        state.fuse.messages.push({
          sender: 'agent',
          time: 'Just now',
          text: `Received forwarded email at ${state.fuse.agentEmail}: "Marriott Bonvoy Folio #99412". Added expense report task to your Proactive Action Plan!`
        });
        state.fuse.goals.unshift({
          id: 'g-' + Date.now(),
          title: 'Parse forwarded Marriott folio PDF & categorize $412 hotel receipt',
          progress: 45,
          status: 'Extracted line items in Fuse Secure VM',
          tool: 'folio_ocr_parser.py'
        });
        renderFuse();
        showToast('Forwarded Email Received by Fuse', `Processed incoming thread on ${state.fuse.agentEmail}`, 'fuse');
        return;
      }

      if (target.id === 'fuse-build-tool-btn') {
        const toolName = 'custom_instacart_restock_' + Math.floor(100 + Math.random() * 899) + '.py';
        state.fuse.goals.unshift({
          id: 'g-' + Date.now(),
          title: 'Weekly organic grocery stock check & cart staging on Instacart',
          progress: 70,
          status: 'Custom tool synthesized & running in VM',
          tool: toolName
        });
        state.fuse.browserPage = 'toolbuilder';
        renderFuse();
        showToast('Custom Tool Built on Fuse VM', `Synthesized /home/fuse/tools/${toolName}`, 'fuse');
        return;
      }

      if (target.hasAttribute('data-sentinel-cycle')) {
        const id = target.getAttribute('data-sentinel-cycle');
        const levels = ['Read Only', 'Ask First', 'Read & Write', 'Blocked'];
        const item = state.fuse.sentinel.find(s => s.id === id);
        if (item) {
          const nextIdx = (levels.indexOf(item.level) + 1) % levels.length;
          item.level = levels[nextIdx];
          renderFuse();
          showToast('Sentinel Permission Updated', `${item.app} set to [${item.level}]`, 'fuse');
        }
        return;
      }

      if (target.id === 'fuse-approve-flight-btn') {
        const g1 = state.fuse.goals.find(g => g.id === 'g1');
        if (g1) {
          g1.progress = 100;
          g1.status = 'Booked ($318.00 Confirmed • PNR #K9M2LP)';
        }
        state.fuse.messages.push({
          sender: 'agent',
          time: 'Just now',
          text: 'Checkout approved! Booked Delta DL419 (Seat 14A) for $318.00 via Expedia Partner checkout. Boarding pass synced to Apple Wallet & Fuse Charm.'
        });
        renderFuse();
        showToast('Flight Booked via Fuse Secure VM', 'Delta Nonstop SFO → JFK confirmed ($318.00).', 'fuse');
        return;
      }

      if (target.id === 'fuse-submit-claim-btn') {
        const g3 = state.fuse.goals.find(g => g.id === 'g3');
        if (g3) {
          g3.progress = 100;
          g3.status = 'Submitted (Claim #DD-2026-88412)';
        }
        renderFuse();
        showToast('Dental Claim Submitted', 'Delta Dental Claim #DD-2026-88412 filed via shared browser.', 'fuse');
        return;
      }

      if (target.id === 'fuse-save-persona-btn') {
        const nameInput = document.getElementById('fuse-custom-name-input');
        const styleSelect = document.getElementById('fuse-custom-style-select');
        const tierSelect = document.getElementById('fuse-custom-tier-select');
        if (nameInput && nameInput.value.trim()) {
          state.fuse.agentName = nameInput.value.trim();
          state.fuse.agentEmail = state.fuse.agentName.toLowerCase().replace(/[^a-z0-9]/g, '') + '.fuse@agent.tamo.ai';
        }
        if (styleSelect) state.fuse.commStyle = styleSelect.value;
        if (tierSelect) state.fuse.planTier = tierSelect.value;
        renderFuse();
        showToast('Fuse Persona Updated', `${state.fuse.agentName} (${state.fuse.commStyle}) saved.`, 'fuse');
        return;
      }

      if (target.id === 'fuse-charm-ping-btn') {
        state.fuse.charmActive = !state.fuse.charmActive;
        showToast('Fuse Charm Wearable Synced', 'Voice note & haptic pulse transmitted to palm-sized Fuse Charm device.', 'fuse');
        return;
      }

      // ---------------- POTS HANDLERS ----------------
      if (target.hasAttribute('data-select-pot')) {
        state.pots.activePotId = target.getAttribute('data-select-pot');
        renderPots();
        return;
      }

      if (target.hasAttribute('data-pots-channel')) {
        state.pots.activeChannel = target.getAttribute('data-pots-channel');
        renderPots();
        return;
      }

      if (target.hasAttribute('data-pots-pane')) {
        state.pots.rightPaneTab = target.getAttribute('data-pots-pane');
        renderPots();
        return;
      }

      if (target.hasAttribute('data-pot-approve')) {
        const id = target.getAttribute('data-pot-approve');
        const ap = state.pots.approvals.find(a => a.id === id);
        if (ap) {
          ap.status = 'approved';
          state.pots.channelMessages[state.pots.activeChannel].push({
            author: ap.pot,
            time: 'Just now',
            text: `✓ Approved & Executed on Cloud Computer: "${ap.action}"`
          });
          renderPots();
          showToast('Pot Action Approved', `${ap.pot} executed the gated task on its Cloud Computer.`, 'pots');
        }
        return;
      }

      if (target.hasAttribute('data-pot-reject')) {
        const id = target.getAttribute('data-pot-reject');
        const ap = state.pots.approvals.find(a => a.id === id);
        if (ap) {
          ap.status = 'rejected';
          renderPots();
          showToast('Action Rejected', 'Pot rolled back staged changes on Cloud Computer.', 'pots');
        }
        return;
      }

      if (target.hasAttribute('data-pot-answer')) {
        const qId = target.getAttribute('data-pot-answer');
        const opt = target.getAttribute('data-pot-option');
        state.pots.questions = state.pots.questions.filter(q => q.id !== qId);
        state.pots.channelMessages[state.pots.activeChannel].push({
          author: 'Primary Work Pot',
          time: 'Just now',
          text: `Decision recorded ("${opt}"). Continuing autonomous execution across Slack, Teams & Cloud VM.`
        });
        renderPots();
        showToast('Decision Recorded by Pot', `Applied option: ${opt}`, 'pots');
        return;
      }

      if (target.id === 'pots-toggle-local-btn') {
        state.pots.localComputerAccess = !state.pots.localComputerAccess;
        renderPots();
        showToast(
          state.pots.localComputerAccess ? 'Time-Bounded Local Access Granted' : 'Local Computer Access Revoked',
          state.pots.localComputerAccess ? 'Work Cloud bridge active for 30m under Enterprise Agent Security policy.' : 'Pot restricted strictly to isolated Cloud Computer.',
          'pots'
        );
        return;
      }

      if (target.id === 'pots-spawn-specialist-btn') {
        const newId = 'pot-custom-' + Date.now();
        state.pots.roster.push({
          id: newId,
          name: 'Data & Analytics Pot',
          role: 'Snowflake SQL, Looker & Board Deck Refresh',
          model: 'Tamo-6 Astra',
          status: 'Active on Cloud VM',
          cpu: '35%',
          ram: '5.4 / 16 GB',
          badge: 'Agent 365 Specialist'
        });
        state.pots.activePotId = newId;
        renderPots();
        showToast('Specialist Pot Provisioned', 'Data & Analytics Pot spawned with dedicated Cloud Computer & Agent 365 identity.', 'pots');
        return;
      }

      // ---------------- GAWK BOT HANDLERS ----------------
      if (target.hasAttribute('data-select-gawk')) {
        state.gawk.activeBotId = target.getAttribute('data-select-gawk');
        renderGawk();
        return;
      }

      if (target.hasAttribute('data-gawk-surface')) {
        state.gawk.vmSurface = target.getAttribute('data-gawk-surface');
        renderGawk();
        return;
      }

      if (target.id === 'gawk-complete-okta-btn' || target.id === 'gawk-forward-webauthn-btn') {
        state.gawk.oktaPausedForHuman = false;
        const hyp = state.gawk.bots.find(b => b.id === 'bot-hyperion');
        if (hyp) hyp.status = 'Running on Display :2 (Okta Authenticated)';
        state.gawk.chatByBot['bot-hyperion'].push({
          from: 'bot',
          time: 'Just now',
          text: 'Session authenticated! Okta SSO cookie persisted to shared cloud VM. Resuming HubSpot & LinkedIn workflow.'
        });
        renderGawk();
        showToast('Okta SSO Session Established', 'Session cookie saved on shared TamoCursor Cloud VM.', 'gawk');
        return;
      }

      if (target.id === 'gawk-reset-okta-btn') {
        state.gawk.oktaPausedForHuman = true;
        renderGawk();
        return;
      }

      if (target.hasAttribute('data-gawk-approve')) {
        const id = target.getAttribute('data-gawk-approve');
        const item = state.gawk.approvals.find(a => a.id === id);
        if (item) {
          item.status = 'approved';
          state.gawk.weeklyTokensUsed = +(state.gawk.weeklyTokensUsed + 0.4).toFixed(1);
          renderGawk();
          showToast('Gawk Bot Action Executed', `${item.bot} completed action on shared cloud VM.`, 'gawk');
        }
        return;
      }

      if (target.hasAttribute('data-gawk-deny')) {
        const id = target.getAttribute('data-gawk-deny');
        const item = state.gawk.approvals.find(a => a.id === id);
        if (item) {
          item.status = 'denied';
          renderGawk();
          showToast('Gawk Bot Action Blocked', `Terminated proposed step in ${item.bot}.`, 'gawk');
        }
        return;
      }

      if (target.id === 'gawk-add-secret-btn') {
        const keyIn = document.getElementById('gawk-secret-key-input');
        const valIn = document.getElementById('gawk-secret-val-input');
        if (keyIn && valIn && keyIn.value.trim() && valIn.value.trim()) {
          const tail = valIn.value.trim().slice(-4) || '9f01';
          state.gawk.secrets.unshift({
            key: keyIn.value.trim().toUpperCase(),
            service: 'Scoped Connection Secret',
            status: `Masked in Vault (••••${tail})`
          });
          keyIn.value = '';
          valIn.value = '';
          renderGawk();
          showToast('Secret Stored in Masked Field', 'Injected into supported connector without exposing in chat.', 'gawk');
        }
        return;
      }

      if (target.id === 'gawk-spawn-bot-btn') {
        const newBotId = 'bot-custom-' + Date.now();
        state.gawk.bots.push({
          id: newBotId,
          name: 'qa-crawler-bot',
          type: 'Team Bot (Shared Memory)',
          role: 'Playwright & Accessibility Auditor',
          status: 'Active on Display :5',
          task: 'Auditing responsive breakpoints across 8 viewports',
          tokens: '0.9M tok'
        });
        state.gawk.chatByBot[newBotId] = [
          { from: 'bot', time: 'Just now', text: 'Booted on shared TamoCursor Cloud VM (:5). Sharing `/home/tamocursor/workspace` and browser sessions with roster.' }
        ];
        state.gawk.activeBotId = newBotId;
        renderGawk();
        showToast('New Gawk Bot Teammate Spawned', 'qa-crawler-bot added to shared cloud computer.', 'gawk');
        return;
      }
    });

    // Chat form submissions for Fuse, Pots, and Gawk Bot
    const fuseForm = document.getElementById('fuse-chat-form');
    if (fuseForm) {
      fuseForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const input = document.getElementById('fuse-chat-input');
        if (!input || !input.value.trim()) return;
        const text = input.value.trim();
        input.value = '';
        state.fuse.messages.push({ sender: 'user', time: 'Just now', text });
        state.fuse.messages.push({
          sender: 'agent',
          time: 'Just now',
          text: `On it! I added "${text}" to your Action Plan on Fuse Secure VM (8GB RAM Linux) and checked Sentinel permissions before opening the shared browser.`
        });
        state.fuse.goals.unshift({
          id: 'g-' + Date.now(),
          title: text,
          progress: 35,
          status: 'Executing in Fuse Secure VM Browser',
          tool: 'fuse_autonomy_runner'
        });
        renderFuse();
      });
    }

    const potsForm = document.getElementById('pots-chat-form');
    if (potsForm) {
      potsForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const input = document.getElementById('pots-chat-input');
        if (!input || !input.value.trim()) return;
        const text = input.value.trim();
        input.value = '';
        const ch = state.pots.activeChannel;
        state.pots.channelMessages[ch].push({ author: 'You', time: 'Just now', text });
        state.pots.channelMessages[ch].push({
          author: 'Primary Work Pot (Tamo-6 Astra)',
          time: 'Just now',
          text: `Task delegated on Cloud Computer: "${text}". Running initial read-only research across connected plugins and syncing status to ChatGPT/TamoChat, Slack, and Microsoft Teams.`
        });
        renderPots();
      });
    }

    const gawkForm = document.getElementById('gawk-chat-form');
    if (gawkForm) {
      gawkForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const input = document.getElementById('gawk-chat-input');
        if (!input || !input.value.trim()) return;
        const text = input.value.trim();
        input.value = '';
        const botId = state.gawk.activeBotId;
        if (!state.gawk.chatByBot[botId]) state.gawk.chatByBot[botId] = [];
        state.gawk.chatByBot[botId].push({ from: 'user', time: 'Just now', text });
        state.gawk.chatByBot[botId].push({
          from: 'bot',
          time: 'Just now',
          text: `[Gawk 4.6 Computer-Use] Executing "${text}" on shared Linux VM. Mouse/keyboard trajectory active; high-risk operations will pause at Auto-Review Classifier.`
        });
        state.gawk.weeklyTokensUsed = +(state.gawk.weeklyTokensUsed + 0.3).toFixed(1);
        renderGawk();
      });
    }
  }

  // Initialize on DOM ready
  window.addEventListener('DOMContentLoaded', function() {
    const hash = (window.location.hash || '').replace('#', '');
    if (['hub', 'fuse', 'pots', 'gawk'].includes(hash)) {
      state.activePlatform = hash;
    }
    updateFaviconAndTitle(state.activePlatform);
    setupEventListeners();
    renderAll();
  });
})();