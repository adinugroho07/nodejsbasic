/*
node js hanya menggunakan 1 javascript thread. 
urutan proses node js :
1. node namefile.js -> mengeksekusi file node js kita.js
2. node js akan mulai membaca script kita , meregister variable, function, event listener, dll.
3. masuk ke dalam event loop -> proses looping dimana membuat prosses pada node js tetap hidup dan running selama 
   ada pekerjaan yang di lakukan seperti request dan respone,event listener yang sudah di register,event callback,dll.
   jadi untuk proses pembuatan file,write file, access ke database,dll tidak akan di handle oleh event loop ini.
   event loop ini hanya akan mengeksekusi callback function yang mengandung code dimana code tersebut fast finishing code.
   namun jika ada pekerjaan yang berat dari sebuah code dan membutuhkan lebih dari single thread maka node js akan menyediakan 
   worker pool. worker pool ini akan di run di thread yang berbeda dan dia bisa berubah menjadi multiple threads dan ini secara
   total di luar dari code program kita , dari request dan dari event loop. namun ada koneksi yang menyambung kan antara worker pool
   dengan event loop adalah callback function dimana ketika worker ini sudah done melakukan pekerjaan nya dia akan men trigger 
   callback function.
   pada event loop ini juga terdapat urutan prosesketika melakuan iterasi looping yang baru.
   1. akan mengecek apakah ada timer callback, (setTimeout(),setIntervals() callback). jika ada ini dan timer sudah complete dan
      di dalam timer tersebut ada callback function atau function, maka node js akan meng eksekusi duluan callback function atau 
      function nya.
   2. check apakah ada callback function (dari operasi yang sudah complete) yang lain, jika ada maka callbacks function tersebut 
      akan di eksekusi.
   3. poll phase adalah fase dimana node js akan melihat apakah ada IO(input/output) event (cth IO event : filesystem,network,dll) 
      yang baru dan akan langsung eksekusi jika ada callback dari IO event tersebut. namun hanya mengeksekusi callback tertentu 
      yang memungkinkan untuk di eksekusi dan jika tidak memungkinkan untuk di eksekusi maka akan di tunda dan di daftarkan 
      sebagai pending callback.
   4. check phase (execute setImidiate() callback) adalah proses yang hampir sama seperti setTimeout dan setInterval hanya saja
      yang membedakan dia akan langsung di eksekusi function nya , tetapi eksekusi nya selalu setelah semua callback yang terbuka
      atau belum di eksekusi done di eksekusi.
   5. close event callbacks (execute all 'close' event callbacks) -> node js akan mengeksekusi close event callbacks di tahap ini.
      jadi jika kita meregister close event callbacks, maka pada tahap ini akan di eksekusi.
   6. proses exit jika tidak ada event handlers ( process.exit() ).

4. untuk keluar dari event loop ini kita bisa melakukan stop atau unregister semua event listener yang ada dengan cara
   ini -> process.exit();
*/


//ini untuk import global module yang di sediakan oleh nodejs, salah satu nya adalah module http.
//sebenernya require ini juga bisa di gunakan untuk import file jika di dalam parameter nya kita masukkan path file nya.
const http = require('http');

const routes = require('./routes');

console.log(routes.code)

//ini untuk node membuat kan server yang akan menghandle request dan memberikan respone.
//method createServer() ini memili 1 parameter yaitu requestListerner(request,respone) dan kembalian dari method ini adalah object
//dengan type server.
const server = http.createServer(routes.handler);

//ini untuk membuat server ini tetap hidup dan akan me listen dari port 3000.
//parameter dari method listen() ini secara default hanya port untuk mendifine port mana yang di gunakan.
server.listen(3000);
