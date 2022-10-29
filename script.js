const video = document.getElementById("video");
const imgPlayPause = document.getElementById("img-play-pause");
const imgAudio = document.getElementById("img-audio");
var inputAudio = document.getElementById("input-volume-audio");
var inputDuration = document.getElementById("input-timeline-duration")
var volumeAudioVideo = localStorage.getItem("audio video")
var audioMuted = localStorage.getItem("audio muted")
var divVideo = document.getElementById("div-video")
var divControls = document.getElementById("controls-video")
var btFullScreen = document.getElementById("bt-full-screen")
var iSpanPlayPause = document.getElementById("i-span-play-pause")
var spanPlayPause = document.getElementById("span-play-pause")
var spanMinutesVideo = document.getElementById("span-minutes")
var inputDuracaoVideo = document.getElementById("input-duracao-video")

setInterval(function() {
    spanMinutesVideo.innerHTML = `${converter(video.currentTime)} / ${converter(video.duration)}`;
    inputDuracaoVideo.value = video.currentTime;
}, 500)

setTimeout(function() {
    inputDuracaoVideo.setAttribute("max", video.duration);[]
}, 1000)


const converter = (minutos) => {
    const horas = Math.floor(minutos/ 60);
    const min = minutos % 60;
    const textoHoras = (`${horas}`);
    const textoMinutos = String((`${min}`)).padStart(4, "0");
    
    return `${textoHoras }:${parseInt(textoMinutos)}`;
};

function divHoverOn() {
    divControls.style.opacity = "1";
    
    setTimeout(function() {
        divControls.style.opacity = "0";
    }, 2000)
}

function divHoverOff() {
    divControls.style.opacity = "0";
}

function minutosVideo() {
    video.currentTime = inputDuracaoVideo.value;
}

function playPausarVideo() {
    if (video.paused) {
        video.play();
        imgPlayPause.setAttribute("class", "fas fa-pause img-play-pause");
        iSpanPlayPause.setAttribute("class", "fas fa-play i-span-play-pause");
    } else if (!video.paused) {
        video.pause();
        imgPlayPause.setAttribute("class", "fas fa-play img-play-pause");
        spanPlayPause.style.display = "flex";
        iSpanPlayPause.setAttribute("class", "fas fa-pause i-span-play-pause");
    }

    spanPlayPause.style.opacity = "0.4";
    iSpanPlayPause.style.transform = "scale(1.2)";
    setTimeout( function() {
        spanPlayPause.style.opacity = "0";
        iSpanPlayPause.style.transform = "scale(0.5)";
    }, 500)

}

function fullscreenDuploClick() {
    btFullScreen.click()
}

document.addEventListener("dblclick", fullscreenDuploClick)

function audioMuteVideo() {
    if(video.muted) {
        video.muted = false;
        imgAudio.setAttribute("class", "fas fa-volume-up img-audio");
        iSpanPlayPause.setAttribute("class", "fas fa-volume-up i-span-play-pause");
        
        if (video.volume <= 5) {
            video.volume = (20 / 100);
            inputAudio.value = 20;
            localStorage.setItem("audio video", inputAudio.value);
        }

    } else if (!video.muted) {
        video.muted = true;
        imgAudio.setAttribute("class", "fas fa-volume-mute img-audio");
        iSpanPlayPause.setAttribute("class", "fas fa-volume-mute i-span-play-pause");
        video.volume = 0;
        inputAudio.value = 0;
        localStorage.setItem("audio video", 0);
    }

    spanPlayPause.style.opacity = "0.4";
    iSpanPlayPause.style.transform = "scale(1.2)";
    setTimeout( function() {
        spanPlayPause.style.opacity = "0";
        iSpanPlayPause.style.transform = "scale(0.5)"
    }, 500)

}

function volumeVideo() {
    video.volume = (inputAudio.value / 100);
    localStorage.setItem("audio video", inputAudio.value)

    if(video.volume == 0) {
        video.muted = true;
        imgAudio.setAttribute("class", "fas fa-volume-mute img-audio");
    } else if (video.volume != 0) {
        video.muted = false;
        imgAudio.setAttribute("class", "fas fa-volume-up img-audio");
    }
}

function fullscreenOn() {
    divVideo.requestFullscreen();
    btFullScreen.setAttribute("onclick", "fullscreenOff()");
}

function fullscreenOff() {   
    document.exitFullscreen();
    btFullScreen.setAttribute("onclick", "fullscreenOn()");
}

document.addEventListener('keydown', function(e) {
    
    var volume = parseInt(inputAudio.value);
    switch (e.keyCode) {
        case 37:
        video.currentTime = video.currentTime - 5
            break;
        case 38:

            inputAudio.value = volume + 5
            imgAudio.setAttribute("class", "fas fa-volume-up img-audio");
            localStorage.setItem("audio video", volume + 5)
            volumeVideo()

            if (volume > 99) {
                localStorage.setItem("audio video", 100)
                volumeVideo()
            }
            break;
        case 39:
            video.currentTime = video.currentTime + 5
            break;
        case 40:
                inputAudio.value = volume - 5
                imgAudio.setAttribute("class", "fas fa-volume-up img-audio");
                localStorage.setItem("audio video", volume - 5)
                volumeVideo()

                if (volume < 1) {
                    localStorage.setItem("audio video", 0)
                    volumeVideo()
                }
                break;

        case 32 || 19: 
            playPausarVideo();
            break;

        case 77: 
            audioMuteVideo();
            break;

        case 70:
            btFullScreen.click()
            break;

    }
}, false);

setTimeout( function() {
    video.volume = (volumeAudioVideo / 100);
    inputAudio.value = volumeAudioVideo;
    video.muted = audioMuted;

    if (video.volume == 0) {
        imgAudio.setAttribute("class", "fas fa-volume-mute img-audio");
        video.muted = true;
    } else if (!volumeAudioVideo) {
        alert("opan")
    }
}, 1)