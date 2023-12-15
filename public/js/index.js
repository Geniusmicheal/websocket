const socket = io('/'),
userID = crypto.randomUUID(),
videoGrid = document.getElementById('video-grid');

const myVideo = document.createElement('video');
myVideo.muted = true;
navigator.mediaDevices.getUserMedia({
   video: true,
   audio: true
}).then(stream => {
   addVideoStream(myVideo, stream);
   socket.on('user-connected',userId =>{
      connectToNewUser(userId,stream)
   });

})

socket.emit('join-room',room_ID, userID);


function addVideoStream(video, stream) {
   video.srcObject = stream;
   video.addEventListener('loadedmetadata', ()=> {
      video.play()
   }) 
     videoGrid.append(video)
}
socket.on('disconnect',()=>{
   console.log('disconnected from server')
});

// socket.on('newMessage',(dataSent)=>{
//    console.log('new email from server', dataSent)
// })
// socket.emit('createMessage', {
//    from:'frank',
//    text:'Hi'
// }, function(data){
//    console.log('Got it',data);
// });