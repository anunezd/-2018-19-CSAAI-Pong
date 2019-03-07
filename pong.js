function main()
{
  console.log("Main: Pong")

  var canvas = document.getElementById('display')
  canvas.width = 600;
  canvas.height = 400;

  var ctx = canvas.getContext("2d");

  ctx.fillStyle = 'white';
  ctx.fillRect(50,50,10,40);
}
