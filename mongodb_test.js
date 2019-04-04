
const mongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:32768/';

var createChatUsersCollection = function(){
    mongoClient.connect(url, {useNewUrlParser: true},function(err, db){
        if(err) throw err;
        var dbo = db.db('chat');

        dbo.createCollection("chatusers", function(err, res){
            if(err) throw err;
            console.log("chatUser Collection created!.");
            db.close();
        });    
    });
    
};

var createChatUser = function(new_name, pwd){
    mongoClient.connect(url, function(err, db){
        var dbo = db.db('chat');

        dbo.collection('chatusers').insert({name: new_name, password: pwd});
        dbo.close;
    });
}

var findChatUser = function(name){
    mongoClient.connect(url, function(err, db){
        var dbo = db.db('chat');

        dbo.collection('chatusers').findOne({name: name}, function(err, result){
            console.log('result ->'+ result);
            
        });

        db.close();
    })
}

exports.createChatUsersCollection = createChatUsersCollection;
exports.createChatUser = createChatUser;
exports.findChatUser = findChatUser;