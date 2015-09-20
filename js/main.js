var fb;
var item;
var counter = 0;



$('#buttonSet').on('click', function() {
    // clearBoard();
    // $('#boardInput').keypress(function (e) {
    //   console.log("I'm here!!!");
    //   if (e.keyCode == 13) {
    var boardInput = $('#joinInput').val();
    fb = new Firebase('https://valtictactoegame.firebaseio.com/' + boardInput);
    displayBoard();
    startGame();
    reset();
});


var displayBoard = function() {
    var x = "";
    x = x + '<table width="300" height="300">';
    var n = 2;
    for (var i = 0; i <= n; i++) {
        x = x + ('<tr>');
        for (var j = 0; j <= n; j++) {
            x = x + '<td class="submit"><div class="field" id="q' + i + '' + j + '"></div></td>';
        }
    }
    x = x + '</tr></table>';
    $('#x').html(x);
}

var startGame = function() {
    fb.on('child_added', function(item) {
        var token = item.val();
        addToken(token.boxIndex, token.letter);
        var r = item.val();
        var boxIndex = item.val()['boxIndex'];
        var letter = item.val()['letter'];
        counter = counter + 1;
        console.log(counter);
    });
};

var addToken = function(boxIndex, letter) {
    $("#" + boxIndex).html(letter);
};

var onComplete = function(error) {
    if (error) {
        console.log('Firebase Synchronization failed');
    } else {
        console.log('Firebase Synchronization succeeded');
    }
};

var deleteData = function() {
    $('#deleteData').on('click', function() {
        fb.remove(onComplete);
        location.reload();
    })
};

var reset = function(){
    $('.submit').on('click', '.field', function(e) {
        e.stopPropagation();
        var that = this;
        if ($(that).html() !== "") {
            return;
        }
        console.log(counter);
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

        var boxIndex = $(that).attr('id');

        var letter = $(that).html();

        fb.push({
            boxIndex: boxIndex,
            letter: letter
        })
    })
};

$(document).ready(function() {
    displayBoard();
    deleteData();

    var makeBoard = function() {
    // $('#buttonNew').on('click', function() {
        //var fb = new Firebase('http://test2player.firebaseio.com/');
        var boardNum = parseInt(Math.random() * (1000 - 1) + 1);
        //console.log(boardNum);
        // $('#boardNum').html(boardNum);
        $('#boardInput').val(boardNum);
        fb = new Firebase('https://valtictactoegame.firebaseio.com/' + boardNum);
        //console.log('http://test2player.firebaseio.com/' + boardNum);
        displayBoard();
        startGame();
        reset();

    // });
}
makeBoard();

});