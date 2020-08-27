const express  = require('express');

module.exports = () => {

    let  package = undefined;
    try {
        package = require('fs').readFileSync('./package.json', 'utf-8');
        if(package) package = JSON.parse(package);
    }catch(err) {
        console.warn("Warning!! package.json doesn't exists, '/about' endpoint will not be accessiable");
    }
    
    let router = express.Router();
    if(package) {
        router.get('/about', (req, res) => {
                let { name , description, version, author, license, homepage } = package;
                return res.json({name , description, version, author, license, homepage});
        });
    }
    router.get('/health', (req, res) => {
        return res.sendStatus(200);
    });
    router.get('/uptime', (req, res) => {
        let secs = process.uptime();
        let uptime = ('0' + Math.floor(secs / 3600)).slice(-2) + ":" + ('0' + Math.floor(secs % 3600 / 60)).slice(-2) + ":" + ('0' + Math.floor(secs % 3600 % 60)).slice(-2);
        return res.json({uptime});
    });

    router.get('/memory-usage',(req, res) =>{
        let mem = process.memoryUsage();
        let formatted ={};
        for (let key in mem) {
            formatted[key] = formatMemory(mem[key]);
          }
        return res.json(formatted);
    });
    return router;
}

function formatMemory(bytes) {
    if(bytes == 0) return '0 Bytes';
    var k = 1000,
        sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
 }