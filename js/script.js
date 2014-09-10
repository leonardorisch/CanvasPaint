var mousePressed = false;
var lastX, lastY, ctx, lineWidth;

function InitThis() {
    ctx = document.getElementById('myCanvas').getContext("2d");
    lineWidth = document.getElementById("selWidth");
    tool = document.getElementsByName("forma");

    $('#myCanvas').mousedown(function (e) {
        mousePressed = true;
        if(tool[0].checked){
            Brush(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
        }
        lastX = e.pageX - $(this).offset().left;
        lastY = e.pageY - $(this).offset().top;
    });

    $('#myCanvas').mousemove(function (e) {
        if (mousePressed) {
            if(tool[0].checked){
                Brush(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
            }
        }
    });

    $('#myCanvas').mouseup(function (e) {
        mousePressed = false;
        if(tool[1].checked){
            Line(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
        } else if(tool[2].checked){
            Rectangle(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
        } else if(tool[3].checked){
            Circle(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
        }
    });
    
    $('#myCanvas').mouseleave(function (e) {
        mousePressed = false;
    });

    for (var i = 2; i<=100; i++){
        var opt = document.createElement('option');
        opt.value = i;
        opt.innerHTML = i;
        lineWidth.appendChild(opt);
    }

	changeCursorCrosshair();
}

function Brush(x, y, isDown) {
    if (isDown) {
        ctx.beginPath();
        ctx.strokeStyle = $('#colorpickerField').val();
        ctx.lineWidth = $('#selWidth').val();
        ctx.lineJoin = "round";
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.stroke();
    }
    lastX = x; lastY = y;
}

function Line(x, y){
    ctx.beginPath();
    ctx.strokeStyle = $('#colorpickerField').val();
    ctx.lineWidth = $('#selWidth').val();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
}

function Rectangle(x, y){
    ctx.beginPath();
    ctx.strokeStyle = $('#colorpickerField').val();
    ctx.fillStyle = $('#colorpickerField2').val();
    ctx.lineWidth = $('#selWidth').val();
    ctx.rect(lastX,lastY,x,y);
    ctx.stroke();
    ctx.fill();
}

function Circle(x, y){
    ctx.beginPath();
    ctx.strokeStyle = $('#colorpickerField').val();
    ctx.fillStyle = $('#colorpickerField2').val();
    ctx.lineWidth = $('#selWidth').val();
    ctx.arc(lastX, lastY, getRadius(x, y, lastX, lastY), 0, Math.PI * 2);
    ctx.stroke();
    ctx.fill();
}

function getRadius(x, y, lastX, lastY){
    b = (x - lastX < 0 ? (x - lastX) * -1 : x - lastX);
    c = (y - lastY < 0 ? (y - lastY) * -1 : y - lastY);
    a = Math.sqrt(b*b + c*c);

    return a;
}
    
function clearArea() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function changeCursorCrosshair(){
	$('#myCanvas').css('cursor','crosshair');
}