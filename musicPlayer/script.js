const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');
const volSliderCon = document.querySelector('.volume-slider-con');
const volSlider = document.querySelector('.volume-slider');
let drag = false;

//song titles
const songs = ['ukulele', 'better_days', 'sunny'];

// keep track of song
let songIndex = 0;



//update song details
const loadSong = (song) => {
    audio.src = `./music/${song}.mp3`;
    cover.src = `./images/${song}.jpg`;
    songTitle = song.replace("_", " ");
    title.innerText = songTitle.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
    
}

const volumeSong = () => {
    audio.volume = 0.5;
} 

// Initially load song details into DOM
loadSong(songs[songIndex]);
//default volume to half volume
volumeSong();

// Play song
function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
    console.log(audio.volume);
}
  
  // Pause song
function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    
    
    audio.pause();
}
  
// Previous song
function prevSong() {
    songIndex--;
  
    if (songIndex < 0) {
      songIndex = songs.length - 1;
    }
  
    loadSong(songs[songIndex]);
  
    playSong();
}

// Next song
function nextSong() {
    songIndex++;
  
    if (songIndex > songs.length - 1) {
      songIndex = 0;
    }
  
    loadSong(songs[songIndex]);
  
    playSong();
}
  
// Update progress bar
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}
  
// Set progress bar
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}
  
//get duration & currentTime for Time of song
function DurTime (e) {
    const {duration,currentTime} = e.srcElement;
    var sec;
    var sec_d;
  
    // define minutes currentTime
    let min = (currentTime==null)? 0:
    Math.floor(currentTime/60);
    min = min <10 ? '0'+min:min;
  
    // define seconds currentTime
    function get_sec (x) {
        if(Math.floor(x) >= 60){  
            for (var i = 1; i<=60; i++){
                if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
                    sec = Math.floor(x) - (60*i);
                    sec = sec <10 ? '0'+sec:sec;
                }
            }
        } else {
            sec = Math.floor(x);
            sec = sec <10 ? '0'+sec:sec;
        }
    } 
  
    get_sec (currentTime,sec);
  
    // change currentTime DOM
    currTime.innerHTML = min +':'+ sec;
  
    // define minutes duration
    let min_d = (isNaN(duration) === true)? '0':
    Math.floor(duration/60);
    min_d = min_d <10 ? '0'+min_d:min_d;
   
    function get_sec_d (x) {
        if(Math.floor(x) >= 60){
              
            for (var i = 1; i<=60; i++){
                if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
                    sec_d = Math.floor(x) - (60*i);
                    sec_d = sec_d <10 ? '0'+sec_d:sec_d;
                }
            }
        } else {
            sec_d = (isNaN(duration) === true)? '0':
            Math.floor(x);
            sec_d = sec_d <10 ? '0'+sec_d:sec_d;
        }
      } 
  
    // define seconds duration
      
    get_sec_d (duration);
  
    // change duration DOM
    durTime.innerHTML = min_d +':'+ sec_d;
          
};

//set volume
function setVolume(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const volume = audio.volume;
    audio.volume = ((clickX / width) * volume) / 100; 
}
  
  // Event listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');
    if (isPlaying) {
      pauseSong();
    } else {
      playSong();
    }
});
  

//EVENT LISTENERS
// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
  
// Time/song update
audio.addEventListener('timeupdate', updateProgress);
  
// Click on progress bar
progressContainer.addEventListener('click', setProgress);
  
// Song ends
audio.addEventListener('ended', nextSong);
  
// Time of song
audio.addEventListener('timeupdate',DurTime);

// set volume
volSliderCon.addEventListener('mousedown', function(ev) {
    drag = true;
    updateBar(ev.clientX);

});

document.addEventListener('mousemove', function(ev) {
    if (drag) {
        updateBar(ev.clientX);
    }
});

document.addEventListener('mouseup', function(ev) {
    drag = false;
});

let updateBar = function (x, vol) {
    let volume = volSliderCon;
    let percentage;

    if (vol) {
        percentage = vol * 100;
    } else {
        let position = x - volume.offsetLeft;
        percentage = 100 * position / volume.clientWidth;
    }

    if (percentage > 100) {
        percentage = 100;
    }

    if (percentage < 0) {
        percentage = 0;
    }

    //update volume bar 
    volSlider.style.width = percentage +'%';
    audio.volume = percentage / 100;
}