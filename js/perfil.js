const urlParams = new URLSearchParams(window.location.search);

function load_profile() {
    const ci = urlParams.get('ci');
    let perfil_index = null;
    let perfilJSON = null;
    perfil_index = perfiles.find(p => p.ci === ci);

    if(perfil_index !== undefined) {
        perfilJSON = document.createElement("script");
        perfilJSON.src = `${perfil_index["ci"]}/perfil.json`;
        perfilJSON.type = "text/javascript";
        document.head.insertBefore(perfilJSON, document.head.firstChild);

        perfilJSON.onload = function() {
            document.getElementById("student-img").src = perfil_index["imagen"];
            document.getElementById("student-name").innerHTML = perfil["nombre"];
            document.getElementById("student-description").innerHTML = perfil["descripcion"];
            document.getElementById("student-email").innerHTML = perfil["email"];
            document.getElementById("student-email").href = `mailto:${perfil["email"]}`;

            document.getElementById("student-color").innerHTML = config["color"] + ":";
            document.getElementById("student-color-r").innerHTML = perfil["color"];

            document.getElementById("student-book").innerHTML = config["libro"] + ":";
            document.getElementById("student-book-r").innerHTML = perfil["libro"];
            
            document.getElementById("student-music").innerHTML = config["musica"] + ":";
            document.getElementById("student-music-r").innerHTML = perfil["musica"];

            document.getElementById("student-game").innerHTML = config["video_juego"] + ":";
            document.getElementById("student-game-r").innerHTML = perfil["video_juego"];

            document.getElementById("student-lang").innerHTML = config["lenguajes"] + ":";
            document.getElementById("student-lang-r").innerHTML = perfil["lenguajes"];
        }
    } else {
        document.getElementById("student-name").innerHTML = "No se ha encontrado el perfil";
    }
}

window.onload = function () {
    let lang = urlParams.get('lang');
    const configElement = document.createElement("script");
    configElement.type = "text/javascript";

    if(lang !== null) {
        lang = lang.toLowerCase();
    }

    switch (lang) {
        case "es":
            configElement.src = "conf/configES.json";
            break;
        case "en":
            configElement.src = "conf/configEN.json";
            break;
        case "pt":
            configElement.src = "conf/configPT.json";
            break;
        default:
            configElement.src = "conf/configES.json";
    }

    document.head.insertBefore(configElement, document.head.firstChild);

    configElement.onload = function () {
        load_profile();
    }
}