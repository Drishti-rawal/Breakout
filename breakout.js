var canvas =  document.getElementById('mycanvas');
var ctx= canvas.getContext('2d');

var paused=false;
var lives=3;
var score=0;
var level =1;
var maxLevel=7;
var ballX=canvas.width/2;
var ballY=canvas.height -20;
var radius = 10; 
var dx =1;
var dy=-2;
var paddleHeight = 8;
var paddleWidth = 200;
var paddleX = (canvas.width - paddleWidth)/2;
var rightPressed=false;
var leftPressed = false;
var brickrows=5;
var brickcols = 15;
var brickHeight=20;
var brickWidth =75;
var brickPadding =2;
var brickTop=45;
var brickLeft=30;
var bricks=[];
var ball = new Image();
ball.src = 'ball.jpg';
var bric = new Image();
bric.src='brick.jpg';
var bck = new Image();
bck.src='back.png';
function initbricks(){
for(var c=0;c<brickcols;c++)
{
	bricks[c]=[];
	for(var r=0;r<brickrows;r++)
		{bricks[c][r]={x:0,y:0,status:1}}
}
}
initbricks();
document.addEventListener("keydown",keyDownHandler);
document.addEventListener("keyup",keyUpHandler);




function keyDownHandler(e)
{
	if(e.keyCode == 39)
		{
			rightPressed=true;
		}
	else if(e.keyCode==37)
	{
		leftPressed=true;
	}
}
function keyUpHandler(e)
{
	if(e.keyCode == 39)
		{
			rightPressed=false;
		}
	else if(e.keyCode==37)
	{
		leftPressed=false;
	}
}

function drawBricks()
{
	for( c=0;c<brickcols;c++){
		for( r=0;r<brickrows;r++){
			if(bricks[c][r].status==1)
			{
			var brickX=(c*(brickWidth+brickPadding))+brickLeft;
			var brickY=(r*(brickHeight+brickPadding))+brickTop;
			bricks[c][r].x=brickX;
			bricks[c][r].y=brickY;
			//ctx.beginPath();
			ctx.drawImage(bric,brickX,brickY,brickWidth,brickHeight);
			/*ctx.fillStyle="#ff531a";
			ctx.fill();
			ctx.closePath();*/
			}
		}
	}
}

function drawBall()
{
	ctx.beginPath();
	//ctx.drawImage(ball,ballX,ballY,radius,radius);
	ctx.arc(ballX,ballY,radius,0,Math.PI*2);
	ctx.fillStyle="#ff531a";
	ctx.fill();
	ctx.closePath();
}
function drawPaddle()
{
	ctx.beginPath();
	ctx.rect(paddleX,canvas.height-paddleHeight,paddleWidth,paddleHeight);
	ctx.fillStyle="#ff531a";
	ctx.fill();
	ctx.closePath();
}
function detectCollision(){
	for (var c = 0; c < brickcols; c++) {
		for (var r = 0; r < brickrows; r++) {
			var b = bricks[c][r];
			if(b.status == 1) {
				if (ballX > b.x && ballX < b.x + brickWidth && ballY > b.y && ballY < b.y + brickHeight) {
					dy = -dy;
					b.status=0;
					score++;
					//if(score == 2)
					if(score == brickcols*brickrows)
					{
						if(level==maxLevel)
						{alert("YOU WIN! ");
						document.location.reload();}
						else{
							level++;
							score=0;
							brickrows++;
							initbricks();
							paddleWidth-=10;
							dx+=0.5;
							dy=-dy;
							dy-=0.5;
							ballX=canvas.width/2;
							ballY=canvas.height -20;
							paddleX = (canvas.width - paddleWidth)/2;

							paused=true;
							nextLevel();
							setTimeout(function(){
									paused=false;
									draw();
							}, 3000);
							
							

						}
					}
				}
			}
			
		}
		}
}

function nextLevel()
{
	ctx.drawImage(bck,0,0,canvas.width,canvas.height);
	ctx.font="16px Arial";
	ctx.fillStyle="#0095DD";
	ctx.fillText("Congratulations! Starting next level",canvas.width/3,canvas.height/2);
}
function drawlevel()
{
	ctx.font="16px Arial";
	ctx.fillStyle="#0095DD";
	ctx.fillText("Level : "+ level ,canvas.width-200,20);
}
function drawScore()
{
	ctx.font="16px Arial";
	ctx.fillStyle="#0095DD";
	ctx.fillText("Lives : "+ lives ,canvas.width-65,20);
}

function drawLives()
{
	ctx.font="16px Arial";
	ctx.fillStyle="#0095DD";
	ctx.fillText("Score : "+score,8,20);
}

function draw()
{
	ctx.clearRect(0,0,canvas.width,canvas.height);
	drawBricks();
	drawBall();
	drawPaddle();
	drawScore();
	drawLives();
	drawlevel();
	detectCollision();
	if(ballY+dy<radius)
		dy=-dy;
	else if(ballY+dy>canvas.height-radius){
		if(ballX>paddleX && ballX< paddleX+paddleWidth)
		{
			dy=-dy;
		}
		else{
			lives--;
		//alert("Game over!");
		if(lives==0){
		document.location.reload();}
		else{
			ballX=canvas.width/2;
			ballY=canvas.height-30;
			dx=1;
			dy=-2;
			paddleX=(canvas.width-paddleWidth)/2;
		}
		}
	}
	if(ballX+dx<radius  || ballX+dx > canvas.width-radius )
		dx=-dx;
	
	
		if(rightPressed && paddleX+paddleWidth<canvas.width)
			{paddleX+=7;}
		if(leftPressed && paddleX>0)
			{paddleX-=7;}
	
	ballX+=dx;
	ballY+=dy;
	if(!paused){
		requestAnimationFrame(draw);}
	
	
}
document.addEventListener("mousemove",mouseMoveHandler);
function mouseMoveHandler(e) {
	var relativeX = e.clientX - canvas.offsetLeft;
	if(relativeX > paddleWidth/2 && relativeX < canvas.width-paddleWidth/2) {
		paddleX = relativeX - paddleWidth/2;
	}
}
//setInterval(draw,15);
draw();
