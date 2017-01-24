function makeplot() {
  Plotly.d3.csv('data/anime.csv', function(data) {
    processData(data);
  });
};

function processData(allRows) {
  var xRaw = [];
  var yRaw = [];
  var size = [];

  for (var i = 0; i < allRows.length; i++) {
    row = allRows[i];
    xRaw.push( parseInt(row['episodes']) );
    yRaw.push( parseFloat(row['rating']) );
  }

  var x = xRaw.sort();
  var y = yRaw.sort();

  makePlotly(x, y);

}
function makePlotly(x, y) {
  var plotDiv = document.getElementById('plot');
  var traces = [{
    x: x,
    y: y,
    mode: 'markers',
    marker: {
      size: [30]
    }
  }];

  var layout = {
    title: 'Anime',
    showlegend: false,
    height: 600,
    width: 1200
  }

  Plotly.newPlot('display', traces, layout);

  }

makeplot();
