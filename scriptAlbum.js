const params = new URLSearchParams(window.location.search);
const itemId = params.get("_id");
const URL = "https://deezerdevs-deezer.p.rapidapi.com/album/" + itemId;

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

  if (seconds < 10) {
    time.innerText = `${minutes}:0${seconds}`;
  } else {
    time.innerText = `${minutes}:${seconds}`;
  }
}

window.addEventListener("DOMContentLoaded", () => {
  fetch(URL, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "324d031408msh0f6aa06c1f35eb0p17c00fjsne3d27a65a55b",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  })
    .then((resp) => {
      if (!resp) {
        throw new Error();
      }
      return resp.json();
    })
    .then((albumObj) => {
      console.log(albumObj);

      document.getElementsByTagName("h1")[0].innerText = albumObj.title;
      document.querySelector(".album-img > img").src = albumObj.cover_medium;

      document.querySelector(".album-desc a").innerText = albumObj.artist.name;
      document.querySelector(".album-desc a").href = `./artistPage.html?_id=${albumObj.artist.id}`;

      const releaseYear = albumObj.release_date.slice(0, 4);
      document.querySelector(
        ".album-desc span:nth-of-type(2)"
      ).innerText = `· ${releaseYear} · ${albumObj.nb_tracks} brani,`;

      let minutes = Math.floor(albumObj.duration / 60);
      let seconds = albumObj.duration - minutes * 60;
      document.querySelector(".album-desc span:last-of-type").innerText = `${minutes} min ${seconds} sec.`;

      document.querySelector(".artist-icon > img").src = albumObj.artist.picture_small;

      albumObj.tracks.data.forEach((track) => {
        const tracklist = document.querySelector(".album main div:nth-of-type(2)");

        const row = document.createElement("div");
        row.classList.add("row", "g-0", "mt-3", "ps-3", "py-1", "mt-3", "pe-4", "album-song", "align-items-center");

        let trackMinutes = Math.floor(track.duration / 60);
        let trackSeconds = track.duration - trackMinutes * 60;

        const trackCol = document.createElement("div");
        trackCol.classList.add("col-4", "d-flex", "flex-column");

        const songTitle = document.createElement("p");
        songTitle.classList.add("ps-0", "ps-sm-4", "song-title");
        songTitle.innerText = track.title;

        songTitle.addEventListener("click", () =>
          playSong(track.title, track.artist.name, albumObj.cover_small, track.duration)
        );

        trackCol.appendChild(songTitle);

        const artistName = document.createElement("p");
        artistName.classList.add("ps-0", "ps-sm-4");

        const artistNameAnchor = document.createElement("a");
        artistNameAnchor.innerText = track.artist.name;
        artistNameAnchor.href = `./artistPage.html?_id=${albumObj.artist.id}`;

        artistName.appendChild(artistNameAnchor);
        trackCol.appendChild(artistName);

        row.appendChild(trackCol);

        const rankCol = document.createElement("div");
        rankCol.classList.add("col-4", "text-end", "d-none", "d-sm-block");
        rankCol.innerText = track.rank;

        row.appendChild(rankCol);

        const timeCol = document.createElement("div");
        timeCol.classList.add("col-3", "flex-grow-1", "text-end");

        const timeSpan = document.createElement("span");
        timeSpan.classList.add("d-none", "d-sm-inline");
        if (trackSeconds < 10) {
          timeSpan.innerText = `${trackMinutes}:0${trackSeconds}`;
        } else {
          timeSpan.innerText = `${trackMinutes}:${trackSeconds}`;
        }

        const iconSpan = document.createElement("span");
        iconSpan.classList.add("d-inline", "d-sm-none");
        iconSpan.innerHTML = `<i class="fas fa-ellipsis-v"></i>`;

        timeCol.appendChild(timeSpan);
        timeCol.appendChild(iconSpan);

        row.appendChild(timeCol);

        tracklist.appendChild(row);
      });

      document.querySelector(".album main .container-fluid + div").innerText = albumObj.release_date;
      document.querySelector(".show-interests div").innerText = `Altro da ${albumObj.artist.name}`;
    })
    .catch((error) => Error(error));
});
