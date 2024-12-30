(function($) {
    "use strict";


var current_fs, next_fs, previous_fs; //form
var opacity;
var current = 0;
var steps = $(".mady-form-step").length;

// Initialize the current and total step counters
$('.mady-current-step').html(current + 1); // Current step starts from 1
$('.mady-total-step').html(steps);

// Set the progress bar and show steps
setProgressBar(current);
showSteps(steps, current, 'initial');

// Click event for the "next" button
$(".next").on('click', function(e) {
    e.preventDefault();
    current_fs = $(this).parents(".mady-form-step");
    next_fs = $(this).parents(".mady-form-step").next();

    // Show the next step
    next_fs.show();
    // Hide the current step with animation
    current_fs.animate({ opacity: 0 }, {
        step: function(now) {
            // For making step appear animation
            opacity = 1 - now;

            current_fs.css({
                'display': 'none',
                'position': 'relative'
            });
            next_fs.css({ 'opacity': opacity });
        },
        duration: 500,
        complete: function() {
            // Update the step count and progress bar after animation
            current++;
            setProgressBar(current);
            $('.mady-current-step').html(current + 1);
            showSteps(steps, current, 'next');
        }
    });
});

// Click event for the "previous" button
$(".previous").click(function() {
    current_fs = $(this).parents(".mady-form-step");
    previous_fs = $(this).parents(".mady-form-step").prev();

    // Show the previous step
    previous_fs.show();

    // Hide the current step with animation
    current_fs.animate({ opacity: 0 }, {
        step: function(now) {
            // For making step appear animation
            opacity = 1 - now;

            current_fs.css({
                'display': 'none',
                'position': 'relative'
            });
            previous_fs.css({ 'opacity': opacity });
        },
        duration: 500,
        complete: function() {
            // Update the step count and progress bar after animation
            current--;
            setProgressBar(current);
            $('.mady-current-step').html(current + 1);
            showSteps(steps, current, 'previous');
        }
    });
});

// Function to show steps and update .step-count span elements
function showSteps(totalSteps, currentStep, direction) {
    var stepTitles = [];
    // Collect titles from .step-text li elements
    $(".step-text li").each(function() {
        stepTitles.push($(this).text());
    });

    var stepCountElement = $(".step-count").empty(); // Clear existing content

    for (let i = 1; i <= totalSteps; i++) {
        // Create a container for each step item
        let stepItem = $('<div>').addClass('step-item');
        let stepNumber = $('<span>').addClass('step-number').text(i); // Span for step number
        let stepTitle = $('<span>').addClass('step-title').text(i <= stepTitles.length ? stepTitles[i - 1] : ''); // Span for step title

        // Append number and title to the step item container
        stepItem.append(stepNumber).append(stepTitle);

        if(direction == 'next' || direction == 'initial'){
            if (currentStep + 1 > i){
                stepItem.addClass('active');
            }else if(currentStep + 1 === i){
                setTimeout(()=>{
                    stepItem.addClass('active')
                }, 300)            
            }            
        }

        if(direction == 'previous'){
            if (currentStep + 2 >= i){
                stepItem.addClass('active');
            }
            if(currentStep + 2 === i){
                setTimeout(()=>{
                    stepItem.removeClass('active')
                }, 0)            
            } 
        }
        // Append the step item to the .step-count container
        stepCountElement.append(stepItem);
    }    
}

// Function to set the progress bar width and height
function setProgressBar(curStep) {
    var percent = parseFloat((100 / (steps - 1))) * curStep;
    percent = percent.toFixed();
    $(".progress-horizontal-bar").css("width", percent + "%");
    $(".progress-vertical-bar").css("height", percent + "%");
}


    /*-------------------------------------
    Background image
    -------------------------------------*/
    $("[data-bg-image]").each(function() {
        var img = $(this).data("bg-image");
        $(this).css({
            backgroundImage: "url(" + img + ")"
        });
    });

    /*-------------------------------------
    After Load All Content Add a Class
    -------------------------------------*/
    window.onload = addNewClass();
    function addNewClass() {
        $('.mady-template-animation').imagesLoaded().done(function(instance) {
            $('.mady-template-animation').addClass('loaded');
        });
    }

    /*-------------------------------------
    Toggle Class
    -------------------------------------*/
    $(".toggle-password").on('click', function () {
        $(this).toggleClass("fa-eye");
        var input = $($(this).attr("toggle"));
        if (input.attr("type") == "password") {
            input.attr("type", "text");
        } else {
            input.attr("type", "password");
        }
    });

    /*-------------------------------------
    Preloader
    -------------------------------------*/
    $('#preloader').fadeOut('slow', function() {
        $(this).remove();
    });

     /*-------------------------------------
    TweenMax Mouse Effect
    -------------------------------------*/
    $(".motion-effects-wrap").mousemove(function (e) {
        parallaxIt(e, ".motion-effects1", -100);
        parallaxIt(e, ".motion-effects2", -200);
        parallaxIt(e, ".motion-effects3", 100);
        parallaxIt(e, ".motion-effects4", 200);
        parallaxIt(e, ".motion-effects5", -50);
        parallaxIt(e, ".motion-effects6", 50);
    });

    function parallaxIt(e, target_class, movement) {
        var $wrap = $(e.target).parents(".motion-effects-wrap");
        if (!$wrap.length) return;
        var $target = $wrap.find(target_class);
        var relX = e.pageX - $wrap.offset().left;
        var relY = e.pageY - $wrap.offset().top;
    
        TweenMax.to($target, 1, {
          x: ((relX - $wrap.width() / 2) / $wrap.width()) * movement,
          y: ((relY - $wrap.height() / 2) / $wrap.height()) * movement,
        });
    }

})(jQuery);