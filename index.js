
const songs = [
    {        
    name:"bolenath",
    image: "bolenath1",
    title: "shiv song",
    artist:"kishore ji"
},
{
    image:"bolenathji",
    name:"bolenathji",
    title: "shiv song",
    artist:"ramsagar ji"
}
]

const audio = document.querySelector('audio');
const image = document.querySelector('img');
const play = document.getElementById("play");
const artist = document.getElementById("artist");
const title = document.getElementById("title");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const progress = document.getElementById('progress');
let current = document.getElementById('current_time');
let time_duration = document.getElementById('duration_time');
const progess_div = document.getElementById('progress_div'); 
let isPlaying = false;

//play function

const playMusic=()=>{
    isPlaying =true;
    audio.play();
    play.classList.replace("fa-play", "fa-pause");
    image.classList.add('anime');
};

//for pause function

const pauseMusic =()=>{
    isPlaying = false;
    audio.pause();
    play.classList.replace("fa-pause", "fa-play");
    image.classList.add('anime');
   
};

play.addEventListener("click", ()=>{
    isPlaying ? pauseMusic() : playMusic();
});

// changing the music data
const loadSong= (songs)=>{

    title.textContent = songs.title;
    artist.textContent = songs.artist;
    audio.src = "audio/" +songs.name + ".mp3";
    image.src = "image/" +songs.image + ".jpg";

}

songIndex =0;
const nextSong =()=>{
    songIndex =(songIndex+1) %songs.length;
    loadSong(songs[songIndex]);
    playMusic(); 
};

const previosSong =() =>{
    songIndex = (songIndex-1+songs.length)%songs.length;
    loadSong(songs[songIndex]);
    playMusic();
};

// progress bar work
audio.addEventListener('timeupdate', (event)=>{
    const{currentTime,duration} = event.srcElement;
    let progress_time =(currentTime / duration) * 100;
    progress.style.width = `${progress_time}%`;

    //update duration progrsee time
    let min_duration = Math.floor (duration / 60); 
    let sec_duration = Math.floor (duration % 60);
    
    let tot_duration = `${min_duration} : ${sec_duration}`;
    if(duration){
        time_duration.textContent = `${tot_duration}`;
    }
   
    
    //update current progrsee time
    let min_current = Math.floor (currentTime / 60); 
    let sec_current = Math.floor (currentTime % 60);
    
    if(sec_current<10){
        sec_current = `0${sec_current}`;
    }
    let tot_current = `${min_current} : ${sec_current}`;
    current.textContent = `${tot_current}`;
});

//progress onclick functionilty
progess_div.addEventListener('click', (event)=>{
    console.log(event);
    const {duration} = audio;
    let move_progress = (event.offsetX / event.srcElement.clientWidth)*duration;
    audio.currentTime = move_progress;

});
//if music endd call next function.
audio.addEventListener('ended', nextSong);

next.addEventListener('click', nextSong);
prev.addEventListener('click', previosSong);