var mousePressed = false;
var lastX, lastY, ctx, lineWidth;
var tool;

function InitThis() {

    $('#myCanvas').unbind("mousedown");
    $('#myCanvas').unbind("mouseup");
    $('#myCanvas').unbind("mousemove");
    $('#myCanvas').unbind("mouseleave");

    ctx = document.getElementById('myCanvas').getContext("2d");
    lineWidth = document.getElementById("selWidth");
    tool = document.getElementsByName("forma");

    if(tool[0].checked){
        Brush();
    }
    else if (tool[1].checked){
        Line();
    }
    else if (tool[2].checked) {
        Rectangle();
    }
    else if (tool[3].checked) {
        Circle();
    }
    else if (tool[4].checked) {
        Text();
    }    

    for (var i = 2; i<=100; i++){
        var opt = document.createElement('option');
        opt.value = i;
        opt.innerHTML = i;
        lineWidth.appendChild(opt);
    }

	changeCursorCrosshair();
}

function Brush() {

    $('#myCanvas').mouseup(function (e) {
        mousePressed = false;
    });

    $('#myCanvas').mousedown(function (e) {
        mousePressed = true;
        var x = e.pageX - $(this).offset().left;
        var y = e.pageY - $(this).offset().top;
        drawBrush(x, y, false);
        lastX = e.pageX - $(this).offset().left;
        lastY = e.pageY - $(this).offset().top;
    });


    $('#myCanvas').mousemove(function (e) {
        if (mousePressed) {
            var x = e.pageX - $(this).offset().left;
            var y = e.pageY - $(this).offset().top;
            drawBrush(x, y, true);
        }
        lastX = x; lastY = y;
    });
    
}

function drawBrush(x, y, isDown){
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


function Line(){
    $('#myCanvas').mouseup(function (e) {
        mousePressed = false;
        x = e.pageX - $(this).offset().left;
        y = e.pageY - $(this).offset().top;
        drawLine(x, y, lastX, lastY, true);
    });

    $('#myCanvas').mousedown(function (e) {
        mousePressed = true;
        lastX = e.pageX - $(this).offset().left;
        lastY = e.pageY - $(this).offset().top;
    });

}

function drawLine(x, y, isDown){
    ctx.beginPath();
    ctx.strokeStyle = $('#colorpickerField').val();
    ctx.lineWidth = $('#selWidth').val();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    console.log(lastX, lastY, x, y)
    ctx.stroke();
}

function Rectangle(){
    $('#myCanvas').mousedown(function (e) {
        mousePressed = true;
        lastX = e.pageX - $(this).offset().left;
        lastY = e.pageY - $(this).offset().top;
    });

    $('#myCanvas').mouseup(function (e) {
        mousePressed = false;
        drawRectangle(lastX, lastY, e.pageX - $(this).offset().left - lastX, e.pageY - $(this).offset().top - lastY);
    });
    
}

function drawRectangle(lastX, lastY, x, y){
    ctx.beginPath();
    ctx.strokeStyle = $('#colorpickerField').val();
    ctx.fillStyle = $('#colorpickerField2').val();
    ctx.lineWidth = $('#selWidth').val();
    ctx.strokeRect(lastX,lastY,x,y);
    ctx.fill();
}

function Circle(){
    $('#myCanvas').mousedown(function (e) {
        mousePressed = true;
        lastX = e.pageX - $(this).offset().left;
        lastY = e.pageY - $(this).offset().top;
    });

    $('#myCanvas').mouseup(function (e) {
        mousePressed = false;
        drawCircle(lastX, lastY, e.pageX - $(this).offset().left - lastX, e.pageY - $(this).offset().top - lastY);
    });
    
}

function drawCircle(lastX, lastY, x, y){
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

function verifyIfHasChangeOnInput(){
    InitThis();
}

function changeCursorText(){
    $('#myCanvas').css('cursor','text');
}

function Text(){
    $('#myCanvas').mouseup(function (e) {
        x = e.pageX - $(this).offset().left;
        y = e.pageY - $(this).offset().top;
        captureText(x, y);
    });
}

function insertText(x,y){
    var tamanhoFonte = $('#selTextoTamanho').val();
    var font = $("#selTextoFonte option:selected").text();
    ctx.font = tamanhoFonte+'pt ' + font;
    ctx.strokeStyle = $('#colorpickerField').val();
    ctx.fillStyle = $('#colorpickerField2').val();
    ctx.fillText(text, x, y);
    ctx.strokeText(text, x, y);
    text = null;
}

var text = "";
function captureText(x,y){
    var entrada = prompt("Insira um texto");   
    if(entrada != null){
        text = entrada;
        insertText(x,y)
    }
}