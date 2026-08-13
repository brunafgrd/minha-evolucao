const arquivos = [
    "./",
    "./index.html",
    "./peso.html",
    "./medidas.html",
    "./fotos.html",
    "./perfil.html",
    "./style.css",
    "./java.js",
    "./manifest.json"
];


self.addEventListener("install", function(evento) {

    evento.waitUntil(

        caches.open("minha-evolucao-v1")

            .then(function(cache) {

                return cache.addAll(arquivos);

            })

    );

});


self.addEventListener("fetch", function(evento) {

    evento.respondWith(

        caches.match(evento.request)

            .then(function(resposta) {

                return resposta ||
                    fetch(evento.request);

            })

    );

});