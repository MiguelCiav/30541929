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
    document.getElementsByClassName("copyright")[0].innerHTML = config["copyRight"];
    document.getElementsByClassName("greeting")[0].innerHTML = config["saludo"] + ", Miguel Ciavato";
  }
}
function loadPersons() {
  for (perfil of perfiles) {
    let profile = document.createElement("li");
    let profileName = document.createElement("a");
    let profileImg = document.createElement("img");
    profileName.href = `perfil.html?ci=${perfil["ci"]}`
    profileName.innerHTML = `${perfil["nombre"]}`;
    profileImg.setAttribute("src", `${perfil["imagen"]}`);
    profile.appendChild(profileImg);
    profile.appendChild(profileName);
    document.getElementById("persons-list").appendChild(profile);
  }
}
window.onload = function () {
  loadConfig();
  loadPersons();
};
