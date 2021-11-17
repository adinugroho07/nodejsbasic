//ini untuk import global module yang di sediakan oleh nodejs, salah satu nya adalah module http.
//sebenernya require ini juga bisa di gunakan untuk import file jika di dalam parameter nya kita masukkan path file nya.
const http = require('http');

const requestListener = (request, respone) => {
    console.log(request);
};


//ini untuk node membuat kan server yang akan menghandle request dan memberikan respone.
//method createServer() ini memili 1 parameter yaitu requestListerner(request,respone) dan kembalian dari method ini adalah object
//dengan type server.
const server = http.createServer(requestListener());

//ini untuk membuat server ini tetap hidup dan akan me listen dari port 3000.
//parameter dari method listen() ini secara default hanya port untuk mendifine port mana yang di gunakan.
server.listen(3000);
