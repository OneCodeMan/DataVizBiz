/*
TODO: Draw out what you want it to look like
TODO: Color by genre
TODO: Add labels
*/

function rank(arr) {
  var sorted = arr.slice().sort(function(a, b) {return b - a;});
  var ranks = arr.slice().map(function(v) { return sorted.indexOf(v) + 1 });
  return ranks;
}

var colorChoices = {
  'action' : '#F45866',
  'scifi' : '#F45866',
  'comedy' : '#F45866',
  'drama' : '#F45866',
  'adventure' : '#F45866',
  'mystery' : '#F45866',
  'psychological' : '#F45866',
  'fantasy' : '#F45866',
  'ecchi' : '#F45866',
  'josei' : '#F45866',
  'demons' : '#F45866',
  'game' : '#F45866',
  'cars' : '#F45866',
  'romance' : '#F45866'
}

function makeplot() {
  Plotly.d3.csv('data/anime.csv', function(data) {
    processData(data);
  });
};

function processData(allRows) {
  var x = [];
  var y = [];
  var size = [];
  var genres = [];

  for (var i = 0; i < allRows.length; i++) {
    var row = allRows[i];
    if (row.type === 'TV') {
      var genreRaw = row.genre;
      var genre = genreRaw.substring(0, genreRaw.indexOf(','));
      genres.push(genre);
      x.push( parseInt(row.episodes) );
      y.push( parseFloat(row.rating) );
      size.push( parseInt(row.members) );
    }
  }

  var genreSet = new Set(genres);
  console.log(genreSet);
  var rankBySize = rank(size);

  makePlotly(x, y, rankBySize);

}
function makePlotly(x, y, sizes) {
  var plotDiv = document.getElementById('plot');
  var traces = [{
    x: x,
    y: y,
    mode: 'markers',
    marker: {
      size: sizes
    }
  }];

  var layout = {
    title: 'Anime',
    showlegend: false,
    height: 600,
    width: 1200,
    xaxis: { title: 'Episode Count' },
    yaxis: { title: 'Overall Rating' }
  }

  Plotly.newPlot('display', traces, layout);

  }

makeplot();
