// const { text } = require("express");

const socket = io('/');
const videoGrid =  document.querySelector('#video-grid');


var peer = new Peer(undefined,{
    path:'/peerjs',
    host:'/',
    port:'3030'
});   
const myVideo = document.createElement('video');
myVideo.muted = true;
let myVideoStream; 
navigator.mediaDevices.getUserMedia({
    video:true,
    audio:true
}).then(stream => {
        myVideoStream = stream;
        addVideoStream(myVideo,stream);
                 peer.on('call', call => {
                  call.answer(stream)
                 const video = document.createElement('video')
                   call.on('stream', userVideoStream => {
                   addVideoStream(video, userVideoStream)
                   })
                    })
        socket.on('user-connected',(userId)=>{
            // console.log("from script" , userId);
            connecToNewUser(userId,stream)

        })
        let msg = $('input');

console.log(msg);
$('html').keydown((e)=>{
    console.log(e)
    const {keyCode} = e;
    if(keyCode == 13 && e.target.value.length !==0)
    {
        console.log("hi")

        socket.emit('message',e.target.value);
        // e.target.value('');
    }  
})
socket.on("createMessage",message=>{
    console.log("craet",message);
    $('.messages').append(`<li class="message"><b>user</b><br/>${message}</li>`);
    scrollToBottom();
})
    })
peer.on('open',id=>{
    socket.emit('join-room',ROOM_ID,id)
})

socket.emit('join-room',ROOM_ID);


const connecToNewUser = (userId,stream)=>{

        const call = peer.call(userId,stream)
        const video = document.createElement('video');
        call.on('stream',userVideoStream =>{
            addVideoStream(video,userVideoStream);
        })
}




const addVideoStream = (video,stream)=> {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata',()=>{
        video.play();
    })
    videoGrid.append(video);
}

const scrollToBottom = ()=>{
    let d = $('.main__chat__window');
    d.scrollTop(d.prop("scrollHeight"));
}


const muteUnmute = () => {
    const enabled = myVideoStream.getAudioTracks()[0].enabled;
    if (enabled) {
      myVideoStream.getAudioTracks()[0].enabled = false;
      setUnmuteButton();
    } else {
      setMuteButton();
      myVideoStream.getAudioTracks()[0].enabled = true;
    }
  }
  
  const playStop = () => {
    console.log('object')
    let enabled = myVideoStream.getVideoTracks()[0].enabled;
    if (enabled) {
      myVideoStream.getVideoTracks()[0].enabled = false;
      setPlayVideo()
    } else {
      setStopVideo()
      myVideoStream.getVideoTracks()[0].enabled = true;
    }
  }
  
  const setMuteButton = () => {
    const html = `
      <i class="fas fa-microphone"></i>
      <span>Mute</span>
    `
    document.querySelector('.main__mute_button').innerHTML = html;
  }
  
  const setUnmuteButton = () => {
    const html = `
      <i class="unmute fas fa-microphone-slash"></i>
      <span>Unmute</span>
    `
    document.querySelector('.main__mute_button').innerHTML = html;
  }
  
  const setStopVideo = () => {
    const html = `
      <i class="fas fa-video"></i>
      <span>Stop Video</span>
    `
    document.querySelector('.main__video_button').innerHTML = html;
  }
  
  const setPlayVideo = () => {
    const html = `
    <i class="stop fas fa-video-slash"></i>
      <span>Play Video</span>
    `
    document.querySelector('.main__video_button').innerHTML = html;
  }
  