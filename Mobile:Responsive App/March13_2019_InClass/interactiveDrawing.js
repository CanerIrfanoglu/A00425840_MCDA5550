function draws() {
	
	var canvas = document.getElementById("canvasElement");//get the element
	var ctx = canvas.getContext("2d");//get the context

	var r = parseInt($('#red').val());//red value
	var g = parseInt($('#green').val()); //green value
	var b = parseInt($('#blue').val());// blue value

	var w = $('#canvasElement').width();
	var h = $('#canvasElement').height();

	//clear
	ctx.clearRect(0,0,w,h);

	ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";

	switch ($('#shape').val()) {
	    case 'circle':
	        ctx.beginPath();
	        ctx.arc(w/2, h/2, w/2, 0, 2 * Math.PI);
	        ctx.fill();
	        break;
	    case 'rectangle':
	        ctx.fillRect(0, 0, w, h);
	        break;
	    case 'triangle':
	        ctx.beginPath();
	        ctx.moveTo(0,h);
	        ctx.lineTo(w/2,0);
	        ctx.lineTo(w,h);
	        ctx.closePath();
	        ctx.fill();
	}//end switch()

}