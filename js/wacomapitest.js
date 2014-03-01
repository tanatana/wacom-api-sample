$(document).ready(function(){
    var havewt = false;
    if(navigator.plugins){
        for (i=0; i < navigator.plugins.length; i++ ) {
            if (navigator.plugins[i].name.indexOf
                ("Wacom") >= 0)
            { havewt = true; }
        }
    }

    var plugin = document.getElementById('wtPlugin');
    var prevPoints = [];
    var prevPointsSize = 1;
    var isMouseDown = false;
    var canvas = document.getElementById('testCanvas');
    var ctx    = canvas.getContext('2d');

    var pushPrevPoint = function(x, y){
        prevPoints.push({x: x, y: y});
        if(prevPoints.length > prevPointsSize){
            prevPoints = prevPoints.slice(prevPoints.length - prevPointsSize);
        }
    };
    var clearPrevPoints = function(){
        prevPoints = [];
    };

    $('#canvasWrapper').on('mousemove', function(e){
        var pressure;

        if(prevPoints.length < prevPointsSize){
            pushPrevPoint(e.offsetX, e.offsetY);
            return false;
        }

        if(isMouseDown){
            if(plugin.penAPI == undefined){
                pressure = 0.8;
            } else {
                pressure = plugin.penAPI.pressure;
            }

            ctx.lineWidth = pressure * 15;
	        ctx.lineJoin = 'round';
	        ctx.lineCap  = 'round';
            ctx.beginPath();
            ctx.moveTo(prevPoints[prevPointsSize-1].x, prevPoints[prevPointsSize-1].y);
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.closePath();
		    ctx.stroke();

        };
        pushPrevPoint(e.offsetX, e.offsetY);
        return true;
    });

    $('#canvasWrapper').on('mousedown', function(e){
        console.log('mousedown');
        clearPrevPoints();
        isMouseDown = true;
        return false;
    });
    $('#canvasWrapper').on('mouseup', function(e){
        console.log('mouseup');
        isMouseDown = false;
        clearPrevPoints();
        return false;
    });
});
