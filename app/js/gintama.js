var req = new XMLHttpRequest();
var url = 'data/gintama-ep-titles.txt';
req.open('GET', url);
req.onload = function() {

  if (req.status === 200) {
    var contentRaw = req.responseText;
    var contentUnsorted = contentRaw.split('\n');
    var contentArr = contentUnsorted.sort(function(a, b) {
      return b.length - a.length;
    })
    var titles = [];

    for(var i = 0; i < contentArr.length; i++) {
      titles[i] = {'text': contentArr[i], 'length': contentArr[i].length};
    }

    var longEp = new Vue({
      el: '#gintama-div',
      data: {
        count: 10,
        titles: titles
      },

      methods: {
        setCount: function(titles, limit) {
          return titles.slice(0, limit);
        }
      }

    })

  } else {
    console.log("Error");
  }
};

req.send();
