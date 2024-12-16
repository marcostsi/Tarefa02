// set up canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

/*
Podem ser usadas para fornecer mais informações para indicar isso adiconado uma tag.
*/

class Team {
    /**
     * 
     * @param {*} x - Posição x inicial da trave.
     * @param {*} w - Largura da trave.
     * @param {*} h - Altura da trave.
     * @param {*} color - Cor da trave.
     * @param {number} canvasHeight - Altura total do canvas.
     */
    constructor(x,w, h, color) {
      this.name = color // Nome baseado na cor
      this.x = x // Posição x
      this.w = w // Largura da trave
      this.h = h // Altura da trave
      this.color = color // Cor
      // this.canvasHeight = canvasHeight; // Altura do canvas
      this.y = this.calcularY(); // Calcula y automaticamente
  
      this.balls_count = 1; // Quantidade padrão de bolas
      this.velocidadedabola = 2 // Velocidade padrão das bolas
      this.pontuacao = 0; // Pontuação do time
    }
  
    /**
     * Calcula a posição y para centralizar a trave no canvas.
     * @returns {number} Posição y calculada.
     */
    calcularY() {
      // A posição y é ajustada para manter a trave centralizada verticalmente no canvas
      return(height - this.h) / 2;
    }
    /**
     * Atualiza a quantidade e a velocidade das bolas.
     * @param {number} ballQuantity - Nova quantidade de bolas.
     * @param {number} ballSpeed - Nova velocidade das bolas.
     */
    atualizarConfiguraçoes(balls_count,velocidadedabola){
      this.balls_count = balls_count;
      this.velocidadedabola = velocidadedabola;
    }
  
    atualizarAltura(novaAltura){
      this.h = novaAltura; // Atualiza a altura
      this.y = this.calcularY(); // Recalcula a posição y
    }
    /**
     * Desenha a trave no contexto do canvas.
     */
    draw() {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x,this.y, this.w, this.h);
    }
  }

export default Team;