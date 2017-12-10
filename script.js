const canvas=document.getElementById("mycanvas");
const ctx=canvas.getContext("2d");

canvas.width=900;
canvas.height=500;

const player1={
	x:10,
	y:canvas.height/2-30,
	width:10,
	height:60,
	v:20,
	score:0
}
const player2={
	x:canvas.width-10-10,
	y:canvas.height/2-30,
	width:10,
	height:60,
	v:20,
	score:0
}
const ball={
	x:canvas.width/2-5,
	y:canvas.height/2-5,
	width:10,
	height:10,
	vx:5.5*(Math.round(Math.random())? 1:-1),
	vy:2*(Math.round(Math.random())? 1:-1)
}

const draw = function(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.fillStyle="white";
	ctx.fillRect(player1.x,player1.y,player1.width,player1.height);
	ctx.fillRect(player2.x,player2.y,player2.width,player2.height);
	ctx.fillRect(ball.x,ball.y,ball.width,ball.height);
	ctx.font = "50px Arial";
	ctx.fillText(player1.score,canvas.width/2-100,100);
	ctx.fillText(player2.score,canvas.width/2+100,100);
}
const restart = function(winner){
		
		ball.x=	canvas.width/2-5;
		ball.y=canvas.height/2-5;
		if(winner===1)
			ball.vx=-5.5;
		else
			ball.vx=5.5;
		ball.vy=2*(Math.round(Math.random())? 1:-1);
}
const update = function(){
	if(ball.y<=0||ball.y+ball.height>=canvas.height)
		ball.vy=-ball.vy;
	if((ball.x<=player1.x+player1.width&&ball.x>=player1.x+player1.width/2&&ball.y<=player1.y+player1.height&&ball.y>=player1.y)||(ball.x+ball.width<player2.x+player2.width/2&&ball.x+ball.width
		>=player2.x&&ball.y<=player2.y+player2.height&&ball.y>=player2.y))
		ball.vx=-ball.vx;
	if(ball.x<=0&&player2.score!==10){
		player2.score++;
		restart(2);
	}
	else if(ball.x+ball.width>=canvas.width&&player1.score!==10){
		player1.score++;
		restart(1);
	}

	ball.x+=ball.vx;
	ball.y+=ball.vy;
}

const loop= function(){
	update();
	draw();

	if(player1.score===10){
		ctx.fillText("Player 1 Won!!",canvas.width/2-150,canvas.height/2);
		return;
	}
	else if(player2.score===10){
		ctx.fillText("Player 2 Won!!",canvas.width/2-150,canvas.height/2);
		return;
	}
	
	requestAnimationFrame(loop);
}
loop();

document.addEventListener("keydown",function(e){
	if(e.keyCode==40&&player2.y+player2.height<canvas.height)
		player2.y+=player2.v;
	else if(e.keyCode==38&&player2.y>0)
		player2.y-=player2.v;
	if(e.keyCode==83&&player1.y+player1.height<canvas.height)
		player1.y+=player1.v;
	else if(e.keyCode==87&&player1.y>0)
		player1.y-=player1.v;
});
