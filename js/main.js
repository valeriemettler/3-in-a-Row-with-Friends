var counter = 0;


$('div').on('click', function(e) {
        var that = this;
      //  console.log(that);
     //   $(that).html("X");

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

// $('#field1').click(function() {
//     var x;

//     var isOdd = function (counter) {
//         x = (counter % 2);
//         return x;
//     };
//     isOdd(counter);


//     if (x === 1) {
//         $('#field1').html("X");
//     } else {
//        $('#field1').html("0");
//     }
//     counter = counter + 1;
// });

// $('#field2').click(function() {
//     var x;

//     var isOdd = function (counter) {
//         x = (counter % 2);
//         return x;
//     };
//     isOdd(counter);


//     if (x === 1) {
//         $('#field2').html("X");
//     } else {
//        $('#field2').html("0");
//     }
//     counter = counter + 1;
// });

// $('#field3').click(function() {
//     var x;

//     var isOdd = function (counter) {
//         x = (counter % 2);
//         return x;
//     };
//     isOdd(counter);


//     if (x === 1) {
//         $('#field3').html("X");
//     } else {
//        $('#field3').html("0");
//     }
//     counter = counter + 1;
// });

// $('#field4').click(function() {
//     var x;

//     var isOdd = function (counter) {
//         x = (counter % 2);
//         return x;
//     };
//     isOdd(counter);


//     if (x === 1) {
//         $('#field4').html("X");
//     } else {
//        $('#field4').html("0");
//     }
//     counter = counter + 1;
// });

// $('#field5').click(function() {
//     var x;

//     var isOdd = function (counter) {
//         x = (counter % 2);
//         return x;
//     };
//     isOdd(counter);


//     if (x === 1) {
//         $('#field5').html("X");
//     } else {
//        $('#field5').html("0");
//     }
//     counter = counter + 1;
// });


// $('#field6').click(function() {
//     var x;

//     var isOdd = function (counter) {
//         x = (counter % 2);
//         return x;
//     };
//     isOdd(counter);


//     if (x === 1) {
//         $('#field6').html("X");
//     } else {
//        $('#field6').html("0");
//     }
//     counter = counter + 1;
// });


// $('#field7').click(function() {
//     var x;

//     var isOdd = function (counter) {
//         x = (counter % 2);
//         return x;
//     };
//     isOdd(counter);


//     if (x === 1) {
//         $('#field7').html("X");
//     } else {
//        $('#field7').html("0");
//     }
//     counter = counter + 1;
// });


// console.clear();
// //capture the field the user clicks on in a variable
// //use a common class for all the boxes and handle click on that class and use "$(this)" to get the exact box that was clicked on.
// var counter = 0;


// $('div').on('click', function(e) {
//         var that = this;
//       //  console.log(that);
//      //   $(that).html("X");

//     var x;

//     var isOdd = function (counter) {
//         x = (counter % 2);
//         return x;
//     };
//     isOdd(counter);

//     if (x === 1) {
//         $(that).html("X");
//     } else {
//        $(that).html("0");
//     }
//     counter = counter + 1;
// })

// $('#field8').click(function() {
//     var x;

//     var isOdd = function (counter) {
//         x = (counter % 2);
//         return x;
//     };
//     isOdd(counter);


//     if (x === 1) {
//         $('#field8').html("X");
//     } else {
//        $('#field8').html("0");
//     }
//     counter = counter + 1;
// });


// $('#field9').click(function() {
//     var x;

//     var isOdd = function (counter) {
//         x = (counter % 2);
//         return x;
//     };
//     isOdd(counter);


//     if (x === 1) {
//         $('#field9').html("X");
//     } else {
//        $('#field9').html("0");
//     }
//     counter = counter + 1;
// });