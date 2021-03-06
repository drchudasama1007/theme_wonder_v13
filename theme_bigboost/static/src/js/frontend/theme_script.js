odoo.define('theme_bigboost.theme_script', function(require) {
    'use strict';

    var sAnimations = require('website.content.snippets.animation');
    var publicWidget = require('web.public.widget');
    var Widget = require('web.Widget');
    var core = require('web.core');
    var _t = core._t
    var ajax = require('web.ajax');
    var config = require('web.config');


    sAnimations.registry.themeSearch = sAnimations.Class.extend({
        selector: '#wrapwrap',
        read_events: {
            'click .te_srch_icon': '_onSearchClickOpen',
            'click .te_srch_close': '_onSearchClickClose',
        },
        start: function() {
            if ($(window).innerWidth() > 1200) {
                $("#top_menu > .dropdown").each(function() {
                    $(this).find("a.o_mega_menu_toggle").click(function() {
                        if(!$('.editor_enable').length == 1){
                            var get_href = $(this).attr('href');
                            document.location.href = get_href;
                            $(this).removeAttr('aria-expanded');
                            return false;
                        }
                    });
                    if (!$(this).closest(".o_extra_menu_items").length) {
                        $(this).closest("a").click(function() {
                            return false;
                        });
                        $(this).hover(function() {
                            $(this).toggleClass('open');
                            $(this).find(".dropdown-menu").toggleClass('te_mega_animation');
                            $(this).removeClass('show');
                            $(this).find('.dropdown-menu').removeClass('show');
                        }, function() {
                            $(this).toggleClass('open');
                            $(this).find(".dropdown-menu").toggleClass('te_mega_animation');
                            $(this).removeClass('show');
                            $(this).find('.dropdown-menu').removeClass('show');
                        });
                    }
                });
            }
            $('.variant_attribute  .list-inline-item').find('.active').parent().addClass('active_li');
            $( ".list-inline-item .css_attribute_color" ).change(function(ev) {
                var $parent = $(ev.target).closest('.js_product');
                $parent.find('.css_attribute_color').parent('.list-inline-item').removeClass("active_li");
                $parent.find('.css_attribute_color').filter(':has(input:checked)').parent('.list-inline-item').addClass("active_li");
            });

        },
        _onSearchClickOpen: function(ev) {
            var self = ev.currentTarget;
            //style1
            if ($(".te_header_1_right").length) {
                $(".te_search_popover").addClass("visible");
                $(self).hide();
                $(".te_srch_close").show();
                setTimeout(function(){
                    $('input[name="search"]').focus();
                }, 500);
            }
            //style 2 3 and 4 resp view
            if ($(window).width() < 768) {
                if ($(".te_header_style_2_right").length || $(".te_header_3_search").length || $(".te_header_style_4_inner_first").length) {
                    $(".te_search_popover").addClass("visible");
                    $(self).hide();
                    $(".te_srch_close").show();
                    setTimeout(function(){
                        $('input[name="search"]').focus();
                    }, 500);
                }
            }
            //style5
            if ($(".te_header_5_search").length) {
                $(".te_search_5_form").addClass("open_search");
                var $h_menu = $("#oe_main_menu_navbar").height();
                $(".te_search_5_form").css({
                    top: $h_menu + 0
                });
                setTimeout(function(){
                    $('input[name="search"]').focus();
                }, 500);
            }
            //style6
            if ($(".te_header_6_srch_icon").length) {
                $(".te_header_before_right").addClass("search_animate");
                if ($(window).width() < 768) {
                    $(".te_header_before_left").addClass("search_animate");
                }
                $(".te_header_search input").css("width","100%");
                setTimeout(function(){
                    if ($(window).width() > 768) {
                        $(".te_header_before_right").hide();
                    }else{
                        $(".te_header_before_right").hide();
                        $(".te_header_before_left").hide();
                    }
                    $(".te_header_search").show();
                    $('input[name="search"]').focus();
                }, 500);
            }
            //style7
            if ($(".te_searchform__popup").length) {
                $(".te_searchform__popup").addClass("open");
                $(".te_srch_close").show();
                setTimeout(function(){
                    $('input[name="search"]').focus();
                }, 500);
            }
        },
        _onSearchClickClose: function(ev) {
            var self = ev.currentTarget;
            //style1
            if ($(".te_header_1_right").length) {
                $(".te_search_popover").removeClass("visible");
                $(self).hide();
                $(".te_srch_icon").show();
            }
            //style 2 and 3 resp view
            if ($(window).width() < 768) {
                if ($(".te_header_style_2_right").length || $(".te_header_3_search").length || $(".te_header_style_4_inner_first").length) {
                    $(".te_search_popover").removeClass("visible");
                    $(self).hide();
                    $(".te_srch_icon").show();
                }
            }
            //style5
            if ($(".te_header_5_search").length) {
                $(".te_search_5_form").removeClass("open_search");
                $(".te_search_icon_5").css("display", "inline-block");
            }
            //style6
            if ($(".te_header_6_srch_icon").length) {
                $(".te_header_before_left, .te_header_before_right").removeClass("search_animate").show();
                $(".te_header_search").hide();
                $(".te_header_search input").css("width", "0%");
                $(".te_srch_icon").css("display", "inline-block")
            }
            //style7
            if ($(".te_searchform__popup").length) {
                $(".te_searchform__popup").removeClass("open");
                $(".te_srch_icon").show();
            }
        },
    });

    //------------------------------------------
    // 02. Page Scroll up
    //------------------------------------------
    sAnimations.registry.themeLayout = sAnimations.Class.extend({
        selector: '.o_footer',
        read_events: {
            'click .scrollup-div': '_onClickAnimate',
        },
        _onClickAnimate: function(ev) {
            $("html, body").animate({
                scrollTop: 0
            }, 1000);
        },
    });





        $(document).ready(function($) {
        $(document).on('click',".quick_close",function(ev) {
            $('.modal-backdrop').remove();
            setTimeout(function () {
                $('body').css("padding-right","0");
            },500);
        });
        $(document).mouseup(function(ev)
		{
		    var container = $(".quick_view_modal");
		    if (!container.is(ev.target) && container.has(ev.target).length === 0)
		    {
		        if($('#quick_view_model_shop').hasClass("show"))
		        {
                    $('.modal-backdrop').remove();
                    setTimeout(function () {
                        $('body').css("padding-right","0");
                    },500);
                }
		    }
		});
        if($(document).find('.te_recently_viewed'))
        {
            var r_name = $("#te_rect_cnt").text();
            $('.te_recently_viewed').find('h6').each(function(){

                $(document).find('h6.card-title').addClass("te_rect_name")
                if(r_name == 2)
                {
                    $('h6.card-title').addClass('te_2_line');
                }
                if(r_name == 3)
                {
                    $('h6.card-title').addClass('te_3_line');
                }
            });
        }
        //extra menu dropdown
        $('.o_extra_menu_items .dropdown-menu').css("display", "none")
        $('li.o_extra_menu_items .dropdown').click(function(event) {
            event.stopImmediatePropagation();
            $(this).find(".dropdown-menu").slideToggle();
        });
        //Header top when transparent header
        var header_before_height = $(".te_header_before_overlay").outerHeight();
        if ($("body").find(".o_header_overlay").length > 0) {
            $("header:not(.o_header_affix)").addClass("transparent_top")
            $(".transparent_top").css("top", header_before_height);
            $(".o_header_affix.affix").removeClass("transparent_top")
        }
        //Category mega menu
        $("#custom_menu li").each(function() {
            var has_ctg = $(this).find("ul.t_custom_subctg").length > 0
            if (has_ctg) {
                $(this).append("<span class='ctg_arrow fa fa-angle-right' />")
                $(".ctg_arrow").click(function(ev) {
                    ev.preventDefault();
                    ev.stopPropagation();
                    var self = $(this).siblings("ul.t_custom_subctg");
                    var ul_index = $(self).parents("ul").length;
                    $(self).stop().animate({
                        width: "100%"
                    });
                    $(self).css({
                        "display": "block",
                        "transition": "0.3s easeout",
                        "z-index": ul_index
                    })
                    $(self).parent().parent(".t_custom_subctg").css("overflow-y", "hidden");
                    $(self).parent().parent(".t_custom_subctg").scrollTop(0);
                    $(this).parents("#custom_menu").scrollTop(0);
                    $(this).parents("#custom_menu").css("overflow-y", "hidden");
                })
                $(this).find("ul.t_custom_subctg").children(".te_prent_ctg_heading").click(function(ev) {
                    ev.preventDefault();
                    ev.stopPropagation();
                    $(this).parent("ul#custom_recursive").stop().animate({
                        width: "0"
                    }, function() {
                        $(this).css("display", "none")
                        $(this).parent().parent(".t_custom_subctg").css("overflow-y", "auto");
                    });
                })
            }
        })
        $("#custom_menu > li > ul.t_custom_subctg > .te_prent_ctg_heading").click(function() {
            $(this).parents("#custom_menu").css("overflow-y", "auto");
        })
        //Changed search form action in theme's search when website search is installed
        if ($("body").find(".website_search_form_main").length > 0) {
            $(".te_header_search,.te_searchform__popup").each(function() {
                $(this).find("form").attr("action", "/search-result");
            })
            $(".website_search_form_main").html("");
        }
        //Recently viewed title
        if ($('#carousel_recently_view .carousel-inner .img_hover').length >= 1) {
            $('.te_product_recent_h2').css('display', 'block')
        }
        //expertise progress bar
        $('.progress').each(function() {
            var area_val = $(this).find('.progress-bar').attr("aria-valuenow")
            $(this).find('.progress-bar').css("max-width", area_val + "%")
        })
        //Remove images in extra menu
        $("li.o_extra_menu_items").find("img").removeAttr("src alt");

    // if slider then active first slide
    if ($('.recommended_product_slider_main').length) {
        $(".theme_carousel_common").each(function() {
            $(this).find(".carousel-item").first().addClass("active");
        })
    }
    // Change in carousel to display two slide
    $('.theme_carousel_common .carousel-item').each(function() {
        var next = $(this).next();
        if (!next.length) {
            next = $(this).siblings(':first');
        }
        next.children(':first-child').clone().appendTo($(this));
    });
    // quantity design in cart lines when promotion app installed
    $(".te_cart_table .css_quantity > span").siblings("div").css("display", "none")
    // Portal script
    if ($('div').hasClass('o_portal_my_home')) {
        if (!$('a').hasClass('list-group-item')) {
            $(".page-header").css({
                'display': 'none'
            })
        }
    }
    })


    $(window).on("orientationchange",function(){
      location.reload();
    });
});
