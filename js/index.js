function loadConfig() {
    document.title = config["sitio"].join('');
    document.getElementsByClassName("copyright")[0].innerHTML = config["copyRight"];
    document.getElementsByClassName("greeting")[0].innerHTML = config["saludo"] + ", Miguel Ciavato";
}
function loadPersons() {
  for (perfil of perfiles) {
    let profile = document.createElement("li");
    let profileName = document.createElement("a");
    let profileImg = document.createElement("img");
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
}