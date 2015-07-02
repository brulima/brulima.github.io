(function googleAnalytics () {
    var isBounce = function () {
        if (!hasLocalStorage || !localStorage.bounce) {
            return true;
        }

        return false;
    };

    var fireNotBounce = function(){
        if (!bounce) {
            return;
        }

        ga('set', 'dimension1', 'Não Rejeitado');
        bounce = false;
        saveNotBounce();
    };

    var saveNotBounce = function () {
        if (hasLocalStorage) {
            localStorage.bounce = false;
        }
    };

    var hasLocalStorage = function () {
        return typeof localStorage !== 'object';
    };

    var loadGoogleAnalytics = function () {
        win.GoogleAnalyticsObject = 'ga';
        win.ga = win.ga || gaFunction;
        win.ga.l = 1 * new Date();

        loadGoogleAnalyticsScript();
    };

    var loadGoogleAnalyticsScript = function () {
        var script = doc.createElement('script');

        script.async = true;
        script.src = gaSrc;

        doc.body.appendChild(script);

        fireConfiguration();
    };

    var fireEvent = function (cat, act) {
        ga('send', 'event', cat, act, 'Clique');
        fireNotBounce();
    };

    var fireConfiguration = function () {
        ga('create', 'UA-50934024-1', 'brulima.github.io');
        ga('require', 'displayfeatures');
        ga('set', 'dimension1', 'Rejeitado');
        ga('send', 'pageview');

        trackElements();
    };

    var trackElements = function () {
        for (var i = 0; i < links.length; i++) {
            links[i].addEventListener('mousedown', trackLink);
        }
    };

    var trackLink = function (event) {
        var target = event.target;
        var eventParameters = getEventParameters(target);

        fireEvent(eventParameters.category, eventParameters.action);
    };

    var getEventParameters = function (target) {
        var title = target.title;

        return {
            'category': title.split('|')[0],
            'action':title.split('|')[1]
        };
    };

    var isDebug = function (search) {
        return search.indexOf('debug') >= 0;
    };

    var gaFunction = function (){
        win.ga.q = win.ga.q || [];
        win.ga.q.push(arguments);
    };

    var getElements = function (tagName) {
        return doc.getElementsByTagName(tagName);
    };

    var doc = document;
    var win = window;
    var bounce = isBounce();
    var links = getElements('a');
    var gaSrc = '//www.google-analytics.com/analytics.js';

    if (!isDebug(doc.location.search)) {
        loadGoogleAnalytics();
    }
})();