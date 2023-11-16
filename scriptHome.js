const urlPlaylists =
  'https://deezerdevs-deezer.p.rapidapi.com/search?q="playlist"';

const urlGramatik =
  'https://deezerdevs-deezer.p.rapidapi.com/search?q="gramatik"';

const urlImagineDragons =
  'https://deezerdevs-deezer.p.rapidapi.com/search?q="imagine-dragons"';

const urlEdSheeran =
  'https://deezerdevs-deezer.p.rapidapi.com/search?q="ed-sheeran"';

const urlArcticMonkeys =
  'https://deezerdevs-deezer.p.rapidapi.com/search?q="arctic-monkeys"';

const urlPhilCollins =
  'https://deezerdevs-deezer.p.rapidapi.com/search?q="phil-collins"';

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "324d031408msh0f6aa06c1f35eb0p17c00fjsne3d27a65a55b",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

window.onload = () => {
  let songsArray = [];

  fetch(urlPlaylists, options)
    .then((resp) => {
      if (resp.ok) return resp.json();
      else throw new Error("Error");
    })
    .then((playlistObj) => {
      playlistObj.data.forEach((e) => {
        let playLi = document.createElement("li");
        let a = document.createElement("a");
        let ul = document.getElementById("playlist-ul");

        playLi.classList.add("mt-3");

        a.classList.add("link-underline", "link-underline-opacity-0");
        a.href = e.link;
        a.innerText = e.title;

        playLi.appendChild(a);
        ul.appendChild(playLi);
      });
    })
    .catch((error) => console.log(error));

  fetch(urlImagineDragons, options)
    .then((resp) => {
      if (resp.ok) return resp.json();
      else throw new Error("Error");
    })
    .then((songsObj) => {
      let song = songsObj.data[0];
      let featured = document.querySelector(".featured-song");

      featured.innerHTML = `<div class="featured-image p-3 py-4">
        <img
          src="${song.album.cover_big}"
          alt=""
          
        />
      </div>
      <div class="featured-info me-auto p-2" id="featured">
        <p><a class= " link-pointer link-light link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover" href="./album.html?_id=${song.album.id}">Album</a></p>
        <h1 class=" title-feature text-truncate">${song.title}</h1>
        <a class= " link-pointer link-light link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover" href="./artistPage.html?_id=${song.artist.id}">${song.artist.name}</a>
        <p>Ascolta il nuovo singolo di <a class= "link-pointer link-light link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover" href="./artistPage.html?_id=${song.artist.id}">${song.artist.name}</a></p>
        <div class="featured-buttons d-flex align-items-center">
          <a class="featured-btn-play text-dark me-4" >Play</a>
          <a class="featured-btn-save text-white me-4">Salva</a>
          <div class="dots"><i class="fas fa-ellipsis-h fs-6"></i></div>
        </div>
      </div>
      <div class="hide-announcements pt-3 me-2">
          <button class=" d-none featured-btn-hide font-smaller  ">
            NASCONDI ANNUNCI
          </button>
        </div>`;

      let playButton = document.querySelector(".featured-btn-play");
      playButton.addEventListener("click", () =>
        playSong(
          song.title,
          song.artist.name,
          song.album.cover_small,
          song.duration
        )
      );

      let card3 = document.getElementById("card3");
      card3.innerHTML = `<div class="card card-bg">
      <div class="image" style="padding: 10px">
        <img
          src="${song.artist.picture_medium}"
          class="card-img-top"
          alt="..."
          style="border-radius: 5px"
        />
      </div>
      <div class="card-body ">
        <h5 class="card-title text-white"><a class= " link-pointer link-light link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover" href="./artistPage.html?_id=${song.artist.id}">${song.artist.name}</a></h5>
        <p class="card-text text-grey">Scopri l'artista</p>
      </div>
    </div>`;

      songsObj.data
        .forEach((e) => {
          songsArray.push(e);
        })
        .catch((error) => console.log(error));
    });

  fetch(urlGramatik, options)
    .then((resp) => {
      if (resp.ok) return resp.json();
      else throw new Error("Error");
    })
    .then((songsObj) => {
      let song = songsObj.data[0];
      let card2 = document.getElementById("card2");
      card2.innerHTML = `<div class="card card-bg">
      <div class="image" style="padding: 10px">
        <img
          src="${song.artist.picture_medium}"
          class="card-img-top"
          alt="..."
          style="border-radius: 5px"
        />
      </div>
      <div class="card-body">
        <h5 class="card-title text-white"><a class= " link-pointer link-light link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover" href="./artistPage.html?_id=${song.artist.id}">${song.artist.name}</a></h5>
        <p class="card-text text-grey">Scopri l'artista</p>
      </div>
    </div>`;

      songsObj.data
        .forEach((e) => {
          songsArray.push(e);
        })
        .catch((error) => console.log(error));
    });

  fetch(urlEdSheeran, options)
    .then((resp) => {
      if (resp.ok) return resp.json();
      else throw new Error("Error");
    })
    .then((songsObj) => {
      let song = songsObj.data[0];
      let card4 = document.getElementById("card4");
      card4.innerHTML = `<div class="card card-bg">
      <div class="image" style="padding: 10px">
        <img
          src="${song.artist.picture_medium}"
          class="card-img-top"
          alt="..."
          style="border-radius: 5px"
        />
      </div>
      <div class="card-body">
        <h5 class="card-title text-white"><a class= " link-pointer link-light link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover" href="./artistPage.html?_id=${song.album.id}">${song.artist.name}</a></h5>
        <p class="card-text text-grey">Scopri l'artista</p>
      </div>
    </div>`;

      songsObj.data
        .forEach((e) => {
          songsArray.push(e);
        })
        .catch((error) => console.log(error));
    });
  fetch(urlArcticMonkeys, options)
    .then((resp) => {
      if (resp.ok) return resp.json();
      else throw new Error("Error");
    })
    .then((songsObj) => {
      let song = songsObj.data[0];
      let card1 = document.getElementById("card1");
      card1.innerHTML = `<div class="card card-bg">
      <div class="image" style="padding: 10px">
        <img
          src="${song.artist.picture_medium}"
          class="card-img-top"
          alt="..."
          style="border-radius: 5px"
        />
      </div>
      <div class="card-body">
        <h5 class="card-title text-white"><a class= " link-pointer link-light link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover" href="./artistPage.html?_id=${song.artist.id}">${song.artist.name}</a></h5>
        <p class="card-text text-grey">Scopri l'artista</p>
      </div>
    </div>`;

      songsObj.data
        .forEach((e) => {
          songsArray.push(e);
        })
        .catch((error) => console.log(error));
    });
  fetch(urlPhilCollins, options)
    .then((resp) => {
      if (resp.ok) return resp.json();
      else throw new Error("Error");
    })
    .then((songsObj) => {
      let song = songsObj.data[0];
      let card5 = document.getElementById("card5");
      card5.innerHTML = `<div class="card card-bg">
      <div class="image" style="padding: 10px">
        <img
          src="${song.artist.picture_medium}"
          class="card-img-top"
          alt="..."
          style="border-radius: 5px"
        />
      </div>
      <div class="card-body">
        <h5 class="card-title text-white"><a class= " link-pointer link-light link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover" href="./artistPage.html?_id=${song.artist.id}">${song.artist.name}</a></h5>
        <p class="card-text text-grey">Scopri l'artista</p>
      </div>
    </div>`;

      songsObj.data
        .forEach((e) => {
          songsArray.push(e);
        })
        .catch((error) => console.log(error));
    });
};

function playSong(songName, artistName, img, duration) {
  let song = document.getElementById("player-song-name");
  let artist = document.getElementById("player-artist-name");
  let image = document.getElementById("player-img");
  let time = document.getElementById("total-time");

  song.innerText = songName;
  artist.innerText = artistName;
  image.src = img;

  let minutes = Math.floor(duration / 60);
  let seconds = duration - minutes * 60;

  time.innerText = `${minutes}:${seconds} `;
}
