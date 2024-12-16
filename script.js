const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");

let options = {
    fruits: [  
        "Apple", 
        "Orange", 
        "Mango", 
        "Grapes", 
        "Banana",
        "Strawberry", 
        "Watermelon", 
        "Pineapple", 
        "Papaya", 
        "Guava", 
        "Banana", 
         "Lemon", 
        ],
    Animals:["Elephant",
    "Tiger",
    "cat",
    "dog",
    "dear",
    "Lion",
    "Dolphin",
    "Zebra",
    "Panda",
    "bear",
    "monkay",
],
    countries:[
        "India",
        "Pakistan",
        "Turkey",
        "UnitedStates",
        "Canada",
        "Japan",
        "Germany",
        "Australia",
        "Brazil",
        "France",
        "South Korea",
        "Italy",
    ],
};


let winCount = 0;
let count = 0;  //yha 0

let chosenword ="";

const displayOptions = () => {
    optionsContainer.innerHTML += `<h1> Please select an option</h1>`;
    let buttonCon = document.createElement("div");
    for(let value in options){
       buttonCon.innerHTML += `<button class="options" onclick="generateword('${value}')">${value}</button>`;       
    }
    optionsContainer.appendChild(buttonCon);
};



const blocker = () => {
    let optionsButtons = document.querySelectorAll(".options");
    let letterButtons = document.querySelectorAll(".letters");

    optionsButtons.forEach((button) => {
        button.disabled = true;
    });

    letterButtons.forEach((button) => {
        button.disabled = true;
    });

newGameContainer.classList.remove("hide");
};

const generateword = (optionValue) => {
    let optionsButtons = document.querySelectorAll(".options");

    optionsButtons.forEach((button) => {
        if(button.innerHTML.toLowerCase() === optionValue){
            button.classList.add("active");
        }
        button.disabled = true;
    });

     letterContainer.classList.remove("hide");
     userInputSection.innerHTML = "";


     let optionArray = options[optionValue];
    chosenword = optionArray[Math.floor(Math.random() * optionArray.length)];
    chosenword = chosenword.toUpperCase();

    // let displayItem = chosenword.replace(/./$, `<span class="dashes">_</span>`);
    let displayItem = chosenword.split("").map(() => `<span class="dashes">_</span>`).join("");

    userInputSection.innerHTML = displayItem;
};

const initializar = () => {
    winCount = 0; 
    let count = 0;    //0

    userInputSection.innerHTML = "";
    optionsContainer.innerHTML = "";
    letterContainer.classList.add("hide");
    newGameContainer.classList.add("hide");
    letterContainer.innerHTML = "";

     for (let i = 65; i< 91; i++){
        let button = document.createElement("button");
        button.classList.add("letters");

        button.innerHTML = String.fromCharCode(i);

        button.addEventListener('click', () => {
            let charArray = chosenword.split("");
            // let dashes = document.getElementById("dashes");
            let dashes = document.querySelectorAll(".dashes");


            if (charArray.includes(button.innerText)){
                charArray.forEach((char, index) => {

                if (char === button.innerHTML) {
                    dashes[index].innerHTML = char;
                    winCount += 1;

                   if (winCount === charArray.length) {
                    resultText.innerHTML = `<h2 class="win-msg">You win!</h2> <p>The word was <span>${chosenword}</span></p>`;
                    blocker();
                   }
                }

                });
            }
              else{
                count += 1;
                drawMan(count);

                if (count == 6){
                    resultText.innerHTML = `<h2 class="lose-msg"> you lose!</h2> <p>The word was <span>
                    ${chosenword} </span></p>`;
                    blocker();
                }
              }

              button.disabled = true;
        });
       
        letterContainer.appendChild(button);
     }     
          displayOptions();


          let {initialDrawing} = canvasCreator();
          initialDrawing();
    };

    const canvasCreator = () => {
        let context = canvas.getContext("2d");
        context.beginPath();
        context.strokeStyle = "#000";
        context.lineWidth = 2;   //whab w
        
     
        const drawline = (fromX, fromY, toX, toY) =>{
            context.moveTo(fromX, fromY);
            context.lineTo(toX, toY);
            context.stroke();
        };

        const head = () => {
            context.beginPath();
            context.arc(70, 30, 10, 0, Math.PI *2, true);
            context.stroke();
        };

        const body = () => {
            drawline(70, 40, 70, 80);
        };

        const leftArm = () => {
            drawline(70, 50, 50, 70);
        };

        const rightArm = () => {
            drawline(70, 50, 90, 70);
        };

        const leftLeg = () => {
            drawline(70, 80, 50, 110);
        }

        const rightLeg = () => {
            drawline(70, 80, 90, 110);
        }

        const initialDrawing = () => {
            context.clearRect(0, 0, context.canvas.width, context.canvas.height);
            drawline(10, 130, 130, 130);
            drawline(10, 10, 10, 131);
            drawline(10, 10, 70, 10);
            drawline(70, 10, 70, 20);
        };

        return {initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg};
    };

    const drawMan = (count) => {
        let {head, body, leftArm, rightArm, leftLeg, rightLeg} = canvasCreator();
        switch(count){
            case 1:
            head();
            break;

            case 2:
            body();
            break;
            
            case 3:
            leftArm();
            break;
     
            case 4:
            rightArm();
            break;
    
            case 5:
            leftLeg();
            break;
            
            case 6:
           rightLeg();
            break;

            default:
            break;
        }
    };

    newGameButton.addEventListener('click', initializar);
    // window.onload = initializar;
    document.addEventListener("DOMContentLoaded", initializar);





