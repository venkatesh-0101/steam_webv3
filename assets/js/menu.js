document.addEventListener(
"click",
function(){

const btn =
document.getElementById(
"menuBtn"
);

const menu =
document.getElementById(
"mobileMenu"
);

if(!btn || !menu) return;

btn.onclick = () => {

menu.classList.toggle(
"hidden"
);

};

}
);