const api = {
  baseUrl: "http://api.giphy.com/v1/gifs/trending",
  api_key: "Your Api Key Here"
};

let limit;
let offset;

function addItems() {
  let url =
    api.baseUrl +
    "?api_key=" +
    api.api_key +
    "&limit=" +
    limit +
    "&offset=" +
    offset;

  console.log(url);

  fetch(url)
    .then(resp => resp.json())
    .then(data => {
      let newGifsData = data.data;
      newGifsData.forEach(gifData => {
        var div = document.createElement("div");
        var image = document.createElement("IMG");
        image.setAttribute("src", gifData.images.original.url);
        image.setAttribute("height", 400);
        image.setAttribute("width", 400);
        div.appendChild(image);
        var rootElement = document.getElementById("root");
        rootElement.appendChild(div);
      });
    })
    .catch(e => console.log(e.message));
}

function init() {
  limit = 10;
  offset = 0;
  addItems();
}

window.onscroll = function(ev) {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    offset = offset + limit;
    console.log("scrolled at the bottom");
    addItems();
  }
};

init();
