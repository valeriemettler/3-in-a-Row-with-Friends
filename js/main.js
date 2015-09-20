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
            x = x + '<td><div class="field" id="q' + i + '' + j + '"></div></td>';
        }
    }
    x = x + '</tr></table>';
    $('#x').html(x);
}

fb.on('child_added', function(item) {
    var token = item.val();
    addToken(token.boxIndex, token.letter);
    var r = item.val();
    //console.log(r); // prints the dictionary objects of boxIndex:letter from firebase
    var boxIndex = item.val()['boxIndex'];
    //console.log("boxIndex", boxIndex);
    var letter = item.val()['letter'];
    //console.log("letter", letter);
    //$(boxIndex).html(letter);
    //$("#q01").html(letter);

});

var addToken = function(boxIndex, letter) {
    $("#" + boxIndex).html(letter);
    console.log("#" + boxIndex);
    console.log('#q01');
   // $(boxIndex).html(letter);
};

var onComplete = function(error) {
    if (error) {
        console.log('Firebase Synchronization failed');
    } else {
        console.log('Firebase Synchronization succeeded');
    }
};

var deleteData = function() {
    $('button').on('click', function() {
        fb.remove(onComplete);
        location.reload();
    })
};

$(document).ready(function() {
    displayBoard();
    deleteData();
    //var k = addToken();
    //console.log(k);

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

        var boxIndex = $(that).attr('id');
        //console.log($(that).attr('id'));
        var letter = $(that).html();

        fb.push({
            boxIndex: boxIndex,
            letter: letter
        });
    })
});