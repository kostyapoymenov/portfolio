var autorizationBtn = document.querySelector('.login-btn'),
    flipperBlock = document.querySelector('.flipper'),
    onMainBtn = document.querySelector('.main-btn');

autorizationBtn.addEventListener('click', function () {
   this.classList.remove('active');
   flipperBlock.classList.add('flip');
});

onMainBtn.addEventListener('click', function () {
    flipperBlock.classList.remove('flip');
    autorizationBtn.classList.add('active');
});