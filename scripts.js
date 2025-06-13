let config;

function loadFirstConfig() {
  const urlParams = new URLSearchParams(window.location.search);
  const configElement = document.createElement("script");
  let lang = urlParams.get("lang");
  let url;
  
  configElement.type = "text/javascript";

  if (lang === "ES" || lang === "EN" || lang === "PT") {
    url = `/ATI/api/conf/config${lang}.json`
  } else {
    url = `/ATI/api/conf/configES.json`
  }

  fetch(url)
    .then(response => response.json())
    .then(data => {
        config = data;
        document.title = data["sitio"].join("");
        document.getElementById("logo-1").innerHTML = data["sitio"][0];
        document.getElementById("logo-2").innerHTML = data["sitio"][2];
        document.getElementsByClassName("copyright")[0].innerHTML = data["copyRight"];
        document.getElementsByClassName("greeting")[0].innerHTML = data["saludo"] + ", Miguel Ciavato";
        document.getElementById("search-button").innerHTML = data["buscar"];
    });
}

function loadProfile(CI, profileName) {
  return function() {
    const persons_list = document.getElementById("persons-list");
    const profile = document.getElementById("profile");
    const search_input = document.getElementById("search-input");
    const search_button = document.getElementById("search-button");
    let img_url;

    persons_list.setAttribute("style", "display: none;");
    search_input.setAttribute("style", "display: none;");
    search_button.setAttribute("style", "display: none;");
    profile.setAttribute("style", "display: flex;");

    fetch(`/ATI/api/index.json`)
      .then(response => response.json())
      .then(perfiles => {
        const perfil = perfiles.find(p => p["ci"] === CI);
        img_url = perfil["imagen"];
      })
      .then(() => {
        fetch(`/ATI/api/${CI}/perfil.json`)
          .then(response => response.json())
          .then(perfil => { 
            let email_tag = null;
            let email_text = null;
            
            document.getElementById("student-img").src = `/ATI/api/${img_url}`;
            document.getElementById("student-name").innerHTML = perfil["nombre"];
            document.getElementById("student-description").innerHTML = perfil["descripcion"];
            
            email_tag = `<a id="student-email" class="mail-link" href="mailto:${perfil["email"]}">${perfil["email"]}</a>`
            email_text = config["email"];
            email_text = email_text.replace("[email]", email_tag);
            document.getElementById("email-text").innerHTML = email_text;

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
          })
          .catch(error => {
            console.error("Error al cargar el perfil:", error);
          });
      })
      .catch(error => {
        console.error("Error al cargar imagen del perfil:", error);
      }
    );
    profileName.setAttribute("style", "color: rgb(43, 64, 104)");
  }
}

function loadPersons(lista_perfiles) {
  const persons_list = document.getElementById("persons-list");
  
  while (persons_list.firstChild) {
    persons_list.removeChild(persons_list.firstChild);
  }
  
  for (perfil of lista_perfiles) {
    let profile = document.createElement("li");
    let profileName = document.createElement("a");
    let profileImg = document.createElement("img");
    profileName.onclick = loadProfile(perfil["ci"], profileName);
    profileName.innerHTML = `${perfil["nombre"]}`;
    profileImg.setAttribute("src", `/ATI/api/${perfil["imagen"]}`);
    profile.appendChild(profileImg);
    profile.appendChild(profileName);
    persons_list.appendChild(profile);
  }
}

function add_search(profiles) {
  const search_button = document.getElementById("search-button");
  const search_input = document.getElementById("search-input");
  let search_list = [];

  search_button.onclick = function() {
      console.log("click");
      
      if(search_input.value === "") {
          loadPersons(profiles);
          return;
      }
      for (perfil of profiles) {
        if(perfil["nombre"].toLowerCase().includes(search_input.value.toLowerCase())) {
          search_list.push(perfil);
        }
      }
      if(search_list.length === 0) {
          document.getElementById("persons-list").innerHTML = `<p id="no-found-msg">No hay alumnos que tengan en su nombre: ${search_input.value} </p>`;
          return;
      }
      loadPersons(search_list);
      search_list = [];
  }
}

function loadHome() {
  const persons_list = document.getElementById("persons-list");
  const profile = document.getElementById("profile");
  const search_input = document.getElementById("search-input");
  const search_button = document.getElementById("search-button");

  persons_list.setAttribute("style", "display: grid;");
  search_input.setAttribute("style", "display: inline;");
  search_button.setAttribute("style", "display: inline;");
  profile.setAttribute("style", "display: none;");
}

loadFirstConfig();

fetch("/ATI/api/index.json")
    .then(response => response.json())
    .then(profiles => {
        loadPersons(profiles);
        add_search(profiles);
    })

const logo = document.getElementById("logo");
logo.onclick = loadHome

const profile = document.getElementById("profile");
profile.setAttribute("style", "display: none;");