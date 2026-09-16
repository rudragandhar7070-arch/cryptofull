const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

// ─── MIME Types ──────────────────────────────────────────────
const MIME = {
  '.html': 'text/html',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
};

// ─── AI Chat Logic ───────────────────────────────────────────
function getAIReply(message) {
  const msg = (message || '').toLowerCase().trim();

  if (!msg) return '> ERROR: Empty query. Please type a valid command.';
  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey'))
    return 'Greetings, operator. I am Doge AI — your crypto analysis companion. Ask me about BTC, trading strategies, or our platform.';
  if (msg.includes('bitcoin') || msg.includes('btc'))
    return 'Bitcoin (BTC) is the flagship digital asset. Our Grid Bots perform best during BTC consolidation phases, capturing micro-profits on every swing.';
  if (msg.includes('ethereum') || msg.includes('eth'))
    return 'Ethereum (ETH) powers the DeFi ecosystem. Consider deploying a Smart DCA strategy to accumulate during dips.';
  if (msg.includes('solana') || msg.includes('sol'))
    return 'Solana (SOL) offers high throughput for rapid trading. Our bots leverage sub-second execution on SOL pairs.';
  if (msg.includes('dca'))
    return 'Dollar-Cost Averaging (DCA) reduces volatility risk by spreading buys across time. Our Smart DCA bot uses RSI + MACD to optimize entry timing.';
  if (msg.includes('grid'))
    return 'Grid Trading places layered buy/sell orders within a price range. Ideal for sideways markets — the bot profits from every oscillation.';
  if (msg.includes('risk') || msg.includes('safe'))
    return 'We implement trailing stop-losses, max drawdown limits, and portfolio rebalancing. Your funds stay on YOUR exchange — we never hold custody.';
  if (msg.includes('price') || msg.includes('market'))
    return 'Live prices are streamed via Binance WebSocket in the Live Feed section. The data refreshes in real-time — no page reload needed.';
  if (msg.includes('who') || msg.includes('owner') || msg.includes('founder'))
    return 'This platform was built by a passionate developer & Class X student from Ghaziabad, India, combining academic rigor with fintech innovation.';
  if (msg.includes('how') || msg.includes('work') || msg.includes('start'))
    return 'Step 1: Connect your exchange API (read/trade only). Step 2: Pick a strategy (Grid or DCA). Step 3: The bot trades 24/7 automatically.';

  return `Processing query: "${message}"... I am currently running in demo mode. In production, this would be routed to an LLM for full analysis.`;
}

// ─── HTTP Server ─────────────────────────────────────────────
const server = http.createServer((req, res) => {

  // --- API: POST /api/chat ---
  if (req.method === 'POST' && req.url === '/api/chat') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const { message } = JSON.parse(body);
        const reply = getAIReply(message);
        // Simulate slight thinking delay
        setTimeout(() => {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ reply }));
        }, 500);
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON body.' }));
      }
    });
    return;
  }

  // --- API: POST /api/connect ---
  if (req.method === 'POST' && req.url === '/api/connect') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      console.log('[CONNECT] New node connection request.');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, message: 'Node connected. Awaiting API credentials.' }));
    });
    return;
  }

  // --- API: GET /api/health ---
  if (req.method === 'GET' && req.url === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', uptime: process.uptime(), timestamp: new Date().toISOString() }));
    return;
  }

  // --- Static File Server ---
  let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
  const ext = path.extname(filePath);
  const contentType = MIME[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      // SPA fallback: serve index.html for unknown routes
      fs.readFile(path.join(__dirname, 'public', 'index.html'), (e2, fallback) => {
        if (e2) {
          res.writeHead(500); res.end('Internal Server Error');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(fallback);
      });
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log('');
  console.log('=========================================');
  console.log('  CRYPTO AI BOT — SERVER ONLINE');
  console.log('  Local:  http://localhost:' + PORT);
  console.log('  Status: READY (zero dependencies)');
  console.log('=========================================');
  console.log('');
});
