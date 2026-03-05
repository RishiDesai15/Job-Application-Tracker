/* ===========================
   JOB HUNT — Application Tracker
   app.js
=========================== */

// ── DATA ──────────────────────
const SAMPLE_DATA = [
  // ── November 2025 ──
  { id: uid(), company: "Connor, Clark & Lunn Financial Group", position: "Systems Developer, Portfolio Management (12-Month Contract)", response: "Rejected",      notes: "",                                                              appliedDate: "2025-11-14", result: "",          emails: "" },
  { id: uid(), company: "Mave AI",                              position: "Junior Data Engineer",                                        response: "Interview",     notes: "Apply again in March",                                          appliedDate: "2025-11-20", result: "",          emails: "Emma Merry: emma@maveai.co" },
  { id: uid(), company: "BestBuy",                              position: "Data Analyst",                                                response: "Rejected",      notes: "",                                                              appliedDate: "2025-11-22", result: "",          emails: "" },
  { id: uid(), company: "Duolingo",                             position: "Data Scientist New Grad",                                     response: "Rejected",      notes: "",                                                              appliedDate: "2025-11-23", result: "",          emails: "Jaylyn Jones: jaylyn@duolingo.com" },
  { id: uid(), company: "Cloudflare",                           position: "Data Analyst",                                                response: "Rejected",      notes: "",                                                              appliedDate: "2025-11-23", result: "",          emails: "" },
  { id: uid(), company: "Uber",                                 position: "Marketing Applied Scientist II",                              response: "Rejected",      notes: "",                                                              appliedDate: "2025-11-23", result: "",          emails: "" },
  { id: uid(), company: "Experian",                             position: "Data Engineer",                                               response: "",              notes: "",                                                              appliedDate: "2025-11-25", result: "",          emails: "" },
  { id: uid(), company: "DoorDash",                             position: "Software Engineer, Entry-Level",                              response: "Rejected",      notes: "",                                                              appliedDate: "2025-11-26", result: "",          emails: "" },
  { id: uid(), company: "Nestle",                               position: "Associate Product Ownership - Jr. Data Engineer (12-months contract)", response: "Rejected", notes: "",                                                     appliedDate: "2025-11-26", result: "",          emails: "" },
  { id: uid(), company: "Emonics LLC",                          position: "Data Engineer Entry-Level",                                   response: "Intro Call",    notes: "Agency Phone Call: said reach out in Feb/Mar",                  appliedDate: "2025-11-26", result: "",          emails: "" },
  { id: uid(), company: "Hive",                                 position: "Product Manager, Hive Data",                                  response: "",              notes: "",                                                              appliedDate: "2025-11-27", result: "",          emails: "" },
  { id: uid(), company: "VNS Health",                           position: "Data Analytics and AI Engineer",                              response: "",              notes: "",                                                              appliedDate: "2025-11-27", result: "",          emails: "" },
  { id: uid(), company: "Svitla Systems Inc",                   position: "Data Engineer",                                               response: "",              notes: "",                                                              appliedDate: "2025-11-27", result: "",          emails: "" },
  { id: uid(), company: "Canonical",                            position: "Junior Software Developer",                                   response: "Waiting",       notes: "Written Technical - Done, Technical Inprogress",                appliedDate: "2025-11-28", result: "",          emails: "Simon Aronsson: simon.aronsson@canonical.com" },
  { id: uid(), company: "Bloomberg",                            position: "2026 Software Engineer - New York",                           response: "Interview",     notes: "I didn't do it LOL",                                            appliedDate: "2025-11-30", result: "",          emails: "Jonathan Adewumi: jadewumi@bloomberg.net\nKatelyn Baez: KBAEZ10@bloomberg.net" },
  { id: uid(), company: "TB Bank",                              position: "Data Engineer I",                                             response: "Rejected",      notes: "",                                                              appliedDate: "2025-11-30", result: "",          emails: "" },
  { id: uid(), company: "Jane Street",                          position: "Cybersecurity Analyst",                                       response: "Rejected",      notes: "",                                                              appliedDate: "2025-11-30", result: "",          emails: "" },
  { id: uid(), company: "Spotify",                              position: "Specialist, CS Content and Design",                           response: "Rejected",      notes: "",                                                              appliedDate: "2025-11-30", result: "",          emails: "" },
  { id: uid(), company: "Spotify",                              position: "Data Engineer, Data Infrastructure",                          response: "",              notes: "",                                                              appliedDate: "2025-11-30", result: "",          emails: "" },
  { id: uid(), company: "Spotify",                              position: "Data Engineer - Revenue Platform",                            response: "Rejected",      notes: "",                                                              appliedDate: "2025-11-30", result: "",          emails: "" },
  { id: uid(), company: "Spotify",                              position: "Data Engineer - Platform Central Data",                       response: "Rejected",      notes: "",                                                              appliedDate: "2025-11-30", result: "",          emails: "" },
  // ── December 2025 ──
  { id: uid(), company: "StackAdapt",                           position: "Technical Analyst, Solutions",                                response: "Rejected",      notes: "",                                                              appliedDate: "2025-12-01", result: "",          emails: "" },
  { id: uid(), company: "Indigo Natural Products Management",   position: "Junior Data Engineer",                                        response: "",              notes: "",                                                              appliedDate: "2025-12-01", result: "",          emails: "" },
  { id: uid(), company: "Dacko",                                position: "Technical Services Engineer",                                 response: "",              notes: "",                                                              appliedDate: "2025-12-01", result: "",          emails: "" },
  { id: uid(), company: "HubSpot",                              position: "Staff Product Designer, Data Hub",                            response: "",              notes: "",                                                              appliedDate: "2025-12-03", result: "",          emails: "" },
  { id: uid(), company: "Stryker",                              position: "Data Engineer (Remote)",                                      response: "Rejected",      notes: "",                                                              appliedDate: "2025-12-04", result: "",          emails: "" },
  { id: uid(), company: "Fanatics",                             position: "Data Engineer II",                                            response: "",              notes: "",                                                              appliedDate: "2025-12-04", result: "",          emails: "" },
  { id: uid(), company: "Mysten Labs",                          position: "Data Engineer (Remote)",                                      response: "Rejected",      notes: "",                                                              appliedDate: "2025-12-04", result: "",          emails: "" },
  { id: uid(), company: "MD Audit",                             position: "Data Operations Engineer",                                    response: "",              notes: "",                                                              appliedDate: "2025-12-04", result: "",          emails: "" },
  { id: uid(), company: "PWC",                                  position: "Data and Product Analyst",                                    response: "Rejected",      notes: "",                                                              appliedDate: "2025-12-04", result: "",          emails: "" },
  { id: uid(), company: "Cincinnati Children's",                position: "Data Engineer II",                                            response: "",              notes: "",                                                              appliedDate: "2025-12-04", result: "",          emails: "" },
  { id: uid(), company: "Intuit",                               position: "Software Engineer I",                                         response: "",              notes: "",                                                              appliedDate: "2025-12-04", result: "",          emails: "" },
  { id: uid(), company: "Capgemini",                            position: "Junior Data Engineer",                                        response: "",              notes: "",                                                              appliedDate: "2025-12-04", result: "",          emails: "" },
  { id: uid(), company: "Ormuco Inc (DeOS)",                    position: "Junior Computational Developer",                              response: "Waiting",       notes: "",                                                              appliedDate: "2025-12-05", result: "Ghosted",   emails: "" },
  { id: uid(), company: "Veeva Systems",                        position: "Data Analyst",                                                response: "",              notes: "",                                                              appliedDate: "2025-12-09", result: "",          emails: "" },
  { id: uid(), company: "Veeva Systems",                        position: "Associate IT Engineer",                                       response: "",              notes: "",                                                              appliedDate: "2025-12-09", result: "",          emails: "" },
  { id: uid(), company: "Veeva Systems",                        position: "Associate QA Engineer",                                       response: "Interview",     notes: "Talked with Lucy Yang",                                         appliedDate: "2025-12-09", result: "",          emails: "" },
  { id: uid(), company: "Veeva Systems",                        position: "Associate Auto Platform Eng",                                 response: "Interview",     notes: "Int. Complete, Technical Complete, Waiting on they reply",      appliedDate: "2025-12-09", result: "Rejected",  emails: "" },
  { id: uid(), company: "Svitla Systems Inc",                   position: "Junior Project Coordinator",                                  response: "",              notes: "",                                                              appliedDate: "2025-12-10", result: "",          emails: "" },
  { id: uid(), company: "Waymo",                                position: "Data Engineer",                                               response: "Rejected",      notes: "",                                                              appliedDate: "2025-12-10", result: "",          emails: "" },
  { id: uid(), company: "Veeva Systems",                        position: "Associate SWE",                                               response: "",              notes: "",                                                              appliedDate: "2025-12-10", result: "",          emails: "" },
  { id: uid(), company: "Twitch",                               position: "Data Science New Grad",                                       response: "",              notes: "",                                                              appliedDate: "2025-12-10", result: "",          emails: "" },
  { id: uid(), company: "Amcor",                                position: "Data Specialist",                                             response: "Rejected",      notes: "",                                                              appliedDate: "2025-12-11", result: "",          emails: "" },
  { id: uid(), company: "HighlightTA",                          position: "Data Engineer",                                               response: "Rejected",      notes: "",                                                              appliedDate: "2025-12-11", result: "",          emails: "" },
  { id: uid(), company: "Snap Inc",                             position: "Quality Engineer",                                            response: "Rejected",      notes: "",                                                              appliedDate: "2025-12-11", result: "",          emails: "" },
  { id: uid(), company: "Snap Inc",                             position: "Test Engineer",                                               response: "",              notes: "",                                                              appliedDate: "2025-12-12", result: "",          emails: "" },
  { id: uid(), company: "TikTok",                               position: "Data Engineer Graduate (Data Platform - Global Live)",        response: "",              notes: "",                                                              appliedDate: "2025-12-12", result: "",          emails: "" },
  { id: uid(), company: "Nordstorm",                            position: "Data Engineer I",                                             response: "Rejected",      notes: "",                                                              appliedDate: "2025-12-12", result: "",          emails: "" },
  { id: uid(), company: "Akuna Capital",                        position: "Junior Quantitative Developer & Strategist",                  response: "Rejected",      notes: "",                                                              appliedDate: "2025-12-12", result: "",          emails: "" },
  { id: uid(), company: "Select Equity Group",                  position: "General App (Data Engineer)",                                 response: "",              notes: "",                                                              appliedDate: "2025-12-14", result: "",          emails: "" },
  { id: uid(), company: "Lensa",                                position: "Backend Developer (Python)",                                  response: "Rejected",      notes: "",                                                              appliedDate: "2025-12-14", result: "",          emails: "" },
  { id: uid(), company: "Cloudflare",                           position: "Data and Analytics Engineer",                                 response: "Rejected",      notes: "",                                                              appliedDate: "2025-12-14", result: "",          emails: "" },
  { id: uid(), company: "Cloudflare",                           position: "Software Engineer - Database Platform",                       response: "",              notes: "",                                                              appliedDate: "2025-12-14", result: "",          emails: "" },
  { id: uid(), company: "Carrot",                               position: "Data Engineer",                                               response: "Rejected",      notes: "",                                                              appliedDate: "2025-12-14", result: "",          emails: "" },
  { id: uid(), company: "Optimove",                             position: "Customer Data Engineer",                                      response: "Rejected",      notes: "",                                                              appliedDate: "2025-12-15", result: "",          emails: "" },
  { id: uid(), company: "Warner Bros.",                         position: "Associate Software Engineer",                                 response: "",              notes: "",                                                              appliedDate: "2025-12-15", result: "",          emails: "" },
  { id: uid(), company: "Supercell",                            position: "Data Analyst",                                                response: "Rejected",      notes: "",                                                              appliedDate: "2025-12-16", result: "",          emails: "" },
  { id: uid(), company: "Note AI / inkAi",                      position: "Data or Software role",                                       response: "Waiting",       notes: "Wants to discuss more; Reach out to Andrew Choi:a@ink.ai",      appliedDate: "2025-12-16", result: "I said No", emails: "" },
  { id: uid(), company: "NBCUniversal",                         position: "Data Scientist, Data Science",                                response: "",              notes: "",                                                              appliedDate: "2025-12-17", result: "",          emails: "" },
  { id: uid(), company: "Geneva",                               position: "Data Operations Specialist (Remote)",                         response: "Rejected",      notes: "",                                                              appliedDate: "2025-12-17", result: "",          emails: "" },
  { id: uid(), company: "Meta",                                 position: "Data Engineer, Analytics (University Grad)",                  response: "",              notes: "",                                                              appliedDate: "2025-12-19", result: "",          emails: "" },
  { id: uid(), company: "Meta",                                 position: "Data Center Production Operations Engineer",                  response: "",              notes: "",                                                              appliedDate: "2025-12-19", result: "",          emails: "" },
  { id: uid(), company: "Centene",                              position: "Data Engineer I",                                             response: "Rejected",      notes: "",                                                              appliedDate: "2025-12-19", result: "",          emails: "" },
  { id: uid(), company: "S&P Global",                           position: "Associate Data Analyst - Mobility",                           response: "Rejected",      notes: "",                                                              appliedDate: "2025-12-19", result: "",          emails: "" },
  { id: uid(), company: "LinkedIn",                             position: "Data Engineer",                                               response: "",              notes: "",                                                              appliedDate: "2025-12-19", result: "",          emails: "" },
  { id: uid(), company: "Visa",                                 position: "Data Engineer",                                               response: "Rejected",      notes: "",                                                              appliedDate: "2025-12-19", result: "",          emails: "" },
  { id: uid(), company: "Highmark Health",                      position: "Data Engineer I",                                             response: "",              notes: "",                                                              appliedDate: "2025-12-19", result: "",          emails: "" },
  { id: uid(), company: "Euna Solutions",                       position: "Associate Software Engineer",                                 response: "",              notes: "",                                                              appliedDate: "2025-12-19", result: "",          emails: "" },
  { id: uid(), company: "Euna Solutions",                       position: "Technical Solutions Specialist",                              response: "",              notes: "",                                                              appliedDate: "2025-12-19", result: "",          emails: "" },
  { id: uid(), company: "Twitch",                               position: "Applied Science",                                             response: "",              notes: "",                                                              appliedDate: "2025-12-20", result: "",          emails: "" },
  { id: uid(), company: "Applovin",                             position: "Data Scientist - Analytics",                                  response: "",              notes: "",                                                              appliedDate: "2025-12-20", result: "",          emails: "" },
  { id: uid(), company: "RAPP",                                 position: "Data Engineer",                                               response: "",              notes: "",                                                              appliedDate: "2025-12-20", result: "",          emails: "" },
  { id: uid(), company: "Mass General Brigham",                 position: "Home Base Data Engineer",                                     response: "Rejected",      notes: "",                                                              appliedDate: "2025-12-20", result: "",          emails: "" },
  { id: uid(), company: "Uber",                                 position: "Data Analytics Specialist II",                                response: "Intro Interview", notes: "SQL Technical - DONE",                                      appliedDate: "2025-12-20", result: "Rejected",  emails: "Marta Nobre:" },
  { id: uid(), company: "Capitolis",                            position: "Algo Engineer",                                               response: "",              notes: "",                                                              appliedDate: "2025-12-20", result: "",          emails: "" },
  { id: uid(), company: "Canonical",                            position: "Junior Software Developer",                                   response: "Rejected",      notes: "",                                                              appliedDate: "2025-12-20", result: "",          emails: "" },
  { id: uid(), company: "Garner Health",                        position: "Data Analyst II",                                             response: "Rejected",      notes: "",                                                              appliedDate: "2025-12-20", result: "",          emails: "" },
  { id: uid(), company: "Adobe",                                position: "University Graduate - Software Engineer",                     response: "Rejected",      notes: "",                                                              appliedDate: "2025-12-21", result: "",          emails: "" },
  { id: uid(), company: "Adobe",                                position: "University Graduate - Data Scientist",                        response: "Rejected",      notes: "",                                                              appliedDate: "2025-12-21", result: "",          emails: "" },
  { id: uid(), company: "Adobe",                                position: "Data Engineer",                                               response: "Rejected",      notes: "",                                                              appliedDate: "2025-12-21", result: "",          emails: "" },
  { id: uid(), company: "Bluebird Group",                       position: "Management Data Engineer",                                    response: "Rejected",      notes: "",                                                              appliedDate: "2025-12-21", result: "",          emails: "" },
  { id: uid(), company: "Harris Associates",                    position: "Data Engineer",                                               response: "Rejected",      notes: "",                                                              appliedDate: "2025-12-21", result: "",          emails: "" },
  { id: uid(), company: "Canonical",                            position: "UX Designer - Developer",                                     response: "Rejected",      notes: "",                                                              appliedDate: "2025-12-21", result: "",          emails: "" },
  { id: uid(), company: "Ericsson Global",                      position: "Software Developer",                                          response: "",              notes: "",                                                              appliedDate: "2025-12-21", result: "",          emails: "" },
  { id: uid(), company: "AbbVie",                               position: "IT Business Data Analyst",                                    response: "",              notes: "",                                                              appliedDate: "2025-12-22", result: "",          emails: "" },
  { id: uid(), company: "AbbVie",                               position: "Automation Engineer",                                         response: "",              notes: "",                                                              appliedDate: "2025-12-22", result: "",          emails: "" },
  { id: uid(), company: "Sentry",                               position: "Software Developer",                                          response: "Rejected",      notes: "",                                                              appliedDate: "2025-12-22", result: "",          emails: "" },
  { id: uid(), company: "Sallie Mae",                           position: "Data Engineer",                                               response: "Rejected",      notes: "",                                                              appliedDate: "2025-12-24", result: "",          emails: "" },
  { id: uid(), company: "PsychoGenics",                         position: "Data Engineer",                                               response: "",              notes: "",                                                              appliedDate: "2025-12-24", result: "",          emails: "" },
  { id: uid(), company: "Micheals",                             position: "Data Engineer",                                               response: "Rejected",      notes: "",                                                              appliedDate: "2025-12-24", result: "",          emails: "" },
  { id: uid(), company: "Huron Consulting Group",               position: "Data Engineer",                                               response: "Rejected",      notes: "",                                                              appliedDate: "2025-12-24", result: "",          emails: "" },
  { id: uid(), company: "Citco",                                position: "IT Junior Developer",                                         response: "",              notes: "",                                                              appliedDate: "2025-12-25", result: "",          emails: "" },
  { id: uid(), company: "Empassion",                            position: "Data Engineer",                                               response: "",              notes: "",                                                              appliedDate: "2025-12-25", result: "",          emails: "" },
  { id: uid(), company: "Sectra",                               position: "Technical Engineer",                                          response: "Rejected",      notes: "",                                                              appliedDate: "2025-12-25", result: "",          emails: "" },
  { id: uid(), company: "AbbVie",                               position: "Business Systems Analyst",                                    response: "",              notes: "",                                                              appliedDate: "2025-12-25", result: "",          emails: "" },
  { id: uid(), company: "Rogers",                               position: "Software Developer",                                          response: "Rejected",      notes: "",                                                              appliedDate: "2025-12-27", result: "",          emails: "" },
  { id: uid(), company: "MANUAL",                               position: "React Web Developer",                                         response: "Rejected",      notes: "",                                                              appliedDate: "2025-12-27", result: "",          emails: "" },
  { id: uid(), company: "SpaceX",                               position: "Software Engineer I",                                         response: "Rejected",      notes: "",                                                              appliedDate: "2025-12-27", result: "",          emails: "" },
  { id: uid(), company: "IBM",                                  position: "Data Engineer Entry-Level",                                   response: "Waiting",       notes: "Coding Technical - DONE",                                       appliedDate: "2025-12-27", result: "",          emails: "" },
  { id: uid(), company: "AIRBUS",                               position: "Supply Chain Data Analyst",                                   response: "Rejected",      notes: "",                                                              appliedDate: "2025-12-28", result: "",          emails: "" },
  { id: uid(), company: "AIRBUS",                               position: "Data Scientist AI",                                           response: "Rejected",      notes: "",                                                              appliedDate: "2025-12-28", result: "",          emails: "" },
  { id: uid(), company: "Atreides",                             position: "Data Engineer - Platform Engineering",                        response: "Rejected",      notes: "",                                                              appliedDate: "2025-12-28", result: "",          emails: "" },
  { id: uid(), company: "Hive",                                 position: "Product Manager, Hive Models",                                response: "",              notes: "",                                                              appliedDate: "2025-12-29", result: "",          emails: "" },
  { id: uid(), company: "Hive",                                 position: "UI / UX Designer",                                            response: "",              notes: "",                                                              appliedDate: "2025-12-29", result: "",          emails: "" },
  { id: uid(), company: "Hive",                                 position: "Product Analyst",                                             response: "",              notes: "",                                                              appliedDate: "2025-12-29", result: "",          emails: "" },
  { id: uid(), company: "Nestle",                               position: "Data Analyst",                                                response: "",              notes: "",                                                              appliedDate: "2025-12-30", result: "",          emails: "" },
  { id: uid(), company: "Qualcomm",                             position: "Engineer, AI Systems Architecture",                           response: "",              notes: "",                                                              appliedDate: "2025-12-30", result: "",          emails: "" },
];

