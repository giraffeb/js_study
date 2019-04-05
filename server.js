var http = require('http');
var fs  = require('fs');

const db = require('./mongodb_test');
const myCollection = db.getCollection('chat', 'chatusers');


var app = http.createServer(function(request, response){
    var url = request.url;
    var response_url = '';
    

    if(request.url == '/'){
        response_url = '/index.html';
    }

    if(request.url == '/login'){
        
        if(request.method == 'GET'){
            response_url = '/login.html';
        }
        else if(request.method == 'POST'){
            request.on('data', (chunk)=>{
                
                var param_map = parseParamToDict(chunk);
                
                db
                .findChatUserByName(myCollection, param_map['name'])
                .then(
                    (user)=>{
                        response
                        .writeHead(301, {Location : 'http://localhost:3000'} )
                        .end();
                })
                .catch(
                    (err)=>{
                        response
                        .writeHead(301, {Location : 'http://localhost:3000/login'} )
                        .end();
                });
                
            });
            return;
        }
    }
    

    

    if(request.url == '/favicon.ico'){
        response.writeHead(404);
        response.end();
        return ;
        
    }

    response.writeHead(200);
    response.end(fs.readFileSync(__dirname + response_url));
});


function parseParamToDict(str){

    let param_map = {};

    let splited_paramter = new String(str).split('&');
        
        splited_paramter
            .map( (param_line)=> {
                return param_line.split('=');
             }).map((splited_param_arr)=>{
                param_map[splited_param_arr[0]] = splited_param_arr[1];
             });

    return param_map;
}

//app start
app.listen(3000);