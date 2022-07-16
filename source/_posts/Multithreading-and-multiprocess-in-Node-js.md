---
title: Multithreading and multiprocess in Node.js
date: 2022-07-15 10:43:46
tags:
- nodejs
- multithreading
- multiprocess
---
## Refs
1. [Node.js Worker Threads](https://nodejs.org/api/worker_threads.html)
2. [Deep dive into threads and processes in Node.js](https://juejin.cn/post/6844903908385488903)
3. [How do cluster and worker threads work in node.js](https://stackoverflow.com/questions/56656498/how-do-cluster-and-worker-threads-work-in-node-js)

## Multithreading: Worker thread

### What and why
A thread that enables node.js to execute JavaScript in parallel. Useful to handle CPU intensive jobs.

### How-to
Create a worker file => Make a promise in caller file => Define on message/error/exit hooks
worker.js file:
```
const { workerData, parentPort }	= require('worker_threads')

console.log('Technical Articles on ' + workerData);

parentPort.postMessage(
	{ fileName: workerData, status: 'Done' })
```
index.js file:
```
const { Worker } = require('worker_threads')

function runService(workerData) {
	return new Promise((resolve, reject) => {
		const worker = new Worker(
				'./worker.js', { workerData });
		worker.on('message', resolve);
		worker.on('error', reject);
		worker.on('exit', (code) => {
			if (code !== 0)
				reject(new Error(
`Stopped the Worker Thread with the exit code: ${code}`));
		})
	})
}

async function run() {
	const result = await runService('GeeksForGeeks')
	console.log(result);
}

run().catch(err => console.error(err))
```
Key points:
1. Worker use  `workerData` to receive data from caller and `parentPort` to post data to caller.
2. Worker use `parentPort.postMessage` to send data to caller and caller use `on('message')` to receive.

## Multiprocess: Fork and Cluster
### An example to address the problem of single-threaded node.js
Single threaded node.js will block on a time-consuming request.
Example:
```
const http = require('http');
const longComputation = () => {
  let sum = 0;
  for (let i = 0; i < 1e10; i++) {
    sum += i;
  };
  return sum;
};
const server = http.createServer();
server.on('request', (req, res) => {
  if (req.url === '/compute') {
    console.info('计算开始',new Date());
    const sum = longComputation();
    console.info('计算结束',new Date());
    return res.end(`Sum is ${sum}`);
  } else {
    res.end('Ok')
  }
});

server.listen(3000);
```

Call `localhost:3000/compute` will block 

### Pros and cons of single-threaded node.js
Pros:
1. Simple, no creation and switching of threads.
2. Event loop and non-blocking asynchronous mechanism ensures high performance for high concurrency.
Cons:
1. CPU intensive calculation may block entire node.js app. 
2. An error may kill the thread, thus kill entire app. A daemon thread should be considered.
3. Single thread does not take advantage of a multi-core CPU.

### Fork
Use `child_process.fork` to create new process.
Main.js:
```
const http = require('http');
const fork = require('child_process').fork;

const server = http.createServer((req, res) => {
    if(req.url == '/compute'){
        const compute = fork('./compute.js');
        compute.send('开启一个新的子进程');

        // 当一个子进程使用 process.send() 发送消息时会触发 'message' 事件
        compute.on('message', sum => {
            res.end(`Sum is ${sum}`);
            compute.kill();
        });

        // 子进程监听到一些错误消息退出
        compute.on('close', (code, signal) => {
            console.log(`收到close事件，子进程收到信号 ${signal} 而终止，退出码 ${code}`);
            compute.kill();
        })
    }else{
        res.end(`ok`);
    }
});
server.listen(3000, '127.0.0.1', () => {
    console.log(`server started at http://127.0.0.1:3000`);
});
```
compute.js:
```
const computation = () => {
    let sum = 0;
    console.info('计算开始');
    console.time('计算耗时');

    for (let i = 0; i < 1e10; i++) {
        sum += i
    };

    console.info('计算结束');
    console.timeEnd('计算耗时');
    return sum;
};

process.on('message', msg => {
    console.log(msg, 'process.pid', process.pid); // 子进程id
    const sum = computation();

    // 如果Node.js进程是通过进程间通信产生的，那么，process.send()方法可以用来给父进程发送消息
    process.send(sum);
})
```

### Cluster
`cluster` can create worker process in a single file.
Example:
```
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
```

Running code above, we got:
```
Master proces id is 18428, cpu number 4
created slave pid 16672
created slave pid 9896
created slave pid 14676
created slave pid 1460
```
We can find these process in task manager:
![Multiple node.js processes](/images/multi_node_taskmgr.png)
Now send a request in browser, and id of one of the four server process is returned:
![Request](/images/request1460.png)
Try refresh many times and different pids may return(It depends, maybe one unlucky process shoulders all the workload).
Now kill one the worker `1460` in task manger and we got:
```
worker process died,id 1460
```
Refresh the browser and result is another pid other than 1460:
![Request](/images/request9896.png)
You see, now our server is much more robust than before. We got four worker process, killing one of them and there are still three working.

Cluster calls the same `fork` method from  `child_process` module under the hood. Cluster is a master-slave model, where master manages and schedules slaves.

**Why no `Error: EADDRINUSE` when multiple processes listens on the same port?**
The child processes aren't listening to the same port. Incoming socket connections to the master process are being delegated to the child processes. There's special handling for clustered process in `server.listen()`, it calls a method named `listenInCluster()` in some circumstances. [See explanation here](https://stackoverflow.com/questions/61261621/node-cluster-have-multiple-processes-listen-to-the-same-port)

## Multithreading vs multiprocess

**cluster**

- One *process* is launched on each CPU and can communicate via IPC.
- Each process has its own memory with its own Node (v8) instance. Creating tons of them may create memory issues.
- Great for spawning many HTTP servers that share the same port b/c the master process will multiplex the requests to the child processes.

**worker threads**

- One *process* total
- Creates multiple threads with each thread having one Node instance (one event loop, one JS engine).  Most Node API's are available to each thread except a few.  So essentially Node is embedding itself and creating a new thread.
- Shares memory with other threads (e.g. `SharedArrayBuffer`)
- Great for CPU intensive tasks like processing data or accessing the file system. Because NodeJS is single threaded, synchronous tasks can be made more efficient with workers