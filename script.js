let adic = [];
let res = document.getElementById('res');
let currentVideoIndex = 0;
let player;




//Adiciona o script da API do yt 
let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '360',
        width: '640',
        videoId: 'M7lc1UVf-VE',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    if(adic.length > 0 ) {
        player.loadVideoById(getVideoId(adic[0]));
    }
}

function onPlayerReady(event) {
    if (event.data === YT.PlayerState.ENDED){
        currentVideoIndex++;
        if(currentVideoIndex < adic.length) {
            player.loadVideoById(getVideoId(adic[currentVideoIndex]));
        } else {
            currentVideoIndex = 0; // reinicia a lista
            player.loadVideoById(getVideoId(adic[currentVideoIndex]));
        }

    }
}

function getVideoId(url){
    let videoId = url.split('v=')[1];
    if(videoId){
        let ampersandPosition = videoId.indexOf('&');
        if(ampersandPosition !== -1){
            videoId = videoId.substring(0,ampersandPosition);
        }
    }
    return videoId;
}

function adc() {
    let item = document.getElementById('item').value.trim();
    if (item === "") {
        alert("Insira um link");
        return;
    }
    adic.push(item);
    updateList();

    if(adic.length === 1 && player){
        player.loadVideoById(getVideoId(adic[0]));
    }
}

function remove() {
    adic.pop();
    updateList();
}

function updateList() {
    res.innerHTML = adic.map((item, index) => `<div class="item">${index + 1}. ${item}</div>`).join('');
}

function pular() {
    currentVideoIndex++;
    if (currentVideoIndex < adic.length) {
        player.loadVideoById(getVideoId(adic[currentVideoIndex]));
    }else{
        currentVideoIndex = 0;
        player.loadVideoById(getVideoId(adic[currentVideoIndex]));
    }
}

let done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;
    }
}

function stopVideo() {
    player.stopVideo();
}