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
(function nav () {
    var doc = document;

    var getElement = function (id) {
        return doc.getElementById(id);
    };

    var getElements = function (className) {
        return doc.getElementsByClassName(className);
    };

    var menu = getElement('menu-header');
    var name = getElement('name');
    var content = getElement('content');
    var menuItens = getElements('menu-item');
    var activeContent = 'header-section';
    var firstClick = true;

    var topElements = {
        'menu': menu,
        'name': name
    };

    var isHeader = function (contentSection) {
        return (contentSection === 'header-section' && !firstClick);
    };

    var sectionChange = function(oldContent, newContent) {
        return compareEqualSection(oldContent, newContent);
    };

    var compareEqualSection = function (oldContent, newContent) {
        if (oldContent === newContent) {
            return;
        }

        return isFirstClick(oldContent, newContent);
    };

    var isFirstClick = function (oldContent, newContent) {
        if (firstClick) {
            forEachObject(topElements, setContentPage);
            return changeSection(oldContent, newContent);
        }

        return isHeaderClick(oldContent, newContent);
    };

    var isHeaderClick = function (oldContent, newContent) {
        if (isHeader(newContent)) {
            forEachObject(topElements, setFirstPage);
        }

        return changeSection(oldContent, newContent);
    };

    var changeSection = function (oldContent, newContent) {
        activeContent = newContent;

        newContent = getElement(newContent);
        oldContent = getElement(oldContent);

        addClass(oldContent, 'fadeOutUp');

        var setTimeOutremoveFadeInClassFromNewSecion = function () {
            removeFadeClass(newContent);
        };

        var setTimeOutChangeSection = function () {
            fadeOut(oldContent);
            fadeIn(newContent);

            setTimeout(setTimeOutremoveFadeInClassFromNewSecion, 1000);
        };

        setTimeout(setTimeOutChangeSection, 1000);
    };

    var fadeIn = function (element, topElement) {
        removeClass(element, 'hidden-element');
        addClass(element, 'fadeInUp');

        if (typeof topElement === "string") {
            addClass(element, 'top-' + topElement);
        }

        removeFadeClassCall(element);
    };

    var fadeOut = function (element, topElement) {
        addClass(element, 'fadeOutUp');
        addClass(element, 'hidden-element');

        removeFadeClassCall(element);
    };

    var removeFadeClassCall = function (element) {
        var passArgument = function () {
            removeFadeClass(element);
        };

        setTimeout(passArgument, 1000);
    };

    var removeFadeClass = function (element) {
        removeClass(element, 'fadeInUp');
        removeClass(element, 'fadeOutUp');
    };

    var setContentPage = function (topElements, el) {
        var element = topElements[el];
        firstClick = false;

        fadeIn(element, el);
        content.appendChild(element);
    };

    var setFirstPage = function (topElements, el) {
        var container = getElement(el + '-container');
        var element = topElements[el];
        firstClick = true;

        removeFadeClass(element);
        removeClass(element, 'top-' + el);

        container.appendChild(element);
    };

    var forEachObject = function (obj, fn) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                fn(obj, key);
            }
        }
    };

    var addClass = function (element, className) {
        element.classList.add(className);
    };

    var removeClass = function (element, className) {
        element.classList.remove(className);
    };

    var fireSectionChange = function (event) {
        var target = event.target;
        var newContent = target.getAttribute('data-menu');

        sectionChange(activeContent, newContent);
    };

    var setTimeOutRemoveFadeInClassFromHeader = function () {
        var header = getElement('header-section');
        removeFadeClass(header);
    };


    for (var i = 0; i < menuItens.length; i++) {
        var menuItem = menuItens[i];
        menuItem.addEventListener('click', fireSectionChange);
    }

    setTimeout(setTimeOutRemoveFadeInClassFromHeader, 1000);

})();
(function formspree() {
	var doc = document;
	var getElement = function (id) {
		return doc.getElementById(id);
	};

	getElement("name-contact-form").addEventListener("change", function() {
		getElement("subject-contact-form").setAttribute("value", "[Contato Portfólio] " + this.value);
	});
})();