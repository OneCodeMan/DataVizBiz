var req = new XMLHttpRequest();
var url = 'data/gintama-ep-titles.txt';
req.open('GET', url);
req.onload = function() {

  if (req.status === 200) {
    var contentRaw = req.responseText;
    var content = contentRaw.split('\n');

    // logic

  } else {
    console.log("Error");
  }
};

req.send();
