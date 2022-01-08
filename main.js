import './style.css'
import {characters } from './db/characters.js'

/* DOM Objects */
const playersFormDOM = document.querySelector('#players');
const catalog = document.querySelector('#catalog');

/* Global Vars */
const fighters = [];

document.querySelector('#app').innerHTML = `
  <h1>La Resistència! - <span class="small">Bola de Drac</span></h1>
`
class Consola {
  static log(...args) {
    document.querySelector('#consola').innerHTML += args.join(' ') + '<br>'
  }
}

class Player {
  #fighters = [];
  hasTurn = false;
  constructor(name) {
    this.name = name
    this.addFighter = this.addFighter.bind(this)
  }
  addFighter(fighter) {
    this.#fighters.push(fighter);
  }
}

class Board  {
  // Constants del taulell
  #INV = 4; #RED = 0; #GRN = 1; #BLU = 2; #YLW = 3;
  #cellColor = { 4 : "", 0 : "red", 1 : "green", 2 : "blue", 3 : "yellow" };

  // Taulell
  #tableBoard = [-1,-1,-1,0,2,1,3,-1,-1,-1,-1,-1,2,3,0,1,0,2,-1,-1,-1,0,3,0,3,0,1,1,3,-1,1,3,2,1,0,3,1,2,0,2,2,0,3,0,2,1,2,0,3,1,2,2,3,1,3,0,3,1,2,0,3,1,0,2,0,2,0,1,0,3,-1,2,2,1,1,3,2,3,1,-1,-1,-1,0,3,1,2,1,3,-1,-1,-1,-1,-1,1,3,2,0,-1,-1,-1];
  #fighters = [];
  players = [];
  currentPlayerTurn = null;

  constructor() {
  }

  addPlayer(player) {
    this.players.push(player);
  }

  // Sort randomly the players array
  randomPlayOrder() {
    this.players.sort(() => Math.random() - 0.5);
    this.currentPlayerTurn = this.players[0];
    this.players[0].hasTurn = true;
  }

  addFighter(fighter) {
    this.#fighters.push(fighter);
    fighter.setOwner(this);
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
  }

}

class Fighter {
  playerOwner = null
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

  setOwner(player) {
    this.playerOwner = player;
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
// const f1 = new Fighter(3, 'GK', '/assets/personatges/goku.png', 'black');
// b.addFighter(f1);


function askForPlayers() {
// Ask on playersFormDOM how many players are going to play
  const inputDOM = document.createElement('input');
  inputDOM.setAttribute('type', 'number');
  inputDOM.setAttribute('step', '0.01');
  inputDOM.setAttribute('id', 'players');
  inputDOM.setAttribute('placeholder', 'Número de jugadors');
  inputDOM.addEventListener('change', askPlayersNames);

  playersFormDOM.appendChild(inputDOM);

}

// Show a form to ask the players names of the number of players input by the user
function askPlayersNames() {
  const numberOfPlayers = playersFormDOM.querySelector("input").value;
  playersFormDOM.innerHTML = '';
  for (let index = 0; index < numberOfPlayers; index++) {
    playersFormDOM.innerHTML += `
        <input type="text" class="form-control" id="player${index}" placeholder="Nom Jugador ${index+1}">
        `;
  }
  document.querySelectorAll('#players input')[0].focus();
  const playBtnDOM = document.createElement('button');
  playBtnDOM.innerText='Jugar';
  playBtnDOM.addEventListener('click', prepareGame);
  playersFormDOM.appendChild(playBtnDOM);
}


// Create each player on the b board
function prepareGame() {
  const playersDOM = document.querySelectorAll('#players input');
  playersDOM.forEach(playerDOM => {
    const player = new Player(playerDOM.value);
    b.addPlayer(player);
  });
  b.randomPlayOrder();
  playersFormDOM.innerHTML = '';
  playersFormDOM.innerHTML += `
    <div class="alert alert-success" role="alert">
      <h4 class="alert-heading">Jugadors preparats</h4>
      <p>Ordre de Joc: ${b.players.map(player => player.name).join(', ')}</p>
    </div>
  `;
  playersFormDOM.innerHTML += `
    <button class="btn btn-primary" id="start-game">Escollir lluitadors</button>
  `;
  document.querySelector('#start-game').addEventListener('click', chooseFighters);
}

function drawFightersCatalog() {
  characters.forEach(fighter => {
    if(fighter.start_card) {
      const f = new Fighter(fighter.position, fighter.name, "/assets/personatges/"+fighter.picture, fighter.univers);
      fighters.push(f);
      catalog.innerHTML += f.getFighterCard();
    }
  });
}

// First player selects a fighter and passes the turn to the next player.
function chooseFighters() {
  playersFormDOM.remove();
  b.draw();
  drawFightersCatalog();
}


/* 
  Game preparation 
*/
askForPlayers();
