const api = {
  baseUrl: "http://api.giphy.com/v1/gifs/trending",
  api_key: "Qwg11FMWcnfnPz1ewNeMk8yMoJ7lx6uF"
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

  //scrolling Test
  // for (let i = 0; i < limit; i++) {
  //   var para = document.createElement("p");
  //   var node = document.createTextNode("This is new.");
  //   para.appendChild(node);
  //   var rootElement = document.getElementById("root");
  //   rootElement.appendChild(para);
  // }
}

function init() {
  limit = 20;
  offset = 0;
  addItems();
  window.onscroll = onScroll;
}

// window.onscroll = function(ev) {
//   if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
//     alert("you're at the bottom of the page");
//   }
// };

function onScroll(ev) {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    offset = offset + limit;
    if (limit != 10) limit = limit - 5;
    console.log("scrolled at the bottom");
    addItems();

    window.onscroll = null;
    console.log("timeout");
    setTimeout(() => {
      window.onscroll = onScroll;
    }, 500);
  }
}

init();
