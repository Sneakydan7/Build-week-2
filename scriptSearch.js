window.addEventListener("DOMContentLoaded", function () {
  function handleSearch(url) {
    fetch(url, options)
      .then((resp) => {
        if (resp.ok) return resp.json();
        else throw new Error("Error");
      })
      .then((searchObj) => {
        let song = searchObj.data[0];
        let resultArtist = document.getElementById("result-artist");
        let artistCard = document.createElement("div");
        artistCard.classList.add("col-5");
        artistCard.innerHTML = `<div class="card card-bg ">
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
          <p class="card-text text-grey">Artista</p>
        </div>
      </div>
    </div>`;
        resultArtist.appendChild(artistCard);

        let albumSongsTop = document.getElementById("album-songs-top");

        searchObj.data.forEach((songObj) => {
          let resultSongs = document.getElementById("result-songs");

          const row = document.createElement("div");
          row.classList.add(
            "row",
            "g-0",
            "mt-3",
            "ps-3",
            "py-1",
            "mt-3",
            "pe-4",
            "album-song",
            "align-items-center"
          );

          let songObjMinutes = Math.floor(songObj.duration / 60);
          let songObjSeconds = songObj.duration - songObjMinutes * 60;

          const songObjCol = document.createElement("div");
          songObjCol.classList.add("col-4", "d-flex", "flex-column");

          const songTitle = document.createElement("p");
          songTitle.classList.add(
            "ps-0",
            "ps-sm-4",
            "song-title",
            "text-truncate"
          );
          songTitle.innerText = songObj.title;

          row.addEventListener("click", () =>
            playSong(
              songObj.title,
              songObj.artist.name,
              songObj.album.cover_small,
              songObj.duration
            )
          );

          songObjCol.appendChild(songTitle);

          const artistName = document.createElement("p");
          artistName.classList.add("ps-0", "ps-sm-4");

          const artistNameAnchor = document.createElement("a");
          artistNameAnchor.innerText = songObj.artist.name;
          artistNameAnchor.href = `./artistPage.html?_id=${songObj.artist.id}`;

          artistName.appendChild(artistNameAnchor);
          songObjCol.appendChild(artistName);

          row.appendChild(songObjCol);

          const timeCol = document.createElement("div");
          timeCol.classList.add("col-3", "flex-grow-1", "text-end");

          const timeSpan = document.createElement("span");
          timeSpan.classList.add("d-none", "d-sm-inline");
          if (songObjSeconds < 10) {
            timeSpan.innerText = `${songObjMinutes}:0${songObjSeconds}`;
          } else {
            timeSpan.innerText = `${songObjMinutes}:${songObjSeconds}`;
          }

          const iconSpan = document.createElement("span");
          iconSpan.classList.add("d-inline", "d-sm-none");
          iconSpan.innerHTML = `<i class="fas fa-ellipsis-v"></i>`;

          timeCol.appendChild(timeSpan);
          timeCol.appendChild(iconSpan);

          row.appendChild(timeCol);

          resultSongs.appendChild(row);
        });
      });
  }

  let form = document.getElementById("floatingInput");

  form.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      let resultArtist = document.getElementById("result-artist");
      resultArtist.innerHTML = "";
      let resultSongs = document.getElementById("result-songs");
      resultSongs.innerHTML = "";
      let searchBar = document.getElementById("floatingInput");
      let searchUrl = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${searchBar.value}`;
      handleSearch(searchUrl);
    }
  });
});
