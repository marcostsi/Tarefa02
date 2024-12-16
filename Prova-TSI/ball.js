const pontuacaoVermelho = document.getElementById("pontucaoVermelho");
const pontucaoAzul = document.getElementById("pontucaoAzul");


// set up canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

/*
Podem ser usadas para fornecer mais informações para indicar isso adiconado uma tag.
*/
class Ball {
    /**
     * 
     * @param {*} x - Posição x inicial da bola.
     * @param {*} y - Posição y inicial da bola.
     * @param {*} velX -Velocidade horizontal da bola.
     * @param {*} velY Velocidade vertical da bola.
     * @param {*} color - Cor da bola.
     * @param {*} size - Tamanho da bola.
     */
    constructor(x, y, velX, velY, color, size) {
      this.x = x;
      this.y = y;
      this.velX = velX; // Velocidade no eixo X
      this.velY = velY; // Velocidade no eixo Y
      this.color = color;
      this.size = size;
    }
     /**
     * Desenha a bola no contexto do canvas.
     */
    draw() {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      ctx.fill();
    }

    /**
     * Atualiza a posição da bola, fazendo-a quicar ao atingir as bordas.
     */
    update() {
       // Atualiza a posição e inverte direção se atingir a borda
      if (this.x + this.size >= width) {
        this.velX = -Math.abs(this.velX);
      }
  
      if (this.x - this.size <= 0) {
        this.velX = Math.abs(this.velX);
      }
  
      if (this.y + this.size >= height) {
        this.velY = -Math.abs(this.velY);
      }
  
      if (this.y - this.size <= 0) {
        this.velY = Math.abs(this.velY);
      }
  
      this.x += this.velX;
      this.y += this.velY;
    }
      /**
     * Detecta colisões entre a bola atual e outras bolas no jogo.
     * Caso haja colisão, ajusta a direção do movimento das bolas.
     */
    collisionDetect(goal1, goal2) {
      if (
        this.x - this.size <  goal1.x + 1  && 
        (this.y - this.size > goal1.y && this.y < goal1.y + goal1.h) &&
        this.color !== goal1.color
    ){
        goal2.pontuacao += 1;
        pontucaoAzul.textContent = "Pontuação: " + goal2.pontuacao;

        if (goal2.pontuacao == 10) {
            alert("O time azul fez 10 gols!");
        }
    }
    
    if (this.x - this.size >  goal2.x && 
        (this.y - this.size > goal2.y && this.y < goal1.y + goal1.h ) &&
        this.color !== goal2.color
    ){
        goal1.pontuacao += 1;
        pontuacaoVermelho.textContent = "Pontuação: " + goal1.pontuacao;
        
        if (goal1.pontuacao == 10) {
            alert("O time vermelho fez 10 gols!");
        }
      }
    }
  }

  export default Ball;