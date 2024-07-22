const ws = require('ws');
const express = require('express')
const http = require('http')
const app = express()
const PORT = 8000

const server = http.createServer(app)
const wss = new ws.Server({ server: server })


app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('client')
})
server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})

wss.on('connection', (socket) => {

    console.log('채팅을 시작합니다.');

    socket.on('message', (message) => {
        console.log('back-msg',JSON.parse(message));
        const msg = JSON.parse(message)
        wss.clients.forEach((value) => {
            value.send(`${msg.user}: ${msg.message}`)
        })
    })


    //오류이벤트
    socket.on('error', (err) => {
        console.log('에러발생', err);
    });
    //접속종료
    socket.on('close', () => {
        console.log('클라이언트가 종료되었습니다.');
    });


})