// ── STATE ──────────────────────────────────────────────────────────────────
let applications = [];
let currentFilter = 'all';
let searchQuery   = '';
let sortCol       = 'appliedDate';
let sortDir       = 'desc';
let pendingDeleteId = null;

// ── INIT ───────────────────────────────────────────────────────────────────
function init() {
  const stored = localStorage.getItem('jobtracker_apps');
  if (stored) {
    try { applications = JSON.parse(stored); }
    catch { applications = [...SAMPLE_DATA]; save(); }
  } else {
    applications = [...SAMPLE_DATA];
    save();
  }
  render();
  bindEvents();
}

// ── STORAGE ────────────────────────────────────────────────────────────────
function save() {
  localStorage.setItem('jobtracker_apps', JSON.stringify(applications));
}

// ── UID ────────────────────────────────────────────────────────────────────
function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

// ── RENDER ─────────────────────────────────────────────────────────────────
function render() {
  const tbody = document.getElementById('tableBody');
  const empty = document.getElementById('emptyState');

  let data = [...applications];

  // Filter by status
  if (currentFilter !== 'all') {
    data = data.filter(a => (a.response || '') === currentFilter);
  }

  // Search
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    data = data.filter(a =>
      a.company.toLowerCase().includes(q) ||
      a.position.toLowerCase().includes(q) ||
      (a.notes || '').toLowerCase().includes(q) ||
      (a.emails || '').toLowerCase().includes(q)
    );
  }

  // Sort
  data.sort((a, b) => {
    let av = (a[sortCol] || '').toLowerCase();
    let bv = (b[sortCol] || '').toLowerCase();
    if (sortCol === 'appliedDate') {
      av = a.appliedDate || '';
      bv = b.appliedDate || '';
    }
    if (av < bv) return sortDir === 'asc' ? -1 : 1;
    if (av > bv) return sortDir === 'asc' ?  1 : -1;
    return 0;
  });

  // Update stat chips
  renderStats();

  if (data.length === 0) {
    tbody.innerHTML = '';
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';

  tbody.innerHTML = data.map(app => rowHTML(app)).join('');
}

