(function ga () {
    var isBounce = function () {
        if (typeof localStorage !== 'object' || !localStorage.bounce) {
            return true;
        }

        return false;
    };

    var notBounce = function(){
        if (!bounce) {
            return;
        }

        if (typeof localStorage === 'object') {
            localStorage.bounce = false;
        }

        ga('set', 'dimension1', 'Não Rejeitado');
        bounce = false;
    };

    var getNextMonth = function () {
        var now = new Date();
        now.setTime(now.getTime() + 24*60*60*1000*30);
        return now.toGMTString();
    };

    var loadGoogleAnalytics = function () {
        (function googleAnalyticsAutoExecutable(i,s,o,g,r,a,m){i.GoogleAnalyticsObject=r;i[r]=i[r]||function googleAnalyticsGAFunction(){
        (i[r].q=i[r].q||[]).push(arguments);};i[r].l=1*new Date();a=s.createElement(o);
        m=doc.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m);
        })(window,document,'script','http://www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-50934024-1', 'brulima.github.io');
        ga('require', 'displayfeatures');
        ga('set', 'dimension1', 'Rejeitado');
        ga('send', 'pageview');

        trackElements();
    };

    var fireEvent = function (cat, act) {
        ga('send', 'event', cat, act, 'Clique');
    };

    var trackElements = function () {
        for (var i = links.length - 1; i >= 0; i--) {
            links[i].addEventListener('mousedown', trackLink);
        }
    };

    var trackLink = function (event) {
        target = event.target;
        title = target.title;
        var fire = {
            'category': title.split('|')[0],
            'action':title.split('|')[1]
        };

        fireEvent(fire.category, fire.action);
        notBounce();
    };

    var isDebug = function (search) {
        return search.indexOf('debug') >= 0;
    };

    var doc = document;
    var nextMonth = getNextMonth();
    var bounce = isBounce();
    var links = doc.getElementsByTagName('a');

    if (!isDebug(doc.location.search)) {
        loadGoogleAnalytics();
    }
})();