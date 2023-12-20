console.log("Welcome To Tic-Tac-Toe");

let music = new Audio("./music/game_music.mp3");
let place = new Audio("./music/ping.mp3");
let gameover = new Audio("./music/gameover.wav");
let victory = new Audio("./music/Victory.mp3");

let turn = "x";
let isgameover = false;

// A function to change turn 
const ChangeTurn = () =>{
    return (turn === "x" ? "o": "x");
}

// a function to check for a win 

const checkWin = () =>{
    let boxtexts = document.getElementsByClassName('boxtext');
    let wins = [
        [0,1,2,-3,6,0],
        [3,4,5,-3,18,0],
        [6,7,8,-3,30,0],
        [0,3,6,-15,18,90],
        [1,4,7,-3,18,90],
        [2,5,8,9,18,90],
        [0,4,8,-3,18,45],
        [2,4,6,-3,18,-45]
    ]
    wins.forEach((e)=>{
        if ((boxtexts[e[0]].innerText  === boxtexts[e[1]].innerText) && (boxtexts[e[1]].innerText === boxtexts[e[2]].innerText) && (boxtexts[e[0]].innerText !== '' )){
            document.querySelector(".info").innerText = boxtexts[e[0]].innerText + " Won!";
            isgameover = true;
            document.querySelector(".imgbox").getElementsByTagName("img")[0].style.width = "200px";
            document.querySelector(".line1").display = "block";
            document.querySelector(".line1").style.transform = `translate(${e[3]}vw,${e[4]}vw) rotate(${e[5]}deg)`;
            music.pause();
            victory.currentTime = 0;
            victory.play();
        }
        else{
            music.addEventListener('ended',()=>{
                music.loop = true;
            });
        }
    }) 
}

// Game Logic
music.play()
music.loop = true;
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) =>{
    let boxtext = element.querySelector(".boxtext");
    element.addEventListener('click',(e)=>{
        if (boxtext.innerText === ''){
            boxtext.innerText = turn;
            turn = ChangeTurn();
            place.play();
            checkWin();
            if (!isgameover){
                document.getElementsByClassName("info")[0].innerText = "Player " + turn + "'s Turn"; 
            }
        }
    });
})

victory.addEventListener('ended',()=>{
    music.play();
    music.loop = true;
})

// ADD ON-CLICK event listener
reset.addEventListener('click', ()=>{
    let dabba = document.querySelectorAll(".boxtext");
    Array.from(dabba).forEach(element => {
        element.innerText = "";
    });
    turn = 'x';
    isgameover = false;
    document.getElementsByClassName("info")[0].innerText = "Player " + turn + "'s Turn"; 
    document.querySelector(".imgbox").getElementsByTagName("img")[0].style.width = "0px";
    document.querySelector(".line1").style.transform = `translate(-100vw,-100vw) rotate(0deg)`;
    victory.pause();
    music.play();
    // fadeIn(music);
    // fadeOut(victory);
} )

music.addEventListener('ended',()=>{
    music.play();
    music.loop = true;
});