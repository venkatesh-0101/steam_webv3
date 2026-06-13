/* =====================================
   YANTROMITRA
   MAIN.JS PART 1
===================================== */

document.addEventListener(
"DOMContentLoaded",
()=>{

initializeMobileMenu();

initializeStickyHeader();

initializeRevealAnimations();

initializeBackToTop();

}
);

/* =====================================
   MOBILE MENU
===================================== */

function initializeMobileMenu(){

const menuBtn =
document.getElementById(
"menuBtn"
);

const mobileMenu =
document.getElementById(
"mobileMenu"
);

if(
!menuBtn ||
!mobileMenu
){
return;
}

menuBtn.addEventListener(
"click",
()=>{

mobileMenu.classList.toggle(
"active"
);

mobileMenu.classList.toggle(
"hidden"
);

}
);

}

/* =====================================
   STICKY HEADER
===================================== */

function initializeStickyHeader(){

const header =
document.querySelector(
"header"
);

if(!header) return;

window.addEventListener(
"scroll",
()=>{

if(window.scrollY > 50){

header.classList.add(
"header-scrolled"
);

}else{

header.classList.remove(
"header-scrolled"
);

}

}
);

}
/* =====================================
   SCROLL REVEAL
===================================== */

function initializeRevealAnimations(){

const elements =
document.querySelectorAll(
".fade-up,.fade-in,.zoom-in"
);

if(!elements.length) return;

const observer =
new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add(
"show"
);

}

});

},
{
threshold:0.15
}

);

elements.forEach(
element=>observer.observe(element)
);

}

/* =====================================
   BACK TO TOP
===================================== */

function initializeBackToTop(){

const button =
document.getElementById(
"backToTop"
);

if(!button) return;

window.addEventListener(
"scroll",
()=>{

if(window.scrollY > 600){

button.classList.remove(
"hidden"
);

}else{

button.classList.add(
"hidden"
);

}

}
);

button.addEventListener(
"click",
()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

}
);

}
/* =====================================
   COUNTERS
===================================== */

function initializeCounters(){

const counters =
document.querySelectorAll(
".counter"
);

if(!counters.length) return;

const observer =
new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

const counter =
entry.target;

const target =
parseInt(
counter.dataset.target
);

let current = 0;

const increment =
target / 100;

function updateCounter(){

current += increment;

if(current < target){

counter.innerText =
Math.floor(current);

requestAnimationFrame(
updateCounter
);

}else{

counter.innerText =
target.toLocaleString();

}

}

updateCounter();

observer.unobserve(counter);

}

});

},
{
threshold:0.3
}

);

counters.forEach(
counter=>observer.observe(counter)
);

}

document.addEventListener(
"DOMContentLoaded",
initializeCounters
);
