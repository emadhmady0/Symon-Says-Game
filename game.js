function getElementById(id){
    return document.getElementById(id)
}

const green = getElementById("green")
const red = getElementById("red")
const yellow = getElementById("yellow")
const blue = getElementById("blue")
const level_title = getElementById("level-title")
const body = document.getElementsByTagName("body")[0]
let simon_array = [];
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

function turnBackgroundToRed(){
    body.classList.add("game-over")
    setTimeout(function(){
        body.classList.remove("game-over")
    },500)
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
    user_clicks_counter = 0
    level_title.textContent = `level ${level}`
    const simon_press = Math.floor(Math.random() * (4 - 1 + 1) ) + 1
    addSimonClickToArray(simon_array,simon_press)
}

function checkSequence(color_name,color_div,audio){
    if(simon_array.length>0 && user_clicks_counter < simon_array.length){
        if(color_name == simon_array[user_clicks_counter]){
            clickAnimation(color_div,audio)
            user_clicks_counter+=1
            if(simon_array.length > 0 && user_clicks_counter == simon_array.length){
                level+=1
                setTimeout(function() {
                    startNewLevel();
                }, 1000);
            }
        } else{
            clickAnimation(color_div,"./sounds/wrong.mp3")
            turnBackgroundToRed()
            level_title.innerHTML = "Game Over, Press Any Key to Restart"
            level = 1
            user_clicks_counter = 0
            simon_array = []
            gameStarted = false
        }
    }
}

green.addEventListener("click",()=>checkSequence("green",green,"./sounds/green.mp3"))
red.addEventListener("click",()=>checkSequence("red",red,"./sounds/red.mp3"))
yellow.addEventListener("click",()=>checkSequence("yellow",yellow,"./sounds/yellow.mp3"))
blue.addEventListener("click",()=>checkSequence("blue",blue,"./sounds/blue.mp3"))

body.addEventListener("keydown",()=> {
    if (gameStarted == false) {
        gameStarted = true
        startNewLevel()
    }
})