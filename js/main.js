var fb;
var item;
var counter = 0;
var boardInput;
var boardNum;
var clickCounter = 1;
var turn = true;

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
        $('#boardInput').val(boardInput);
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
    counter += 1;
    clickCounter += 1;
    if (clickCounter >= 2) {
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

            if (counter % 2) {
                $(that).html("X");
            } else {
                $(that).html("O");
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
        loadBoard();
        $('#joinInput').val('');
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

 var myDataRef = new Firebase('https://test2player.firebaseio.com/');
      $('#messageInput').keypress(function (e) {
        if (e.keyCode == 13) {
          var name = $('#nameInput').val();
          var text = $('#messageInput').val();
          myDataRef.push({name: name, text: text});
          $('#messageInput').val('');
        }
      });
      myDataRef.on('child_added', function(snapshot) {
        var message = snapshot.val();
        displayChatMessage(message.name, message.text);
      });
      function displayChatMessage(name, text) {
        $('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
        $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
      };
});