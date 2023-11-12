function getElementById(id){
    return document.getElementById(id)
}

const green = getElementById("green")
const red = getElementById("red")
const yellow = getElementById("yellow")
const blue = getElementById("blue")
const level_title = getElementById("level-title")
const body = document.getElementsByTagName("body")[0]
const simon_array = [];
let level = 1;
let gameStarted = false;
let user_clicks_counter = 0

function clickAnimation(color,audio){
    color.classList.add("pressed")
    setTimeout(function(){
        color.classList.remove("pressed")
    },500)
    const sound = new Audio(audio) 
    sound.play()
}


function addSimonClickToArray(s_array,number){
    if(number == 1){
        s_array.push("green")
        clickAnimation(green,"./sounds/green.mp3")
    }
    else if(number == 2){
        s_array.push("red")
        clickAnimation(red,"./sounds/red.mp3")
    }
    else if(number == 3){
        s_array.push("yellow")
        clickAnimation(yellow,"./sounds/yellow.mp3")
    }
    else {
        s_array.push("blue")
        clickAnimation(blue,"./sounds/blue.mp3")
    }
}


function startNewLevel(){
    level_title.textContent = `level ${level}`
    const simon_press = Math.floor(Math.random() * (4 - 1 + 1) ) + 1
    addSimonClickToArray(simon_array,simon_press)
}
body.addEventListener("keydown",()=> {
    body.classList.add("game-over")
    clickAnimation(blue,"./sounds/wrong.mp3")
    // if (gameStarted == false) {
    //     gameStarted = true
    //     startNewLevel()
    // }
  
})