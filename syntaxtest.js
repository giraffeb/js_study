function connect(){
    var db = {id: 'just JSON'};

    return new Promise((resolve, reject)=>{
        resolve(db);
    });
}

function printS(db){
    

    // throw new Error('this is err');
    return 'Hi Hello';
}

function connectionTest(name){
    connect()
    .then(printS)
    .then((str)=>{
        console.log('name -> '+name);
        console.log(str);
    });
};

connectionTest('Hello');

