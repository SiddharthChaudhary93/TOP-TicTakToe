const mainGrid = document.querySelector('.grid');
let gridElement;
let player1 = true;
const result = document.querySelector('.result');
function createGrid(){

    for(let i=0 ; i<9 ; i++){
        let div = document.createElement('div');
        div.classList.add('grid-element');
        div.dataset.colValue = `${i}`;
        div.dataset.filled = `false`;
        mainGrid.appendChild(div);
    }
    gridElement = document.querySelectorAll('.grid-element');
    
}

createGrid();
result.innerHTML = `Player1's turn`;

function addSymbol(element){
    // console.log(element.dataset.filled);
    
    if(player1 ){
        
        let i = document.createElement('i');
        i.classList.add('fas','fa-times');
        element.appendChild(i);
        
    }
    else{
         
        let i = document.createElement('i');
        i.classList.add('far','fa-circle');
        element.appendChild(i);
      
    }
}

gridElement.forEach(element => element.addEventListener('click',()=>{
    //for dataset use the value as string it will not recognise the boolean true and false
    if(element.dataset.filled === 'false'){
        console.log(element.dataset.filled);
        console.log('we are here')
        addSymbol(element);
        element.dataset.filled =`true`;
        player1 = !player1;
    }
    
    if(player1){
        result.innerHTML = `Player1's turn`;
    }else{
        result.innerHTML = `Player2's turn`;
    }
}));

