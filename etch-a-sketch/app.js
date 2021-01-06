const initSketchboard = (size) => {
  let sketchboard = document.createElement('main');
  sketchboard.style.cssText = `
  grid-template-rows: repeat(${size}, 1fr);
  grid-template-columns: repeat(${size}, 1fr);
  `;

  for (let i = 0; i < size * size; i++) {
    let grid = document.createElement('div');
    sketchboard.appendChild(grid);
  }

  let app = document.querySelector('body');
  app.appendChild(sketchboard);

  let grids = document.querySelectorAll('div');
  grids.forEach((grid) => {
    grid.addEventListener('mouseover', colourGrid);
    grid.style.backgroundColor = 'white';
  });

  let currentSize = document.querySelector('p');
  currentSize.innerText = `Current size: ${size} x ${size}`;
};

const colourGrid = (e) => {
  e.target.style.backgroundColor = 'black';
};

const setSketchboardSize = () => {
  let newSize;
  while (isNaN(newSize) || newSize < 2 || newSize > 100) {
    newSize = prompt('Please enter an integer from 2 to 100.');
  }
  document.querySelector('main').remove();
  initSketchboard(newSize);
};

const button = document.querySelector('button');
button.addEventListener('click', setSketchboardSize);

initSketchboard(16);
