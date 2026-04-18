const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const COMPANIES_FILE = path.join(__dirname, 'companies.json');

const server = http.createServer((req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);

  // GET /companies - Read companies
  if (req.method === 'GET' && parsedUrl.pathname === '/api/companies') {
    try {
      const data = fs.readFileSync(COMPANIES_FILE, 'utf8');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(data);
    } catch (err) {
      console.error('Error reading companies.json:', err);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Failed to read companies' }));
    }
  }
  // POST /companies - Write companies
  else if (req.method === 'POST' && parsedUrl.pathname === '/api/companies') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const companies = JSON.parse(body);
        fs.writeFileSync(COMPANIES_FILE, JSON.stringify(companies, null, 2));
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true }));
      } catch (err) {
        console.error('Error writing companies.json:', err);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  }
  // Static file serving
  else {
    let filePath = path.join(__dirname, parsedUrl.pathname === '/' ? 'index.html' : parsedUrl.pathname);
    const ext = path.extname(filePath);
    const mimeTypes = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'text/javascript',
      '.json': 'application/json',
    };

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
        return;
      }
      res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'text/plain' });
      res.end(data);
    });
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Job Hunt Tracker running at http://localhost:${PORT}`);
});
