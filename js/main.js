var fb = new Firebase('https://valtictactoegame.firebaseio.com/');
var d = {};
var item;

var counter = 0;

var displayBoard = function() {
    var x = "";
    x = x + '<table width="300" height="300">';
    var n = 2;
    for (var i = 0; i <= n; i++) {
        x = x + ('<tr>');
        for (var j = 0; j <= n; j++) {
            x = x + '<td><div class="field" box-id="q' + i + '' + j + '"></div></td>';
        }
    }
    x = x + '</tr></table>';
    $('#x').html(x);
}



$(document).ready(function() {
    displayBoard();

    $('div').on('click', function(e) {
        var that = this;
        if ($(that).html() !== "") {
            return;
        }

        var isOdd = function(counter) {
            return (counter % 2);
        };
        var x = isOdd(counter);

        var y = "X";
        var z = "O";

        if (x === 1) {
            var a = $(that).html(y);
        } else {
            var a = $(that).html(z);
        }
        counter = counter + 1;

        var boxIndex = $(that).attr('box-id');
        console.log($(that).attr('box-id'));
        var letter = $(that).html();

        fb.push({
            boxIndex: boxIndex,
            letter: letter
        });
    })
});