function main()
{
  console.log("Main: Pong")

  // -- Crear el canvas
  var canvas = document.getElementById('display')
  canvas.width = 600;
  canvas.height = 400;

  // -- Obtener el contexto de canvas
  var ctx = canvas.getContext("2d");

  // -- Obtener el parrafo
  texto = document.getElementById('texto')

  // -- Funcion de retrollamada de la pulsacion de una tecla
  window.onkeydown = (e) => {

    // -- Eliminar el comportamiento por defecto de la tecla
    e.preventDefault();
    console.log(e.key);

    // -- Detectar la letra
    if (e.key == 'a') {
      console.log ("Tecla A apretada")

      // -- Cambiar el el fondo del texto
      if (texto.style.backgroundColor == "") {
        texto.style.backgroundColor = "red"
      } else {
        texto.style.backgroundColor = ""
      }
    }
  }


  //-- Definir el objeto RAQUETA
  var raqueta = {
    ctx: null,
    init: function (ctx) {
      this.ctx = ctx;
    },
    draw: function () {
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(50,50,10,40);
      this.ctx.fillRect(500,350,10,40);
    }
  }

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
      // -- Pared derecha
      if (this.x > 600 - 5) {
        this.x = 600 - 5;
        this.vx = this.vx * -1;
        this.vy = this.vy * 1;
      }
      // -- Pared izquierda
      if (this.x < 0 + 5) {
        this.x = 5;
        this.vx = this.vx * -1;
        this.vy = this.vy * 1;
      }
      // -- Pared inferior
      if (this.y > 400 - 5) {
        this.y = 400 - 5;
        this.vx = this.vx * 1;
        this.vy = this.vy * -1;
      }
      // -- Pared superior
      if (this.y < 0 + 5) {
        this.y = 5;
        this.vx = this.vx * 1;
        this.vy = this.vy * -1;
      }
    },
    //-- Reset
    reset: function() {
      this.x = this.x_ini;
      this.y = this.y_ini;
    }
  }
  // -- Iniciar y pintar bola y raquetas
  bola.init(ctx);
  bola.draw();
  raqueta.init(ctx);
  raqueta.draw(ctx);

  // -- Crear timer para la animacion
  // -- Inicialmente null
  var timer = null;

  // -- Boton de sacar
  var sacar = document.getElementById('sacar');

  // -- Funcion de retrollamada de boton sacar
  // -- Comienza la animacion
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
        raqueta.draw()
        // -- Si la bola toca un borde

        // -- Condicion de terminación
        if (bola.x > canvas.width) {
          clearInterval(timer);
          timer = null;
          bola.reset();
          bola.draw();
        }
      }, 20);
    }
  } // -- Fin onclick

}
