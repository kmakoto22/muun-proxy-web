const http = require('http');
const Unblocker = require('@abai/proxy');

const unblocker = Unblocker({});

http
  .createServer((req, res) => {
    unblocker(req, res, err => {
      const headers = { 'content-type': 'text/plain' };
      if (err) {
        res.writeHead(500, headers);
        return res.end(err.stack || err);
      } else {
        res.writeHead(404, headers);
        return res.end('Error 404: file not found.');
      }
    });
  })
  .listen(process.env.PORT || 3000);

console.log('Live!');
