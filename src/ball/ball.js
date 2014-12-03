var canvas, ctx, mouse_pos, mouse_pos_msg="Mouse:0,0", ball, radius=50;
var colors = [ '#69D2E7', '#15D3C8', '#F38630', '#FA6900', '#FF4E50', '#F9D423' ];
console.info('******************************Begin******************************');
 
init();
    
function init() {
      console.info('init()');
		  var body = document.querySelector('body');
		  canvas = document.createElement('canvas');
  body.appendChild(canvas);
  if(canvas.getContext && canvas.getContext('2d')) {
    ctx = canvas.getContext('2d'); 	//context
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'absolute';
    canvas.style.top = 0;
    canvas.style.bottom = 0;
    canvas.style.left = 0;
    canvas.style.right = 0;
    canvas.style.zIndex = -1;
        
    canvas.addEventListener('mousemove', function(evt) {
      //mouse_pos = get_mouse_pos(evt);
      //mouse_pos_msg = 'Mouse: ' + mouse_pos.x + ',' + mouse_pos.y;
      //write_mouse_pos(mouse_pos_msg);
    }, false);
        
    ball = {
          r: radius,
          x: window.innerWidth/2,
          y: window.innerHeight/2,
          c: colors[Math.floor(Math.random()*colors.length)],
          m: 1,
          v: {
            x: 7,
            y: 5
          }
        };
        draw_ball();
		  }		
		  else {
        // text
        console.error('HELLO.');

        var text = document.createElement("div");
        text.innerHTML = "Unsupported browser";
        text.setAttribute('class', 'text'); 
        document.getElementById("container").appendChild(text);
        // Browser
        var browser = document.createElement("div");
        browser.innerHTML = get_browser();
        browser.setAttribute('class', 'browser-version'); 
        document.getElementById("container").appendChild(browser);
        // text
        var text1 = document.createElement("div");
        text1.innerHTML = "version";
        text1.setAttribute('class', 'text'); 
        document.getElementById("container").appendChild(text1);
        // Version
        var version = document.createElement("div");
        version.innerHTML = get_browser_version();
        version.setAttribute('class', 'browser-version'); 
        document.getElementById("container").appendChild(version);
        // text
        var text3 = document.createElement("div");
        text3.innerHTML = "please updgrade!";
        text3.setAttribute('class', 'text'); 
        document.getElementById("container").appendChild(text3);
      }
		
}
 
function draw_ball() {
  ctx.beginPath();
  		ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI*2);
	  ctx.fillStyle = ball.c;
		  ctx.fill(); 
  ctx.closePath();
}
/** Find out the browser version and  name by **/
function get_browser(){
  var N=navigator.appName, ua=navigator.userAgent, tem;
  var M=ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
  if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
  M=M? [M[1], M[2]]: [N, navigator.appVersion, '-?'];
  return M[0];
}

function get_browser_version(){
  var N=navigator.appName, ua=navigator.userAgent, tem;
  var M=ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
  if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
  M=M? [M[1], M[2]]: [N, navigator.appVersion, '-?'];
  return M[1];
}

function write_mouse_pos(message) {
        ctx.clearRect(0, 0, 200, 200);
        ctx.fillStyle = 'black';
        ctx.fillText(message, 10, 25);
}

function get_mouse_pos(e) {
  var mouseX, mouseY;
  if(e.offsetX) {
        mouseX = e.offsetX;
        mouseY = e.offsetY;
  }
  else if(e.layerX) {
        mouseX = e.layerX;
        mouseY = e.layerY;
  }
  return {
    x: mouseX,
    y: mouseY
  };
}
function update() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.width = canvas.width;
  //write_mouse_pos(mouse_pos_msg);
  /**check the ball has not hit the right wall **/
  if( ball.x + ball.r >= canvas.width || ball.x - ball.r <= 0){
     ball.v.x = -ball.v.x;
     //console.info(" hitting wall");
  }
  if( ball.y + ball.r >= canvas.height || ball.y - ball.r <= 0){
     ball.v.y = -ball.v.y;
     //console.info(" hitting wall");
  }
  ball.x += ball.v.x;
  ball.y += ball.v.y;

 

}
setInterval(function() {
  //reset();
  update();
  draw_ball();
}, 16);
