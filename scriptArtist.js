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
  })
  .catch((error) => Error(error));
