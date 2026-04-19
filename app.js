/* ===========================
   JOB HUNT — Application Tracker
   app.js
=========================== */
// ── THEME MANAGEMENT ───────────────────────
function initTheme() {
  const savedTheme = localStorage.getItem('jobtracker_theme') || 'dark';
  applyTheme(savedTheme);
  document.getElementById('themeToggle').addEventListener('click', toggleTheme);
}

function applyTheme(theme) {
  const isDark = theme === 'dark';
  if (isDark) {
    document.documentElement.classList.remove('light-mode');
  } else {
    document.documentElement.classList.add('light-mode');
  }
  localStorage.setItem('jobtracker_theme', theme);
  updateThemeIcon(isDark);
}

function toggleTheme() {
  const currentTheme = localStorage.getItem('jobtracker_theme') || 'dark';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
}

function updateThemeIcon(isDark) {
  const icon = document.getElementById('themeToggle');
  icon.textContent = isDark ? '🌙' : '☀️';
  icon.style.transform = isDark ? 'rotate(0deg)' : 'rotate(180deg)';
}
// ── DATA ──────────────────────
const SAMPLE_DATA = [];

// ── STATE ──────────────────────────────────────────────────────────────────
let applications = [];
let companies = [];
let currentFilter = 'all';
let searchQuery   = '';
let companiesSearchQuery = '';
let sortCol       = 'appliedDate';
let companiesSortCol = 'name';
let sortDir       = 'desc';
let companiesSortDir = 'asc';
let pendingDeleteId = null;
let pendingDeleteCompanyId = null;
let currentTab = 'applications';

const APPS_STORAGE_KEY = 'jobtracker_apps';
const COMPANIES_STORAGE_KEY = 'jobtracker_companies';
const COMPANIES_BACKUP_KEY = 'jobtracker_companies_backup';
const BOOTSTRAP_STORAGE_KEY = 'jobtracker_bootstrapped_v1';
const APPS_RECOVERY_BACKUP_KEY = 'jobtracker_apps_backup_v1';
const BACKUP_META_KEY = 'jobtracker_backup_meta_v1';
const BACKUP_REMINDER_DAYS = 7;
const BACKUP_REMINDER_SNOOZE_DAYS = 3;

function readCompaniesBackup() {
  try {
    const backup = localStorage.getItem(COMPANIES_BACKUP_KEY);
    if (!backup || !backup.trim()) return [];
    const parsed = JSON.parse(backup);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.warn('Could not read companies backup:', err);
    return [];
  }
}

function writeCompaniesBackup(data) {
  try {
    localStorage.setItem(COMPANIES_BACKUP_KEY, JSON.stringify(data));
    return true;
  } catch (err) {
    console.warn('Could not write companies backup:', err);
    return false;
  }
}

function isValidApplicationList(value) {
  if (!Array.isArray(value)) return false;
  return value.every(item => item && typeof item === 'object' && !Array.isArray(item));
}

function parseApplicationsPayload(raw, keyLabel) {
  if (!raw || !raw.trim()) return null;
  const parsed = JSON.parse(raw);

  if (keyLabel === APPS_RECOVERY_BACKUP_KEY) {
    if (!parsed || typeof parsed !== 'object' || !isValidApplicationList(parsed.apps)) {
      throw new Error('Invalid recovery backup payload');
    }
    return parsed.apps;
  }

  if (!isValidApplicationList(parsed)) {
    throw new Error('Invalid jobs payload');
  }
  return parsed;
}

