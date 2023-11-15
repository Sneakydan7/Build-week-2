const url = 'https://deezerdevs-deezer.p.rapidapi.com/search?q="playlist"';

const urlImagineDragons =
  'https://deezerdevs-deezer.p.rapidapi.com/search?q="imagine-dragons"';

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "324d031408msh0f6aa06c1f35eb0p17c00fjsne3d27a65a55b",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

window.onload = () => {
  fetch(url, options)
    .then((resp) => {
      if (resp.ok) return resp.json();
      else throw new Error("Error");
    })
    .then((playlistObj) => {
      console.log(playlistObj);
      console.log(playlistObj.data);

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
      console.log(songsObj.data);

      let song = songsObj.data[0];
      let featured = document.querySelector(".featured-song");
      featured.innerHTML = `<div class="featured-image p-3 py-4">
        <img
          src="${song.album.cover_big}"
          alt=""
          style="width: 200px"
        />
      </div>
      <div class="featured-info me-auto p-2" id="featured">
        <p>Album</p>
        <h1 class=" title-feature ">${song.title}</h1>
        <p>${song.artist.name}</p>
        <p>Ascolta il nuovo singolo di <span>${song.artist.name}</span></p>
        <div class="featured-buttons d-flex align-items-center">
          <button class="featured-btn-play me-4">Play</button>
          <button class="featured-btn-save text-white me-4">Salva</button>
          <div class="dots"><i class="fas fa-ellipsis-h fs-4"></i></div>
        </div>
      </div>
      <div class="hide-announcements pt-3 me-2">
          <button class="featured-btn-hide font-smaller d-none d-xl-flex">
            NASCONDI ANNUNCI
          </button>
        </div>`;
    });
};
