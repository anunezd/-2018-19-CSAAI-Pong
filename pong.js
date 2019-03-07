function main()
{
  console.log("Main: Pong")

  //-- Crear el canvas
  var canvas = document.getElementById('display')
  canvas.width = 600;
  canvas.height = 400;

  //-- Obtener el contexto de canvas
  var ctx = canvas.getContext("2d");

  window.onkeydown = (e) => {
    e.preventDefault();
    console.log(e.key);

    if (e.key == 'a') {
      console.log ("Tecla A apretada")
    }
  }

  //-- Raquetas
  ctx.fillStyle = 'white';
  ctx.fillRect(50,50,10,40);

  //-- Red
  ctx.beginPath();
  ctx.strokeStyle = "white";
  ctx.setLineDash([5, 5]);
  ctx.moveTo(canvas.width/2,0);
  ctx.lineTo(canvas.width/2, canvas.height)
  ctx.stroke();

  //-- Bola
  ctx.fillRect(350,200, 5,5);

  //-- Puntuación
  ctx.font = "80px Arial";
  ctx.fillStyle = 'white';
  ctx.fillText("0", 220, 70);
  ctx.fillText("2", 340, 70);

  //-- Definir el objeto BOLA
  var bola = {
    //-- Posición inicial de la pelota
    x_ini: 50,
    y_ini: 50,
    //-- Dimensiones de la Bola
    width: 5,
    height: 5,
    //-- Coornenadas
    x : 0,
    y : 0,
    //-- Velocidad
    vx : 4,
    vy : 1,
    //-- Contexto
    ctx: null,
    //-- Inicializar
    init: function(ctx) {
      this.ctx = ctx;
      this.reset();
    },
    //-- Dibujar
    draw: function () {
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(this.x, this.y, this.width, this.height)
    },
    //-- Update
    update: function () {
      this.x += this.vx;
      this.y += this.vy;
    },
    //-- Reset
    reset: function() {
      this.x = this.x_ini;
      this.y = this.y_ini;
    }
  }

  bola.init(ctx);
  bola.draw();

  var timer = null;

  var sacar = document.getElementById('sacar');

  sacar.onclick = ()=> {
    console.log("Click")
    // -- Lanzar el timer (si es que no estaba ya lanzado)
    if (!timer){
      timer = setInterval(()=>{
        console.log("tic");
        // -- Actualizar la bola
        bola.update()

        // -- Borrar el canvas
        ctx.clearRect(0,0, canvas.width, canvas.height);

        // -- Dibujar la bola
        bola.draw()

        // -- Condicion de terminación
        if (bola.x > canvas.width) {
          clearInterval(timer);
          bola.reset();
          bola.draw();
        }
      }, 20);
    }
  }

}
