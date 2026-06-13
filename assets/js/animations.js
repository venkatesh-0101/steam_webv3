/* =====================================
   YANTROMITRA
   ANIMATIONS.JS
===================================== */

document.addEventListener(
"DOMContentLoaded",
()=>{

initializeRevealAnimations();

initializeFloatingElements();

initializeParallax();

initializeTimelineAnimations();

initializeLogoCarousel();

initializeLazyImages();

}
);

/* =====================================
   SCROLL REVEAL
===================================== */

function initializeRevealAnimations(){

const animatedElements =
document.querySelectorAll(
".fade-up,.fade-in,.zoom-in"
);

if(!animatedElements.length) return;

const observer =
new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add(
"show"
);

observer.unobserve(
entry.target
);

}

});

},
{
threshold:0.15
}

);

animatedElements.forEach(
element=>observer.observe(element)
);

}

/* =====================================
   FLOATING ELEMENTS
===================================== */

function initializeFloatingElements(){

const elements =
document.querySelectorAll(
".float"
);

elements.forEach(
(element,index)=>{

element.style.animationDelay =
`${index * .5}s`;

}
);

}

/* =====================================
   PARALLAX
===================================== */

function initializeParallax(){

const sections =
document.querySelectorAll(
".parallax-section"
);

if(!sections.length) return;

window.addEventListener(
"scroll",
()=>{

const scrollY =
window.pageYOffset;

sections.forEach(section=>{

const speed =
0.4;

section.style.backgroundPositionY =
`${scrollY * speed}px`;

});

}
);

}

/* =====================================
   TIMELINE
===================================== */

function initializeTimelineAnimations(){

const timelineItems =
document.querySelectorAll(
".timeline-item"
);

if(!timelineItems.length) return;

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
threshold:.25
}

);

timelineItems.forEach(
item=>observer.observe(item)
);

}

/* =====================================
   LOGO CAROUSEL
===================================== */

function initializeLogoCarousel(){

const tracks =
document.querySelectorAll(
".logo-track"
);

tracks.forEach(track=>{

const clone =
track.innerHTML;

track.innerHTML += clone;

});

}

/* =====================================
   LAZY IMAGES
===================================== */

function initializeLazyImages(){

const images =
document.querySelectorAll(
".lazy-image"
);

if(!images.length) return;

const observer =
new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

const image =
entry.target;

image.src =
image.dataset.src;

image.onload = ()=>{

image.classList.add(
"loaded"
);

};

observer.unobserve(
image
);

}

});

},
{
rootMargin:"100px"
}

);

images.forEach(
image=>observer.observe(image)
);

}

/* =====================================
   ADVANCED COUNTERS
===================================== */

function animateCounter(counter){

const target =
parseInt(
counter.dataset.target
);

const duration = 2000;

const startTime =
performance.now();

function update(now){

const progress =
Math.min(
(now - startTime) / duration,
1
);

counter.textContent =
Math.floor(
progress * target
).toLocaleString();

if(progress < 1){

requestAnimationFrame(
update
);

}

}

requestAnimationFrame(
update
);

}



