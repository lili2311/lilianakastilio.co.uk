var canvas = document.getElementById('myCanvas');
var isMouseDown = false;
var isMouseMove = false;
var message = "";
var isSelected = false;
var mousePos = {
  x:0,
  y:0
};
var ps = [];
var MAX_NUM = 800;
var colors = [ '#3cd7e7', '#A7DBD8', '#E0E4CC', '#F38630', '#3ce7a2', '#Ff3E50', '#F9D423' ];
var FPS = 60;

if(canvas.getContext && canvas.getContext('2d')) {
    context = canvas.getContext('2d'); 	//context
    canvas.width = window.innerWidth;
		    canvas.height = window.innerHeight;
		    canvas.style.position = 'absolute';
		    canvas.style.top = 0;
		    canvas.style.bottom = 0;
		    canvas.style.left = 0;
		    canvas.style.right = 0;
		    canvas.style.zIndex = -1;
    spawn();
    var umbrella = {
      top: {
        x: window.innerWidth/2,
        y: window.innerHeight/2,
        r: 75,
        sAngle: Math.PI,
        eAngle: 0
      },
      handle: {
        width: 2,
        height: 90
      }
    }
    
   canvas.addEventListener('mousemove', function(evt) {
        mousePos = getMousePos(canvas, evt);
        message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
        //writeMessage(canvas, message);
         isMouseMove = true;
      }, false);
    canvas.addEventListener('mousedown', function(evt) {
        isMouseDown = true;
        mousePos = getMousePos(canvas, evt);
        message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
        //writeMessage(canvas, message);

      }, false);
     
      canvas.addEventListener('mouseup', function(evt) {
        isMouseDown = false;
        isSelected = false;
      }, false);
  
}
function draw_umbrella() {
  //umbrella top
  context.beginPath();
    context.arc(umbrella.top.x, umbrella.top.y, umbrella.top.r, umbrella.top.sAngle, umbrella.top.eAngle, false);
    context.strokeStyle ="#f6f6f6";
    context.lineWidth = umbrella.handle.width;
    context.stroke(); 

  context.closePath();
  
  //wavy bottom of umbrella
  context.beginPath();
    context.lineWidth = umbrella.handle.width;
    context.arc(umbrella.top.x - 5*(umbrella.top.r/6), umbrella.top.y, umbrella.top.r/6, umbrella.top.sAngle, umbrella.top.eAngle, false);

    context.arc(umbrella.top.x - 3*(umbrella.top.r/6), umbrella.top.y, umbrella.top.r/6, umbrella.top.sAngle, umbrella.top.eAngle, false);

    context.arc(umbrella.top.x - umbrella.top.r/6, umbrella.top.y, umbrella.top.r/6, umbrella.top.sAngle, umbrella.top.eAngle, false);

    context.arc(umbrella.top.x + umbrella.top.r/6, umbrella.top.y, umbrella.top.r/6, umbrella.top.sAngle, umbrella.top.eAngle, false);

    context.arc(umbrella.top.x + 3*(umbrella.top.r/6), umbrella.top.y, umbrella.top.r/6, umbrella.top.sAngle, umbrella.top.eAngle, false);

    context.arc(umbrella.top.x + 5*(umbrella.top.r/6), umbrella.top.y, umbrella.top.r/6, umbrella.top.sAngle, umbrella.top.eAngle, false);

    context.strokeStyle ="#f6f6f6";
    context.lineWidth = umbrella.handle.width;
    context.stroke();  
    //context.fillStyle="#e74c3c";
    //context.fill();

  context.closePath();
  //umbrella handle
  context.beginPath();
    context.arc(umbrella.top.x - umbrella.top.r/6, umbrella.top.y + umbrella.handle.height, umbrella.top.r/6, umbrella.top.eAngle, umbrella.top.sAngle, false);

    context.moveTo(umbrella.top.x, umbrella.top.y);
    context.lineTo(umbrella.top.x, umbrella.top.y + umbrella.handle.height);
  
    context.strokeStyle ="#f6f6f6";
    context.lineWidth = umbrella.handle.width;
    context.stroke();
  context.closePath();



}

function writeMessage(canvas, message) {
  context.clearRect(0, 0, 100, 40);
  context.font = '18pt Calibri';
  context.fillStyle = 'black';
  context.fillText(message, 10, 25);
}

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}
function reset() {
  canvas.width = canvas.width;
}
//create the particles
function spawn() {
  for(var i=0; ps.length < MAX_NUM; i++) {
    ps[i] = { x: Math.random()*window.innerWidth,
              y: Math.random()*window.innerHeight,
              r: Math.random()*5,
              c: colors[Math.floor(Math.random()*colors.length)]
            };                  
   }
}

function update_particles() {
    for(var i=0; i<ps.length; i++) {
        if(Math.pow((ps[i].x - umbrella.top.x),2) + Math.pow(ps[i].y  - umbrella.top.y, 2) > Math.pow(umbrella.top.r,2)){
          ps[i].y +=  0.98;
          ps[i].x += (Math.random() * 2);
         //ps[i].r = Math.random()*5;
          
        }
        else if(ps[i].y > umbrella.top.y)
            ps[i].x =  umbrella.top.r - umbrella.top.x;
     
    }
}

function reset_particles() {
    //reset the x and y coordinates if leaves the canvas
    for(var i=0; i<ps.length; i++) {
        //reset if y or coordinate has left the canvas
        if(ps[i].y > canvas.height) {
            ps[i].y = Math.random()*window.innerHeight/4;
            ps[i].color = colors[Math.floor(Math.random() * colors.length)];
        }
        //reset if x or coordinate has left the canvas
        if(ps[i].x > canvas.width || ps[i].x < 0){
          ps[i].x = Math.random()*window.innerWidth;
          ps[i].color = colors[Math.floor(Math.random() * colors.length)];
        }
    }
}
  

function draw_particles() {

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  for(var i=0; i<ps.length; i++) {
    context.beginPath();
		  context.arc( ps[i].x, ps[i].y, ps[i].r, 0, 6);
		  context.fillStyle = ps[i].c;
  		context.fill(); 
  }
}
function update() {
  //writeMessage(canvas, message);
  update_particles();
  draw_particles();
  reset_particles();
  draw_umbrella();

  if(Math.pow((mousePos.x - umbrella.top.x),2) + Math.pow(mousePos.y - umbrella.top.y, 2) < Math.pow(umbrella.top.r,2) && isMouseDown)     //console.log("INSIDE: " + Math.pow((mousePos.x - umbrella.top.x),2) + " " + Math.pow(mousePos.y - umbrella.top.y, 2) + " r^2: " + Math.pow(umbrella.top.r,2));
     //console.log("Mousedown: " + isMouseDown + " mousemove: " + isMouseMove);
    isSelected = true;
  

    if(isMouseDown & isMouseMove & isSelected) {
      //console.log("Mousedown: " + isMouseDown + " mousemove: " + isMouseMove);
          umbrella.top.x = mousePos.x;
          umbrella.top.y = mousePos.y;
    }

}
setInterval(function() {
  reset();
  update();

}, 1);

