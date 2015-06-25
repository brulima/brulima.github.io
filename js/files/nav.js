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

        setTimeout(function setTimeOutChangeSection () {
            oldContent.classList.remove('fadeOutUp');
            oldContent.classList.add('hidden-element');

            newContent.classList.remove('hidden-element');
            newContent.classList.add('fadeInUp');

            setTimeout(function setTimeOutremoveFadeInClassFromNewSecion() {
                newContent.classList.remove('fadeInUp');
            }, 1000);

        }, 1000);
    };

    var setContentPage = function () {
        for (var el in topElements) {
            if (topElements.hasOwnProperty(el)) {
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

                container.appendChild(element);
            }
        }
    };

    var fireSectionChange = function (event) {
        var target = event.target;
        var newContent = target.getAttribute('data-menu');

        sectionChange(activeContent, newContent);
    };

    for (var i = 0; i < menuItens.length; i++) {
        var menuItem = menuItens[i];
        menuItem.addEventListener('click', fireSectionChange);
    }

    setTimeout(function setTimeOutRemoveFadeInClassFromHeader() {
        var header = doc.getElementById('header-section');
        header.classList.remove('fadeInUp');
    }, 2000);

})();