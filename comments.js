// Create web server
// Run server
// Send request to server
// Receive response from server
// Parse response
// Print response

// 1. Create web server
const http = require('http');
const fs = require('fs');
const path = require('path');
const { parse } = require('querystring');

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    // 2. Run server
    const readStream = fs.createReadStream(path.join(__dirname, 'comments.html'));
    res.writeHead(200, { 'Content-Type': 'text/html' });
    readStream.pipe(res);
  } else if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      // 3. Send request to server
      const parsedBody = parse(body);
      const comment = parsedBody.comment;
      const writeStream = fs.createWriteStream(path.join(__dirname, 'comments.txt'), { flags: 'a' });
      writeStream.write(`${comment}\n`);
      writeStream.end();
      res.writeHead(302, { Location: '/' });
      res.end();
    });
  }
});

// 4. Print response
server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});