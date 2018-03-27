const   autorizationBtn = document.querySelector('.login-btn'),
        flipperBlock = document.querySelector('.flipper'),
        onMainBtn = document.querySelector('.main-btn'),
        blogMobileBtn = document.querySelector('.blog-left__circle'),
        saidbarBlog = document.querySelector('.blog-left');


// Эффект flip
autorizationBtn.addEventListener('click', function () {
   this.classList.remove('active');
   flipperBlock.classList.add('flip');
});

onMainBtn.addEventListener('click', function () {
    flipperBlock.classList.remove('flip');
    autorizationBtn.classList.add('active');
});

// Сайдбар в "Блог"
blogMobileBtn.addEventListener('click', function () {
    this.parentElement().classList.add('active');
});
