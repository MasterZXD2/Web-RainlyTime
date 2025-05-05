const se = document.querySelector(".se");
const au = document.querySelector(".au");
const mu = document.querySelector(".mu");
const cr = document.querySelector(".cr");

const wwvolumeSlider = document.getElementById("wwvolume");
const wwvv = document.getElementById("wwvv");
const wvolumeSlider = document.getElementById("wvolume");
const wvv = document.getElementById("wvv");
const svolumeSlider = document.getElementById("svolume");
const svv = document.getElementById("svv");
const wavolumeSlider = document.getElementById("wavolume");
const wavv = document.getElementById("wavv");
const bvolumeSlider = document.getElementById("bvolume");
const bvv = document.getElementById("bvv");
const rvolumeSlider = document.getElementById("rvolume");
const rvv = document.getElementById("rvv");

const us = document.getElementById("urlsound");

const settDiv = document.getElementById("sett");
const muDiv = document.getElementById("sud");

const skyimg = document.querySelector('img[alt="sky"]');
const cloudimg = document.querySelector('img[alt="cloud"]');
const rskyimg = document.querySelector('img[alt="rainsky"]');
const rcloudimg = document.querySelector('img[alt="raincloud"]');

const rainDiv = document.getElementById("rainDiv");

let lofiPlayer;
function onYouTubeIframeAPIReady() {
    lofiPlayer = new YT.Player('lofiPlayer', {
        events: {
            'onReady': (event) => {
                event.target.setVolume(100);
            }
        }
    });
}

var ww = new Audio('audios/wooden-water-wheel-196741.mp3');
ww.loop = true;
ww.volume = 0.7;

var sw = new Audio('audios/soft-wind-sound-314943.mp3');
sw.loop = true;
sw.volume = 0.5;

var wa = new Audio('audios/wave-and-water-263592.mp3');
wa.loop = true;
wa.volume = 0.25;

var ra = new Audio('audios/water-that-hits-the-ground-in-the-rain-110379.mp3');
ra.loop = true;
ra.volume = 0.5;

var am0 = new Audio('audios/bird-333090.mp3')
am0.volume = 0.8;
var am1 = new Audio('audios/birds-chirping-333912.mp3')
am1.volume = 0.8;
var am2 = new Audio('audios/cardinal-37075.mp3')
am2.volume = 0.8;

var amlist = [am0,am1,am2]

let st = false;
let ut = false;
let ct = false;

let rain = false;

function sett(){
    if (st){
        settDiv.style.display = "block";
    } else {
        settDiv.style.display = "none";
    }
    st = !st;
}

se.addEventListener("click",sett)

function audio(){
    const isMuted = au.src.includes("maudio.png");
    if (isMuted){
        au.src = "images/audio.png";
        if (ww.paused) ww.play();
        if (sw.paused) sw.play();
        if (wa.paused) wa.play();
        if (rain) ra.play();
        if (lofiPlayer && lofiPlayer.playVideo) lofiPlayer.playVideo();
    } else {
        au.src = "images/maudio.png";
        ww.pause();
        sw.pause();
        wa.pause();
        ra.pause();
        if (lofiPlayer && lofiPlayer.pauseVideo) lofiPlayer.pauseVideo();
    }
}

au.addEventListener("click",audio);

function sound(){
    if (ut){
        muDiv.style.display = "block";
    } else {
        muDiv.style.display = "none";
    }
    ut = !ut;
}

mu.addEventListener("click",sound);

