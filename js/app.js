(function () {
	// Google Analytics Script
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','http://www.google-analytics.com/analytics.js','ga');

	ga('create', 'UA-50934024-1', 'brulima.github.io');
	ga('require', 'displayfeatures');
	ga('set', 'dimension1', 'Rejeitado');
	ga('send', 'pageview');

	var now = new Date(); now.setTime(now.getTime() + 24*60*60*1000*30);
	var bounce = document.cookie.indexOf('bounce=false') >= 0 ? false : true;

	var notBounce = function(){
		document.cookie = 'bounce=false;expires=' + now.toGMTString() + ';path=/';
		ga('set', 'dimension1', 'Não Rejeitado');
		bounce = false;
	};

	var links = document.getElementsByTagName('a');
	for (var i = links.length - 1; i >= 0; i--) {
		links[i].addEventListener("mousedown", function(){
			ga('send', 'event', this.title.split("|")[0], this.title.split("|")[1], 'Clique');
			notBounce();
		});
	}

	document.getElementById("email").addEventListener("mousedown", function(){
		ga('send', 'event', 'Contato', 'Email', 'Clique');
		notBounce();
	});

	setTimeout(function () {
		var header = document.getElementById("header-section");
		header.classList.remove("fadeInUp");
	}, 2000);

	var sectionChange = function(oldSection, newSection) {
		if (oldSection === newSection) {
			return;
		}

		if (firstClick) {
			setContentPage();
			firstClick = false;
		}

		if (newSection === "header" && !firstClick) {
			setFirstPage();
			firstClick = true;
		}

		actualActive = newSection;
		oldSection = oldSection + "-section";
		oldSection = document.getElementById(oldSection);
		oldSection.classList.add("fadeOutUp");

		newSection = newSection + "-section";
		newSection = document.getElementById(newSection);

		setTimeout(function () {
			oldSection.classList.remove("fadeOutUp");
			oldSection.classList.add("hidden-element");
			newSection.classList.remove("hidden-element");
			newSection.classList.add("fadeInUp");
			setTimeout(function () {
				newSection.classList.remove("fadeInUp");
			}, 1000);
		}, 1000);
	};

	var setContentPage = function () {
		for (var i = 0; i < topElements.length; i++) {
			topElements[i].classList.add('fadeInUp');
			topElements[i].classList.add('top-' + topElements[i].id.split('-')[0]);
			content.appendChild(topElements[i]);
		};
	};

	var setFirstPage = function () {
		for (var i = 0; i < topElements.length; i++) {
			var container = document.getElementById(topElements[i].id.split('-')[0] + '-container');
			topElements[i].classList.remove('fadeInUp');
			topElements[i].classList.remove('top-' + topElements[i].id.split('-')[0]);
			content.removeChild(topElements[i]);
			container.appendChild(topElements[i]);
		};
	};

	var menu = document.getElementById("menu-header");
	var name = document.getElementById("name");
	var content = document.getElementById("content");
	var topElements = [menu, name];
	var firstClick = true;
	var menuItens = document.getElementsByClassName("menu-item");
	var actualActive = "header";

	for (var i = 0; i < menuItens.length; i++) {
		var menuItem = menuItens[i];

		menuItem.addEventListener("click", function() {
			var newActive = this.getAttribute("data-menu");
			sectionChange(actualActive, newActive);

		});
	}

})();
