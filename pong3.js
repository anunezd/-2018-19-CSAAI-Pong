function main()
{
  console.log("Main: Pong")

  // -- Crear el canvas
  var canvas = document.getElementById('display')
  canvas.width = 600;
  canvas.height = 400;

  // -- Obtener el contexto de canvas
  var ctx = canvas.getContext("2d");

  function red (){
  ctx.beginPath();
  ctx.strokeStyle = "white";
  ctx.setLineDash([5, 5]);
  ctx.moveTo(canvas.width/2,0);
  ctx.lineTo(canvas.width/2, canvas.height)
  ctx.stroke();
  }

  //-- Definir el objeto RAQUETA
  var raqueta = {
    x_ini1: 50,
    y_ini1: 50,
    x1: 0,
    y1:0,


    x_ini2: 500,
    y_ini2: 350,
    x2:0,
    y2:0,

    //-- Dimensiones de la raqueta
    width: 10,
    height: 40,
    //-- Velocidad
    vy1 : 0,
    vy2 : 0,
    ctx: null,
    init: function (ctx) {
      this.ctx = ctx;
      this.reset();
    },
    draw: function () {
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(this.x1, this.y1, this.width, this.height)
        this.ctx.fillRect(this.x2, this.y2, this.width, this.height)
    },
    //-- Update
    update: function () {
      window.onkeydown = (p) => {
          p.preventDefault();
          switch (p.key) {
              case 'w':
                  this.vy1 = -6;
                  break;
              case 's':
                  this.vy1 = 6;
                  break;
              case 'ArrowUp':
                  this.vy2 = -6;
                  break;
              case 'ArrowDown':
                  this.vy2 = 6;
                  break;
              default:
                  break;
          }
      }
      window.onkeyup = (p) => {
          p.preventDefault();
          switch (p.key) {
              case 'w':
                  this.vy1 = 0;
                  break;
              case 's':
                  this.vy1 = 0;
                  break;
              case 'ArrowUp':
                  this.vy2 = 0;
                  break;
              case 'ArrowDown':
                  this.vy2 = 0;
                  break;
              default:
                  break;
          }
        }
          this.y1 += this.vy1;
          if (this.y1 > canvas.height - this.height){
              this.y1 = canvas.height - this.height;
          } else if (this.y1 < 0) {
              this.y1 = 0;
          }
          this.y2 += this.vy2;
          if (this.y2 > canvas.height - this.height){
              this.y2 = canvas.height - this.height;
          } else if (this.y2 < 0) {
              this.y2 = 0;
          }
      },

      reset: function() {
        this.x1 = this.x_ini1;
        this.y1 = this.y_ini1;
        this.x2 = this.x_ini2;
        this.y2 = this.y_ini2;
      }
    }
  //-- Puntuación

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
        puntuacion.p1 += 1;
      }
      // -- Pared izquierda
      if (this.x < 0 + 5) {
        this.x = 5;
        this.vx = this.vx * -1;
        this.vy = this.vy * 1;
        puntuacion.p2 += 1;
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
      if (this.x < (raqueta.x1 + raqueta.width) && this.y < (raqueta.y1 + raqueta.height) && this.y > raqueta.y1) {
        this.vx = -this.vx;
      }
      if (this.x > raqueta.x2 && this.y < (raqueta.y2 + raqueta.height) && this.y > raqueta.y2) {
        this.vx = -this.vx
      }
    },
    //-- Reset
    reset: function() {
      this.x = this.x_ini;
      this.y = this.y_ini;
    }
  }

  //-- Definir el objeto BOLA
  var bolafake = {
    //-- Posición inicial de la pelota
    x_ini: 75,
    y_ini: 75,
    //-- Dimensiones de la Bola
    width: 5,
    height: 5,
    //-- Coornenadas
    x : 0,
    y : 0,
    //-- Velocidad
    vx : 1,
    vy : 4,
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
        puntuacion.p1 += 1;
      }
      // -- Pared izquierda
      if (this.x < 0 + 5) {
        this.x = 5;
        this.vx = this.vx * -1;
        this.vy = this.vy * 1;
        puntuacion.p2 += 1;
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

  var puntuacion = {
    p1: 0,
    p2: 0,
    ctx: null,
    init: function(ctx) {
      this.ctx = ctx;
    },
    draw: function() {
      this.ctx.font = "80px Arial";
      this.ctx.fillStyle = 'white';
      this.ctx.fillText(this.p1, 220, 70);
      this.ctx.fillText(this.p2, 340, 70);
    },
  }
  // -- Iniciar y pintar bola y raquetas
  bola.init(ctx);
  bola.draw();
  raqueta.init(ctx);
  raqueta.draw();
  puntuacion.init(ctx);
  puntuacion.draw();
  red();

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
        bolafake.update()
        raqueta.update()
        // -- Borrar el canvas
        ctx.clearRect(0,0, canvas.width, canvas.height);

        // -- Dibujar la bola
        bola.draw()
        balefake.draw()
        raqueta.draw()
        puntuacion.draw()
        red()

        // -- Condicion de terminación
        if (bola.x > canvas.width) {
          clearInterval(timer);
          timer = null;
          bola.reset();
          bolafake.reset();
          bola.draw();
        }
      }, 20);
    }
  } // -- Fin onclick

}
