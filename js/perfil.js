window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const ci = urlParams.get('ci');
    const lang = urlParams.get('lang');
    let perfil_index = null;
    let perfilJSON = null;

    if(ci !== null) {
        perfil_index = perfiles.find(p => p.ci === ci);
        console.log(perfil_index);
        perfilJSON = document.createElement("script");
        perfilJSON.src = `${perfil_index["ci"]}/perfil.json`;
        perfilJSON.type = "text/javascript";
        document.head.insertBefore(perfilJSON, document.head.firstChild);
    }

    perfilJSON.onload = function() {
        document.getElementById("student-name").innerHTML = perfil["nombre"];
        document.getElementById("student-img").src = perfil_index["imagen"];
        document.getElementById("student-description").innerHTML = perfil["descripcion"];
        document.getElementById("student-email").innerHTML = perfil["email"];
        document.getElementById("student-color-r").innerHTML = perfil["color"];
        document.getElementById("student-book-r").innerHTML = perfil["libro"];
        document.getElementById("student-music-r").innerHTML = perfil["musica"];
        document.getElementById("student-game-r").innerHTML = perfil["video_juego"];
        document.getElementById("student-lang-r").innerHTML = perfil["lenguajes"];
    }
}