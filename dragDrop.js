function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    console.log(event.target);
    console.log(event.target.id);
        event.preventDefault();
        let data = event.dataTransfer.getData("text");
        if(event.target.id==='basket1' || event.target.id==='basket2' || event.target.id==='basket3') {
        event.target.appendChild(document.getElementById(data));
    }
}

function allowDrop(event) {
    event.preventDefault();
}


let apples = document.getElementsByClassName("apple");
let basket_1 = document.getElementById("basket1"); 
let basket_2 = document.getElementById("basket2"); 
let basket_3 = document.getElementById("basket3"); 
let timer = document.getElementById("count-down"); 
let play = document.getElementById("play-btn");

let countGreen = 0;
let countRed = 0;

let greenApples = document.querySelectorAll(".apple[data-color='green']");
let start = Date.now();


play.addEventListener("click", function(){
    let counter = 30;
    
    if (play.parentNode.children[2].textContent == "Play") {
    
        this.parentNode.style.display = "none";
    }
    else {
        location.reload();
    }
    

    let second = setInterval(function(){
     
        counter = counter - 1;
        timer.textContent = "SCORE: " + counter;
        if(basket_2.children.length == 0){
            conter = 0;
            clearInterval(second);

            play.parentNode.style.display = "flex";
            play.parentNode.children[2].textContent = "Play Again";

            if(countGreen == greenApples.length) {
                play.parentNode.children[1].textContent = "You won!";
            } else {
                play.parentNode.children[1].textContent = "You lost, better luck next time!";
            }
        }
        
    }, 1000);
    
    let stop = setTimeout(function(){
        clearInterval(second);
        
        if(counter == 0) {
            play.parentNode.style.display = "flex";
            
            play.parentNode.children[2].textContent = "Play Again";
            play.parentNode.children[1].textContent = "You lost, better luck next time!";
        }

        }
    , 30000);    
});


for( let apple of apples) {
    //console.log(apple.dataset.color);
    apple.addEventListener("dragstart", function(event){
        drag(event);
    });
}

basket_2.addEventListener("dragover", function(event){
    allowDrop(event);
});

basket_2.addEventListener("drop", function(event){
    drop(event);    
    event.target.lastChild.style.filter = "none";
});


basket_1.addEventListener("dragover", function(event){
    allowDrop(event);
});

basket_1.addEventListener("drop", function(event){
    drop(event);
        if(event.target.lastChild.dataset.color != "crimson") {
            event.target.lastChild.style.filter = "grayscale(0.75)";
        }
        else {
            event.target.lastChild.style.filter = "none";
        }
        

});


basket_3.addEventListener("dragover", function(event){
    allowDrop(event);
});

basket_3.addEventListener("drop", function(event){
    drop(event);
    if(event.target.lastChild.dataset.color != "green") {
        event.target.lastChild.style.filter = "grayscale(0.75)";
        countGreen = countGreen - 1;
    }
    else {
        event.target.lastChild.style.filter = "none";
        countGreen = countGreen + 1;
    }
});
