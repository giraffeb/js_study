"use strict";

const mongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:32768/';


var connectMongoDB = function(){
    return mongoClient.connect(url);
}

var getDatabase = function(dbName){
    return connectMongoDB(url)
    .then((db)=>{
        var dbo = db.db(dbName);
        
        return dbo;
    });
}

var getCollection = function(dbName, collectionName){
    return getDatabase(dbName)
            .then((dbo)=>{
                return dbo.collection(collectionName);
            })
}

// var findChatUserByName = function(dbName, collectioName, userName){
//     return getCollection(dbName, collectioName)
//     .then((myCollection)=>{
//         return myCollection.findOne({name : userName});
//     })
// }

var findChatUserByName = function(mycollection, userName){
    return mycollection
    .then((thisCollection)=>{
        return thisCollection.findOne({name : userName});
    })
    
}


exports.getCollection = getCollection;
exports.findChatUserByName = findChatUserByName;