function readBackupMeta() {
  try {
    const raw = localStorage.getItem(BACKUP_META_KEY);
    if (!raw || !raw.trim()) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function writeBackupMeta(meta) {
  try {
    localStorage.setItem(BACKUP_META_KEY, JSON.stringify(meta));
    return true;
  } catch (err) {
    console.error('Failed to save backup reminder metadata:', err);
    return false;
  }
}

function daysSince(dateValue) {
  if (!dateValue) return Infinity;
  const date = new Date(dateValue);
  if (isNaN(date)) return Infinity;
  const diff = Date.now() - date.getTime();
  return diff / (1000 * 60 * 60 * 24);
}

// ── FILE-BASED COMPANIES STORAGE ───────────────────────────────────────────
async function loadCompaniesFromFile() {
  try {
    const response = await fetch('/api/companies');
    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data)) {
        companies = data;
        // Keep browser backup in sync with server state for offline refresh fallback.
        writeCompaniesBackup(companies);
      } else {
        companies = [];
      }
    } else {
      // API reachable but not healthy: use local backup so refresh keeps data.
      companies = readCompaniesBackup();
    }
  } catch (err) {
    console.warn('Could not load from server, trying direct file fetch:', err);
    try {
      const response = await fetch('companies.json');
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          companies = data;
          writeCompaniesBackup(companies);
        } else {
          companies = [];
        }
      } else {
        companies = readCompaniesBackup();
      }
    } catch (err2) {
      console.warn('Could not load companies from server/file, trying local backup:', err2);
      companies = readCompaniesBackup();
    }
  }
}

async function saveCompaniesToFile() {
  try {
    const response = await fetch('/api/companies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(companies),
    });
    if (response.ok) {
      console.log('Companies saved to file');
      writeCompaniesBackup(companies);
      return true;
    } else {
      console.error('Server error:', response.status);
      // Server responded but rejected save; still keep browser copy persistent.
      return writeCompaniesBackup(companies);
    }
  } catch (err) {
    console.warn('Could not save to server:', err);
    // Fallback to localStorage
    const backedUp = writeCompaniesBackup(companies);
    if (backedUp) console.log('Companies backed up to localStorage');
    return backedUp;
  }
}

function updateBackupReminder() {
  const banner = document.getElementById('backupBanner');
  const label = document.getElementById('backupBannerText');
  if (!banner || !label) return;

  // Backup reminder is only relevant on the Applications tab.
  if (currentTab !== 'applications') {
    banner.hidden = true;
    return;
  }

  if (!applications.length) {
    banner.hidden = true;
    return;
  }

  const meta = readBackupMeta();
  const now = Date.now();
  const snoozeUntil = meta.snoozeUntil ? new Date(meta.snoozeUntil).getTime() : 0;
  if (snoozeUntil && snoozeUntil > now) {
    banner.hidden = true;
    return;
  }

  const days = daysSince(meta.lastCsvExportAt);
  if (days >= BACKUP_REMINDER_DAYS) {
    const suffix = Number.isFinite(days) ? `Last backup ${Math.floor(days)}d ago.` : 'No CSV backup yet.';
    label.textContent = `Backup reminder: export your applications to CSV. ${suffix}`;
    banner.hidden = false;
    return;
  }

  banner.hidden = true;
}

function snoozeBackupReminder() {
  const meta = readBackupMeta();
  const until = new Date(Date.now() + BACKUP_REMINDER_SNOOZE_DAYS * 24 * 60 * 60 * 1000).toISOString();
  meta.snoozeUntil = until;
  writeBackupMeta(meta);
  updateBackupReminder();
  toast(`Backup reminder snoozed for ${BACKUP_REMINDER_SNOOZE_DAYS} days`, 'success');
}

function markCsvBackupExported() {
  const meta = readBackupMeta();
  meta.lastCsvExportAt = new Date().toISOString();
  meta.snoozeUntil = null;
  writeBackupMeta(meta);
  updateBackupReminder();
}

function tryRestoreFromRecoveryBackup(rawBackup) {
  if (!rawBackup || !rawBackup.trim()) return false;
  try {
    applications = parseApplicationsPayload(rawBackup, APPS_RECOVERY_BACKUP_KEY);
    toast('Recovered jobs from internal backup snapshot.', 'success');
    return true;
  } catch (err) {
    console.error('Recovery backup is also invalid:', err);
    return false;
  }
}

