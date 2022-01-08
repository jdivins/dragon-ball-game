import './style.css'

document.querySelector('#app').innerHTML = `
  <h1>La Resistència! - <span class="small">Bola de Drac</span></h1>
`
class Consola {
  static log(...args) {
    document.querySelector('#consola').innerHTML += args.join(' ') + '<br>'
  }
}

class Board  {
  // Constants del taulell
  #INV = 4; #RED = 0; #GRN = 1; #BLU = 2; #YLW = 3;
  #cellColor = { 4 : "", 0 : "red", 1 : "green", 2 : "blue", 3 : "yellow" };

  // Taulell
  #tableBoard = [-1,-1,-1,0,2,1,3,-1,-1,-1,-1,-1,2,3,0,1,0,2,-1,-1,-1,0,3,0,3,0,1,1,3,-1,1,3,2,1,0,3,1,2,0,2,2,0,3,0,2,1,2,0,3,1,2,2,3,1,3,0,3,1,2,0,3,1,0,2,0,2,0,1,0,3,-1,2,2,1,1,3,2,3,1,-1,-1,-1,0,3,1,2,1,3,-1,-1,-1,-1,-1,1,3,2,0,-1,-1,-1];
  #fighters = [];

  constructor() {
  }

  addFighter(fighter) {
    this.#fighters.push(fighter);
  }

  draw() {
    const board = document.querySelector('#board');
    for (let i = 0; i < 100; i++) {
      const cell = document.createElement('span');
      cell.classList.add('cell');
      cell.classList.add(this.#cellColor[this.#tableBoard[i]]);
      cell.setAttribute('data-id', i);
      cell.setAttribute('data-value', '0');
      cell.setAttribute('data-selected', 'false');
      cell.setAttribute('data-valid', 'true');
      cell.innerText = "";
      board.appendChild(cell);
    }
    this.#fighters.forEach(fighter => {
      this.#drawFighter(fighter);
    });
  }

  #drawFighter(fighter) {
    const board = document.querySelector('#board');
    const cell = board.querySelector(`[data-id="${fighter.position}"]`);
    cell.style.backgroundImage = "url('"+fighter.image+"')";
    cell.style.backgroundColor = "white",
    cell.setAttribute('data-value', fighter.value);
    cell.setAttribute('data-selected', 'false');
    cell.setAttribute('data-valid', 'true');
    Consola.log(fighter.name, 'is in', fighter.position);
  }
}

class Fighter {
  position = 0;
  image = "";
  univers = "";
  name = "";

  constructor(position=-1, name, image, univers) {
    this.position = position;
    this.name = name;
    this.image = image;
    this.univers = univers;
  }

  getFighterCard() {
    return `
      <div class="fighter-card gradient_${this.univers}">
        <div class="fighter-card-image">
          <img src="${this.image}">
        </div>
        <div class="fighter-card-name">
          ${this.name}
        </div>
      </div>
    `
  }
}


const b = new Board();
const f1 = new Fighter(3, 'GK', '/assets/personatges/goku.png', 'black');
const f2 = new Fighter(15, 'V', '/assets/personatges/vegeta.png', 'purple');
const f3 = new Fighter(27, 'G', '/assets/personatges/son_gohan.png', 'olive');
b.addFighter(f1);
b.addFighter(f2);
b.addFighter(f3);

b.draw();

const catalog = document.querySelector('#catalog');

const fighters = [];
import {characters } from './db/characters.js'
Consola.log(characters.length);
characters.forEach(fighter => {
  const f = new Fighter(fighter.position, fighter.name, "/assets/personatges/"+fighter.picture, fighter.univers);
  fighters.push(f);
  catalog.innerHTML += f.getFighterCard();
});


