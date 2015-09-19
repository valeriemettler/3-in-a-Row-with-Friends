var counter = 0;

$('div').on('click', function(e) {
    var that = this;
    var x;

    var isOdd = function (counter) {
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
