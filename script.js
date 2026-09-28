const display = document.querySelector("#display");
const num = document.querySelectorAll(".number");
const opt = document.querySelectorAll (".opt");
const clear = document.querySelector(".clear");
const backspace = document.querySelector(".backspace");
const equals = document.querySelector(".equals");
const dot = document.querySelector(".dot");
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
    }else if(cache.includes("/") && Number(cache[2]) === 0){
        return "ERROR";
    }else{
        return Number(cache[0]) / Number(cache[2]);
    }
}

function reset(){
    let result = calc();
    cache = [];
    cache.splice(0, 0, result);
    if (result === "ERROR"){
        display.textContent ="ERROR";
        return;
    }

    result = parseFloat(result.toFixed(15));
    display.textContent = result;
}

function CEclear(){
    display.textContent = "";
    cache = [];
    tempOpt.length = 0;
}


num.forEach(button => {
    button.addEventListener("click", ()=>{
        if (display.textContent === ""){
            display.textContent = button.textContent;
        }else if (display.textContent === "0"){
            return;
        }else if(["+","-","x", "/"].some((operator)=> tempOpt.includes(operator))){
            cache.push(tempOpt.at(-1));
            tempOpt.length = 0;
            display.textContent = button.textContent;
        }else if(cache.length===1){
            display.textContent = button.textContent;
            cache = [];
            tempOpt.length = 0
        }else if(display.textContent.length === 18){
            return;
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
            cache.push(display.textContent);
            reset();
            tempOpt.push(button.textContent);
        }else{
            cache.push(display.textContent);
            tempOpt.push(button.textContent);
            console.log(cache);
        }
    })
});

clear.addEventListener("click", CEclear)

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
        cache.push(display.textContent);
        reset();
    }
})

dot.addEventListener("click", ()=> {
    if (display.textContent === "" || display.textContent.includes(".")){
        return;
    } else {
        display.textContent += dot.textContent;
    }
})

document.addEventListener("keydown", event =>{
    let key=event.key;
    if (key === "*"){
        key = "x";
    }

    const button = [...num, ...opt].find(
        button => button.textContent ===key
    )

    if(button){
        button.click();
        return;
    }

    if(key === "Enter" || key === "="){
        equals.click();
        return;
    }

    if(key === "Backspace"){
        backspace.click();
        return;
    }

    if(key === "Escape"){
        clear.click();
        return;
    }

})