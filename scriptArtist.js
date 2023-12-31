const params = new URLSearchParams(window.location.search);
const itemId = params.get("_id");
const URL = "https://deezerdevs-deezer.p.rapidapi.com/artist/" + itemId;
const urlTracklist =
  "https://striveschool-api.herokuapp.com/api/deezer/artist/" +
  itemId +
  "/top?limit=10";

fetch(URL, {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "502b14b9demsh6c69f58b54e3ac4p1edca2jsn4ad89cccab70",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com"
  }
})
  .then((resp) => {
    if (!resp) {
      throw new Error();
    }
    return resp.json();
  })
  .then((artistObj) => {
    console.log(artistObj);

    let artistTitle = document.querySelector(".artist-cover-title");
    artistTitle.innerText = `${artistObj.name}`;

    let artistPicture = document.querySelector(".artist-cover");
    artistPicture.style = `background-image: url('${artistObj.picture_big}')`;

    let imgBadge = document.querySelectorAll(".artist-img-badge");
    console.log(imgBadge);
    imgBadge.forEach((e) => {
      e.innerHTML = `<img
          src="${artistObj.picture_small}"
          class="card-img-top"
          alt="..."
          style="border-radius: 5px"
        />`;
    });

    let spanBadgeMobile = document.querySelector(".liked-songs-span");
    console.log(spanBadgeMobile);
    spanBadgeMobile.innerText = `10 Brani di ${artistObj.name}`;

    let spanBadge = document.querySelector(".artist-badge-name");
    console.log(spanBadge);
    spanBadge.innerText = `Di ${artistObj.name}`;
  })
  .catch((error) => Error(error));

fetch(urlTracklist, {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "502b14b9demsh6c69f58b54e3ac4p1edca2jsn4ad89cccab70",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com"
  }
})
  .then((resp) => {
    if (!resp) {
      throw new Error();
    }
    return resp.json();
  })
  .then((trackObj) => {
    console.log(trackObj);
    trackObj.data.forEach((e) => {
      let popularSongs = document.querySelector(".popular-playlist-songs");

      const row = document.createElement("div");
      row.classList.add(
        "row",
        "popular-songs-list",
        "pt-1",
        "ms-1",
        "ms-lg-4",
        "mt-4",
        "d-flex",
        "align-items-center",
        "mt-sm-1"
      );

      let trackMinutes = Math.floor(e.duration / 60);
      let trackSeconds = e.duration - trackMinutes * 60;

      row.innerHTML = `
    <div class="col-5 mx-1 d-flex align-items-center text-center text-nowrap  text-xl-nowrap">
      <img
        src=${e.album.cover_small}
        alt=""
      />
      <p class="m-1 ps-2 d-md-block text-truncate">${e.title}</p>
      
    </div>
    <div class="col-3 text-end d-none d-md-block ranks">
      <p class="m-1 p-2 " >${e.rank}</p>
    
    </div>
    <div class="col-3 text-end flex-grow-1 times">
      <p class="m-1 p-2 d-none d-md-block">${trackMinutes}:${trackSeconds}</p> 
       <a class="d-md-none text-grey "> <i class="bi bi-three-dots-vertical"></i></a>
    </div>
    
  </div>`;

      popularSongs.appendChild(row);
    });
  })
  .catch((error) => Error(error));
