(function () {
    var doc = document;
    var getElement = doc.getElementById;
    var getAll = doc.getAll;
    var nextMonth = getNextMonth();
    var bounce = isBounce();
    var links = getAll('a');

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
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','http://www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-50934024-1', 'brulima.github.io');
        ga('require', 'displayfeatures');
        ga('set', 'dimension1', 'Rejeitado');
        ga('send', 'pageview');

        trackElements();
    };

    var fireEvents = function (cat, act) {
        ga('send', 'event', cat, act, 'Clique');
    };

    var trackElements = function () {
        for (var i = links.length - 1; i >= 0; i--) {
            links[i].addEventListener('mousedown', function(){
                var fire = {
                    'category': this.title.split('|')[0],
                    'action':this.title.split('|')[1]
                };

                fireEvent(fire.category, fire.action);
                notBounce();
            });
        }
    };

    var isDebug = function (search) {
        return search.indexOf('debug') >= 0;
    };

    if (!isDebug(doc.location.search)) {
        loadGoogleAnalytics();
    }
})();