function alertFunction() {
  alert('YAY! YOU DID IT!');
}

const btn = document.querySelector('#btn');

btn.addEventListener('click', function (e) {
  e.target.style.background = 'blue';
});

const buttons = document.querySelectorAll('button');

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    alert(button.id);
  });
});
