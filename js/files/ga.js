(function googleAnalytics () {
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

        ga('set', 'dimension1', 'Não Rejeitado');
        bounce = false;

        if (typeof localStorage === 'object') {
            localStorage.bounce = false;
        }
    };

    var loadGoogleAnalytics = function () {
        var win = window;
        var gaFunction = function (){
            win.ga.q = win.ga.q || [];
            win.ga.q.push(arguments);
        };

        win.GoogleAnalyticsObject = 'ga';
        win.ga = win.ga || gaFunction;
        win.ga.l = 1 * new Date();

        var script = doc.createElement('script');

        script.async = 1;
        script.src = '//www.google-analytics.com/analytics.js';

        doc.body.appendChild(script);

        trackElements();
    };

    var fireEvent = function (cat, act) {
        ga('send', 'event', cat, act, 'Clique');
    };

    var trackElements = function () {
        ga('create', 'UA-50934024-1', 'brulima.github.io');
        ga('require', 'displayfeatures');
        ga('set', 'dimension1', 'Rejeitado');
        ga('send', 'pageview');

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
    var bounce = isBounce();
    var links = doc.getElementsByTagName('a');

    if (!isDebug(doc.location.search)) {
        loadGoogleAnalytics();
    }
})();