function rowHTML(app) {
  const status    = app.response || '';
  const rowClass  = rowStatusClass(status);
  const badge     = badgeHTML(status);
  const dateStr   = app.appliedDate ? formatDate(app.appliedDate) : '—';
  const emailsStr = formatEmails(app.emails || '');

  return `
    <tr class="${rowClass}" data-id="${app.id}">
      <td class="td-company">${esc(app.company)}</td>
      <td class="td-position">${esc(app.position)}</td>
      <td>${badge}</td>
      <td class="td-notes" title="${esc(app.notes || '')}">${esc(app.notes || '—')}</td>
      <td class="td-date">${dateStr}</td>
      <td class="td-result" title="${esc(app.result || '')}">${esc(app.result || '—')}</td>
      <td class="td-emails">${emailsStr}</td>
      <td>
        <div class="actions">
          <button class="btn-icon edit" title="Edit" onclick="openEdit('${app.id}')">✎</button>
          <button class="btn-icon del"  title="Delete" onclick="openDelete('${app.id}')">✕</button>
        </div>
      </td>
    </tr>`;
}

function renderStats() {
  const total      = applications.length;
  const interviews = applications.filter(a => a.response === 'Interview').length;
  const rejected   = applications.filter(a => a.response === 'Rejected').length;
  const offers     = applications.filter(a => a.response === 'Offer').length;
  const pending    = applications.filter(a => !a.response).length;

  document.getElementById('header-stats').innerHTML = `
    <div class="stat-chip">Total <span>${total}</span></div>
    <div class="stat-chip">Interviews <span style="color:var(--green)">${interviews}</span></div>
    <div class="stat-chip">Rejected <span style="color:var(--red)">${rejected}</span></div>
    ${offers ? `<div class="stat-chip">Offers <span style="color:var(--purple)">${offers}</span></div>` : ''}
    <div class="stat-chip">Pending <span>${pending}</span></div>
  `;
}

