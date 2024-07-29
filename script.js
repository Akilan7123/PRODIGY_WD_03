
    const startScreen = document.getElementById("startScreen");
    const gameScreen = document.getElementById("gameScreen");
    const playButton = document.getElementById("playButton");
    const boxes = document.querySelectorAll(".box");
    const statusText = document.getElementById("status");
    const resetButton = document.getElementById("resetButton");

    let currentPlayer = "x";
    let board = ["","","","","","","","",""];
    let running = false;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    playButton.addEventListener("click",() =>{
        startGame();
    });

    function startGame() {
        startScreen.style.display = "none";
        gameScreen.style.display = "block";
    }


    initial();

    function initial(){
        boxes.forEach(box=>box.addEventListener('click',boxClick));
        statusText.textContent = `Player ${currentPlayer}'s turn`;
        resetButton.addEventListener("click", restart);
        running=true;
    }

    function boxClick(){
        const index=this.dataset.index;
        if(board[index] != "" || !running) return;
        updateBox(this,index);
        checkWinner();

    }

    function updateBox(box,index){
        board[index]=currentPlayer;
        box.textContent=currentPlayer;
    }

    function changePlayer(){
        currentPlayer=currentPlayer=="x"?"o":"x";
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    }

    function checkWinner(){
        let isWon=false;
        for(i=0;i<winningConditions.length;i++){
            const condition=winningConditions[i];
            
            const box1=board[condition[0]];
            const box2=board[condition[1]];
            const box3=board[condition[2]];

            if(box1 == "" || box2 == "" || box3 == "") {
                continue;
            }
            if(box1==box2 && box2==box3){
                isWon=true;
                boxes[condition[0]].classList.add("win");
                boxes[condition[1]].classList.add("win");
                boxes[condition[2]].classList.add("win");

               

            }
        }

        if(isWon){
            statusText.textContent = `${currentPlayer} wins`;
            running=false;
        }
        else if(!board.includes("")){
            statusText.textContent = "It's a draw!";
            running=false;

            boxes.forEach(box=>{
                box.classList.add("draw");
            })
        }
        else{
            changePlayer();
        }
        
    }

    function restart(){
        currentPlayer = "x";
        board = ["","","","","","","","",""];
        running = true;
        statusText.textContent = `Player ${currentPlayer}'s turn`;
        
        boxes.forEach(box=>{
            box.innerHTML="";
            box.classList.remove("win");
            box.classList.remove("draw");
        })

    }

    