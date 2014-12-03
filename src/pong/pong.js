var canvas, ctx, mouse_pos, mouse_pos_msg="Mouse:0,0", ball, radius=20, leftPaddle, rightPaddle, gutterWidth=3, skip=50, isPaused=false, score1=0, score2=0;
var colors = [ '#9184e5', '#317874', '#6e783f', '#F38630', '#FA6900', '#FF4E50', '#453a1b' ];
//console.info('******************************Begin******************************');
 
init();
   
function init() {
  //console.info('init()'); 
	
  canvas = document.createElement('canvas');
  
 if(canvas.getContext && canvas.getContext("2d")) {
    var e = document.getElementById("container");
    e.appendChild(canvas);
    ctx = canvas.getContext("2d");
    canvas.height = 400;
    canvas.width = 600;
        
    window.addEventListener('keydown', key_down, true);
    
    leftPaddle = {
      x: gutterWidth,
      y: 0,
      w: 10,
      h: 70,
      c: colors[Math.floor(Math.random()*colors.length)],
    };
    rightPaddle = {
      x: canvas.width - gutterWidth - 10,
      y: 0,
      w: 10,
      h: 70,
      c: colors[Math.floor(Math.random()*colors.length)],
    };
            
    ball = {
          r: radius,
          x: canvas.width/2,
          y: canvas.height/2,
          c: colors[Math.floor(Math.random()*colors.length)],
          m: 1,
          v: {
            x: (Math.random()<.5?-1:1)*(Math.floor(Math.random()*3) + 4),
            y: (Math.random()<.5?-1:1)*(Math.floor(Math.random()*2) + 3)
          }
        };
    
    //console.info("ball: x="+ball.x+" y:"+ball.y);
    draw_ball();
    gameStart();
    draw_paddle(leftPaddle);
    draw_paddle(rightPaddle);
    draw_line(); 
    
	}		
  else {
    // text
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
}

function draw_line() {
   ctx.beginPath();
     ctx.moveTo(canvas.width/2, 0);
     ctx.strokeStyle = '#3c3c3c';
     ctx.lineTo(canvas.width/2,canvas.height);
     if (ctx.setLineDash)
      ctx.setLineDash([10,5]);
   ctx.stroke();

}

function draw_paddle(p) {
  ctx.beginPath();
    ctx.rect(p.x, p.y, p.w, p.h);
    ctx.fillStyle = p.c;
  ctx.fill();
}

function score()
{
  scoreText = score1 + "-" + score2;
  document.getElementById("score").innerHTML = scoreText;

}


function gameStart() {
  isPaused=true;
  score();
  
}

function key_down(e) {
  // SPACE BAR
  if(e.keyCode == 32) {
    isPaused = !isPaused;
  }
  
  // W KEY
  if(e.keyCode == 87 && leftPaddle.y - skip >=0 && !isPaused) {
    leftPaddle.y -= skip;
    //console.info('PRESSED W KEY');

  }
  // S KEY
  if(e.keyCode == 83 && leftPaddle.y+leftPaddle.h + skip<= canvas.height && !isPaused) {
    leftPaddle.y += skip;
    //console.info('PRESSED S KEY');
  }
  // UP KEY
  if(e.keyCode == 38 && rightPaddle.y -skip  >=0 && !isPaused) {
    rightPaddle.y -= skip;
    //console.info('PRESSED UP KEY');   
  }
  // DOWN KEY
  if(e.keyCode == 40 && rightPaddle.y + rightPaddle.h +skip<= canvas.height && !isPaused) {
     //console.info('PRESSED DOWN KEY');
     rightPaddle.y += skip;

  }
  
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

function update() {
  score();
  if (!isPaused){
    draw_ball();
    //check if the ball has hit top or bottom wall
    if( ball.y + ball.r >= canvas.height || ball.y - ball.r <= 0)
    ball.v.y = -ball.v.y;  
    /**check the ball has hit the right wall **/
    if(ball.x + ball.r >= canvas.width - gutterWidth - rightPaddle.w)
      if((ball.y <= rightPaddle.y + rightPaddle.h) && (ball.y  >= rightPaddle.y))
        ball.v.x = -ball.v.x;
      else {
        score2 += 1;
        reset_ball();
      }
  
    //check the ball has hit the left paddle
    if (ball.x - ball.r <= 0 + gutterWidth + rightPaddle.w)
      if((ball.y <= leftPaddle.y + leftPaddle.h) && (ball.y >= leftPaddle.y))
        ball.v.x = -ball.v.x;
      else {
        score1 += 1;
        reset_ball();
      }
      ball.x += ball.v.x;
      ball.y += ball.v.y;
    }
    else {
        draw_ball();
    }

}

function reset() {
  canvas.width = canvas.width;
}

function reset_ball() { 
  ball.x = canvas.width/2;
  ball.y = canvas.height/2;
  ball.c = colors[Math.floor(Math.random()*colors.length)];
  if(ball.v.x < 150)
    ball.v.x += 1;
  ball.v.y = (Math.random()<.5?-1:1)*(Math.floor(Math.random()*4) + 6)
}

setInterval(function() {
  reset();
  draw_paddle(leftPaddle);
  draw_paddle(rightPaddle);
  draw_line();
  update();

}, 16);