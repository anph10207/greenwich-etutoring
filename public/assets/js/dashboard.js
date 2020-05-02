//const accessToken = JSON.parse(localStorage.getItem("credentials")).accessToken;

var searchVisible = 0;
var transparent = true;

var transparentDemo = true;
var fixedTop = false;

var navbar_initialized = false;
var mobile_menu_visible = 0,
    mobile_menu_initialized = false,
    toggle_initialized = false,
    bootstrap_nav_initialized = false,
    $sidebar,
    isWindows;

$(document).ready(function() {
    window_width = $(window).width();

    // Init navigation toggle for small screens
    if (window_width <= 991) {
        lbd.initRightMenu();
    }

    //  Activate the tooltips
    $('[rel="tooltip"]').tooltip();

    $('.form-control').on("focus", function() {
        $(this).parent('.input-group').addClass("input-group-focus");
    }).on("blur", function() {
        $(this).parent(".input-group").removeClass("input-group-focus");
    });

    // Fixes sub-nav not working as expected on IOS
    $('body').on('touchstart.dropdown', '.dropdown-menu', function(e) {
        e.stopPropagation();
    });
});

// activate collapse right menu when the windows is resized
$(window).resize(function() {
    if ($(window).width() <= 991) {
        lbd.initRightMenu();
    }
});

lbd = {
    misc: {
        navbar_menu_visible: 0
    },

    initRightMenu: function() {
        $sidebar_wrapper = $('.sidebar-wrapper');

        if (!mobile_menu_initialized) {

            $navbar = $('nav').find('.navbar-collapse').first().clone(true);

            nav_content = '';
            mobile_menu_content = '';

            //add the content from the regular header to the mobile menu
            $navbar.children('ul').each(function() {

                content_buff = $(this).html();
                nav_content = nav_content + content_buff;
            });

            nav_content = '<ul class="nav nav-mobile-menu">' + nav_content + '</ul>';

            $navbar_form = $('nav').find('.navbar-form').clone(true);

            $sidebar_nav = $sidebar_wrapper.find(' > .nav');

            // insert the navbar form before the sidebar list
            $nav_content = $(nav_content);
            $nav_content.insertBefore($sidebar_nav);
            $navbar_form.insertBefore($nav_content);

            $(".sidebar-wrapper .dropdown .dropdown-menu > li > a").click(function(event) {
                event.stopPropagation();

            });

            mobile_menu_initialized = true;
        } else {
            if ($(window).width() > 991) {
                // reset all the additions that we made for the sidebar wrapper only if the screen is bigger than 991px
                $sidebar_wrapper.find('.navbar-form').remove();
                $sidebar_wrapper.find('.nav-mobile-menu').remove();

                mobile_menu_initialized = false;
            }
        }

        if (!toggle_initialized) {
            $toggle = $('.navbar-toggler');

            $toggle.click(function() {

                if (mobile_menu_visible == 1) {
                    $('html').removeClass('nav-open');

                    $('.close-layer').remove();
                    setTimeout(function() {
                        $toggle.removeClass('toggled');
                    }, 400);

                    mobile_menu_visible = 0;
                } else {
                    setTimeout(function() {
                        $toggle.addClass('toggled');
                    }, 430);


                    main_panel_height = $('.main-panel')[0].scrollHeight;
                    $layer = $('<div class="close-layer"></div>');
                    $layer.css('height', main_panel_height + 'px');
                    $layer.appendTo(".main-panel");

                    setTimeout(function() {
                        $layer.addClass('visible');
                    }, 100);

                    $layer.click(function() {
                        $('html').removeClass('nav-open');
                        mobile_menu_visible = 0;

                        $layer.removeClass('visible');

                        setTimeout(function() {
                            $layer.remove();
                            $toggle.removeClass('toggled');

                        }, 400);
                    });

                    $('html').addClass('nav-open');
                    mobile_menu_visible = 1;

                }
            });

            toggle_initialized = true;
        }
    }
}

type = ['primary', 'info', 'success', 'warning', 'danger'];

dashboard = {
    initPickColor: function() {
        $('.pick-class-label').click(function() {
            var new_class = $(this).attr('new-class');
            var old_class = $('#display-buttons').attr('data-class');
            var display_div = $('#display-buttons');
            if (display_div.length) {
                var display_buttons = display_div.find('.btn');
                display_buttons.removeClass(old_class);
                display_buttons.addClass(new_class);
                display_div.attr('data-class', new_class);
            }
        });
    },

    showNotification: function(from, align) {
        color = Math.floor((Math.random() * 4) + 1);

        $.notify({
            icon: "nc-icon nc-app",
            message: "You have 5 messages. Check it!"

        }, {
            type: type[color],
            timer: 8000,
            placement: {
                from: from,
                align: align
            }
        });
    }
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

function formatDateNTime(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    var date = [year, month, day].join('-');

    var hours = d.getHours();
    var minutes = d.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return date + " " + strTime;
}