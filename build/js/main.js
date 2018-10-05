"use strict";
$(document).ready(function() {



// скролы к якорям

    const smothScroll = () => {
        const   linkAnchor = document.querySelector('.arrow__link');
       if (!linkAnchor) return;
        const event = function(e){
            let w = window.pageYOffset,
                hash = this.href.replace(/[^#]*(.*)/, '$1'),
                t = document.querySelector(hash).getBoundingClientRect().top,
                start = null;
            requestAnimationFrame(step);
            function step(time) {
                if (start === null) start = time;
                var progress = time - start,
                    r = (t < 0 ? Math.max(w - progress / 1, w + t) : Math.min(w + progress / 1, w + t));
                window.scrollTo(0, r);
                if (r != w + t) {
                    requestAnimationFrame(step)
                } else {
                    location.hash = hash
                }
            }
        }
        linkAnchor.addEventListener('click', event)
    }

    smothScroll();


    const smothScrolTop = () => {
        const scrollToplink = document.querySelector('.arrow__top');
        if(!scrollToplink) return;

            function scrollTop() {
                window.scrollBy(0,-80); // чем меньше значение (цифра -10), тем выше скорость перемещения
                if (window.pageYOffset > 0) {requestAnimationFrame(scrollTop);}
            }
            scrollToplink.addEventListener('click', function(e) {
                e.preventDefault();
                scrollTop();
            }, false);
    }

    smothScrolTop();

// const   autorizationBtn = document.querySelector('.login-btn'),
//     flipperBlock = document.querySelector('.flipper'),
//     onMainBtn = document.querySelector('.main-btn'),
//     blogMobileBtn = document.querySelector('.blog-left__circle'),
//     saidbarBlog = document.querySelector('.blog-left');


// Эффект flip

    const flipper = function() {
        const   autorizationBtn = document.querySelector('.login-btn'),
                flipperBlock = document.querySelector('.flipper'),
                onMainBtn = document.querySelector('.main-btn');

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
    }

    flipper();


// гамбургер

    const burgerMenu = function () {
        const   hamburgerBtn = document.querySelector('.hamburger'),
                hamburgerMenu = document.querySelector('.hamburger-menu');

        const event = (e) => {
            hamburgerBtn.classList.toggle('hamburger--active');
            if(hamburgerMenu.classList.contains('hamburger-menu--active')){
                document.body.style.overflow = '';
            } else {
                document.body.style.overflow = 'hidden';
            }
            hamburgerMenu.classList.toggle('hamburger-menu--active');
        }

        hamburgerBtn.addEventListener('click', event);

    }

    burgerMenu();


    const skillsAnimate = function () {
        const   aboutBlock  = document.querySelector('.about'),
                skills      = document.querySelectorAll('.skill__circle');

        if(!aboutBlock) return;

        const event = function(e){
            const  coordAbout  = aboutBlock.getBoundingClientRect().top;
            if(coordAbout <= window.pageYOffset){
                for(var i = 0; i < skills.length; i++){
                    skills[i].classList.add('active');
                }
            }
        }
        window.addEventListener('scroll', event);
    }

    skillsAnimate();


//сайдбар на странице "БЛОГ"

    const menuBlog = () => {
        const    sectionBlog    = $('.blog'),
                 saidbarBlog    = $('.blog-left'),
                 article        = $('.blog-right .article'),
                 listBlog       = $('.blog-nav'),
                 BlogNavItem    = $('.blog-nav__item'),
                 navLink        = $('.blog-nav__link'),
                 blogMobileBtn  = $('.blog-left__circle');


        navLink.on('click', function () {
            let scrollAnchor  = $(this).attr('data-scroll'),
                scrollPoint = $('.article[data-anchor="' + scrollAnchor + '"]').offset().top;

            console.log(scrollAnchor);
            console.log(scrollPoint);

            saidbarBlog.removeClass('blog-left-active-mob');

            $('body,html').animate({
                scrollTop: scrollPoint
            }, 500);
            return false;
        });

        $(window).scroll(function(){
            let blogTop = sectionBlog.offset().top,
                windowTop = $(window).scrollTop();

            if(windowTop >= blogTop){
                listBlog.addClass('posit-fixed');
                blogMobileBtn.addClass('blog-left__circle-active');
            } else {
                listBlog.removeClass('posit-fixed');
                saidbarBlog.removeClass('blog-left-active-mob');
                blogMobileBtn.removeClass('blog-left__circle-active');
            }

            article.each(function(i){
                if($(this).position().top < windowTop + 30){
                    BlogNavItem.removeClass('blog-left-active');
                    BlogNavItem.eq(i).addClass('blog-left-active');
                }
            })

        });

        blogMobileBtn.on('click', function(){
            saidbarBlog.toggleClass('blog-left-active-mob');
        })
    }

    menuBlog();



// Прелоадер
    const preloadBlock = () => {
        var     preloader           = document.querySelector('#page-preloader'),
                images              = document.images,
                imagesCount         = images.length,
                imagesLoadedCount   = 0,
                percDisplay         = document.querySelector('.load-perc');
        // let count = 0;

    // const createImg = function (img) {
    //     const img = new Image();
    //     img.addEventListener('load', () => count++ )
    //     img.src = img
    // }
    // createImg('../bg.jpg');

        for( let i = 0; i < imagesCount; i++ ) {
            const   imageClone          = new Image();
                    imageClone.onload   = imageLoaded;
                    imageClone.onerror  = imageLoaded;
                    imageClone.src      = images[i].src;
        }

        function imageLoaded() {
            imagesLoadedCount++;
            percDisplay.innerHTML = (((100 / imagesCount) * imagesLoadedCount) << 0) + '%';
            if( imagesLoadedCount >= imagesCount ) {
                setTimeout(function() {
                    if( !preloader.classList.contains('done') ){
                        preloader.classList.add('done');
                    }
                }, 1000);
            }
        }
    }

    preloadBlock();



// слайдер

    var slider = (function () {
        var counter = 1,
            duration = 300,
            inProcess = false;

        var moveSlide = function (container, direction) {
            var items = container.find('.slider__item'),
                activeItem = items.filter('.active'),
                direction = direction == 'down' ? 100 : -100;

            if(counter >= items.length) counter = 0;

            var reqItem = items.eq(counter);

            activeItem.animate({
                'top': direction + '%'
            }, duration);

            reqItem.animate({
                'top': '0'
            }, duration, function () {
                activeItem.removeClass('active').css('top', -direction + '%');
                $(this).addClass('active');
                inProcess = false;
            });
        };

        return {
            init: function(){
                $('.switch__item_imposit').on('click', function(e){

                    if(!inProcess){
                        inProcess = true;

                        moveSlide($('.switch__item--prev'), 'down');
                        moveSlide($('.switch__item--next'), 'up');
                    }

                    counter++;
                });
            }
        }
    }());

    $(function(){
        slider.init();
    });

});

// Google карты

function initMap() {
    var centerLatLng = new google.maps.LatLng(59.957902, 30.300838);
    var mapOptions = {
        center: centerLatLng,
        zoom: 12
    };

    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
}
// Ждем полной загрузки страницы, после этого запускаем initMap()
google.maps.event.addDomListener(window, "load", initMap);

    initMap();