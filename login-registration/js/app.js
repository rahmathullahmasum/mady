(function($) {
    "use strict";


    function isGood(signupPassword) {
        var password_strength = document.getElementById("password-text");
  
        //TextBox left blank.
        if (signupPassword.length == 0) {
          password_strength.innerHTML = "";
          return;
        }
  
        //Regular Expressions.
        var regex = new Array();
        regex.push("[A-Z]"); //Uppercase Alphabet.
        regex.push("[a-z]"); //Lowercase Alphabet.
        regex.push("[0-9]"); //Digit.
        regex.push("[$@$!%*#?&]"); //Special Character.
  
        var passed = 0;
  
        //Validate for each Regular Expression.
        for (var i = 0; i < regex.length; i++) {
          if (new RegExp(regex[i]).test(signupPassword)) {
            passed++;
          }
        }

        if(signupPassword.length > 7){
            passed++;
          }
  
        //Display status.
        var strength = "";
        switch (passed) {
          case 0:
          case 1:
            strength = "<span class='progress-bar bg-danger' style='width: 20%'><span class='progress-bar-text'>Very Weak Password</span></span>";
            break;
          case 2:
            strength = "<span class='progress-bar bg-warning' style='width: 40%'><span class='progress-bar-text'>Weak Password</span></span>";
            break;
          case 3:
            strength = "<span class='progress-bar bg-primary' style='width: 60%'><span class='progress-bar-text'>Medium Password</span></span>";
            break;
          case 4:
            strength = "<span class='progress-bar bg-info' style='width: 80%'><span class='progress-bar-text'>Good Password</span></span>";
            break;
          case 5:
            strength = "<span class='progress-bar bg-success' style='width: 100%'><span class='progress-bar-text'>Strong Password</span></span>";
            break;
  
        }
        password_strength.innerHTML = strength;
  
    }

    $('#signupPassword').on('input', function() {
        isGood(this.value);
    });

      //gggggggggg

    var current_fs, next_fs, previous_fs; //form
    var opacity;
    var current = 1;
    var steps = $(".mady-form-step").length;

    $('.mady-current-step').html(current);
    $('.mady-total-step').html(steps);

    setProgressBar(current);

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
    });

    function setProgressBar(curStep) {
        var percent = parseFloat(100 / steps) * curStep;
        percent = percent.toFixed();
        $(".progress-bar")
            .css("width", percent + "%")
    }

    // $(".finish-btn").click(function() {
    //     window.location.href = "job-1-success.html";
    // })

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
    // $(".toggle-password").on('click', function() {
    //     $(this).toggleClass("fa-eye fa-eye-slash");
    //     var input = $($(this).attr("toggle"));
    //     if (input.attr("type") == "password") {
    //         input.attr("type", "text");
    //     } else {
    //         input.attr("type", "password");
    //     }
    // });

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
    Youtube Video
    -------------------------------------*/
    if ($.fn.YTPlayer !== undefined && $("#madyVideo").length) {
        $("#madyVideo").YTPlayer({ useOnMobile: true });
    }

    /*-------------------------------------
    Vegas Slider
    -------------------------------------*/
    if ($.fn.vegas !== undefined && $("#vegas-slide").length) {
        var target_slider = $("#vegas-slide"),
            vegas_options = target_slider.data('vegas-options');
        if (typeof vegas_options === "object") {
            target_slider.vegas(vegas_options);
        }
    }

    /*-------------------------------------
    OTP Form (Focusing on next input)
    -------------------------------------*/
    $("#otp-form .otp-input").keyup(function() {
        if (this.value.length == this.maxLength) {
            $(this).next('.otp-input').focus();
        }
    });

    /*-------------------------------------
	Social Animation
	-------------------------------------*/
    $('#mady-login-option >ul >li').hover(function() {
        $('#mady-login-option >ul >li').removeClass('active');
        $(this).addClass('active');
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

     /*---------------------------------------
    Background Parallax
    --------------------------------------- */
//   if ($(".parallaxie").length) {
//     $(".parallaxie").parallaxie({
//       speed: 0.5,
//       offset: 0,
//     });
//   }

})(jQuery);