// ── INIT ───────────────────────────────────────────────────────────────────
function init() {
  initTheme();
  let stored = null;
  let backupStored = null;
  let hasBootstrapped = false;

  try {
    stored = localStorage.getItem(APPS_STORAGE_KEY);
    backupStored = localStorage.getItem(APPS_RECOVERY_BACKUP_KEY);
    hasBootstrapped = localStorage.getItem(BOOTSTRAP_STORAGE_KEY) === '1';
  } catch (err) {
    console.error('Unable to access localStorage on init:', err);
    applications = [];
    companies = [];
    toast('Storage is blocked. Data cannot be loaded or saved.', 'error');
    render();
    bindEvents();
    return;
  }

  if (stored && stored.trim()) {
    try {
      applications = parseApplicationsPayload(stored, APPS_STORAGE_KEY);
    } catch (err) {
      console.error('Corrupted job storage detected:', err);
      if (!tryRestoreFromRecoveryBackup(backupStored)) {
        applications = [];
        toast('Saved jobs are corrupted. Kept empty to avoid overwriting data.', 'error');
      }
    }
  } else if (!hasBootstrapped) {
    applications = [...SAMPLE_DATA];
    save();
  } else if (tryRestoreFromRecoveryBackup(backupStored)) {
    save();
  } else {
    applications = [];
    toast('No saved jobs found in this browser profile.', 'error');
  }

  // Load companies from file
  loadCompaniesFromFile().then(() => {
    render();
    bindEvents();
    updateBackupReminder();
    renderCompanies();
  });
}

// ── STORAGE ────────────────────────────────────────────────────────────────
function save() {
  try {
    localStorage.setItem(APPS_STORAGE_KEY, JSON.stringify(applications));
    localStorage.setItem(BOOTSTRAP_STORAGE_KEY, '1');

    try {
      localStorage.setItem(APPS_RECOVERY_BACKUP_KEY, JSON.stringify({
        savedAt: new Date().toISOString(),
        apps: applications,
      }));
    } catch (backupErr) {
      console.warn('Saved primary data but failed to refresh recovery snapshot:', backupErr);
    }

    return true;
  } catch (err) {
    console.error('Failed to persist jobs:', err);
    const message = err && err.name === 'QuotaExceededError'
      ? 'Storage full. Export CSV and free browser storage.'
      : 'Save failed. Changes may not persist after refresh.';
    toast(message, 'error');
    return false;
  }
}

