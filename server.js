const http = require('http');
const server = http.createServer();

let ServerCongif = require('./server-config');
const Host = ServerCongif.host;  // host
const ListenPort = ServerCongif.port;  //listen Port

// ------ Web Server ------ 
// client 端有請求
server.on('request', (req, res) => {
    let pathname = require('url').parse(req.url, true).pathname;  // 請求的路徑
    let queryString = require('url').parse(req.url, true).query;  // Get參數
    let resData = {};  // 回應的資料

    let resHeaders = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*'
    }

    // Method: Get
    if (req.method === 'GET' && /\/getTest.*/.test(pathname)) {
        resData.resTestData = { testName: 'Mark', testAge: 30 };
        resData.queryStr = ( queryString === undefined)? '' : queryString;

        resHeaders['Access-Control-Allow-Methods'] = 'GET';

        res.writeHead(200, resHeaders);
        res.end(JSON.stringify(resData));
        return;
    }
    
    // Method: except GET
    if (pathname === '/pushData') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // 把 Buffer 的值轉字串
        });
        
        // POST 參數接收完畢後
        req.on('end', () => {
            resData.reqParams = body;
            resData.errState = 0;
            resData.message = '請求ok!';
            resData.reqMethod = req.method;

            resHeaders['Access-Control-Allow-Methods'] =  'POST, PUT, PATCH, DELETE, OPTIONS';

            res.writeHead(200, resHeaders);
            res.end(JSON.stringify(resData));
        });
        return;
    } 

    // 請求的 Method 或 Path 有誤時
    res.writeHead(403, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({ errState: 1, message: '請求失敗，請檢查 API 是否正確!'}));
});


server.listen(ListenPort, Host, () => {
    console.log('Server running on： http://' + Host + ':' + ListenPort);
});