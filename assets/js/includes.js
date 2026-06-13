/* =====================================
   YANTROMITRA
   includes.js
===================================== */

async function loadComponent(
elementId,
filePath
){

try{

const response =
await fetch(filePath);

if(!response.ok){

throw new Error(
`Failed to load ${filePath}`
);

}

const html =
await response.text();

const target =
document.getElementById(
elementId
);

if(target){

target.innerHTML = html;

}

}catch(error){

console.error(error);

}

}

document.addEventListener(
"DOMContentLoaded",
async ()=>{

if(
document.getElementById(
"header-placeholder"
)
){

await loadComponent(
"header-placeholder",
"components/header.html"
);

}

if(
document.getElementById(
"footer-placeholder"
)
){

await loadComponent(
"footer-placeholder",
"components/footer.html"
);

}

}
);