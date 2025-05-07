const urlParams = new URLSearchParams(window.location.search);

function loadConfig() {
  let lang = urlParams.get("lang");
  const configElement = document.createElement("script");
  configElement.type = "text/javascript";

  if (lang !== null) {
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
    document.title = config["sitio"].join("");
    document.getElementById("logo-1").innerHTML = config["sitio"][0];
    document.getElementById("logo-2").innerHTML = config["sitio"][2];
    document.getElementsByClassName("copyright")[0].innerHTML = config["copyRight"];
    document.getElementsByClassName("greeting")[0].innerHTML = config["saludo"] + ", Miguel Ciavato";
    document.getElementById("search-button").innerHTML = config["buscar"];
  }
}

function loadPersons(lista_perfiles=perfiles) {
  const persons_list = document.getElementById("persons-list");
  // delete all children
  while (persons_list.firstChild) {
    persons_list.removeChild(persons_list.firstChild);
  }
  // add all profiles
  for (perfil of lista_perfiles) {
    let profile = document.createElement("li");
    let profileName = document.createElement("a");
    let profileImg = document.createElement("img");
    profileName.href = `perfil.html?ci=${perfil["ci"]}`
    profileName.innerHTML = `${perfil["nombre"]}`;
    profileImg.setAttribute("src", `${perfil["imagen"]}`);
    profile.appendChild(profileImg);
    profile.appendChild(profileName);
    persons_list.appendChild(profile);
  }
}

function add_search() {
  const search_button = document.getElementById("search-button");
  const search_input = document.getElementById("search-input");
  let search_list = [];

  search_button.onclick = function() {
      console.log("click");
      
      if(search_input.value === "") {
          loadPersons();
          return;
      }
      for (perfil of perfiles) {
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

window.onload = function () {
  loadConfig();
  loadPersons();
  add_search();
};
