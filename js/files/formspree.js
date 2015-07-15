(function formspree() {
	var doc = document;
	var getElement = function (id) {
		return doc.getElementById(id);
	};

	getElement("name-contact-form").addEventListener("change", function() {
		getElement("subject-contact-form").setAttribute("value", "[Contato Portfólio] " + this.value);
	});
})();