// ── HELPERS ────────────────────────────────────────────────────────────────
function esc(str) {
  return String(str)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;');
}

function formatDate(d) {
  if (!d) return '—';
  try {
    const [y,m,day] = d.split('-');
    return `${parseInt(m)}/${parseInt(day)}/${y}`;
  } catch { return d; }
}

function formatEmails(raw) {
  if (!raw.trim()) return '<span style="color:var(--muted2)">—</span>';
  return raw.split('\n').map(line => {
    line = line.trim();
    if (!line) return '';
    const emailMatch = line.match(/[\w.+-]+@[\w-]+\.[a-z]{2,}/i);
    if (emailMatch) {
      const email = emailMatch[0];
      const name  = line.replace(email, '').replace(/[:\-]/,'').trim() || email;
      return `<a href="mailto:${esc(email)}" title="${esc(email)}">${esc(name)}</a>`;
    }
    return `<span>${esc(line)}</span>`;
  }).filter(Boolean).join('');
}

function badgeHTML(status) {
  const map = {
    'Interview':  'badge-interview',
    'Rejected':   'badge-rejected',
    'Waiting':    'badge-waiting',
    'Intro Call': 'badge-intro',
    'Offer':      'badge-offer',
    'Offer 🎉':   'badge-offer',
    'Withdrawn':  'badge-withdrawn',
    '':           'badge-pending',
  };
  const cls  = map[status] || 'badge-pending';
  const label = status || 'Pending';
  return `<span class="badge ${cls}">${esc(label)}</span>`;
}

