// project Ondoset
const http = require('http');
const fs = require('fs');
const url = require('url');

function template(title, menuNum, description) {
    let menuImg = [ "weather", "calendar", "closet", "myPage" ];
    menuImg[menuNum] += "_selected";
    
    return `
    <!-- project Ondoset -->
    <!doctype html>
    <html>
    <head>
        <title>Ondoset</title>
        <meta charset="utf-8">
        <style>
            p {
                font-size: 15px;
            }
            iframe {
                height: 150px;
                border: none;
                box-shadow: 0 0 5px 1px lightgray inset;
                border-radius: 10px;
            }
            <!-- @import "ondosetStyle.css"; -->
        </style>
    </head>
    
    <body>
    
        <header><h2>${title}</h2></header>
        
        ${description}

        <div>
            <a href = "/?id=weather"><img src = "img_${menuImg[0]}.png" width="50" alt = "날씨"></a>
            <a href = "/?id=calendar"><img src = "img_${menuImg[1]}.png" width="50" alt = "코디 달력"></a>
            <a href = "/?id=closet"><img src = "img_${menuImg[2]}.png" width="50" alt = "코디 모음집"></a>
            <a href = "/?id=myPage"><img src = "img_${menuImg[3]}.png" width="50" alt = "내 페이지"></a>
        </div>
    
    </body>
    </html>
    `
}

const app = http.createServer(function(request, response){
    const _url = request.url;
    const queryData = url.parse(_url, true).query;
    let title, menuNum;
    
    switch (queryData.id) {
        case "weather": title = "날씨"; menuNum = 0; break;
        case "calendar": title = "코디 달력"; menuNum = 1; break;
        case "closet": title = "코디 모음집"; menuNum = 2; break;
        case "myPage": title = "내 페이지"; menuNum = 3; break;
        default: response.writeHead(404); response.end("Not Found"); break;
    }

    response.writeHead(200);
    fs.readFile(`${queryData.id}.html`, "utf8", function(err, description){
        const _template = template(title, menuNum, description);
        response.end(_template);
    });
});

app.listen(3000);