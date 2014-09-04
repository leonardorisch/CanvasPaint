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

    $('#colorpickerField').ColorPicker({
        onSubmit: function(hsb, hex, rgb, el) {
            $(el).val(hex);
            $(el).ColorPickerHide();
        },
        onBeforeShow: function () {
            $(this).ColorPickerSetColor(this.value);
        }
    })
    .bind('keyup', function(){
        $(this).ColorPickerSetColor(this.value);
    });
}

function Brush(x, y, isDown) {
    if (isDown) {
        ctx.beginPath();
        ctx.strokeStyle = '\#' + $('#colorpickerField').val();
        ctx.lineWidth = $('#selWidth').val();
        ctx.lineJoin = "round";
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.stroke();
    }
    lastX = x; lastY = y;
}

function draw(tool){

}
    
function clearArea() {
    // Use the identity matrix while clearing the canvas
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}