
function init() {
	if(canvas.getContext&&canvas.getContext("2d")) {
		var e=document.getElementById("container");
		e.appendChild(canvas);
		ctx=canvas.getContext("2d");
		canvas.style.position="relative";
		canvas.id="snakecanvas";
		canvas.height=400;
		canvas.width=600;
		canvas.style.top=0;
		canvas.style.bottom=0;
		canvas.style.left=0;
		canvas.style.right=0;
		canvas.style.zIndex=-1;
		window.addEventListener("keydown",key_down,true);
		game_start();
		update()
	} 
	else { 
		var t=document.createElement("div");
		t.innerHTML="This game is not supported on browser:";
		t.setAttribute("class","text");
		document.getElementById("container").appendChild(t);
		var n=document.createElement("div");
		n.innerHTML=get_browser();
		n.setAttribute("class","browser-version");
		document.getElementById("container").appendChild(n);
		var r=document.createElement("div");
		r.innerHTML="version";r.setAttribute("class","text");
		document.getElementById("container").appendChild(r);
		var i=document.createElement("div");
		i.innerHTML=get_browser_version();
		i.setAttribute("class","browser-version");
		document.getElementById("container").appendChild(i);
		var s=document.createElement("div");
		s.innerHTML="=( sorry";s.setAttribute("class","text");
		document.getElementById("container").appendChild(s)
	}
}


function draw_snake() {
	for(var e=0;e<snake.length;e++) {
		ctx.beginPath();
		ctx.rect(snake[e].x,snake[e].y,WIDTH,WIDTH);
		ctx.fillStyle="#3c3c3c";
		ctx.fill();
		ctx.closePath();
	}
}


function update_score() {
	document.getElementById("score").innerHTML = score;
}

function game_start() { 
	currentheadfwd={x:0,y:0};
	headfwd={x:0,y:0};
	snake=[];
	score=0;
	update_score();
	snake.push({x:WIDTH*Math.floor(Math.random()*canvas.width/WIDTH),y:WIDTH*Math.floor(Math.random()*canvas.height/WIDTH)});
	isPaused=true;
	init_food();
}

function key_down(e) {
	if(e.keyCode==13) {
		isPaused=!isPaused;
	}
	if(e.keyCode==37&&!isPaused&&currentheadfwd.x==0){
		headfwd.x=-WIDTH;
		headfwd.y=0
	}
	else if(e.keyCode==39&&!isPaused&&currentheadfwd.x==0) {
		headfwd.x=WIDTH;
		headfwd.y=0;
	}
	else if(e.keyCode==38&&!isPaused&&currentheadfwd.y==0) {
		headfwd.y=-WIDTH;
		headfwd.x=0; }
	else if (e.keyCode==40&&!isPaused&&currentheadfwd.y==0) {
		headfwd.y=WIDTH;
		headfwd.x=0;
	}
}

function print_snake(){
	console.log("-----------------------------");
	for(var e=0;e<snake.length;e++){
		console.log("snake["+e+"]= x:"+snake[e].x+", y:"+snake[e].y);
	}
}


function draw_food(){
	ctx.beginPath();
	ctx.rect(food.x,food.y,WIDTH,WIDTH);
	ctx.fillStyle="#9f3142";
	ctx.fill();ctx.closePath()
}

function init_food() {
	food={
		x:WIDTHMath.floor(Math.random()*canvas.width/WIDTH),
		y:WIDTH*Math.floor(Math.random()*canvas.height/WIDTH)};
	for(var e=0;e<snake.length;e++){
		if(food.x==snake[e].x&&food.y==snake[e].y)init_food()}}

function get_browser(){var e=navigator.appName,t=navigator.userAgent,n;var r=t.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
			if(r&&(n=t.match(/version\/([\.\d]+)/i))!=null)r[2]=n[1];r=r?[r[1],r[2]]:[e,navigator.appVersion,"-?"];
			return r[0];
		}

function get_browser_version(){var e=navigator.appName,t=navigator.userAgent,n;var r=t.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);if(r&&(n=t.match(/version\/([\.\d]+)/i))!=null)r[2]=n[1];r=r?[r[1],r[2]]:[e,navigator.appVersion,"-?"];
			return r[1]}

function update(){
	reset();
	if(!isPaused){
		draw_snake();
		draw_food();
		tick++;
		if(tick==5){
			currentheadfwd.x=headfwd.x;
			currentheadfwd.y=headfwd.y;
			snake.unshift({x:snake[0].x+headfwd.x,y:snake[0].y+headfwd.y});
			snake.pop();

			if(snake[0].x+WIDTH>canvas.width||snake[0].x<0){
				game_start();
			}
			if(snake[0].y+WIDTH>canvas.height||snake[0].y+WIDTH<0){
				game_start();
			}
			for(var e=1;e<snake.length;e++){
				if(snake.length>2&&snake[0].x==snake[e].x&&snake[0].y==snake[e].y)
					game_start();
			}if(snake[0].x==food.x&&snake[0].y==food.y){
				snake.unshift({x:snake[0].x+headfwd.x,y:snake[0].y+headfwd.y});
				score+=10;
				update_score();
				init_food();
			}
		}
		if(tick==5){
			tick=0;
		}
		else{
			ctx.beginPath();
			ctx.font="bold 20pt segoe ui light";
			ctx.fillStyle="#3c3c3c";
			ctx.fillText("PRESS ENTER TO PLAY",canvas.width/2-140,canvas.height/2);ctx.closePath()
		}
		window.setTimeout(requestAnimFrame(update),1e3);
}
function reset(){
	canvas.width=canvas.width;
}
var canvas,ctx,mouse_pos,mouse_pos_msg="Mouse:0,0",
snake=[],
isPaused=false,
score=0,tick=0,
food,
headfwd,
currentheadfwd,
WIDTH=20;
var colors=["#9184e5","#317874","#6e783f","#F38630","#FA6900","#FF4E50","#453a1b"];
canvas=document.createElement("canvas");

window.requestAnimFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e){
	window.setTimeout(e,1e3)};
	window.onload=function(){
		canvas.width=canvas.width;
		canvas.height=canvas.height;
		init();
}