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
  { id: uid(), company: "RBC",                                  position: "Technical Analyst",                                           response: "",              notes: "",                                                              appliedDate: "2025-12-30", result: "",          emails: "" },
  { id: uid(), company: "Elastic",                              position: "Software Engineer II",                                        response: "Rejected",      notes: "",                                                              appliedDate: "2025-12-30", result: "",          emails: "" },
  { id: uid(), company: "AbbVie",                               position: "Associate Scientist, Quality Control",                        response: "Rejected",      notes: "",                                                              appliedDate: "2025-12-30", result: "",          emails: "" },
  { id: uid(), company: "AbbVie",                               position: "Associate Data Scientist II",                                 response: "Rejected",      notes: "",                                                              appliedDate: "2025-12-30", result: "",          emails: "" },
  { id: uid(), company: "AbbVie",                               position: "Data Engineer",                                               response: "Rejected",      notes: "",                                                              appliedDate: "2025-12-30", result: "",          emails: "" },
  { id: uid(), company: "Affirm",                               position: "Software Engineer II",                                        response: "Rejected",      notes: "",                                                              appliedDate: "2025-12-30", result: "",          emails: "" },
  { id: uid(), company: "Ramp",                                 position: "Software Engineer, Frontend",                                 response: "Waiting",       notes: "Frontend Technical - DONE",                                     appliedDate: "2025-12-30", result: "Rejected",  emails: "" },
  { id: uid(), company: "McDonald",                             position: "Specialist, Development",                                     response: "",              notes: "",                                                              appliedDate: "2025-12-30", result: "",          emails: "" },
  { id: uid(), company: "McDonald",                             position: "Staff Designer, UX Design",                                   response: "",              notes: "",                                                              appliedDate: "2025-12-30", result: "",          emails: "" },
  { id: uid(), company: "McDonald",                             position: "Front-End Engineer (All Products)",                           response: "",              notes: "",                                                              appliedDate: "2025-12-30", result: "",          emails: "" },
  { id: uid(), company: "Intact",                               position: "Tech Automation Developer I/II",                              response: "",              notes: "",                                                              appliedDate: "2025-12-30", result: "",          emails: "" },
  { id: uid(), company: "Intact",                               position: "Marketing Website Senior UX-UI Designer",                    response: "Rejected",      notes: "",                                                              appliedDate: "2025-12-30", result: "",          emails: "" },
  { id: uid(), company: "Duolingo",                             position: "Associate Product Manager",                                   response: "Rejected",      notes: "",                                                              appliedDate: "2025-12-31", result: "",          emails: "Jaylyn Jones: jaylyn@duolingo.com" },
  { id: uid(), company: "Netflix",                              position: "Data Engineering Intern",                                     response: "",              notes: "",                                                              appliedDate: "2025-12-31", result: "",          emails: "" },
  { id: uid(), company: "Netflix",                              position: "Analytics Engineer (L4) - Ads",                               response: "",              notes: "",                                                              appliedDate: "2025-12-31", result: "",          emails: "" },
  { id: uid(), company: "Netflix",                              position: "Distributed Systems Engineer (L4) - Data Platform",           response: "",              notes: "",                                                              appliedDate: "2025-12-31", result: "",          emails: "" },
  { id: uid(), company: "DHL",                                  position: "Business Data Analyst II",                                    response: "",              notes: "",                                                              appliedDate: "2025-12-31", result: "",          emails: "" },
  // ── January 2026 ──
  { id: uid(), company: "Ramp",                                 position: "Frontend Engineer, Growth, Mid-Level",                        response: "Waiting",       notes: "Frontend Technical - DONE",                                     appliedDate: "2026-01-01", result: "",          emails: "" },
  { id: uid(), company: "Ramp",                                 position: "Senior Product/Web Designer",                                 response: "Rejected",      notes: "",                                                              appliedDate: "2026-01-01", result: "",          emails: "" },
  { id: uid(), company: "Ramp",                                 position: "Software Engineer, Growth Platform, Mid-Level",               response: "Waiting",       notes: "Coding Technical - DONE",                                       appliedDate: "2026-01-01", result: "",          emails: "" },
  { id: uid(), company: "Veeva Systems",                        position: "Associate Software Engineer",                                 response: "Rejected",      notes: "",                                                              appliedDate: "2026-01-01", result: "",          emails: "" },
  { id: uid(), company: "Accenture",                            position: "AI & Data - Tailored Data Analyst",                          response: "Rejected",      notes: "",                                                              appliedDate: "2026-01-01", result: "",          emails: "" },
  { id: uid(), company: "InterSet",                             position: "Software Engineer I",                                         response: "Rejected",      notes: "",                                                              appliedDate: "2026-01-01", result: "",          emails: "" },
  { id: uid(), company: "Flint AI",                             position: "Founding Software Engineer",                                  response: "Intro Interview", notes: "",                                                            appliedDate: "2026-01-01", result: "Rejected",  emails: "" },
  { id: uid(), company: "Sturgey",                              position: "Software Developer in Test",                                  response: "",              notes: "",                                                              appliedDate: "2026-01-03", result: "",          emails: "" },
  { id: uid(), company: "Sturgey",                              position: "Associate Software Engineer",                                 response: "",              notes: "",                                                              appliedDate: "2026-01-03", result: "",          emails: "" },
  { id: uid(), company: "Mass General Brigham",                 position: "Data Engineer",                                               response: "",              notes: "",                                                              appliedDate: "2026-01-03", result: "",          emails: "" },
  { id: uid(), company: "Stripe",                               position: "Software Engineer, New Grad",                                 response: "",              notes: "",                                                              appliedDate: "2026-01-06", result: "",          emails: "" },
  { id: uid(), company: "Konrad",                               position: "Software Developer Entry Level, Grad",                        response: "",              notes: "",                                                              appliedDate: "2026-01-06", result: "",          emails: "" },
  { id: uid(), company: "Konrad",                               position: "Data Engineer",                                               response: "",              notes: "",                                                              appliedDate: "2026-01-06", result: "",          emails: "" },
  { id: uid(), company: "Konrad",                               position: "Associate UX/UI Designer, Grad",                              response: "",              notes: "",                                                              appliedDate: "2026-01-06", result: "",          emails: "" },
  { id: uid(), company: "Konrad",                               position: "Associate UX Designer",                                       response: "",              notes: "",                                                              appliedDate: "2026-01-06", result: "",          emails: "" },
  { id: uid(), company: "Zip",                                  position: "Software Engineer, New Grad",                                 response: "Rejected",      notes: "",                                                              appliedDate: "2026-01-06", result: "",          emails: "" },
  { id: uid(), company: "Zip",                                  position: "Software Engineer, Frontend",                                 response: "Rejected",      notes: "",                                                              appliedDate: "2026-01-06", result: "",          emails: "" },
  { id: uid(), company: "SpaceX",                               position: "GNC Software Engineer",                                       response: "Rejected",      notes: "",                                                              appliedDate: "2026-01-06", result: "",          emails: "" },
  { id: uid(), company: "Align",                                position: "Jr. Data Engineer",                                           response: "",              notes: "",                                                              appliedDate: "2026-01-06", result: "",          emails: "" },
  { id: uid(), company: "N & T Global Services",                position: "IT Analyst",                                                  response: "Rejected",      notes: "",                                                              appliedDate: "2026-01-06", result: "",          emails: "" },
  { id: uid(), company: "CAPRIZE",                              position: "Junior Software/Graphics Developer",                          response: "Phone Interview", notes: "Get In-person Int",                                          appliedDate: "2026-01-08", result: "I said No", emails: "" },
  { id: uid(), company: "General Direction Systems",            position: "Software Engineer",                                           response: "",              notes: "",                                                              appliedDate: "2026-01-11", result: "",          emails: "" },
  { id: uid(), company: "Solar Space",                          position: "Software Developer Engineer in Test",                         response: "Rejected",      notes: "",                                                              appliedDate: "2026-01-11", result: "",          emails: "" },
  { id: uid(), company: "Cadillac F1",                          position: "Data Quality Engineer",                                       response: "Rejected",      notes: "",                                                              appliedDate: "2026-01-11", result: "",          emails: "" },
  { id: uid(), company: "General Motors",                       position: "Entry-Level Data Engineer",                                   response: "",              notes: "",                                                              appliedDate: "2026-01-11", result: "",          emails: "" },
  { id: uid(), company: "Xtolia",                               position: "Data Engineer",                                               response: "Rejected",      notes: "",                                                              appliedDate: "2026-01-15", result: "",          emails: "" },
  { id: uid(), company: "PureFacts",                            position: "Data Engineer",                                               response: "",              notes: "",                                                              appliedDate: "2026-01-15", result: "",          emails: "" },
  { id: uid(), company: "MANUAL",                               position: "Senior Protocol Engineer",                                    response: "Interview",     notes: "",                                                              appliedDate: "2026-01-15", result: "Rejected",  emails: "Jenny Vidler: jenny.vidler@manual.teamtailor-mail.com" },
  { id: uid(), company: "Oracle",                               position: "Undergrad Technical Program Manager",                         response: "",              notes: "",                                                              appliedDate: "2026-01-15", result: "",          emails: "" },
  { id: uid(), company: "Palantir",                             position: "Product Designer, New Grad - Developer Experience",           response: "",              notes: "",                                                              appliedDate: "2026-01-15", result: "",          emails: "" },
  { id: uid(), company: "Warp",                                 position: "Software Engineer",                                           response: "Rejected",      notes: "",                                                              appliedDate: "2026-01-15", result: "",          emails: "" },
  { id: uid(), company: "Palantir",                             position: "Engineer",                                                    response: "",              notes: "Reach out in Mid March",                                        appliedDate: "2026-01-15", result: "",          emails: "" },
  { id: uid(), company: "Palantir",                             position: "Software Engineer, New Grad",                                 response: "",              notes: "",                                                              appliedDate: "2026-01-16", result: "",          emails: "" },
  { id: uid(), company: "Ando",                                 position: "BizOps",                                                      response: "",              notes: "",                                                              appliedDate: "2026-01-16", result: "",          emails: "" },
  { id: uid(), company: "Ando",                                 position: "Product Designer",                                            response: "",              notes: "",                                                              appliedDate: "2026-01-16", result: "",          emails: "" },
  { id: uid(), company: "Ando",                                 position: "Project Engineer",                                            response: "",              notes: "",                                                              appliedDate: "2026-01-16", result: "",          emails: "" },
  { id: uid(), company: "Walmart",                              position: "Data Analyst",                                                response: "Rejected",      notes: "",                                                              appliedDate: "2026-01-17", result: "",          emails: "" },
  { id: uid(), company: "Walmart",                              position: "Data Engineer",                                               response: "Rejected",      notes: "",                                                              appliedDate: "2026-01-17", result: "",          emails: "" },
  { id: uid(), company: "Walmart",                              position: "Product Manager",                                             response: "",              notes: "",                                                              appliedDate: "2026-01-17", result: "",          emails: "" },
  { id: uid(), company: "Shopify",                              position: "Data Engineer",                                               response: "Rejected",      notes: "",                                                              appliedDate: "2026-01-17", result: "",          emails: "" },
  { id: uid(), company: "AI local",                             position: "Data Engineer",                                               response: "2nd Interview", notes: "",                                                              appliedDate: "2026-01-17", result: "I said No", emails: "Christine Hui: christine.hui@ailocal.ai" },
  { id: uid(), company: "Fusion Analytics",                     position: "Consultant",                                                  response: "",              notes: "",                                                              appliedDate: "2026-01-18", result: "",          emails: "" },
  { id: uid(), company: "Fusion Analytics",                     position: "Data Scientist",                                              response: "",              notes: "",                                                              appliedDate: "2026-01-18", result: "",          emails: "" },
  { id: uid(), company: "Fusion Analytics",                     position: "Financial Analyst",                                           response: "",              notes: "",                                                              appliedDate: "2026-01-18", result: "",          emails: "" },
  { id: uid(), company: "Toronto Blue Jays",                    position: "Technology",                                                  response: "Rejected",      notes: "",                                                              appliedDate: "2026-01-19", result: "",          emails: "" },
  { id: uid(), company: "Zip",                                  position: "Software Engineer, New Grad (2026 Start) - CAN",              response: "",              notes: "",                                                              appliedDate: "2026-01-19", result: "",          emails: "" },
  { id: uid(), company: "McLaren",                              position: "Junior Data Analysis and Visualization Engineer",             response: "Rejected",      notes: "",                                                              appliedDate: "2026-01-19", result: "",          emails: "" },
  { id: uid(), company: "Scale AI",                             position: "Software Engineer, New Grad",                                 response: "Rejected",      notes: "",                                                              appliedDate: "2026-01-19", result: "",          emails: "" },
  { id: uid(), company: "Vali",                                 position: "Data Engineer",                                               response: "",              notes: "",                                                              appliedDate: "2026-01-19", result: "",          emails: "" },
  { id: uid(), company: "TikTok",                               position: "Data Analyst",                                                response: "",              notes: "",                                                              appliedDate: "2026-01-19", result: "",          emails: "" },
  { id: uid(), company: "Nurix Labs",                           position: "Software Engineer, Frontend",                                 response: "Rejected",      notes: "",                                                              appliedDate: "2026-01-20", result: "",          emails: "" },
  { id: uid(), company: "Canonical",                            position: "Graduate Recruitment Opportunities",                          response: "",              notes: "",                                                              appliedDate: "2026-01-20", result: "",          emails: "" },
  { id: uid(), company: "Blue J",                               position: "Product Data Analyst",                                        response: "Rejected",      notes: "",                                                              appliedDate: "2026-01-21", result: "",          emails: "" },
  { id: uid(), company: "NY Mets",                              position: "Junior Data Engineer",                                        response: "",              notes: "",                                                              appliedDate: "2026-01-21", result: "",          emails: "" },
  { id: uid(), company: "Shopbreaker",                          position: "Data Engineering Analyst",                                    response: "Rejected",      notes: "",                                                              appliedDate: "2026-01-21", result: "",          emails: "" },
  { id: uid(), company: "HIM Group",                            position: "Software Engineer",                                           response: "",              notes: "Said Re-apply after Graduation",                                appliedDate: "2026-01-21", result: "",          emails: "" },
  { id: uid(), company: "HIM Group",                            position: "Data and Analytics Engineer",                                 response: "",              notes: "",                                                              appliedDate: "2026-01-21", result: "",          emails: "" },
  { id: uid(), company: "IBM",                                  position: "Data Engineer Entry-Level",                                   response: "",              notes: "",                                                              appliedDate: "2026-01-22", result: "",          emails: "" },
  { id: uid(), company: "CLEAR",                                position: "Software Engineer",                                           response: "Rejected",      notes: "",                                                              appliedDate: "2026-01-22", result: "",          emails: "" },
  { id: uid(), company: "Veeva Systems",                        position: "Associate Software Engineer",                                 response: "Waiting",       notes: "",                                                              appliedDate: "2026-01-23", result: "",          emails: "" },
  { id: uid(), company: "Fidelity",                             position: "Data Engineer",                                               response: "",              notes: "",                                                              appliedDate: "2026-01-23", result: "",          emails: "" },
  { id: uid(), company: "Essential Clinic",                     position: "Software Developer",                                          response: "Rejected",      notes: "Asked for Transcript and a form",                               appliedDate: "2026-01-23", result: "",          emails: "" },
  { id: uid(), company: "Leland",                               position: "Graphic Designer",                                            response: "",              notes: "",                                                              appliedDate: "2026-01-24", result: "",          emails: "" },
  { id: uid(), company: "Coinbase",                             position: "Product Designer Intern",                                     response: "",              notes: "",                                                              appliedDate: "2026-01-24", result: "",          emails: "" },
  { id: uid(), company: "Coinbase",                             position: "Software Engineer, Frontend",                                 response: "Rejected",      notes: "",                                                              appliedDate: "2026-01-24", result: "",          emails: "" },
  { id: uid(), company: "Coinbase",                             position: "Software Engineer, Frontend",                                 response: "",              notes: "",                                                              appliedDate: "2026-01-24", result: "",          emails: "" },
  { id: uid(), company: "Coinbase",                             position: "Staff Analytics Engineer",                                    response: "Rejected",      notes: "",                                                              appliedDate: "2026-01-24", result: "",          emails: "" },
  { id: uid(), company: "ByteDance",                            position: "Software Engineer Intern",                                    response: "",              notes: "",                                                              appliedDate: "2026-01-24", result: "",          emails: "" },
  { id: uid(), company: "ByteDance",                            position: "Data Engineering Graduate",                                   response: "",              notes: "",                                                              appliedDate: "2026-01-24", result: "",          emails: "" },
  { id: uid(), company: "ByteDance",                            position: "Software Developer Engineer in Test",                         response: "",              notes: "Technical Assessment",                                          appliedDate: "2026-01-24", result: "",          emails: "" },
  { id: uid(), company: "IBM",                                  position: "Associate Data Engineer 2026",                                response: "Rejected",      notes: "",                                                              appliedDate: "2026-01-25", result: "",          emails: "" },
  { id: uid(), company: "IBM",                                  position: "Developer: Automation Development & Testing",                 response: "Rejected",      notes: "",                                                              appliedDate: "2026-01-25", result: "",          emails: "" },
  { id: uid(), company: "IBM",                                  position: "Associate Application Developer 2026",                        response: "Rejected",      notes: "",                                                              appliedDate: "2026-01-25", result: "",          emails: "" },
  { id: uid(), company: "IBM",                                  position: "Entry Level QA/Test Developer",                               response: "Waiting",       notes: "Coding Assessment",                                             appliedDate: "2026-01-25", result: "Rejected",  emails: "" },
  { id: uid(), company: "CoLab",                                position: "Frontend Engineer",                                           response: "Rejected",      notes: "",                                                              appliedDate: "2026-01-25", result: "",          emails: "" },
  { id: uid(), company: "Uber",                                 position: "Data Analyst II",                                             response: "Rejected",      notes: "",                                                              appliedDate: "2026-01-28", result: "",          emails: "" },
  { id: uid(), company: "Wave HQ",                              position: "Data Analyst",                                                response: "Rejected",      notes: "",                                                              appliedDate: "2026-01-28", result: "",          emails: "" },
  { id: uid(), company: "Moka",                                 position: "Solutions Engineer",                                          response: "Rejected",      notes: "",                                                              appliedDate: "2026-01-29", result: "",          emails: "" },
  { id: uid(), company: "Block (CashApp)",                      position: "Biz Data Analyst",                                            response: "Rejected",      notes: "",                                                              appliedDate: "2026-01-29", result: "",          emails: "" },
  { id: uid(), company: "Samsara",                              position: "Software Engineer, New Grad",                                 response: "Rejected",      notes: "",                                                              appliedDate: "2026-01-30", result: "",          emails: "" },
  { id: uid(), company: "Sneer.com",                            position: "Software Engineer Intern",                                    response: "",              notes: "",                                                              appliedDate: "2026-01-30", result: "",          emails: "" },
  { id: uid(), company: "Sneer.com",                            position: "Data Engineering Intern",                                     response: "",              notes: "",                                                              appliedDate: "2026-01-30", result: "",          emails: "" },
  { id: uid(), company: "Crowdstrike",                          position: "Data and Automation Analyst",                                 response: "Rejected",      notes: "",                                                              appliedDate: "2026-01-30", result: "",          emails: "" },
  { id: uid(), company: "Crowdstrike",                          position: "Software Engineer Intern",                                    response: "Rejected",      notes: "",                                                              appliedDate: "2026-01-30", result: "",          emails: "" },
  { id: uid(), company: "Particle Health",                      position: "Data Engineer",                                               response: "",              notes: "",                                                              appliedDate: "2026-01-30", result: "",          emails: "" },
  { id: uid(), company: "Vendifax",                             position: "Data Intern",                                                 response: "",              notes: "",                                                              appliedDate: "2026-01-30", result: "",          emails: "" },
  { id: uid(), company: "Cimerlo AI",                           position: "Frontend Engineer (New Grad)",                                response: "",              notes: "",                                                              appliedDate: "2026-01-30", result: "",          emails: "" },
  { id: uid(), company: "Veeva Systems",                        position: "Associate Software Engineer",                                 response: "",              notes: "",                                                              appliedDate: "2026-01-30", result: "",          emails: "" },
  { id: uid(), company: "Warner Bros.",                         position: "Data Scientist",                                              response: "Rejected",      notes: "",                                                              appliedDate: "2026-01-30", result: "",          emails: "" },
  { id: uid(), company: "Check Point",                          position: "Software Developer",                                          response: "",              notes: "",                                                              appliedDate: "2026-01-31", result: "",          emails: "" },
  { id: uid(), company: "Chulo",                                position: "Founding Software Engineer",                                  response: "",              notes: "",                                                              appliedDate: "2026-01-31", result: "",          emails: "" },
  // ── Feburay 2026 ──
  { id: uid(), company: "Point",                                position: "Data Analytics Engineer 8 month",                             response: "Rejected",      notes: "",                                                              appliedDate: "2026-02-02", result: "",          emails: "" },
  { id: uid(), company: "HockeyStack",                          position: "Data Analyst",                                                response: "",              notes: "",                                                              appliedDate: "2026-02-02", result: "",          emails: "" },
  { id: uid(), company: "Jerry",                                position: "Software Developer Entry Level",                              response: "",              notes: "",                                                              appliedDate: "2026-02-02", result: "",          emails: "" },
  { id: uid(), company: "Chime",                                position: "Data Analyst",                                                response: "Rejected",      notes: "",                                                              appliedDate: "2026-02-02", result: "",          emails: "" },
  { id: uid(), company: "SpreeAD",                              position: "Software Engineer",                                           response: "Intro Interview, Second Interview", notes: "",                                         appliedDate: "2026-02-02", result: "Rejected",  emails: "Mario Hebert: mario.hebert@spreeaid.com" },
  { id: uid(), company: "SpaceX",                               position: "Software Engineer Intern",                                    response: "",              notes: "",                                                              appliedDate: "2026-02-04", result: "",          emails: "" },
  { id: uid(), company: "Verkada",                              position: "Frontend Engineer (New Grad)",                                response: "Rejected",      notes: "",                                                              appliedDate: "2026-02-04", result: "",          emails: "" },
  { id: uid(), company: "Tangram",                              position: "Product and Technology Analytics",                            response: "Rejected",      notes: "",                                                              appliedDate: "2026-02-04", result: "",          emails: "" },
  { id: uid(), company: "Viru Financial",                       position: "Automation Engineer",                                         response: "",              notes: "",                                                              appliedDate: "2026-02-05", result: "",          emails: "" },
  { id: uid(), company: "Expedia Group",                        position: "Software Developer Grad",                                     response: "",              notes: "",                                                              appliedDate: "2026-02-05", result: "",          emails: "" },
  { id: uid(), company: "Chainmine Inc",                        position: "Junior Software Engineering",                                 response: "",              notes: "",                                                              appliedDate: "2026-02-05", result: "",          emails: "" },
  { id: uid(), company: "Cambres",                              position: "QA Data Coordinator",                                         response: "",              notes: "",                                                              appliedDate: "2026-02-05", result: "",          emails: "" },
  { id: uid(), company: "Gee Mutual",                           position: "Associate Data Engineer 2026",                                response: "",              notes: "",                                                              appliedDate: "2026-02-05", result: "",          emails: "Julia Schmit: jschmidt@GeeMutual.ca" },
  { id: uid(), company: "Gee Mutual",                           position: "Software Developer Grad",                                     response: "Rejected",      notes: "",                                                              appliedDate: "2026-02-05", result: "",          emails: "Julia Schmit: jschmidt@GeeMutual.ca" },
  { id: uid(), company: "Gee Mutual",                           position: "Data Analyst",                                                response: "",              notes: "",                                                              appliedDate: "2026-02-05", result: "",          emails: "" },
  { id: uid(), company: "Robinhood",                            position: "Web Developer",                                               response: "",              notes: "",                                                              appliedDate: "2026-02-06", result: "",          emails: "" },
  { id: uid(), company: "Robinhood",                            position: "Software",                                                    response: "",              notes: "",                                                              appliedDate: "2026-02-06", result: "",          emails: "" },
  { id: uid(), company: "IBM",                                  position: "Entry Level Designer",                                        response: "Rejected",      notes: "",                                                              appliedDate: "2026-02-06", result: "",          emails: "" },
  { id: uid(), company: "Pulse",                                position: "Design Engineer",                                             response: "",              notes: "",                                                              appliedDate: "2026-02-06", result: "",          emails: "" },
  { id: uid(), company: "Pulse",                                position: "Software Engineer",                                           response: "",              notes: "",                                                              appliedDate: "2026-02-06", result: "",          emails: "" },
  { id: uid(), company: "Connor, Clark & Lunn Financial Group", position: "Quant Data Sci",                                              response: "",              notes: "",                                                              appliedDate: "2026-02-06", result: "",          emails: "" },
  { id: uid(), company: "Connor, Clark & Lunn Financial Group", position: "Quant Software",                                              response: "",              notes: "",                                                              appliedDate: "2026-02-06", result: "",          emails: "" },
  { id: uid(), company: "Aurora",                               position: "Data Analyst",                                                response: "Rejected",      notes: "",                                                              appliedDate: "2026-02-06", result: "",          emails: "" },
  { id: uid(), company: "Canadian Tire",                        position: "Junior Analyst",                                              response: "",              notes: "",                                                              appliedDate: "2026-02-07", result: "",          emails: "" },
  { id: uid(), company: "Ramp",                                 position: "Data Scientist - All Levels",                                 response: "",              notes: "",                                                              appliedDate: "2026-02-09", result: "",          emails: "" },
  { id: uid(), company: "Ramp",                                 position: "Software Engineer New Grad FE",                               response: "Rejected",      notes: "Technical Assessment",                                          appliedDate: "2026-02-09", result: "",          emails: "" },
  { id: uid(), company: "IBM",                                  position: "Quant Data Analyst",                                          response: "",              notes: "",                                                              appliedDate: "2026-02-09", result: "",          emails: "" },
  { id: uid(), company: "Jarvis Recruiting",                    position: "Jr. Data Engineer",                                           response: "",              notes: "",                                                              appliedDate: "2026-02-10", result: "",          emails: "" },
  { id: uid(), company: "Bevel",                                position: "Software Developer",                                          response: "",              notes: "",                                                              appliedDate: "2026-02-10", result: "",          emails: "" },
  { id: uid(), company: "Red Bull",                             position: "Graduate Program, Data Process & Governance",                 response: "",              notes: "",                                                              appliedDate: "2026-02-11", result: "",          emails: "" },
  { id: uid(), company: "Point.io",                             position: "Data Engineer",                                               response: "Rejected",      notes: "",                                                              appliedDate: "2026-02-11", result: "",          emails: "" },
  { id: uid(), company: "Congestion",                           position: "Product Engineer",                                            response: "",              notes: "",                                                              appliedDate: "2026-02-11", result: "",          emails: "" },
  { id: uid(), company: "Congestion",                           position: "Deployed Engineer",                                           response: "",              notes: "",                                                              appliedDate: "2026-02-11", result: "",          emails: "" },
  { id: uid(), company: "Senvion",                              position: "Associate Engineer, Software Engineering New Grad",           response: "",              notes: "",                                                              appliedDate: "2026-02-11", result: "",          emails: "" },
  { id: uid(), company: "Airbnb",                               position: "Data Science, Algorithms",                                    response: "Rejected",      notes: "",                                                              appliedDate: "2026-02-11", result: "",          emails: "" },
  { id: uid(), company: "Airtnb",                               position: "Software Engineer",                                           response: "",              notes: "",                                                              appliedDate: "2026-02-11", result: "",          emails: "" },
  { id: uid(), company: "Zip",                                  position: "Product Designer (New Grad)",                                 response: "",              notes: "",                                                              appliedDate: "2026-02-11", result: "",          emails: "" },
  { id: uid(), company: "Robinhood",                            position: "Software Engineer Intern Backend",                            response: "Rejected",      notes: "",                                                              appliedDate: "2026-02-11", result: "",          emails: "" },
  { id: uid(), company: "Robinhood",                            position: "Software Engineer Intern Web",                                response: "Rejected",      notes: "",                                                              appliedDate: "2026-02-11", result: "",          emails: "" },
  { id: uid(), company: "Robinhood",                            position: "Software Engineer New Grad",                                  response: "",              notes: "",                                                              appliedDate: "2026-02-11", result: "",          emails: "" },
  { id: uid(), company: "Duolingo",                             position: "QA Specialist Grad",                                          response: "",              notes: "",                                                              appliedDate: "2026-02-12", result: "",          emails: "Jaylyn Jones: jaylyn@duolingo.com" },
  { id: uid(), company: "Atlassian",                            position: "Associate Product Manager Grad",                              response: "Rejected",      notes: "",                                                              appliedDate: "2026-02-12", result: "",          emails: "" },
  { id: uid(), company: "Softtable",                            position: "Software Engineer New Grad",                                  response: "",              notes: "",                                                              appliedDate: "2026-02-12", result: "",          emails: "" },
  { id: uid(), company: "Jetson Home",                          position: "Software Engineer, Business Automation",                      response: "",              notes: "",                                                              appliedDate: "2026-02-12", result: "",          emails: "" },
  { id: uid(), company: "Jetson Home",                          position: "Data & ML Engineer",                                          response: "",              notes: "",                                                              appliedDate: "2026-02-12", result: "",          emails: "" },
  { id: uid(), company: "easytech",                             position: "Software Developer Grad",                                     response: "Rejected",      notes: "",                                                              appliedDate: "2026-02-12", result: "",          emails: "" },
  { id: uid(), company: "Ripple",                               position: "Web Design Intern",                                           response: "",              notes: "",                                                              appliedDate: "2026-02-15", result: "",          emails: "" },
  { id: uid(), company: "AMD",                                  position: "UI Design Intern/Co-Op",                                      response: "",              notes: "",                                                              appliedDate: "2026-02-16", result: "",          emails: "" },
  { id: uid(), company: "AMD",                                  position: "Graduate Trainee / Software Developer",                       response: "Rejected",      notes: "",                                                              appliedDate: "2026-02-16", result: "",          emails: "" },
  { id: uid(), company: "AMD",                                  position: "Data Analyst Intern/Co-Op",                                   response: "",              notes: "",                                                              appliedDate: "2026-02-16", result: "",          emails: "" },
  { id: uid(), company: "Comryan",                              position: "Data Analyst",                                                response: "Rejected",      notes: "",                                                              appliedDate: "2026-02-17", result: "",          emails: "" },
  { id: uid(), company: "Profisee",                             position: "Software Engineer New Grad",                                  response: "",              notes: "",                                                              appliedDate: "2026-02-17", result: "",          emails: "" },
  { id: uid(), company: "Databricks",                           position: "Software Developer Grad",                                     response: "Rejected",      notes: "",                                                              appliedDate: "2026-02-17", result: "",          emails: "" },
  { id: uid(), company: "Ripple",                               position: "Data Engineering Intern",                                     response: "",              notes: "",                                                              appliedDate: "2026-02-17", result: "",          emails: "" },
  { id: uid(), company: "Profound",                             position: "Data Engineer",                                               response: "",              notes: "",                                                              appliedDate: "2026-02-17", result: "",          emails: "" },
  { id: uid(), company: "IXL Learning",                         position: "Software Engineer New Grad",                                  response: "",              notes: "",                                                              appliedDate: "2026-02-17", result: "",          emails: "" },
  { id: uid(), company: "LPL Financial",                        position: "Technology, Data Analytics New Grad",                         response: "",              notes: "",                                                              appliedDate: "2026-02-17", result: "",          emails: "" },
  { id: uid(), company: "Candid Health",                        position: "Software Engineer New Grad",                                  response: "Rejected",      notes: "",                                                              appliedDate: "2026-02-17", result: "",          emails: "" },
  { id: uid(), company: "Susquehanna",                          position: "Quant Developer New Grad",                                    response: "Waiting",       notes: "OA - Done",                                                     appliedDate: "2026-02-17", result: "",          emails: "" },
  { id: uid(), company: "PermitFlow",                           position: "Software Engineer New Grad",                                  response: "",              notes: "",                                                              appliedDate: "2026-02-17", result: "",          emails: "" },
  { id: uid(), company: "Cerebras Systems",                     position: "CoDesign & NextGen - New College Grad",                       response: "",              notes: "",                                                              appliedDate: "2026-02-18", result: "",          emails: "" },
  { id: uid(), company: "TSMC Health",                          position: "Software Engineer New Grad",                                  response: "",              notes: "",                                                              appliedDate: "2026-02-18", result: "",          emails: "" },
  { id: uid(), company: "NRC Health",                           position: "Data Specialist",                                             response: "Rejected",      notes: "",                                                              appliedDate: "2026-02-18", result: "",          emails: "" },
  { id: uid(), company: "Gobul Capital",                        position: "Junior Analyst, Data Management",                             response: "",              notes: "",                                                              appliedDate: "2026-02-18", result: "",          emails: "" },
  { id: uid(), company: "Quanta",                               position: "Software Engineer I",                                         response: "",              notes: "",                                                              appliedDate: "2026-02-18", result: "",          emails: "" },
  { id: uid(), company: "Beghou",                               position: "Associate Data Engineer",                                     response: "",              notes: "",                                                              appliedDate: "2026-02-18", result: "",          emails: "" },
  { id: uid(), company: "Relx",                                 position: "Software Engineer I",                                         response: "",              notes: "",                                                              appliedDate: "2026-02-18", result: "",          emails: "" },
  { id: uid(), company: "StructureCraft",                       position: "Software Developer",                                          response: "Intro Call - Done", notes: "Systems Design",                                          appliedDate: "2026-02-18", result: "",          emails: "" },
  { id: uid(), company: "IXL Learning",                         position: "Software Engineer Intern",                                    response: "Waiting",       notes: "OA - Done",                                                     appliedDate: "2026-02-20", result: "",          emails: "" },
  { id: uid(), company: "IXL Learning",                         position: "Software Engineer New Grad",                                  response: "",              notes: "",                                                              appliedDate: "2026-02-20", result: "",          emails: "" },
  { id: uid(), company: "IXL Learning",                         position: "Software Engineer New Grad",                                  response: "",              notes: "",                                                              appliedDate: "2026-02-20", result: "",          emails: "" },
  { id: uid(), company: "Serval",                               position: "Forward Deployed Engineer",                                   response: "",              notes: "",                                                              appliedDate: "2026-02-20", result: "",          emails: "" },
  { id: uid(), company: "Momentic",                             position: "Founding Engineer (Generalist)",                              response: "",              notes: "",                                                              appliedDate: "2026-02-20", result: "",          emails: "" },
  { id: uid(), company: "Endex",                                position: "Eng Pos",                                                     response: "Intro Call - Done", notes: "",                                                        appliedDate: "2026-02-20", result: "Waiting",   emails: "Alexander Bower: xander@endex.ai\nKaela Gero: kaela@endex.ai\nTarun Amau (CEO): tarun@endex.ai\nDenys Inhul: denys@endex.ai" },
  { id: uid(), company: "Sophos",                               position: "Software Engineer I",                                         response: "",              notes: "",                                                              appliedDate: "2026-02-21", result: "",          emails: "" },
  { id: uid(), company: "Oracle",                               position: "Data Analyst Intern/Co-Op",                                   response: "",              notes: "",                                                              appliedDate: "2026-02-23", result: "",          emails: "" },
  { id: uid(), company: "Allium",                               position: "Generalist Intern",                                           response: "",              notes: "",                                                              appliedDate: "2026-02-23", result: "",          emails: "" },
  { id: uid(), company: "Snowflake",                            position: "Software Engineer Intern",                                    response: "",              notes: "",                                                              appliedDate: "2026-02-24", result: "",          emails: "" },
  { id: uid(), company: "Scopely",                              position: "Software Engineer Intern",                                    response: "",              notes: "",                                                              appliedDate: "2026-02-24", result: "",          emails: "" },
  { id: uid(), company: "Relativity",                           position: "Engineer Intern",                                             response: "",              notes: "",                                                              appliedDate: "2026-02-24", result: "",          emails: "" },
  { id: uid(), company: "Sony",                                 position: "Software Engineer, Front End (Contract)",                     response: "",              notes: "",                                                              appliedDate: "2026-02-25", result: "",          emails: "" },
  { id: uid(), company: "Pact Social Inc (cvd)",                position: "Design Engineer",                                             response: "",              notes: "",                                                              appliedDate: "2026-02-25", result: "",          emails: "" },
  { id: uid(), company: "Pomegranate Technologies (Use Pepper)", position: "Junior Data Engineer",                                       response: "Waiting",       notes: "Intro Interview - Done",                                        appliedDate: "2026-02-25", result: "",          emails: "Juan Carlos: jcm@usepepper.com" },
  { id: uid(), company: "Steelcase",                            position: "Product Risk Engineering Intern",                             response: "",              notes: "",                                                              appliedDate: "2026-02-26", result: "",          emails: "" },
  { id: uid(), company: "Lotlinx",                              position: "Analytics Engineer",                                          response: "",              notes: "",                                                              appliedDate: "2026-02-26", result: "",          emails: "" },
  { id: uid(), company: "Wisdocs",                              position: "Prompt Engineer",                                             response: "",              notes: "",                                                              appliedDate: "2026-02-26", result: "",          emails: "" },
  { id: uid(), company: "Stripe",                               position: "Software Engineer New Grad",                                  response: "",              notes: "",                                                              appliedDate: "2026-02-26", result: "",          emails: "" },
  { id: uid(), company: "Halliday",                             position: "Software Engineer",                                           response: "Rejected",      notes: "",                                                              appliedDate: "2026-02-26", result: "",          emails: "" },
  { id: uid(), company: "Qualcomm",                             position: "Software Engineer New Grad",                                  response: "",              notes: "",                                                              appliedDate: "2026-02-27", result: "",          emails: "" },
  { id: uid(), company: "Trexo Robotis",                        position: "Business Automation Specialist",                              response: "",              notes: "",                                                              appliedDate: "2026-02-28", result: "",          emails: "" },
  { id: uid(), company: "MDA Space",                            position: "Junior Software Developer",                                   response: "Rejected",      notes: "",                                                              appliedDate: "2026-02-28", result: "",          emails: "" },
  // ── March 2026 ──
  { id: uid(), company: "CapitalOne",                           position: "Associate Software Engineer Grad (Card Exp.)",                response: "Waiting",       notes: "OA - Done",                                                     appliedDate: "2026-03-01", result: "",          emails: "" },
  { id: uid(), company: "CapitalOne",                           position: "Associate Software Engineer Grad",                            response: "",              notes: "",                                                              appliedDate: "2026-03-01", result: "",          emails: "" },
  { id: uid(), company: "CapitalOne",                           position: "Associate Data Scientist",                                    response: "",              notes: "",                                                              appliedDate: "2026-03-01", result: "",          emails: "" },
  { id: uid(), company: "PointClickCare",                       position: "",                                                            response: "",              notes: "",                                                              appliedDate: "2026-03-01", result: "",          emails: "" },
  { id: uid(), company: "Zoox",                                 position: "Lidar Engineer Intern",                                       response: "",              notes: "",                                                              appliedDate: "2026-03-01", result: "",          emails: "" },
  { id: uid(), company: "Mechanize Inc",                        position: "Junior Software Engineering",                                 response: "",              notes: "",                                                              appliedDate: "2026-03-02", result: "",          emails: "" },
  { id: uid(), company: "Aritzia",                              position: "Data Visualization Engineer",                                 response: "",              notes: "",                                                              appliedDate: "2026-03-02", result: "",          emails: "" },
  { id: uid(), company: "Applied Intuition",                    position: "Software Engineer New Grad",                                  response: "",              notes: "",                                                              appliedDate: "2026-03-02", result: "",          emails: "" },
  { id: uid(), company: "Senatus",                              position: "Frontend Engineer (New Grad)",                                response: "",              notes: "",                                                              appliedDate: "2026-03-02", result: "",          emails: "" },
  { id: uid(), company: "AirTable",                             position: "Software Engineer New Grad",                                  response: "Rejected",      notes: "",                                                              appliedDate: "2026-03-02", result: "",          emails: "" },
  { id: uid(), company: "Vercel",                               position: "Software Engineer CICD",                                      response: "",              notes: "",                                                              appliedDate: "2026-03-03", result: "",          emails: "" },
  { id: uid(), company: "SpaceX",                               position: "Software Engineer New Grad",                                  response: "",              notes: "",                                                              appliedDate: "2026-03-03", result: "",          emails: "" },
  { id: uid(), company: "Bose",                                 position: "Data Science Co-op",                                          response: "",              notes: "",                                                              appliedDate: "2026-03-03", result: "",          emails: "" },
  { id: uid(), company: "Brex",                                 position: "Software Engineer Intern",                                    response: "",              notes: "",                                                              appliedDate: "2026-03-03", result: "",          emails: "" },
  { id: uid(), company: "Figma",                                position: "Software Engineer Intern",                                    response: "",              notes: "",                                                              appliedDate: "2026-03-03", result: "",          emails: "" },
  { id: uid(), company: "ThoughtWorks",                         position: "Associate Developer",                                         response: "Rejected",      notes: "",                                                              appliedDate: "2026-03-03", result: "",          emails: "" },
  { id: uid(), company: "User Testing",                         position: "Backend Engineer Intern",                                     response: "",              notes: "",                                                              appliedDate: "2026-03-03", result: "",          emails: "" },
  { id: uid(), company: "D2L",                                  position: "Software Developer",                                          response: "",              notes: "",                                                              appliedDate: "2026-03-03", result: "",          emails: "" },
  { id: uid(), company: "D2L",                                  position: "Software Test Developer",                                     response: "",              notes: "",                                                              appliedDate: "2026-03-03", result: "",          emails: "" },
  { id: uid(), company: "Intuit",                               position: "Software Engineer I",                                         response: "",              notes: "",                                                              appliedDate: "2026-03-03", result: "",          emails: "" },
  { id: uid(), company: "Intuit",                               position: "Data Analyst Intern/Co-Op",                                   response: "",              notes: "",                                                              appliedDate: "2026-03-03", result: "",          emails: "" },
  { id: uid(), company: "Intuit",                               position: "Software Engineer Intern",                                    response: "",              notes: "",                                                              appliedDate: "2026-03-03", result: "",          emails: "" },
  { id: uid(), company: "StubHub",                              position: "Software Engineer New Grad",                                  response: "OA",            notes: "",                                                              appliedDate: "2026-03-04", result: "",          emails: "Will LeValley: will.levalley@stubhub.com" },
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
  initTheme();
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
  // Drag and drop
  setupDragAndDrop();
  
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
