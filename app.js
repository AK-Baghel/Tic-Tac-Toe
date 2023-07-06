let box=document.querySelectorAll('.box');
let player1=document.querySelector('.player1');
let player2=document.querySelector('.player2');
let restart=document.querySelector('.restart');
let alertBox=document.querySelector('.alertBox')

alertBox.style.display='none'
let currentPlayer='X'
let nextPlayer='O'
let playerTurn=nextPlayer;

player1.textContent=`Player1 :  ${nextPlayer}`
player2.textContent=`Player2 :  ${currentPlayer}`

const startGame=()=>{
    box.forEach((box)=>{
        box.addEventListener('click',handleClick)
    })
    restart.addEventListener('click',()=>{
        box.forEach((e)=>{
            e.textContent="";
            box.forEach((e)=>{
                e.removeEventListener('click',handleClick);
                e.classList.remove('disable');
            })
        })
        playerTurn=nextPlayer;
        startGame();
    })
}

const handleClick=(e)=>{
    if(e.target.textContent==="")
        e.target.textContent=playerTurn;
    if(checkWin()){
        disableBox();
        alertBox.textContent=playerTurn==='O'? `Player 1 is a Winner` :`Player 2 is Winner`
        alert();
    }
    else if(checkTie()){
        alertBox.textContent="Match is Tie"
        disableBox();
        alert();
    }
    else
        changePlayerTurn();
}

const alert=()=>{
    alertBox.style.display='block'
    setTimeout(()=>{
        alertBox.style.display='none'
    },2500)
}

const changePlayerTurn=()=>{
    playerTurn=playerTurn===currentPlayer ? nextPlayer : currentPlayer;
}

const checkWin=()=>{
    const winningCoditions=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    for(let i=0;i<winningCoditions.length;i++){
        const [pos1,pos2,pos3]=winningCoditions[i];
        if(box[pos1].textContent!="" && box[pos1].textContent===box[pos2].textContent && box[pos2].textContent===box[pos3].textContent)
            return true;
    }

}

const checkTie=()=>{
    let count=0;
    box.forEach((e)=>{
        if(e.textContent==="")
            count++;
    })
    return count===0 && !checkWin() ? true : false;
}

const disableBox=()=>{
    box.forEach((e)=>{
        e.removeEventListener('click',handleClick);
        e.classList.add('disable');
    })
}
startGame();