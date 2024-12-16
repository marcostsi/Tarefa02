import Team from "./team.js";
import Ball from "./ball.js";

document.getElementById("buttonStart").addEventListener("click", start)

document.getElementById("red") .addEventListener("submit", function (event) {
  event.preventDefault(); 

  const tamanhoVermelho = document.querySelector("#tamanhoVermelho").value;
  const quantidadeVermelho = document.querySelector("#quantidadeVermelho").value;
  const velocidadeVermelho = document.querySelector("#velocidadeVermelho").value;

  team_red.atualizarConfiguraçoes(quantidadeVermelho, velocidadeVermelho);
  team_red.atualizarAltura(tamanhoVermelho);
});

document.getElementById("blue") .addEventListener("submit", function (event) {
  event.preventDefault(); 
  
  const tamanhoAzul = document.querySelector("#tamanhoAzul").value;
  const quantidadeAzul = document.querySelector("#quantidadeAzul").value;
  const velocidadeAzul = document.querySelector("#velocidadeAzul").value;
  
  team_blue.atualizarConfiguraçoes(quantidadeAzul, velocidadeAzul);
  team_blue.atualizarAltura(tamanhoAzul);
});



// set up canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// function to generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


/*
Aqui usa um array
*/
let balls = [];
let team_red = new Team(0, 30, 100, "red")
let team_blue = new Team(width - 30, 30, 100, "blue")

/*
Podem ser usadas para fornecer mais informações para indicar isso adiconado uma tag.
*/
function start(){
  balls = []; // Limpa bolas existentes
  for (let i = 0; i < team_red.balls_count; i++) {
    const size = random(10, 20);
    const ball_red = new Ball(
      // posição da bola sempre desenhada com pelo menos uma largura de bola
      //  longe da borda da tela, para evitar erros de desenho
      random(0 + size, width - size),
      random(0 + size, height - size),
      parseInt(document.querySelector("#velocidadeVermelho").value),
      parseInt(document.querySelector("#velocidadeVermelho").value),
      "red",
      size
    );
    balls.push(ball_red);
  }
  for (let i = 0; i < team_blue.balls_count; i++)  {
    const size = random(10, 20);
    const ball_blue = new Ball(
      // posição da bola sempre desenhada com pelo menos uma largura de bola
      // longe da borda da tela, para evitar erros de desenho
      random(0 + size, width - size),
      random(0 + size, height - size),
      parseInt(document.querySelector("#velocidadeAzul").value),
      parseInt(document.querySelector("#velocidadeAzul").value),
      "blue",
      size
    );
    balls.push(ball_blue);
  }
  
}

function resertGame(){
  document.getElementById('tamanhoVermelho').value = 100;
  document.getElementById('quantidadeVermelho').value = 1;
  document.getElementById('velocidadeVermelho').value = 10;
  document.getElementById('tamanhoAzul').value = 100;
  document.getElementById('quantidadeAzul').value = 1;
  document.getElementById('velocidadeAzul').value = 10;
  
  team_red.atualizarAltura(100);
  team_blue.atualizarAltura(100);
  team_red.atualizarConfiguraçoes(1, 10); // 1 bola, velocidade 10
  team_blue.atualizarConfiguraçoes(1, 10); // 1 bola, velocidade 10
  team_red.pontuacao = 0;
  team_blue.pontuacao = 0;
}
document.getElementById('reset-game').addEventListener('click', resertGame);
resertGame();



/*
Podem ser usadas para fornecer mais informações para indicar isso adiconado uma tag.
*/
function loop() {
  ctx.fillStyle = "rgba(101, 250, 100, 0.25)";
  ctx.fillRect(0, 0, width, height);

  team_red.draw()
  
  team_blue.draw()

  for (const ball of balls) {
    ball.draw();
    ball.update();
    ball.collisionDetect(team_red, team_blue);
  }

  requestAnimationFrame(loop);
}

loop();
