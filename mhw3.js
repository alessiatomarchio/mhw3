/* salvo gli endpoint delle API*/ 
const JokerAPI = "http://www.omdbapi.com/?apikey=56276421&i=tt3896198&t=Joker&y=2019&Plot=full";
const RequiemForADreamAPI = "http://www.omdbapi.com/?t=Requiem+For+a+Dream&y=2000&apikey=56276421&i=tt3896198&plot=full";
const HerAPI = "http://www.omdbapi.com/?t=Her&y=2013&apikey=56276421&i=tt3896198&plot=full"; 
const ShutterApi = "http://www.omdbapi.com/?t=Shutter+Island&y=2010&apikey=56276421&i=tt3896198&plot=full"; 
const SplitApi= "http://www.omdbapi.com/?t=Split+&y=2016&apikey=56276421&i=tt3896198&plot=full"; 
const HerSong = "https://api.spotify.com/v1/search?type=album&q=" + encodeURIComponent("Song on the beach"); 
const RequiemSong = "https://api.spotify.com/v1/search?type=album&q=" + encodeURIComponent("Requiem for a Dream Scott Benson Band"); 
const ShutterSong = "https://api.spotify.com/v1/search?type=album&q=" + encodeURIComponent("On the nature of daylight"); 
const SplitSong = "https://api.spotify.com/v1/search?type=album&q=" + encodeURIComponent("Last Rites"); 
const JokerSong = "https://api.spotify.com/v1/search?type=album&q=" + encodeURIComponent("Rock & Roll part II"); 

/* credenziali OAuth2 Spotify */

const clientID = "c9c5e5c8fc1546bb8921ed37a646ad13";
const clientSecret = "a34269e6aa2c43cabbcf05d189fdfa09";
let token; /*variabile che conterrà il token OAuth2 Spotify */

function onFilmJson (json) {
    console.log(json); 
    let mainSection = document.querySelector("#main");
    let divBloccoFilm = document.createElement('div');
    divBloccoFilm.classList.add("blocco_film");
    mainSection.appendChild(divBloccoFilm);
    let divTitoloFilm = document.createElement('div');
    divTitoloFilm.classList.add("titolo_film");
    divBloccoFilm.appendChild(divTitoloFilm);
    let spanTitoloFilm = document.createElement('span');
    spanTitoloFilm.classList.add("Film");
    let titoloFilm = json.Title;
    spanTitoloFilm.textContent = titoloFilm;
    divTitoloFilm.appendChild(spanTitoloFilm);
    let pTrama = document.createElement('p');
    pTrama.classList.add("trama");
    let  trama = json.Plot;
    pTrama.textContent = trama;
    divBloccoFilm.appendChild(pTrama);
    let divValutazione = document.createElement('div'); 
    divValutazione.classList.add("Valutazione"); 
    let valutazioneSource1 = json.Ratings[0].Source;
    let valutazioneValue1 = json.Ratings[0].Value; 
    let valutazioneSource2 = json.Ratings[1].Source;
    let valutazioneValue2 = json.Ratings[1].Value; 
    let string = valutazioneSource1 + " : " + valutazioneValue1; 
    let string2 = valutazioneSource2 + " : " + valutazioneValue2; 
    string = string + " ---- " + string2;
    divValutazione.textContent= string; 
    let image = document.createElement('img'); 
    image.src= json.Poster; 
    divBloccoFilm.appendChild(divValutazione);
    divBloccoFilm.appendChild(image); 
}

function onResponse (response){
    return response.json(); 
}

//Richiesta token Spotify

fetch("https://accounts.spotify.com/api/token",
{  
    method: "post",
    body: 'grant_type=client_credentials',
    headers:
    { 
     'Content-Type': 'application/x-www-form-urlencoded',
     'Authorization': 'Basic ' + btoa(clientID + ':' + clientSecret)
    }
} 
).then(onResponse).then(ontokenJson);


function ontokenJson(json) {

    console.log(json);
    token = json.access_token;
    songFetches();
}

function onSongJson (json) {

    console.log(json); 
    let songSection = document.querySelector("#songs"); 
    let divBloccoSong = document.createElement('div'); 
    divBloccoSong.classList.add("blocco_song"); 
    songSection.appendChild(divBloccoSong); 
    let imageSong = document.createElement('img');
    imageSong.src = json.albums.items[0].images[1].url; 
    divBloccoSong.appendChild(imageSong); 
    let a = document.createElement('a'); 
    a.textContent = "Clicca qui per ascoltare"; 
    a.href = json.albums.items[0].external_urls.spotify; 
    divBloccoSong.appendChild(a); 


}

function songFetches() {

    fetch(HerSong,{
        headers:
       {
       'Authorization': 'Bearer ' + token
       }
       }).then(onResponse).then(onSongJson); 
   fetch(RequiemSong,{
       headers:
      {
      'Authorization': 'Bearer ' + token
      }
      }).then(onResponse).then(onSongJson); 
   fetch(ShutterSong, {
       headers:
      {
      'Authorization': 'Bearer ' + token
      }
      }).then(onResponse).then(onSongJson); 
   fetch(JokerSong, {
       headers:
      {
      'Authorization': 'Bearer ' + token
      }
      }).then(onResponse).then(onSongJson); 
   fetch(SplitSong, {
       headers:
      {
      'Authorization': 'Bearer ' + token
      }
      }).then(onResponse).then(onSongJson); 
      
}


fetch(JokerAPI).then(onResponse).then(onFilmJson); 
fetch(RequiemForADreamAPI).then(onResponse).then(onFilmJson);
fetch(HerAPI).then(onResponse).then(onFilmJson); 
fetch(ShutterApi).then(onResponse).then(onFilmJson); 
fetch(SplitApi).then(onResponse).then(onFilmJson);  