async function saveCompanies() {
  try {
    return await saveCompaniesToFile();
  } catch (err) {
    console.error('Failed to persist companies:', err);
    toast('Save failed. Companies may not persist after refresh.', 'error');
    return false;
  }
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

// ── RENDER COMPANIES ──────────────────────────────────────────────────────
function renderCompanies() {
  const tbody = document.getElementById('companiesTableBody');
  const empty = document.getElementById('companiesEmptyState');
  if (!tbody || !empty) return;

  let data = [...companies];

  // Search
  if (companiesSearchQuery) {
    const q = companiesSearchQuery.toLowerCase();
    data = data.filter(c =>
      (c.name || '').toLowerCase().includes(q) ||
      (c.email || '').toLowerCase().includes(q) ||
      (c.link || '').toLowerCase().includes(q)
    );
  }

  // Sort
  data.sort((a, b) => {
    let av = (a[companiesSortCol] || '').toLowerCase();
    let bv = (b[companiesSortCol] || '').toLowerCase();
    if (av < bv) return companiesSortDir === 'asc' ? -1 : 1;
    if (av > bv) return companiesSortDir === 'asc' ? 1 : -1;
    return 0;
  });

  if (!data || data.length === 0) {
    tbody.innerHTML = '';
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';

  tbody.innerHTML = data.map(company => companyRowHTML(company)).join('');
}

function companyRowHTML(company) {
  const name = (company.name || '').trim();
  const email = (company.email || '').trim();
  const link = (company.link || '').trim();
  return `
    <tr data-id="${company.id}">
      <td class="td-company">${esc(name || 'Untitled Company')}</td>
      <td class="td-email">${email ? `<a href="mailto:${esc(email)}">${esc(email)}</a>` : '<span style="color: var(--muted);">-</span>'}</td>
      <td class="td-link">${link ? `<a href="${esc(link)}" target="_blank" rel="noopener">Visit Site →</a>` : '<span style="color: var(--muted);">-</span>'}</td>
      <td onclick="event.stopPropagation()">
        <div class="actions">
          <button class="btn-icon edit" title="Edit" onclick="openEditCompany('${company.id}')">✎</button>
          <button class="btn-icon del" title="Delete" onclick="openDeleteCompany('${company.id}')">✕</button>
        </div>
      </td>
    </tr>`;
}

// ── EXPAND ROW ──────────────────────────────────────────────────────────────
let lastClickedRow = null;
function expandRow(id) {
  const row = document.querySelector(`tr[data-id="${id}"]`);
  if (!row) return;
  
  // Remove highlight from previous row
  if (lastClickedRow && lastClickedRow !== row) {
    lastClickedRow.style.opacity = '1';
  }
  
  // Highlight current row
  row.style.opacity = '0.7';
  lastClickedRow = row;
  
  // Auto-open edit modal (optional - comment out if you prefer just highlighting)
  // openEdit(id);
}

// ── DRAG & DROP ────────────────────────────────────────────────────────────
let draggedRow = null;

function setupDragAndDrop() {
  const tableBody = document.getElementById('tableBody');
  
  tableBody.addEventListener('dragstart', (e) => {
    if (e.target.tagName !== 'TR') return;
    draggedRow = e.target;
    e.target.style.opacity = '0.5';
    e.dataTransfer.effectAllowed = 'move';
  });
  
  tableBody.addEventListener('dragend', (e) => {
    if (e.target.tagName === 'TR') {
      e.target.style.opacity = '1';
    }
    draggedRow = null;
  });
  
  tableBody.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    if (e.target.tagName === 'TD') {
      const targetRow = e.target.closest('tr');
      if (targetRow && targetRow !== draggedRow) {
        targetRow.style.borderTop = '3px solid var(--accent)';
      }
    }
  });
  
  tableBody.addEventListener('dragleave', (e) => {
    if (e.target.tagName === 'TD') {
      const targetRow = e.target.closest('tr');
      if (targetRow) {
        targetRow.style.borderTop = 'none';
      }
    }
  });
  
  tableBody.addEventListener('drop', (e) => {
    e.preventDefault();
    if (!draggedRow) return;
    
    const targetRow = e.target.closest('tr');
    if (targetRow && targetRow !== draggedRow) {
      const draggedId = draggedRow.dataset.id;
      const targetId = targetRow.dataset.id;
      
      // Swap in applications array
      const draggedIdx = applications.findIndex(a => a.id === draggedId);
      const targetIdx = applications.findIndex(a => a.id === targetId);
      
      if (draggedIdx !== -1 && targetIdx !== -1) {
        [applications[draggedIdx], applications[targetIdx]] = [applications[targetIdx], applications[draggedIdx]];
        save();
        render();
      }
    }
  });
}

