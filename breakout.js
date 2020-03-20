var canvas =  document.getElementById('mycanvas');
var ctx= canvas.getContext('2d');


var score=0;
var ballX=canvas.width/2;
var ballY=canvas.height -20;
var radius = 10; 
var dx =1;
var dy=-3;
var paddleHeight = 8;
var paddleWidth = 120;
var paddleX = (canvas.width - paddleWidth)/2;
var rightPressed=false;
var leftPressed = false;
var brickrows=5;
var brickcols = 11;
var brickHeight=20;
var brickWidth =75;
var brickPadding =10;
var brickTop=30;
var brickLeft=30;
var bricks=[];
for(var c=0;c<brickcols;c++)
{
	bricks[c]=[];
	for(var r=0;r<brickrows;r++)
		{bricks[c][r]={x:0,y:0,status:1}}
}
document.addEventListener("keydown",keyDownHandler);
document.addEventListener("keyup",keyUpHandler);

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
			ctx.beginPath();
			ctx.rect(brickX,brickY,brickWidth,brickHeight);
			ctx.fillStyle="#ff531a";
			ctx.fill();
			ctx.closePath();
			}
		}
	}
}


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

function drawBall()
{
	ctx.beginPath();
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
			//var b is used to store the brick object in every loop of the collision detection
			//(b for Brick)
			var b = bricks[c][r];
			if(b.status == 1) {
				//if the x position of the ball is greater than the x position of the brick and less than the x of the brick plus the brick width, which means the ball is between the left and right sides of the brick, which is inside the brick, then we change the direction of the ball.  Similar situation with the y.
				if (ballX > b.x && ballX < b.x + brickWidth && ballY > b.y && ballY < b.y + brickHeight) {
					//change the direction of the ball
					dy = -dy;
					b.status=0;
					score++;
					if(score == brickcols*brickrows)
					{
						alert("YOU WIN! ");
						document.location.reload();
					}
				}
			}
			
		}
		}
}

function drawScore()
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
	detectCollision();
	if(ballY+dy<radius)
		dy=-dy;
	else if(ballY+dy>canvas.height-radius){
		if(ballX>paddleX && ballX< paddleX+paddleWidth)
		{
			dy=-dy;
		}
		else{
		alert("Game over!");
		document.location.reload();
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
}
setInterval(draw,8);
