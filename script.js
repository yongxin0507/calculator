const display = document.querySelector("#display");
const num = document.querySelectorAll(".number");
const opt = document.querySelectorAll (".opt");
const clear = document.querySelector(".clear");
const backspace = document.querySelector(".backspace");
const equals = document.querySelector(".equals")
let cache = [];
const tempOpt =[];
let tempNum = Number(cache[1]);
let tempO = cache[0];


function calc(){
    if (cache.includes("+")){
        return Number(cache[0]) + Number(cache[2]);
    }else if(cache.includes("-")){
        return Number(cache[0]) - Number(cache[2]);
    }else if(cache.includes("x")){
        return Number(cache[0]) * Number(cache[2]);
    }else{
        return Number(cache[0]) / Number(cache[2]);
    }
}

function reset(){
    cache.push(display.textContent);
    let result = calc();
    cache = [];
    cache.splice(0, 0, result);
    display.textContent = result;
}

num.forEach(button => {
    button.addEventListener("click", ()=>{
        if (display.textContent === ""){
            display.textContent = button.textContent;
        }else if(["+","-","x", "/"].some((operator)=> tempOpt.includes(operator))){
            cache.push(tempOpt.at(-1));
            tempOpt.length = 0;
            display.textContent = button.textContent;
        }else{
            display.textContent += button.textContent;
        }
    })
});

opt.forEach(button => {
    button.addEventListener("click", ()=>{
        if (display.textContent === ""){
            return;
        }else if(["+","-","x", "/"].some((operator)=> tempOpt.includes(operator)) ){
            tempOpt.push(button.textContent);
        }else if(cache.length==2){
            reset();
            tempOpt.push(button.textContent);
        }else{
            cache.push(display.textContent);
            tempOpt.push(button.textContent);
            console.log(cache);
        }
    })
});

clear.addEventListener("click", () =>{
    display.textContent = "";
    cache = [];
    tempOpt.length = 0;
})

backspace.addEventListener("click", () =>{
    display.textContent = display.textContent.slice(0, -1);
})

equals.addEventListener("click", () =>{
if (cache.length === 2){
    cache.push(display.textContent);
    tempO = cache[1];
    tempNum = Number(cache[2]);
    reset();
}else if(cache.length === 1 && tempNum !== ""){
    cache.push(tempO);
    cache.push(tempNum);
    reset();
}
})