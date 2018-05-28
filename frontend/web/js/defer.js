function loadScript(url, completeCallback) {
    var script = document.createElement('script'), done = false,
        head = document.getElementsByTagName("head")[0];
    script.src = url;
    script.onload = script.onreadystatechange = function(){
        if ( !done && (!this.readyState ||
            this.readyState == "loaded" || this.readyState == "complete") ) {
            done = true;
            completeCallback();

            // IE memory leak
            script.onload = script.onreadystatechange = null;
            head.removeChild( script );
        }
    };
    head.appendChild(script);
}





loadScript("/js/jquery-3.2.1.min.js?v=" + defer.styleVersion,
    function(){
        loadScript("/js/" + defer.js + ".min.js?v=" + defer.styleVersion,
            function(){

            }
        );
    }
);




loadScript("https://www.google.com/recaptcha/api.js?hl=" + defer.language,
    function(){
        //alert('recaptcha has been loaded.');
    }
);




<!-- Facebook Widget -->
// (function (d, s, id) {
//     var js, fjs = d.getElementsByTagName(s)[0];
//     if (d.getElementById(id)) return;
//     js = d.createElement(s);
//     js.id = id;
//     js.src = '//connect.facebook.net/ru_RU/sdk.js#xfbml=1&version=v2.8';
//     fjs.parentNode.insertBefore(js, fjs);
// }(document, 'script', 'facebook-jssdk'));
<!-- End Facebook Widget -->





<!-- Global site tag (gtag.js) - Google Analytics -->
// loadScript("https://www.googletagmanager.com/gtag/js?id=UA-114932945-1",
//     function(){
//
//     }
// );
// window.dataLayer = window.dataLayer || [];
// function gtag() {
//     dataLayer.push(arguments);
// }
// gtag('js', new Date());
// gtag('config', 'UA-114932945-1');
<!-- End Google Analytics -->




<!-- Google Conversion -->
/* <![CDATA[ */
// var google_conversion_id = 814774925;
// var google_conversion_label = 'g7jgCMOMl38QjfXBhAM';
// var google_remarketing_only = false;
/* ]]> */
// loadScript("//www.googleadservices.com/pagead/conversion.js",
//     function(){
//
//     }
// );
<!-- End Google Conversion -->




<!-- Textback Notification -->
// loadScript("//unpkg.com/@textback/notification-widget@latest/build/index.js",
//     function(){
//
//     }
// );
<!-- End Textback Notification -->




<!-- Textback Widget -->
// var _tbEmbedArgs = _tbEmbedArgs || [];
// (function () {
//     var u =  'https://widget.textback.io/widget';
//     _tbEmbedArgs.push(['widgetId', '4da2da2f-f07f-4cc7-bcd7-eb6939941ce4']);
//     _tbEmbedArgs.push(['baseUrl', u]);
//     var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
//     g.type = 'text/javascript';
//     g.charset = 'utf-8';
//     g.defer = true;
//     g.async = true;
//     g.src = u + '/widget.js';
//     s.parentNode.insertBefore(g, s);
// })();
<!-- End Textback Widget -->




<!-- Facebook Pixel Code -->
// !function(f,b,e,v,n,t,s)
// {if(f.fbq)return;n=f.fbq = function () {
//     n.callMethod ?
//         n.callMethod.apply(n,arguments):n.queue.push(arguments)};
//     if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
//     n.queue=[];t=b.createElement(e);t.async=!0;
//     t.src=v;s=b.getElementsByTagName(e)[0];
//     s.parentNode.insertBefore(t,s)}(window, document,'script',
//     'https://connect.facebook.net/en_US/fbevents.js');
// fbq('init', '1504583793004472');
// fbq('track', 'PageView');
// fbq('track', 'Lead');
<!-- End Facebook Pixel Code -->