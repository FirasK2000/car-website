const container = document.getElementById("container");
document.getElementById("signUp").onclick = () =>
  container.classList.add("right-panel-active");

document.getElementById("signIn").onclick = () =>
  container.classList.remove("right-panel-active");