function rowStatusClass(status) {
  const map = {
    'Interview':  'row-interview',
    'Rejected':   'row-rejected',
    'Waiting':    'row-waiting',
    'Intro Call': 'row-intro',
    'Offer':      'row-offer',
    'Offer 🎉':   'row-offer',
    'Withdrawn':  'row-withdrawn',
  };
  return map[status] || '';
}

// ── EVENTS ─────────────────────────────────────────────────────────────────
function bindEvents() {
  // Open Add modal
  document.getElementById('openModal').addEventListener('click', () => openAdd());

  // Close modal buttons
  document.getElementById('closeModal').addEventListener('click', closeModal);
  document.getElementById('cancelModal').addEventListener('click', closeModal);

  // Close on overlay click
  document.getElementById('modalOverlay').addEventListener('click', e => {
    if (e.target === document.getElementById('modalOverlay')) closeModal();
  });

  // Form submit
  document.getElementById('appForm').addEventListener('submit', handleSubmit);

  // Search
  document.getElementById('searchInput').addEventListener('input', e => {
    searchQuery = e.target.value;
    render();
  });

  // Filter pills
  document.querySelectorAll('.pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentFilter = pill.dataset.filter;
      render();
    });
  });

  // Sorting
  document.querySelectorAll('th.sortable').forEach(th => {
    th.addEventListener('click', () => {
      const col = th.dataset.col;
      if (sortCol === col) {
        sortDir = sortDir === 'asc' ? 'desc' : 'asc';
      } else {
        sortCol = col;
        sortDir = 'asc';
      }
      document.querySelectorAll('th.sortable').forEach(t => t.classList.remove('sort-asc','sort-desc'));
      th.classList.add(sortDir === 'asc' ? 'sort-asc' : 'sort-desc');
      render();
    });
  });

  // CSV export
  document.getElementById('exportCSV').addEventListener('click', exportCSV);

  // Delete confirm
  document.getElementById('confirmDelete').addEventListener('click', () => {
    if (pendingDeleteId) {
      applications = applications.filter(a => a.id !== pendingDeleteId);
      save();
      render();
      closeDeleteModal();
      toast('Application deleted', 'error');
    }
  });
  document.getElementById('cancelDelete').addEventListener('click', closeDeleteModal);
  document.getElementById('cancelDelete2').addEventListener('click', closeDeleteModal);
  document.getElementById('deleteOverlay').addEventListener('click', e => {
    if (e.target === document.getElementById('deleteOverlay')) closeDeleteModal();
  });
}

