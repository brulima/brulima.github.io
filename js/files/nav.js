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