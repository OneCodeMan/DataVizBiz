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

function setColors(genres) {
  var circColors = [];
  for(var i = 0; i < genres.length; i++) {
    circColors.push(colorChoices[genres[i]]);
  }
  return circColors;
}

var colorChoices = {
  'Action' : '#F45866',
  'Sci-Fi' : '#00A5CF',
  'Comedy' : '#F8F32B',
  'Drama' : '#750D37',
  'Adventure' : '#B3DEC1',
  'Mystery' : '#C1B098',
  'Psychological' : '#2B2D42',
  'Fantasy' : '#D2F898',
  'Ecchi' : '#FF88DC',
  'Josei' : '#D90368',
  'Demons' : '#F7567C',
  'Game' : '#FDF0D5',
  'Cars' : '#DC9E82',
  'Romance' : '#CA6680'
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

  var colors = setColors(genres);
  var radiiSizes = rank(size);
  console.log(colors);
  //console.log(new Set(genres));

  makePlotly(x, y, radiiSizes, colors);

}
function makePlotly(x, y, sizes, colors) {
  var plotDiv = document.getElementById('plot');
  var traces = [{
    x: x,
    y: y,
    mode: 'markers',
    marker: {
      size: sizes,
      color: colors,
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
