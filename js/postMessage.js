(function () {
    var sendPostMessage = function () {
        var message = document.getElementById("txt-message").value;
        var parent = window.parent

        parent.postMessage(message, "*");
    };

    var receiveMessage = function (event) {
        if (event.origin !== "https://brulima-gauge.github.io") return;
        var divReceive = document.getElementById("div-received-messages");
        var conteudoNovo = document.createTextNode(event.data); 
        var p = document.createElement("p");
        p.appendChild(conteudoNovo);
        divReceive.appendChild(p);
    };

    var btn = document.getElementById("btn-send");
    btn.addEventListener("click", sendPostMessage);

    window.addEventListener("message", receiveMessage, false);
})();