// ENTER TEXT BELOW. CAN *NOT* INCLUDE NORMAL HTML CODE. 
const text = ' SHAHAKADEMIA.NET '; 

const delay = 40; // SPEED OF TRAIL 
const Xoff = 0; // PIXEL COUNT FROM THE LEFT OF THE CURSOR (- VALUES GO TO LEFT) 
const Yoff = -30; // PIXEL COUNT FROM THE TOP OF THE CURSOR (- VALUES GO UP) 
const txtw = 14; // AMOUNT OF PIXEL SPACE EACH CHARACTER OCCUPIES 

//********** NO NEED TO EDIT BELOW HERE **********\\ 

const isLayersSupported = !!document.layers;
const isAllSupported = !!document.all;
const isGetElementByIdSupported = !!document.getElementById;

const txtA = new Array(); 
const splitText = text.split(''); 
let x1 = 0; 
let y1 = -1000; 
let t = ''; 

for(let i = 1; i <= splitText.length; i++){ 
    t += isLayersSupported ? `<layer name="txt${i}" top="-100" left="0" width="${txtw}" height="1">` : `<div id="txt${i}" style="position:absolute; top:-100px; left:0px; height:1px; width:${txtw}; visibility:visible;">`; 
    t += `${splitText[i-1]}`; 
    t += isLayersSupported ? '</layer>' : '</div>'; 
} 
document.body.innerHTML += t; 

function moveid(id, x, y){ 
    if(isLayersSupported) id.moveTo(x, y); 
    else{ 
        id.style.left = `${x}px`; 
        id.style.top = `${y}px`; 
    }
} 

function animate(evt){ 
    x1 = Xoff + (isAllSupported ? event.clientX + document.body.scrollLeft : evt.pageX); 
    y1 = Yoff + (isAllSupported ? event.clientY + document.body.scrollTop : evt.pageY); 
} 

function getidleft(id){ 
    return isLayersSupported ? id.left : parseInt(id.style.left); 
} 

function getidtop(id){ 
    return isLayersSupported ? id.top : parseInt(id.style.top); 
} 

function getwindowwidth(){ 
    return isAllSupported ? document.body.clientWidth + document.body.scrollLeft : window.innerWidth + pageXOffset; 
} 

function movetxts(){ 
    for(let i = splitText.length; i > 1; i--){ 
        if(getidleft(txtA[i-1]) + txtw * 2 >= getwindowwidth()){ 
            moveid(txtA[i-1], 0, -1000); 
            moveid(txtA[i], 0, -1000); 
        } else moveid(txtA[i], getidleft(txtA[i-1]) + txtw, getidtop(txtA[i-1])); 
    } 
    moveid(txtA[1], x1, y1); 
} 

window.onload = function(){ 
    for(let i = 1; i <= splitText.length; i++) txtA[i] = isLayersSupported ? document.layers[`txt${i}`] : (isAllSupported ? document.all[`txt${i}`] : document.getElementById(`txt${i}`)); 
    if(isLayersSupported) document.captureEvents(Event.MOUSEMOVE); 
    document.onmousemove = animate; 
    setInterval(movetxts, delay); 
}
