const http = require('http');
const numCPUs = require('os').cpus().length;
const cluster = require('cluster');
if(cluster.isMaster){
    console.log(`Master proces id is ${process.pid}, cpu number ${numCPUs}`);
    // fork workers
    for(let i= 0;i<numCPUs;i++){
        cluster.fork();
    }
    cluster.on('exit',function(worker,code,signal){
        console.log('worker process died,id',worker.process.pid)
    })
}else{
    // Worker can share the same TCP connection
    // It's an http server here
    console.log(`created worker pid ${process.pid}`)
    http.createServer(function(req,res){
        res.writeHead(200);
        res.end(String(process.pid));
    }).listen(8000);

}
