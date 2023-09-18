//Ask user

//Set a timer as if user have over 18
setTimeout(function(){
    document.getElementById("askAge").style.display = "block";
}, 500)


//Once user click "Yes"
document.getElementById("yes").addEventListener("click", function(){
    document.getElementById("askAge").style.display = "none";
})

//Once user click "No"
function warning(){
    document.getElementById("kid").innerText = "*Gambling is not suitable for kid*";
}

//Check the historical record of playing the game
document.getElementById("history").addEventListener("click", function(){
    document.getElementById("historyData").style.display = "block";
})

//Exist the page of history
document.getElementById("exitHistory").addEventListener("click", function(){
    document.getElementById("historyData").style.display = "none";
})

//Game

let cardArray = ["1","2","3","4","5","6","7","8","9","10","J","Q","K"] //Index: 0 - 12
let playerCard = document.getElementById("card");
let computerCard = document.getElementById("computerCard");
let finalResult = document.getElementById("result");
let historyStatus =  "";
let totalPlayer = 0, totalComputer = 0;



function startGame(){
    //Disable the button
    document.getElementById("start").disabled =true;
    //Player perspective
    let firstCard = 0;
    let secondCard = 0;

    let randomCard1 = Math.floor((Math.random() * 13));
    let randomCard2 = Math.floor((Math.random() * 13));

    //Call function to calculate the point
    totalPlayer = calculatePoint(randomCard1, randomCard2);

    firstCard  = cardArray[randomCard1];
    secondCard = cardArray[randomCard2];
    playerCard.innerText =  "Your Cards: " + firstCard + " " + secondCard;


    
    //Computer perspective
    let computerCard1 = 0;
    let computerCard2 = 0;

    let randomComputerCard1 = Math.floor((Math.random() * 13));
    let randomComputerCard2 = Math.floor((Math.random() * 13));

    //Call function to calculate the point
    totalComputer = calculatePoint(randomComputerCard1, randomComputerCard2);
    //Computer will draw a card if the total is smaller than 10 
    
    
    computerCard1  = cardArray[randomComputerCard1];
    computerCard2  = cardArray[randomComputerCard2];
    computerCard.innerText =  "Computer cards: " + computerCard1 + " " + computerCard2; 
    

}



function drawCard(){
    let extraNum = Math.floor(Math.random() * 13);
    playerCard.innerText +=" " + cardArray[extraNum];
    totalPlayer += calculatePoint(extraNum, 0);
    if(totalPlayer > 21){
        finalResult.innerText = "No! You are busted"
        historyStatus = "LOST";    
        historyfunc();
        recordTime();
        document.getElementById("draw").disabled = true;
        document.getElementById("show").disabled = true;
    }
   
}

function drawCardComputer(){
    let extraNum = Math.floor(Math.random() * 13);
    computerCard.innerText +=" " + cardArray[extraNum];
    totalComputer += calculatePoint(extraNum, 0);
}

function calculatePoint(card1, card2){
    let total =0;
    //Calculate first card
    if(card1  >= 9 ){
        total += 10;
    }
    else
        total += (card1 + 1);

    //Calculate second card
    if(card2  >= 9 ){
        total += 10;
    }
    else
        total += (card2 + 1);

    return total;
}

function compare(player, computer){

    if(player > 21){
        finalResult.innerText = "No! You are busted"
        //save the resul to the history section
        historyStatus = "LOST";    
    }

    else if(computer > 21){
        finalResult.innerText = "Yes! Computer is busted"
        //save the resul to the history section
        historyStatus = "WIN";
    }

    else if(player > computer){
        finalResult.innerText = "You Win!"
        //save the resul to the history section
        historyStatus = "WIN";
    }
    else if(player == computer){
        finalResult.innerText = "Draw!"
        //save the resul to the history section
        historyStatus = "DRAW";
    }
    else{
        finalResult.innerText = "You Lost"
        //save the resul to the history section
        historyStatus = "LOST";
    }

}



function showDown(){
    //Disable the button
    document.getElementById("draw").disabled =true;
    while(totalComputer <= 10){
        drawCardComputer();
    }  

    compare(totalPlayer, totalComputer);
    historyfunc();
    recordTime();
    


}


let arrayString = [];
let arrayTime = [];
let characterData= ""; 
let characterDataTime= ""; 

function historyfunc(){
    //Set local storage
    let historyArray = JSON.parse(localStorage.getItem("data"))|| [];
    
    //Store the historical data into local storage
    historyArray.push(`${playerCard.innerText} ${computerCard.innerText} [${ historyStatus}]`)
    

    //Set the value into local storage
    localStorage.setItem("data", JSON.stringify(historyArray))
    //document.getElementById("displayData").innerText =  localStorage.getItem("data");
    arrayString = JSON.parse(localStorage.getItem("data"));
    for(let i=0; i< arrayString.length; i++){
        characterData += "(#" + (i+1) + ")" + arrayString[i] + '\n';  
      
    }
    document.getElementById("displayData").innerText = characterData;


    characterData="";

}

function nextRound(){
    document.getElementById("draw").disabled =false;
    document.getElementById("start").disabled =false;
    document.getElementById("show").disabled = false;
    finalResult.innerText="";
    playerCard.innerText ="Cards: ";   
    computerCard.innerText ="Computer Cards: "; 
    
}

function recordTime(){
   //Declare the date and time
   const currentDate = new Date();
   const year = currentDate.getFullYear();
   const month = currentDate.getMonth() + 1; // Months are zero-based, so we add 1
   const day = currentDate.getDate();
   const hours = currentDate.getHours();
   const minutes = currentDate.getMinutes();
   const seconds = currentDate.getSeconds();
  

   let historyTime = JSON.parse(localStorage.getItem("dataTime")) || [];
   historyTime.push(`${year}/${month}/${day}(${hours}:${minutes}:${seconds})`);
   localStorage.setItem("dataTime", JSON.stringify(historyTime));
   
   //document.getElementById("displayData").innerText =  localStorage.getItem("data");
   arrayTime = JSON.parse(localStorage.getItem("dataTime"));
   for(let i=0; i< arrayTime.length; i++){
    characterDataTime += arrayTime[i] + '\n';  
     
   }
   document.getElementById("timePlay").innerText =  characterDataTime;


   characterDataTime="";
}
















