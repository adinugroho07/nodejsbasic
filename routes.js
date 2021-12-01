//ini untuk import module node yang berkaitan dengan file input atau file system. read,write,delete file.
const fs = require('fs');

const requestListener = (request, response) => {
    //console.log(request.url);
    //console.log(request.method);
    //console.log(request.headers);

    //ini adalah untuk memberitahu meta data yang di kirim kan ke browser. lebih lengkap nya untuk macam
    //dari metadata yang di kirim kan ke browser bisa di cek di https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers
    const url = request.url;
    const method = request.method;
    if (url === '/') {
        response.write('<html>');
        response.write('<head><title>my first node js app</title></head>');
        response.write('<body><h1> my first node js app</h1><form action="/message" method="post"><input type="text" name="message"><button type="submit">Submit</button></form></body >');
        response.write('</html>');
        return response.end();
    }

    if (url === '/message' && method === 'POST') {
        const body = [];
        //meminta data dari stream. data yang di kirimkan berupa chunk data pada memory.
        request.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        //proses penyetopan adding data in chunk lalu data di ambil oleh buffer.
        request.on('end', () => {
            const parseBody = Buffer.concat(body).toString();
            console.log(parseBody);
            const message = parseBody.split('=')[1];
            /*
            writeFileSync('path+namefile+extension',datatobstored) -> adalah method yang bersifat synchronus yang akan di eksekusi 
            hingga selesai baru akan meng eksesuki baris berikut nya. jadi file nya akan di create dulu dan di write, baru akan 
            lanjut mengeksekusi baris selanjutnya. namun kendala nyaa adalah jika file yang di create terlalu besar atau terlalu 
            banyak maka akan menjadi cost performance.
            writeFile('path+namefile+extension',datatobstored,callback function) -> method yang bersifat asynchronus. oleh karena
            itu dia mempunyai parameter ke 3, yaitu callback funtion yang akan di eksekusi jika proses create file dan write file
            selesai di lakukan. opsi ini bisa menjadi solusi untuk mengatasi cost performance jika file yang di upload besar.
            */
            fs.writeFile('message.txt', message, (err) => {
                //node js secara implisit me register event listener. contoh nya pada function ini adalah parameter err.
                //pada callback function ini dia menerima parameter berupa error object dimana jika tidak error maka dia akan null
                //tetapi jika terdapat error seperti error permission maka dapat kita handle dan mereturn respone yang baik.
                response.statusCode = 302;
                response.setHeader('Location', '/');
                return response.end();
            });
        });
    }

    response.setHeader('Content-Type', 'text/html');
    response.write('<html>');
    response.write('<head><title>my first node js app</title></head>');
    response.write('<body><h1>my first node js app</h1></body>');
    response.write('</html>');
    response.end();

};

//ini adalah cara untuk export data file di node js dan ini untuk single export.
//module.exports = requestListener;

//ini untuk export data multiple
// module.exports = {
//     key: requestListener,
//     code: 'say something to export'
// };
// nanti ketika di import dia tinggal manggil object trus ke attribute,
//cth: const routes = require('./routes'); routes.key atau routes.code.

//cara lain untuk export data multiple
//module.exports.handler = requestListener;
//module.exports.code = 'say something to export';

//atau cara lain yang lebih singkat
exports.handler = requestListener;
exports.code = 'say something to export';

/*
untuk export ini di file dimana kita import file ini(routes.js) maka tidak bisa merubah apa pun yang ada di dalam file export nya.
jadi hanya bisa read saja. jika ada perubahan maka yang di rubah adalah file yang melakukan export, bukan pada file yang melakukan
import terhadap file ini(routes.js)
*/
