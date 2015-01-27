(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-50934024-1', 'brulima.github.io');
ga('require', 'displayfeatures');
ga('send', 'pageview');
ga('set', 'dimension1', 'Rejeitado');

var now = new Date(),
  	bounce = document.cookie.indexOf('bounce=false') >= 0 ? false : true,
  	as = document.getElementsByTagName('a'), 
  	notBounce = function(){
  		document.cookie = 'bounce=false;expires=' + now.toGMTString() + ';path=/';
  		ga('set', 'dimension1', 'Não Rejeitado');
  		bounce = false;
  	};
  	now.setTime(now.getTime() + 24*60*60*1000*30);

for (var i = as.length - 1; i >= 0; i--) {
	as[i].addEventListener("mousedown", function(){
		ga('send', 'event', this.title.split("|")[0], this.title.split("|")[0], 'Clique');
		notBounce();
	});
}

document.getElementById("email").addEventListener("mousedown", function(){
	ga('send', 'event', 'Contato', 'Email', 'Clique');
	notBounce();
})

setTimeout(function(){
  	document.cookie = 'bounce=false;expires='+ now.toGMTString() + ';path=/';
  	notBounce();
}, 6000);