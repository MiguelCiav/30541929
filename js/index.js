function loadConfig() {
    document.title = config["sitio"].join('');
    document.getElementsByClassName("copyright")[0].innerHTML = config["copyRight"];
    document.getElementsByClassName("greeting")[0].innerHTML = config["saludo"] + ", Miguel Ciavato";
}
window.onload = loadConfig