const params = new URLSearchParams(window.location.search);
const itemId = params.get("_id");
const URL = "https://deezerdevs-deezer.p.rapidapi.com/artist/" + itemId;

fetch(URL, {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "502b14b9demsh6c69f58b54e3ac4p1edca2jsn4ad89cccab70",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
})
  .then((resp) => {
    if (!resp) {
      throw new Error();
    }
    return resp.json();
  })
  .then()
  .catch();
