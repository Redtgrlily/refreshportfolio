/*

[Main Script]

Project     : RM - Simple Portfolio Template
Author      : ZhaTheme
Author URI  : https://themeforest.net/user/zhatheme

*/

$(document).ready(function(){    
    "use strict";

    //Slide Toggle
    $(".custom-close").click(function(){
        $(this).hide();
        $(".custom-show").show();
        $(this).parent().animate({'left': '-=130px'},'slow');
    });
    
    $(".msg .btn").click(function(){
        $(this).parent().fadeOut(300);
    });

    $(".custom-show").click(function(){
        $(this).hide();
        $(".custom-close").show();
        $(this).parent().animate({'left': '+=130px'},'slow');
    });   

    //Page
    $('.smooth').on('click', function() {
        $.smoothScroll({
            scrollElement: $('body'),
            scrollTarget: '#' + this.id
        });
        
        return false;
    });

    //Navigation    
    $(window).on('scroll',function(){
        var scroll = $(window).scrollTop();
        
        if(scroll < 300){
            $('#navbar').removeClass("styleMenuRoll").addClass("styleMenu");
        } else{
            $('#navbar').removeClass("styleMenu").addClass("styleMenuRoll");
        }
    });

    $('body').on('click', '.nav-trigger', function() {
        $(this).toggleClass('on');
        $('.nav-menu').fadeToggle('slow',function(){
            $('.item-menu').on('click',function(){
                location.reload();
            });
        });        
    });    

	// Counter
	$.fn.countTo = function(options) {
	    return this.each(function() {
	      //-- Arrange
	      var FRAME_RATE = 5; // Predefine default frame rate to be 60fps
	      var $el = $(this);
	      var countFrom = parseInt($el.attr('data-count-from'),10);
	      var countTo = parseInt($el.attr('data-count-to'),10);
	      var countSpeed = $el.attr('data-count-speed'); // Number increment per second

	      //-- Action
	      var rafId;
	      var increment;
	      var currentCount = countFrom;
	      var countAction = function() {              // Self looping local function via requestAnimationFrame
	        if(currentCount < countTo) {              // Perform number incremeant
	          $el.text(Math.floor(currentCount));     // Update HTML display
	          increment = countSpeed / FRAME_RATE;    // Calculate increment step
	          currentCount += increment;              // Increment counter
	          rafId = requestAnimationFrame(countAction);
	        } else {                                  // Terminate animation once it reaches the target count number
	          $el.text(countTo);                      // Set to the final value before everything stops
	          //cancelAnimationFrame(rafId);
	        }
	      };
	      rafId = requestAnimationFrame(countAction); // Initiates the looping function
	    });
	  };
	$('.number-counter').countTo();
	// End Counter


	//Isotope	
	var $container = $('.portfolioContainer');
    $container.isotope({
        filter: '*',
        animationOptions: {
            duration: 750,
            easing: 'linear',
            queue: false
        }
    });
    $('.portfolioFilter a').on('click',function(){
        $('.portfolioFilter .current').removeClass('current');
        $(this).addClass('current');
 
        var selector = $(this).attr('data-filter');
        $container.isotope({
            filter: selector,
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
         });
         return false;
    });

    // Flip Services
    $(".flip").flip({
        trigger: 'hover',
        axis: 'x'
    });    

    // Carousel
    $('.owl-carousel1').owlCarousel({
            items: 6,
            loop: true,
            margin: 30,
            autoplay: true,
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
            dots :false,
            responsiveClass: true,
            responsive: {
                  0: {
                    items: 2,
                    nav: false
                  },
                  600: {
                    items: 3,
                    nav: false,
                    margin: 30
                  },
                  1000: {
                    items: 6,
                    nav: true,
                    loop: false,
                    margin: 30,
                    nav: false
                  }
                }            
    });  

    //Text Writter
    var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
        }

        setTimeout(function() {
        that.tick();
        }, delta);
    };

    $(window).on('load',function() {
        var elements = document.getElementsByClassName('typewrite');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
              new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }        
    });      

    //Button Top
    var btn = $('#button');
    $(window).on('scroll',function() {
      if ($(window).scrollTop() > 300) {
        btn.addClass('show');
      } else {
        btn.removeClass('show');
      }
    });

    btn.on('click', function(e) {
      e.preventDefault();
      $('html, body').animate({scrollTop:0}, '300');
    });

    
});