function rowHTML(app) {
  const status    = app.response || '';
  const rowClass  = rowStatusClass(status);
  const badge     = badgeHTML(status);
  const dateStr   = app.appliedDate ? formatDate(app.appliedDate) : '—';
  const interviewStr = app.interviewTime ? formatDateTime(app.interviewTime) : '—';
  const emailsStr = formatEmails(app.emails || '');

  return `
    <tr class="${rowClass}" data-id="${app.id}" draggable="true" onclick="expandRow('${app.id}')">
      <td class="td-company">${esc(app.company)}</td>
      <td class="td-position">${esc(app.position)}</td>
      <td>${badge}</td>
      <td class="td-notes" title="${esc(app.notes || '')}">${esc(app.notes || '—')}</td>
      <td class="td-date">${dateStr}</td>
      <td class="td-result" title="${esc(app.result || '')}">${esc(app.result || '—')}</td>
      <td class="td-interview" title="${esc(app.interviewTime || '')}">${interviewStr}</td>
      <td class="td-emails">${emailsStr}</td>
      <td onclick="event.stopPropagation()">
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

function formatDateTime(dt) {
  if (!dt) return '—';
  try {
    const date = new Date(dt);
    if (isNaN(date)) return dt;
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const mins = String(date.getMinutes()).padStart(2, '0');
    return `${month}/${day}/${year} ${hours}:${mins}`;
  } catch { return dt; }
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
  const companyEmailInput = document.getElementById('fCompanyEmail');
  if (companyEmailInput) {
    companyEmailInput.required = false;
    companyEmailInput.removeAttribute('required');
  }

  // Tab switching
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      switchTab(btn.dataset.tab);
    });
  });

  // Drag and drop
  setupDragAndDrop();
  
  // Open Add modal
  const openModal = document.getElementById('openModal');
  const openCompanyModal = document.getElementById('openCompanyModal');
  if (openModal) openModal.addEventListener('click', () => openAdd());
  if (openCompanyModal) openCompanyModal.addEventListener('click', () => openAddCompany());

  // Close modal buttons
  const closeModal_ = document.getElementById('closeModal');
  const cancelModal = document.getElementById('cancelModal');
  if (closeModal_) closeModal_.addEventListener('click', closeModal);
  if (cancelModal) cancelModal.addEventListener('click', closeModal);

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

  // Companies search
  const companiesSearchInput = document.getElementById('companiesSearchInput');
  if (companiesSearchInput) {
    companiesSearchInput.addEventListener('input', e => {
      companiesSearchQuery = e.target.value;
      renderCompanies();
    });
  }

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
  const backupExportBtn = document.getElementById('backupExportNow');
  const backupDismissBtn = document.getElementById('backupDismiss');
  if (backupExportBtn) backupExportBtn.addEventListener('click', exportCSV);
  if (backupDismissBtn) backupDismissBtn.addEventListener('click', snoozeBackupReminder);

  // CSV export for companies
  const exportCompaniesCsvBtn = document.getElementById('exportCompaniesCsv');
  if (exportCompaniesCsvBtn) exportCompaniesCsvBtn.addEventListener('click', exportCompaniesCsv);

  // Delete confirm
  document.getElementById('confirmDelete').addEventListener('click', () => {
    if (pendingDeleteId) {
      applications = applications.filter(a => a.id !== pendingDeleteId);
      const saved = save();
      render();
      closeDeleteModal();
      toast(saved ? 'Application deleted' : 'Delete applied locally only', 'error');
    }
  });
  document.getElementById('cancelDelete').addEventListener('click', closeDeleteModal);
  document.getElementById('cancelDelete2').addEventListener('click', closeDeleteModal);
  document.getElementById('deleteOverlay').addEventListener('click', e => {
    if (e.target === document.getElementById('deleteOverlay')) closeDeleteModal();
  });

  // Company modal
  const closeCompanyModal_ = document.getElementById('closeCompanyModal');
  const cancelCompanyModal = document.getElementById('cancelCompanyModal');
  const companyModalOverlay = document.getElementById('companyModalOverlay');
  const companyForm = document.getElementById('companyForm');
  const confirmDeleteCompany = document.getElementById('confirmDeleteCompany');
  const cancelDeleteCompany = document.getElementById('cancelDeleteCompany');
  const cancelDeleteCompany2 = document.getElementById('cancelDeleteCompany2');
  const deleteCompanyOverlay = document.getElementById('deleteCompanyOverlay');

  if (closeCompanyModal_) closeCompanyModal_.addEventListener('click', closeCompanyModal);
  if (cancelCompanyModal) cancelCompanyModal.addEventListener('click', closeCompanyModal);
  if (companyModalOverlay) {
    companyModalOverlay.addEventListener('click', e => {
      if (e.target === companyModalOverlay) closeCompanyModal();
    });
  }
  if (companyForm) companyForm.addEventListener('submit', handleCompanySubmit);

  // Delete company confirm
  if (confirmDeleteCompany) {
    confirmDeleteCompany.addEventListener('click', async () => {
      if (pendingDeleteCompanyId) {
        companies = companies.filter(c => c.id !== pendingDeleteCompanyId);
        const saved = await saveCompanies();
        renderCompanies();
        closeDeleteCompanyModal();
        toast(saved ? 'Company deleted' : 'Delete applied locally only', 'error');
      }
    });
  }
  if (cancelDeleteCompany) cancelDeleteCompany.addEventListener('click', closeDeleteCompanyModal);
  if (cancelDeleteCompany2) cancelDeleteCompany2.addEventListener('click', closeDeleteCompanyModal);
  if (deleteCompanyOverlay) {
    deleteCompanyOverlay.addEventListener('click', e => {
      if (e.target === deleteCompanyOverlay) closeDeleteCompanyModal();
    });
  }
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
  document.getElementById('fInterviewTime').value = app.interviewTime || '';
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

// ── TAB SWITCHING ──────────────────────────────────────────────────────────
function switchTab(tab) {
  currentTab = tab;
  
  // Update tab buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tab);
  });

  // Update sections visibility
  const appSection = document.getElementById('applicationsSection');
  const filtersBar = document.getElementById('applicationsFiltersBar');
  const companiesSection = document.getElementById('companiesSection');
  const companiesFiltersBar = document.getElementById('companiesFiltersBar');
  const addAppBtn = document.getElementById('openModal');
  const addCompanyBtn = document.getElementById('openCompanyModal');
  const headerStats = document.getElementById('header-stats');
  const backupBanner = document.getElementById('backupBanner');

  if (tab === 'applications') {
    if (appSection) appSection.style.display = 'block';
    if (filtersBar) filtersBar.style.display = 'block';
    if (companiesSection) companiesSection.style.display = 'none';
    if (companiesFiltersBar) companiesFiltersBar.style.display = 'none';
    if (addAppBtn) addAppBtn.style.display = 'block';
    if (addCompanyBtn) addCompanyBtn.style.display = 'none';
    if (headerStats) headerStats.style.display = 'flex';
    updateBackupReminder();
  } else if (tab === 'companies') {
    if (appSection) appSection.style.display = 'none';
    if (filtersBar) filtersBar.style.display = 'none';
    if (companiesSection) companiesSection.style.display = 'block';
    if (companiesFiltersBar) companiesFiltersBar.style.display = 'flex';
    if (addAppBtn) addAppBtn.style.display = 'none';
    if (addCompanyBtn) addCompanyBtn.style.display = 'block';
    if (headerStats) headerStats.style.display = 'none';
    if (backupBanner) backupBanner.hidden = true;
    renderCompanies();
  }
}

// ── COMPANY MODAL ──────────────────────────────────────────────────────────
function openAddCompany() {
  document.getElementById('companyModalTitle').textContent = 'New Company';
  document.getElementById('companyForm').reset();
  document.getElementById('editCompanyId').value = '';
  document.getElementById('companyModalOverlay').classList.add('open');
}

function openEditCompany(id) {
  const company = companies.find(c => c.id === id);
  if (!company) return;
  document.getElementById('companyModalTitle').textContent = 'Edit Company';
  document.getElementById('editCompanyId').value = company.id;
  document.getElementById('fCompanyName').value = company.name;
  document.getElementById('fCompanyEmail').value = company.email;
  document.getElementById('fCompanyLink').value = company.link;
  document.getElementById('companyModalOverlay').classList.add('open');
}

function closeCompanyModal() {
  document.getElementById('companyModalOverlay').classList.remove('open');
}

function openDeleteCompany(id) {
  pendingDeleteCompanyId = id;
  document.getElementById('deleteCompanyOverlay').classList.add('open');
}

function closeDeleteCompanyModal() {
  pendingDeleteCompanyId = null;
  document.getElementById('deleteCompanyOverlay').classList.remove('open');
}

// ── FORM SUBMIT ────────────────────────────────────────────────────────────
function handleSubmit(e) {
  e.preventDefault();
  const id = document.getElementById('editId').value;

  const entry = {
    id:            id || uid(),
    company:       document.getElementById('fCompany').value.trim(),
    position:      document.getElementById('fPosition').value.trim(),
    response:      document.getElementById('fResponse').value,
    appliedDate:   document.getElementById('fDate').value,
    notes:         document.getElementById('fNotes').value.trim(),
    result:        document.getElementById('fResult').value.trim(),
    emails:        document.getElementById('fEmails').value.trim(),
    interviewTime: document.getElementById('fInterviewTime').value,
  };

  if (id) {
    const idx = applications.findIndex(a => a.id === id);
    if (idx !== -1) applications[idx] = entry;
  } else {
    applications.unshift(entry);
  }

  const saved = save();
  toast(
    saved
      ? (id ? 'Application updated ✓' : 'Application added ✓')
      : (id ? 'Updated locally only; save failed' : 'Added locally only; save failed'),
    saved ? 'success' : 'error'
  );
  render();
  closeModal();
}

// ── COMPANY FORM SUBMIT ────────────────────────────────────────────────────
async function handleCompanySubmit(e) {
  e.preventDefault();
  const id = document.getElementById('editCompanyId').value;

  const company = {
    id:    id || uid(),
    name:  document.getElementById('fCompanyName').value.trim(),
    email: document.getElementById('fCompanyEmail').value.trim(),
    link:  document.getElementById('fCompanyLink').value.trim(),
  };

  if (id) {
    const idx = companies.findIndex(c => c.id === id);
    if (idx !== -1) companies[idx] = company;
  } else {
    companies.unshift(company);
  }

  const saved = await saveCompanies();
  toast(
    saved
      ? (id ? 'Company updated ✓' : 'Company added ✓')
      : (id ? 'Updated locally only; save failed' : 'Added locally only; save failed'),
    saved ? 'success' : 'error'
  );
  renderCompanies();
  closeCompanyModal();
}

// ── CSV EXPORT ─────────────────────────────────────────────────────────────
function exportCSV() {
  const headers = ['Company','Position','Status','Notes','Applied Date','Result','Interview Time','Emails'];
  const rows = applications.map(a => [
    a.company, a.position, a.response || 'Pending', a.notes || '',
    a.appliedDate || '', a.result || '', a.interviewTime || '', (a.emails || '').replace(/\n/g, ' | ')
  ].map(v => `"${String(v).replace(/"/g,'""')}"`).join(','));

  const csv = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url;
  a.download = `job-applications-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  markCsvBackupExported();
  toast('CSV exported ✓', 'success');
}

// ── TOAST ──────────────────────────────────────────────────────────────────

// ── CSV EXPORT COMPANIES ───────────────────────────────────────────────────
function exportCompaniesCsv() {
  const headers = ['Company Name','Email','Link'];
  const rows = companies.map(c => [
    c.name, c.email, c.link
  ].map(v => `"${String(v).replace(/"/g,'""')}"`).join(','));

  const csv = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url;
  a.download = `companies-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  toast('Companies CSV exported ✓', 'success');
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
