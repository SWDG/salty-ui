// +function($){var h=$.scrollTo=function(a,b,c){$(window).scrollTo(a,b,c)};h.defaults={axis:'xy',duration:parseFloat($.fn.jquery)>=1.3?0:1,limit:true};h.window=function(a){return $(window)._scrollable()};$.fn._scrollable=function(){return this.map(function(){var a=this,isWin=!a.nodeName||$.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!isWin)return a;var b=(a.contentWindow||a).document||a.ownerDocument||a;return/webkit/i.test(navigator.userAgent)||b.compatMode=='BackCompat'?b.body:b.documentElement})};$.fn.scrollTo=function(e,f,g){if(typeof f=='object'){g=f;f=0}if(typeof g=='function')g={onAfter:g};if(e=='max')e=9e9;g=$.extend({},h.defaults,g);f=f||g.duration;g.queue=g.queue&&g.axis.length>1;if(g.queue)f/=2;g.offset=both(g.offset);g.over=both(g.over);return this._scrollable().each(function(){if(e==null)return;var d=this,$elem=$(d),targ=e,toff,attr={},win=$elem.is('html,body');switch(typeof targ){case'number':case'string':if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}targ=$(targ,this);if(!targ.length)return;case'object':if(targ.is||targ.style)toff=(targ=$(targ)).offset()}$.each(g.axis.split(''),function(i,a){var b=a=='x'?'Left':'Top',pos=b.toLowerCase(),key='scroll'+b,old=d[key],max=h.max(d,a);if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);if(g.margin){attr[key]-=parseInt(targ.css('margin'+b))||0;attr[key]-=parseInt(targ.css('border'+b+'Width'))||0}attr[key]+=g.offset[pos]||0;if(g.over[pos])attr[key]+=targ[a=='x'?'width':'height']()*g.over[pos]}else{var c=targ[pos];attr[key]=c.slice&&c.slice(-1)=='%'?parseFloat(c)/100*max:c}if(g.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&g.queue){if(old!=attr[key])animate(g.onAfterFirst);delete attr[key]}});animate(g.onAfter);function animate(a){$elem.animate(attr,f,g.easing,a&&function(){a.call(this,targ,g)})}}).end()};h.max=function(a,b){var c=b=='x'?'Width':'Height',scroll='scroll'+c;if(!$(a).is('html,body'))return a[scroll]-$(a)[c.toLowerCase()]();var d='client'+c,html=a.ownerDocument.documentElement,body=a.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[d],body[d])};function both(a){return typeof a=='object'?a:{top:a,left:a}}}(jQuery);

