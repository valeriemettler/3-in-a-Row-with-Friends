var fb;
var item;
var counter = 0;
var boardInput;
var boardNum;
var cc = 1;
var turn = true;

// var makePlayer = function (){
    //can only play on every other child added... or even/odd counter
    // $('#usernameSet').on('click', function() {

        // var nameInput = $('#nameInput').val();
        // console.log(nameInput);
        // fbplayers = new Firebase('https://valtictactoegame.firebaseio.com/' + boardInput + '/' + nameInput);
        // fbplayers.child('turn').set('null');

        //fbplayers.update({ turn: 'null'});
        //fbplayers.update({ turn: 'true'});
        //fbplayers.update({ turn: 'false'});
    // })

// };

var makeBoard = function() {
    boardNum = parseInt(Math.random() * (1000 - 1) + 1);
    $('#boardInput').val(boardNum);
    fb = new Firebase('https://valtictactoegame.firebaseio.com/' + boardNum);
    displayBoard();
    startGame();
    reset();
};

var join = function() {
    $('#buttonSet').on('click', function() {
        boardInput = $('#joinInput').val();
        fb = new Firebase('https://valtictactoegame.firebaseio.com/' + boardInput);
        // makePlayer();
        displayBoard();
        startGame();
        reset();
    })
};

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
    fb.off('child_added');
    fb.on('child_added', function(item) {
        var token = item.val();
        addToken(token.boxIndex, token.letter);
        var boxIndex = item.val()['boxIndex'];
        var letter = item.val()['letter'];
        counter = counter + 1;
        cc += 1;
        if (cc >= 2) {
            // cc being >=2 means child_added was triggered at least twice.
            // since we stop the user from sending data to the server more than once at a time, this implies the other player sent the other piece of data and triggered child_added for the second time

            turn = true;
        } else {
            turn = false;
        }
        console.log("cc",cc);
        console.log("counter",counter);
        //console.log(turn);
    });
};

var addToken = function(boxIndex, letter) {
    $("#" + boxIndex).html(letter);
};



var reset = function() {
    $('.submit').on('click', '.field', function(e) {
        e.stopPropagation();
        if (turn == false) {return;}
        cc = 0;
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

        var boxIndex = $(that).attr('id');

        var letter = $(that).html();

        fb.push({
            boxIndex: boxIndex,
            letter: letter
        })
    })
};

var newGame = function() {
    $('#buttonNew').on('click', function() {
        makeBoard();
    })
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

$(document).ready(function() {
    displayBoard();
    deleteData();
    join();
    makeBoard();
    newGame();
});