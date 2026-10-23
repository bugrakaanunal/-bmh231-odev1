const http = require('http');
const dayjs = require('dayjs');

const server = http.createServer((req, res) => {
    console.log(`[${req.method}] ${req.url}`);

    if (req.method !== 'GET') {
        res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8', 'Allow': 'GET' });
        return res.end('Method Not Allowed');
    }

    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end('<h1>Ana Sayfa (v1)</h1><a href="/hakkimda">Hakkımda</a>');
    } else if (req.url === '/api/ders') {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        return res.end(JSON.stringify({ kod: 'BMH231', ad: 'Web Temelleri', gun: 'Cuma' }));
    } else if (req.url === '/api/agep') {
        const teslimTarihi = dayjs('2026-11-01');
        const kalanGun = teslimTarihi.diff(dayjs(), 'day');
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        return res.end(JSON.stringify({ tarih: '01.11.2026', kalanGun: kalanGun }));
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        return res.end('Sayfa bulunamadı');
    }
});

server.listen(3000, () => console.log('Sunucu 3000 portunda çalışıyor...'));