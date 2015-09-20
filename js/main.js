var counter = 0;

var displayBoard = function () {
    var x = "";
    x = x + '<table width="300" height="300">';
    var n = 2;
    for (var i = 0; i <= n; i++){
          x = x + ('<tr>');
       for (var j = 0; j <= n; j++) {
            x = x + '<td><div class="field"></div></td>';
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
    var x;

    var isOdd = function(counter) {
        x = (counter % 2);
        return x;
    };
    isOdd(counter);

    if (x === 1) {
        $(that).html("X");
    } else {
        $(that).html("0");
    }
    counter = counter + 1;
})
});