/*
TODO: Add hover info
TODO: Add more todos
TODO: Highest rated tv anime
TODO: Lowest rated tv anime
*/

function rank(arr) {
  var sorted = arr.slice().sort(function(a, b) {return b - a;});
  var ranks = arr.slice().map(function(v) { return sorted.indexOf(v) + 1 });

  for (var i = 0; i < ranks.length; i++) {
    ranks[i] = ranks[i] * 0.2;
  }
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
  var numData = 700;
  var descriptionComponents = {
    genres: [],
    names: [],
  };
  var description = [];

  for (var i = 0; i < numData; i++) {
    var row = allRows[i];
    if (row.type === 'TV') {
      var genreRaw = row.genre;
      var genre = genreRaw.substring(0, genreRaw.indexOf(','));
      genres.push(genre);
      x.push( parseInt(row.members) );
      y.push( parseFloat(row.rating) );
      size.push( parseInt(row.episodes) );
      descriptionComponents.names.push(row.name);
      descriptionComponents.genres.push(genreRaw);
    }
  }

  var colors = setColors(genres);
  var radiiSizes = rank(size);

  descriptionComponents.members = x;
  descriptionComponents.ratings = y;
  descriptionComponents.episodes = size;

  for (var i = 0; i < numData; i++) {
    var currDescription = 'Name: ' + descriptionComponents.names[i] +
                          'Genre: ' + descriptionComponents.genres[i] +
                          'Members: ' + descriptionComponents.members[i] +
                          'Rating: ' + descriptionComponents.ratings[i] +
                          'Episode count: ' + descriptionComponents.episodes[i];
    description.push(currDescription);

  }


  makePlotly(x, y, radiiSizes, colors, description);

}
function makePlotly(x, y, sizes, colors, description) {
  var plotDiv = document.getElementById('plot');
  var traces = [{
    x: x,
    y: y,
    text: description,
    mode: 'markers',
    marker: {
      size: sizes,
      color: colors,
    }
  }];

  var layout = {
    title: 'Analysis of Anime TV Shows',
    titlefont: {
      size: 30,
      color: '#81D2C7'
    },
    showlegend: false,
    height: 600,
    width: 900,
    xaxis: {
      title: 'Number of Fans',
      range: [0, 300000],
      titlefont: {
        size: 20,
        color: '#81D2C7'
      }
    },
    yaxis: {
      title: 'Overall Rating',
      titlefont: {
        size: 20,
        color: '#81D2C7'
      }
    }
  }

  Plotly.newPlot('display', traces, layout);

  }

makeplot();
