(function () {
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
        (function(i,s,o,g,r,a,m){i.GoogleAnalyticsObject=r;i[r]=i[r]||function(){
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
(function nav () {
    var doc = document;
    var menu = doc.getElementById('menu-header');
    var name = doc.getElementById('name');
    var content = doc.getElementById('content');
    var menuItens = doc.getElementsByClassName('menu-item');
    var activeContent = 'header-section';
    var firstClick = true;
    var topElements = {
        'menu': menu,
        'name': name
    };

    var sectionChange = function(oldContent, newContent) {
        if (oldContent === newContent) {
            return;
        }

        if (firstClick) {
            setContentPage();
            firstClick = false;
        }

        if (newContent === 'header-section' && !firstClick) {
            setFirstPage();
            firstClick = true;
        }

        activeContent = newContent;

        newContent = doc.getElementById(newContent);
        oldContent = doc.getElementById(oldContent);

        oldContent.classList.add('fadeOutUp');

        setTimeout(function () {
            oldContent.classList.remove('fadeOutUp');
            oldContent.classList.add('hidden-element');

            newContent.classList.remove('hidden-element');
            newContent.classList.add('fadeInUp');

            setTimeout(function () {
                newContent.classList.remove('fadeInUp');
            }, 1000);

        }, 1000);
    };

    var setContentPage = function () {
        for (var el in topElements) {
            if (topElements.hasOwnProperty(el)) {
                var container = doc.getElementById(el + '-container');
                var element = topElements[el];

                element.classList.add('fadeInUp');
                element.classList.add('top-' + el);
                content.appendChild(element);
            }
        }
    };

    var setFirstPage = function () {
        for (var el in topElements) {
            if (topElements.hasOwnProperty(el)) {
                var container = doc.getElementById(el + '-container');
                var element = topElements[el];

                element.classList.remove('fadeInUp');
                element.classList.remove('top-' + el);

                content.removeChild(element);
                container.appendChild(element);
            }
        }
    };

    for (var i = 0; i < menuItens.length; i++) {
        var menuItem = menuItens[i];

        menuItem.addEventListener('click', function() {
            var newContent = this.getAttribute('data-menu');

            sectionChange(activeContent, newContent);
        });
    }

    setTimeout(function () {
        var header = doc.getElementById('header-section');
        header.classList.remove('fadeInUp');
    }, 2000);

})();