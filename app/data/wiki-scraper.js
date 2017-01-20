var cheerio = require('cheerio');
var rp = require('request-promise');
var fsp = require('fs-promise');
var path = require('path');
var scriptName = path.basename(__filename);

const url = "https://en.wikipedia.org/wiki/List_of_Gintama_episodes";

var dataList = [];

/*
text = "spidermanners"
sub = "r"
index = 2

text.split("r", 2)
= ["spide", "manne"]
.join("r")
= "spidermanne"
.length
= 11
*/

// gets position the ith (index) occurrence of sub in text
function getPosition(text, sub, index) {
  return text.split(sub, index).join(sub).length;
}

function parse(html) {
    var $ = cheerio.load(html);

    $('td.summary').each(function(index) {
        var titleRaw = $(this).text().trim();
        var titleIndex = getPosition(titleRaw, '"', 2);
        var title = titleRaw.substring(1, titleIndex);
        dataList.push(title);
    });

    var data = dataList.join('\n');
    return data;
}

var append = file => content => fsp.appendFile(file, content);

rp(url)
    .then(parse)
    .then(append('gintama-ep-titles.txt'))
    .then(() => console.log('success from ' + scriptName))
    .catch(err => console.log(err));
