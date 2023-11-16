const params = new URLSearchParams(window.location.search);
const itemId = params.get("_id");
const URL = "https://deezerdevs-deezer.p.rapidapi.com/album/" + itemId;

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
    document.querySelector(
      ".album-desc a"
    ).href = `./artistPage.html?_id=${albumObj.artist.id}`;

    const releaseYear = albumObj.release_date.slice(0, 4);
    document.querySelector(
      ".album-desc span:nth-of-type(2)"
    ).innerText = `· ${releaseYear} · ${albumObj.nb_tracks} brani,`;

    let minutes = Math.floor(albumObj.duration / 60);
    let seconds = albumObj.duration - minutes * 60;
    document.querySelector(
      ".album-desc span:last-of-type"
    ).innerText = `${minutes} min ${seconds} sec.`;

    albumObj.tracks.data.forEach((track) => {
      const tracklist = document.querySelector(
        ".album main div:nth-of-type(2)"
      );

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

      let trackMinutes = Math.floor(track.duration / 60);
      let trackSeconds = track.duration - trackMinutes * 60;

      row.innerHTML = `<div class="col-4 d-flex flex-column ">
                  <p class="ps-0 ps-sm-4 song-title">${track.title}</p>
                 <p class="ps-0 ps-sm-4"><a href="./artistPage.html?_id=${albumObj.artist.id}">${track.artist.name}</a></p>
               </div>
               <div class="col-4 text-end d-none d-sm-block">${track.rank}</div>
             <div class="col-3 flex-grow-1 text-end">
                 <span class="d-none d-sm-inline">${trackMinutes}:${trackSeconds}</span>
                 <span class="d-block d-md-none"><i class="fa-solid fa-ellipsis-vertical"></i></span>
               </div>`;

      tracklist.appendChild(row);
    });

    document.querySelector(".album main .container-fluid + div").innerText =
      albumObj.release_date;
    document.querySelector(
      ".show-interests div"
    ).innerText = `Altro da ${albumObj.artist.name}`;
  })
  .catch((error) => Error(error));
