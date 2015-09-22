var fb;
var item;
var counter = 0;
var boardInput;
var boardNum;
var clickCounter = 1;
var turn = true;

//how to manage complexity

// var makePlayer = function (){
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

var loadBoard = function() {
    boardNum = parseInt(Math.random() * (1000 - 1) + 1);
    $('#boardInput').val(boardNum);
    fb = new Firebase('https://valtictactoegame.firebaseio.com/' + boardNum);
    displayBoard();
    loadData();
    allowClick();
};

var joinGame = function() {
    $('#buttonSet').on('click', function() {
        boardInput = $('#joinInput').val();
        fb = new Firebase('https://valtictactoegame.firebaseio.com/' + boardInput);
        // makePlayer();
        displayBoard();
        loadData();
        allowClick();
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

var updateCounter = function() {
    counter += 1; //increment counter
    clickCounter += 1; //increment clickCounter
    if (clickCounter >= 2) { //check if clickCounter is less or equal to 2
        // clickCounter being >=2 means child_added was triggered at least twice.
        // since we stop the user from sending data to the server more than once at a time,
        //this implies the other player sent the other piece of data and triggered child_added for the second time.
        turn = true;
    } else {
        turn = false;
    }
};

var loadData = function() {
    fb.off('child_added');
    fb.on('child_added', function(item) {
        var token = item.val();
        addToken(token.boxIndex, token.letter);
        var boxIndex = item.val()['boxIndex'];
        var letter = item.val()['letter'];
        updateCounter();
    });
};

var addToken = function(boxIndex, letter) {
    $("#" + boxIndex).html(letter);
};

var resetClickCounter = function() {
    clickCounter = 0;
};

var checkCounter = function(el) {
    if (counter % 2) { //check if counter is even or odd
        $(el).html("X");
    } else {
        $(el).html("O");
    }
};

var allowClick = function() {
    $('.submit').on('click', '.field', function(e) {
        e.stopPropagation();

        if (turn == false) {
            return;
        }

        resetClickCounter();

        var that = this;
        if ($(that).html() !== "") {
            return;
        }

        checkCounter(that);

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
        loadBoard();
    })
};

var deleteComplete = function(error) {
    if (error) {
        console.log('Firebase Synchronization failed');
    } else {
        console.log('Firebase Synchronization succeeded');
    }
};

var deleteData = function() {
    $('#deleteData').on('click', function() {
        fb.remove(deleteComplete);
        location.reload();
    })
};

$(document).ready(function() {
    displayBoard();
    deleteData();
    joinGame();
    loadBoard();
    newGame();
});