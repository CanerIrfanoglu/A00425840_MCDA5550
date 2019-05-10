/* 

 * To change this license header, choose License Headers in Project Properties.

 * To change this template file, choose Tools | Templates

 * and open the template in the editor.

 */



var SERVER_URL = 'http://dev.cs.smu.ca:8122';

function draw() {

    var canvas = document.getElementById("canvasElement");//get the element

    var ctx = canvas.getContext("2d");//get the context

    $.post(SERVER_URL + '/readRectangles',

            // you could also pass null,  or an empty string etc

                    function (data) {



                        //if found, use it, at this point, it's still an array!

                        rectangles = data;



                        if (rectangles == null || rectangles.length == 0) {

                            alert("No record found"); //no record whatsoever, let the user know

                        } else {

                            alert('Records downloaded successfully!');



                            //clear the canvas

                            ctx.clearRect(0, 0, $("#canvasElement").width(), $("#canvasElement").height());



                            //go through each rectangle

                            for (var i = 0; i < rectangles.length; i++) {

                                var x = rectangles[i].x, y = rectangles[i].y,

                                        w = rectangles[i].w, h = rectangles[i].h,

                                        c = rectangles[i].c;



                                ctx.fillStyle = c; //change colour

                                ctx.fillRect(x, y, w, h);//now draw it



                            }//end for



                        }//end else 





                    }).fail(function (error) {

                alert(error.responseText);

            });



        }