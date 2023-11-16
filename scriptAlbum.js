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
  })
  .catch((error) => Error(error));
