document.addEventListener('COMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  const squares = Array.from(document.querySelectorAll('.grid div'));
  const scoreDisplay = document.querySelector('#score');
  const startBtn = document.querySelector('#start-button');
  const width = 10;

  // Tetrominoes
  const lTetronimo = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2]
  ];

  const zTetronimo = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1]
  ];

  const tTetronimo = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1]
  ];

  const oTetronimo = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1]
  ];

  const iTetronimo = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3]
  ];

  const theTetrominoes = [lTetronimo, zTetronimo, tTetronimo, oTetronimo, iTetronimo];

  const currentPosision = 4;
  const currentRotation = 0;

  // randomly select a tetromino and its first rotation
  const random = Math.floor(Math.random() * theTetrominoes.length);
  const current = theTetrominoes[random][currentRotation];

  // drawing tetromino
  function draw() {
    current.forEach((index) => {
      squares[currentPosision + index].classList.add('tetromino');
    });
  }

  // undraw tetromino
  function undraw() {
    current.forEach((index) => {
      squares[currentPosision + index].classList.remove('tetromino');
    });
  }
});