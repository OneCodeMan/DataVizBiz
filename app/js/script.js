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
  'scifi' : '#00A5CF',
  'comedy' : '#F8F32B',
  'drama' : '#750D37',
  'adventure' : '#B3DEC1',
  'mystery' : '#C1B098',
  'psychological' : '#2B2D42',
  'fantasy' : '#D2F898',
  'ecchi' : '#FF88DC',
  'josei' : '#D90368',
  'demons' : '#F7567C',
  'game' : '#FDF0D5',
  'cars' : '#DC9E82',
  'romance' : '#CA6680'
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
