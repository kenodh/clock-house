var http = require('http');
var fs = require('fs');



http.createServer(function (req, res) {
    const { method, url, headers } = req;

    console.log('url >' + url);
    //console.log('method >' + method);
    /* 
      console.log('headers >' + JSON.stringify(headers)); */
     
    var buf;
    let body = [];
    req.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        buf = Buffer.concat(body);
        body = buf.toString();
      // at this point, `body` has the entire request body stored in it as a string
        if(buf.length > 0){ 
            fs.appendFile('h.txt', body +'\r\n', function (err) {
                if (err) return console.log(err);
                console.log('data >' + body);
            });
        }

        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('starting...');
    });
 
    
    
}).listen(6750);

console.log('server started at http://localhost:6750');