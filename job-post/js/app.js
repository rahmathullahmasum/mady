(function($) {
    "use strict";


    var current_fs, next_fs, previous_fs; //form
    var opacity;
    var current = 0;
    var steps = $(".mady-form-step").length;

    $('.mady-current-step').html(current);
    $('.mady-total-step').html(steps);

    setProgressBar(current);
    showSteps(steps, current);

    $(".next").on('click', function(e) {
        e.preventDefault();
        current_fs = $(this).parents(".mady-form-step");
        next_fs = $(this).parents(".mady-form-step").next();

        //show the next step
        next_fs.show();
        //hide the current step with style
        current_fs.animate({ opacity: 0 }, {
            step: function(now) {
                // for making step appear animation
                opacity = 1 - now;

                current_fs.css({
                    'display': 'none',
                    'position': 'relative'
                });
                next_fs.css({ 'opacity': opacity });
            },
            duration: 500
        });
        setProgressBar(++current);

        $('.mady-current-step').html(current);
        showSteps(steps, current);
    });

    $(".previous").click(function() {

        current_fs = $(this).parents(".mady-form-step");
        previous_fs = $(this).parents(".mady-form-step").prev();

        //show the previous step
        previous_fs.show();

        //hide the current step with style
        current_fs.animate({ opacity: 0 }, {
            step: function(now) {
                // for making step appear animation
                opacity = 1 - now;

                current_fs.css({
                    'display': 'none',
                    'position': 'relative'
                });
                previous_fs.css({ 'opacity': opacity });
            },
            duration: 500
        });
        setProgressBar(--current);
        $('.mady-current-step').html(current);
        showSteps(steps, current);
    });

    function showSteps(totalSteps, currentStep){
        $(".step-count")[0].innerHTML = '';

        for(let i=1; i<=totalSteps; i++){
            let el = document.createElement('span');
            el.innerHTML = i;
            if(currentStep>=i) el.classList.add('active');
            $(".step-count")[0].appendChild(el);
        }
    }

    function setProgressBar(curStep) {
        var percent = parseFloat(100 / steps) * curStep;
        percent = percent.toFixed();
        $(".progress-bar")
            .css("width", percent + "%")
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

})(jQuery);