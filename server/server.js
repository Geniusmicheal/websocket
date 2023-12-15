const path = require('path');
const express = require('express');
const {generateMessage} = require('./utils/message')
const publicPath = path.join(__dirname,'../public');
const app = express();
const server = require('http').Server(app);
const socketIO = require('socket.io')(server);
const {v4: uuidV4 } = require('uuid')
app.set('view engine','ejs')
app.use(express.static(publicPath));

app.get('/', (req,res) => {
  res.redirect(`/${uuidV4()}`)
})
 

app.get('/:room', (req,res) => {
  res.render(`room`, {roomID: req.params.room})
})






socketIO.on('connection',(socket)=>{
  console.log('New user connection');
  socket.on('join-room', (roomID,userId) => {
    socket.join(roomID)
    socket.to(roomID).broadcast.emit('user-connected',userId)
  })

  socket.emit('newMessage', generateMessage('Adim','welcome to the chat app'));
  socket.broadcast.emit('newMessage', generateMessage('Adim','welcome to the chat app'));

  socket.on('createMessage',(message, callback)=> {
    console.log('createMessage',message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This from the server');
  })
  socket.on('disconnect',()=>{
      console.log('user was disconnected')
  })
})



// console.time("Time this");
// const functionBody =`let counter = 0;
// for (let i = 0; i < 200000; i++) {
//   counter++;
//   console.log('zxxcxxcxc');
// }; return;`;
// const calculateCount = new Function(...[], functionBody);

//  calculateCount()
//  console.timeEnd("Time this");

//  function parallel(middlewares) {
//   return function (req,res, next){
//     async.each(middlewares,function(mw,cb){
//       mw(req,res,cb);
//     }, next);
//   }
//  }




server.listen(4000, ()=>{
  console.log(`🚀 Server ready at 4000`);
});

