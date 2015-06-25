(function nav () {
    var getElement = document.getElementById;
    var getAll = document.getElementsByClassName;
    var menu = getElement('menu-header');
    var name = getElement('name');
    var content = getElement('content');
    var menuItens = getAll('menu-item');
    var activeContent = 'header';
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

        if (newContent === 'header' && !firstClick) {
            setFirstPage();
            firstClick = true;
        }

        activeContent = newContent;

        newContent = getElement(newContent);
        oldContent = getElement(oldContent);

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
        for (var i = 0; i < topElements.length; i++) {
            topElements[i].classList.add('fadeInUp');
            topElements[i].classList.add('top-' + topElements[i].id.split('-')[0]);
            content.appendChild(topElements[i]);
        }
    };

    var setFirstPage = function () {
        for (var el in topElements) {
            if (topElements.hasOwnProperty(el)) {
                var container = getElement(el + '-container');
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
        var header = getElement('header-section');
        header.classList.remove('fadeInUp');
    }, 2000);

})();