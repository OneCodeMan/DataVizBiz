// https://plot.ly/javascript/ajax-call/


Plotly.d3.csv('data/anime.csv', function(err, rows) {

  function unpack(rows, key) {
  	return rows.map(function(row) { return row[key] });
  }

  var data;

});
