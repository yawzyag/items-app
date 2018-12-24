const open_menu = document.getElementById("open-slide-menu");
const close_menu = document.getElementById("close_menu");
// console.log(open_menu);
open_menu.addEventListener("click", () => {
  document.getElementById("side-menu").style.height = "250px";
  document.getElementById("main").style.marginTop = "250px";
});

close_menu.addEventListener("click", () => {
  document.getElementById("side-menu").style.height = "0";
  document.getElementById("main").style.marginTop = "0";
});