// ── MODAL OPEN/CLOSE ───────────────────────────────────────────────────────
function openAdd() {
  document.getElementById('modalTitle').textContent = 'New Application';
  document.getElementById('appForm').reset();
  document.getElementById('editId').value = '';
  // Default date to today
  document.getElementById('fDate').value = new Date().toISOString().split('T')[0];
  document.getElementById('modalOverlay').classList.add('open');
}

function openEdit(id) {
  const app = applications.find(a => a.id === id);
  if (!app) return;
  document.getElementById('modalTitle').textContent = 'Edit Application';
  document.getElementById('editId').value     = app.id;
  document.getElementById('fCompany').value   = app.company;
  document.getElementById('fPosition').value  = app.position;
  document.getElementById('fResponse').value  = app.response || '';
  document.getElementById('fDate').value      = app.appliedDate || '';
  document.getElementById('fNotes').value     = app.notes || '';
  document.getElementById('fResult').value    = app.result || '';
  document.getElementById('fEmails').value    = app.emails || '';
  document.getElementById('modalOverlay').classList.add('open');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
}

function openDelete(id) {
  pendingDeleteId = id;
  document.getElementById('deleteOverlay').classList.add('open');
}

function closeDeleteModal() {
  pendingDeleteId = null;
  document.getElementById('deleteOverlay').classList.remove('open');
}

