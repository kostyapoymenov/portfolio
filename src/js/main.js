const   autorizationBtn = document.querySelector('.login-btn'),
        flipperBlock = document.querySelector('.flipper'),
        onMainBtn = document.querySelector('.main-btn'),
        blogMobileBtn = document.querySelector('.blog-left__circle'),
        saidbarBlog = document.querySelector('.blog-left');


// Сайдбар в "Блог"
if (blogMobileBtn !== null) {
    blogMobileBtn.addEventListener('click', function () {
        saidbarBlog.classList.toggle('active_a');
    });
}

// Эффект flip
if (autorizationBtn !== null || onMainBtn !== null) {
    autorizationBtn.addEventListener('click', function () {
        this.classList.remove('active');
        flipperBlock.classList.add('flip');
    });

    onMainBtn.addEventListener('click', function () {
        flipperBlock.classList.remove('flip');
        autorizationBtn.classList.add('active');
    });
}

const   hamburgerBtn = document.querySelector('.hamburger'),
        hamburgerMenu = document.querySelector('.hamburger-menu');

hamburgerBtn.addEventListener('click', function(){
    this.classList.toggle('hamburger--active');
    hamburgerMenu.classList.toggle('hamburger-menu--active');
});
