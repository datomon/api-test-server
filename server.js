const http = require('http');
const server = http.createServer();

let ServerCongif = require('./server-config');
const Host = ServerCongif.host;  // host
const ListenPort = ServerCongif.port;  //listen Port

// ------ Web Server ------ 
// client 端有請求
server.on('request', (req, res) => {
    let pathname = require('url').parse(req.url, true).pathname;  // 請求的路徑
    let resData = {};  // 回應的資料

    // 路由：/pushData
    if (req.method === 'GET' && pathname === '/getTest') {
        resData = { testName: 'Mark', testAge: 30 };

        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(resData));
        return;
    }
    
    // 路由：/pushData
    let notGet = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method);
    if (notGet && pathname === '/pushData') {
        // 前端的請求資料格式，限定用 JSON 格式
        if (req.headers['content-type'] !== 'application/json') {
            res.writeHead(403, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({ errState: 1, message: '資料格式請使用 JSON'}));
            return;
        }

        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // 把 Buffer 的值轉字串
        });

        // POST 參數接收完畢後
        req.on('end', () => {
            resData.data = JSON.parse(body);  //解晰 JSON 物件為 JS 物件
            resData.errState = 0;
            resData.message = '請求ok，你傳來的內容請看 data 屬性';
            resData.reqMethod = req.method;
    
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(resData));
        });
        return;
    } 

    // 請求的 Method 或 Path 有誤時
    res.writeHead(403, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({ errState: 1, message: '請求失敗，請檢查 API 及 Method 是否正確!'}));
});


server.listen(ListenPort, Host, () => {
    console.log('Server running on： http://' + Host + ':' + ListenPort);
});