// ── FORM SUBMIT ────────────────────────────────────────────────────────────
function handleSubmit(e) {
  e.preventDefault();
  const id = document.getElementById('editId').value;

  const entry = {
    id:          id || uid(),
    company:     document.getElementById('fCompany').value.trim(),
    position:    document.getElementById('fPosition').value.trim(),
    response:    document.getElementById('fResponse').value,
    appliedDate: document.getElementById('fDate').value,
    notes:       document.getElementById('fNotes').value.trim(),
    result:      document.getElementById('fResult').value.trim(),
    emails:      document.getElementById('fEmails').value.trim(),
  };

  if (id) {
    const idx = applications.findIndex(a => a.id === id);
    if (idx !== -1) applications[idx] = entry;
    toast('Application updated ✓', 'success');
  } else {
    applications.unshift(entry);
    toast('Application added ✓', 'success');
  }

  save();
  render();
  closeModal();
}

// ── CSV EXPORT ─────────────────────────────────────────────────────────────
function exportCSV() {
  const headers = ['Company','Position','Status','Notes','Applied Date','Result','Emails'];
  const rows = applications.map(a => [
    a.company, a.position, a.response || 'Pending', a.notes || '',
    a.appliedDate || '', a.result || '', (a.emails || '').replace(/\n/g, ' | ')
  ].map(v => `"${String(v).replace(/"/g,'""')}"`).join(','));

  const csv = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url;
  a.download = `job-applications-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  toast('CSV exported ✓', 'success');
}

// ── TOAST ──────────────────────────────────────────────────────────────────
let toastTimer;
function toast(msg, type = 'success') {
  let el = document.getElementById('toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'toast';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.className = `show ${type}`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2500);
}

// ── START ──────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', init);
