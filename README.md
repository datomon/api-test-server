### 關於

    (1) 抓取前端傳來的 body 內容
    (2) 在本機上提供簡易的 api，取得資料、查看傳送的資料 

### 測試環境

    Node.js：v12.13.0
    npm：6.12.0

### 使用方式
    (1) 如果要改 port 號，請至 server-config.js 修改
    (2) 啟動 Server：npm run start 或 node server

### 測試用 api

    (1) URL：http://127.0.0.1:3333/getTest
        Method：GET
        query：要不要加隨意

    (2) URL：http://127.0.0.1:3333/pushData
        Method：POST、PUT、PATCH、DELETE
        Params：隨意
        content-type：application/json

### 參考文件

    https://nodejs.org/api/http.html