+function($) {

  // DOCUMENT READY FUNCTIONS
  // ========================
  $(document).ready(function(){

    // SITE COLORS
    var colors = {
      white:     '#fff',
      black:     '#000',
      red:       '#d9534f',
      brightRed: 'rgb(255,0,0)',
      teal:      '#16a085'
    }

    // COLOR SCROLLBAR STYLES
    // ======================
    $("html").niceScroll(
      {
        styler:"fb",
        cursorcolor: colors.teal,
        cursorwidth: '6',
        cursorborderradius: '10px',
        background: '#404040',
        spacebarenabled:false,  
        cursorborder: '',
        zindex: '1000'
      }
    );

    $("#sidebar, .code-window > pre").niceScroll(
      {
        styler:"fb",
        cursorcolor: colors.teal,
        cursorwidth: '6',
        cursorborderradius: '10px',
        background: '#404040',
        spacebarenabled:false,  
        cursorborder: '',
        zindex: '1000'
      }
    );

    // SIDEBAR DROPDOWN MENU AUTO SCROLLING
    // ====================================

    $('#sidebar .sub-menu > a').click( function() {
        var o = ( $(this).offset() );
        diff  = 70 - o.top;
        if ( diff > 0 )
            $("#sidebar").scrollTo("-="+Math.abs(diff),500);
        else
            $("#sidebar").scrollTo("+="+Math.abs(diff),500);
    });

    // LEFT SIDEBAR FUNCTION
    $(function() {

      var wSize              = $(window).width()
            , el_toggle_nav  = $('.sidebar-toggle-box')
            , el_cont        = $('#container')
            , el_main_cont   = $('#main-content')
            , el_sb          = $('#sidebar')
            , el_sb_ul       = $('#sidebar > ul');

      // RESPONSIVE LEFT SIDEBAR
      // =======================    
      function sidebarResponsive() {
        
        if (wSize <= 768 || (wSize > 768 && el_cont.hasClass('sidebar-closed'))) {
          el_main_cont.css({
            'margin-left': '0px'
          });
          el_sb.css({
              'margin-left': '-210px'
          });
          el_cont.addClass('sidebar-closed');
          el_sb_ul.hide();
        }

        if (wSize > 768 && !el_cont.hasClass('sidebar-closed')) {
          el_main_cont.css({
            'margin-left': '210px'
          });
          el_sb_ul.show();
          el_sb.css({
            'margin-left': '0'
          });
          el_cont.removeClass('sidebar-closed');
          el_sb_ul.show();
        }
      }
      $(window).on('load resize', sidebarResponsive);
  
  
      // SIDEBAR TOGGLE
      // ==============
      function sidebarToggle() {
        
      if (el_sb_ul.is(":visible") === true) {
          el_main_cont.css({
              'margin-left': '-1px'
          });
          el_sb.css({
              'margin-left': '-210px'
          });
          el_sb_ul.hide();
          el_cont.addClass("sidebar-closed");
        } else {
          el_main_cont.css({
              'margin-left': '210px'
          });
          el_sb_ul.show();
          el_sb.css({
              'margin-left': '-1px'
          });
          el_cont.removeClass("sidebar-closed");
        }
      };
      el_toggle_nav.on('click', sidebarToggle);
    });

    $('.tooltips').tooltip();
    $('.popovers').popover();

    $('#nav-accordion').dcAccordion({
        eventType: 'click',
        autoClose: true,
        saveState: true,
        disableLink: true,
        speed: 'slow',
        showCount: false,
        autoExpand: true,
        classExpand: 'dcjq-current-parent'
    });

  });  // DOCUMENT READY FUNCTION

  // Init clipboard and variables
  var client    = new ZeroClipboard( $("#copy-button") )
    , aftr_copy = $(".after-copy")
    , _button   = $(".copy")
    , _btnClass;

  // find all elements and loop through
  _button.mouseenter(function(){
    _button.each(function(){
      _btnClass = _button.hasClass('popovers');
    });
  });

  // add popovers class to button if not present 
  switch ( _btnClass == true ) {
    case true:
      break;
    case false:
      _button.addClass('popovers');
      break;
    default:
      throw new Error('_btnClass has encountered an error adding class - popovers -');
  };

  // Dynamically add popover data attributes to each button
  _button.attr({
    "data-original-title":  "Click To Copy",
    "data-placement":       "bottom",
    "data-content":         "Copy the code to your clipboard to easily paste in your own project.",
    "data-trigger":         "hover"
  });

  // Show/hide confirmation text on copy success
  client.on( "ready", function( readyEvent ) {
    client.on( "aftercopy", function( event ) {
      aftr_copy.text('Code Was Copied!');
      aftr_copy.delay(3000).fadeOut(500);
    });
  });

  // FadeIn confirmation text if copy funct. 
  // is clicked multiple times
  _button.on('click', function() {
    aftr_copy.fadeIn(500);
  });


  // scroll to page section on click
  // corrects the height with the fixed slider-menu
  $( '.navbar-slider header a:last, .go-top' ).on('click', function( event ) {
    // Prevent button clicks from causing screen to flicker
    event.preventDefault();
    var el      = $( this ).attr( 'href' )
      , el_pos  = $( el ).offset().top
      , win_pos = $( window ).scrollTop()
      , o       = $( el ).offset().top - win_pos - $( ".thriii__landing--nav" ).innerHeight()
      , current = window.location.hash
      , el_scroll_to;

      // Fix the scroll height to accommodate
      // for the height of the navbars
      el_scroll_to = el_pos - 100;

      // Scroll smoothly to the correct element
      $( 'html, body' ).animate({
          scrollTop: el_scroll_to
        }, 800
      )
  }) //  END scroll to section on click

}( jQuery );