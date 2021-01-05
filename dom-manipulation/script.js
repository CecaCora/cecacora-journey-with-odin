const container = document.querySelector('#container');

const content = document.createElement('div');
content.classList.add('content');
content.textContent = 'This is the glorious text-content!';

const redText = document.createElement('p');
redText.style.color = 'red';
redText.textContent = "Hey I'm red!";

const blueText = document.createElement('h3');
blueText.style.color = 'blue';
blueText.textContent = "I'm a blue h3!";

const specialDiv = document.createElement('div');
specialDiv.style.cssText = 'border: 1px solid black; background: pink;';

const h1InDiv = document.createElement('h1');
h1InDiv.textContent = "I'm in a div";

const pInDiv = document.createElement('p');
pInDiv.textContent = 'ME TOO!';

specialDiv.appendChild(h1InDiv);
specialDiv.appendChild(pInDiv);

container.appendChild(content);
container.appendChild(redText);
container.appendChild(blueText);
container.appendChild(specialDiv);
