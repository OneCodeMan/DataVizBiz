var req = new XMLHttpRequest();
var url = 'data/gintama-ep-titles.txt';
req.open('GET', url);
req.onload = function() {

  if (req.status === 200) {
    var contentRaw = req.responseText;
    var contentUnsorted = contentRaw.split('\n');
    var content = contentUnsorted.sort(function(a, b) {
      return b.length - a.length;
    })
    console.log(content);

  } else {
    console.log("Error");
  }
};

req.send();