function cloud(){
    if (!ct){
        ct = true;
        rain = !rain;
        const isNoraml = cr.src.includes("noramlc.png");
        setTimeout(() => {
            ct = false;
            if (isNoraml){
                skyimg.classList.remove("fadeInOut");
                cloudimg.classList.remove("fadeInOut");
                rskyimg.classList.remove("fadeOutIn");
                rcloudimg.classList.remove("fadeOutIn");
    
                skyimg.style.opacity = 0;
                cloudimg.style.opacity = 0;
                rskyimg.style.opacity = 1;
                rcloudimg.style.opacity = 1;
            } else {
                skyimg.style.opacity = 1;
                cloudimg.style.opacity = 1;
                rskyimg.style.opacity = 0;
                rcloudimg.style.opacity = 0;
    
                skyimg.classList.remove("fadeOutIn");
                cloudimg.classList.remove("fadeOutIn");
                rskyimg.classList.remove("fadeInOut");
                rcloudimg.classList.remove("fadeInOut");
            }
        },4000);
        if (isNoraml){
            const isMuted = au.src.includes("maudio.png");
            if (!isMuted){
                setTimeout(() => {
                    if(ra.paused) ra.play();
                },1050)
            }
            cr.src = "images/rainc.png";
            skyimg.classList.add("fadeInOut");
            cloudimg.classList.add("fadeInOut");
            rskyimg.classList.add("fadeOutIn");
            rcloudimg.classList.add("fadeOutIn");
        } else {
            setTimeout(() => {
                ra.pause();
            },600)
            cr.src = "images/noramlc.png";
            skyimg.classList.add("fadeOutIn");
            cloudimg.classList.add("fadeOutIn");
            rskyimg.classList.add("fadeInOut");
            rcloudimg.classList.add("fadeInOut");
        }
    }
}

cr.addEventListener("click",cloud);

function wwvs(v){
    let val = v.target.value
    ww.volume = val;
    wwvv.textContent = `${Math.floor(val * 100)}%`;
}

wwvolumeSlider.addEventListener("input", wwvs);

function wvs(v){
    let val = v.target.value
    sw.volume = val;
    wvv.textContent = `${Math.floor(val * 100)}%`;
}

wvolumeSlider.addEventListener("input", wvs);

function svs(v){
    let val = v.target.value
    lofiPlayer.setVolume(val);
    svv.textContent = `${val}%`;
}

svolumeSlider.addEventListener("input", svs);

function wavs(v){
    let val = v.target.value
    wa.volume = val;
    wavv.textContent = `${Math.floor(val * 100)}%`;
}

wavolumeSlider.addEventListener("input", wavs);

function bvs(v){
    let val = v.target.value
    amlist.forEach((a) => {
        a.volume = val;
    })
    bvv.textContent = `${Math.floor(val * 100)}%`;
}

bvolumeSlider.addEventListener("input", bvs);

function rvs(v){
    let val = v.target.value
    ra.volume = val;
    rvv.textContent = `${Math.floor(val * 100)}%`;
}

rvolumeSlider.addEventListener("input", rvs);

us.addEventListener("change", () => {
    const vid = document.getElementById("urlsound").value;
    if (lofiPlayer && lofiPlayer.loadVideoById) {
        lofiPlayer.loadVideoById(vid);
        lofiPlayer.setLoop(true);
    }
});

function makeDraggable(el) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    el.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        if (e.target.closest('button, input, a')) return;

        e = e || window.event;
        e.preventDefault();

        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;

        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();

        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        const newTop = ((el.offsetTop - pos2) / window.innerHeight) * 100;
        const newLeft = ((el.offsetLeft - pos1) / window.innerWidth) * 100;

        el.style.top = newTop + "%";
        el.style.left = newLeft + "%";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// ใช้งานกับทั้ง #sett และ #sud
document.addEventListener("DOMContentLoaded", () => {
    makeDraggable(settDiv);
    makeDraggable(muDiv);
});

setInterval(() => {
    if (Math.random() < 0.5) {
        const isMuted = au.src.includes("maudio.png");
        if (!isMuted) amlist[Math.floor(Math.random() * amlist.length)].play();
    }
}, 10000);

setInterval(() => {
    if (rain) {
        for (let i = 0; i < 20; i++){
            const delay = Math.random() * 800; // หน่วงเวลาแต่ละหยด 0-800ms
            setTimeout(() => {
                let nx = Math.random() * 99;
                const im = document.createElement("img");
                im.src = "images/wrain.png";
                im.style.left = `${nx}%`;
                im.style.top = "0%";
                im.classList.add("rain");
                rainDiv.appendChild(im);
                setTimeout(() => {
                    im.remove();
                }, 1000);
            }, delay);
        }
    }
},1000)