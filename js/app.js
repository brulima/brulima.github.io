(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-50934024-1', 'brulima.github.io');
ga('require', 'displayfeatures');
ga('send', 'pageview');

var as = document.getElementsByTagName('a');
for (var i = as.length - 1; i >= 0; i--) {
	as[i].addEventListener("mousedown", function(){
		ga('send', 'event', 'Portfólio', this.title, 'Clique');
	});
}