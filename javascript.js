const mainGrid = document.querySelector('.grid');
let gridElement;
let player1 = true;
function createGrid(){

    for(let i=0 ; i<9 ; i++){
        let div = document.createElement('div');
        div.classList.add('grid-element');
        div.dataset.colValue = `${i}`;
        mainGrid.appendChild(div);
    }
    gridElement = document.querySelectorAll('.grid-element');
    
}

createGrid();

function addSymbol(element){
    console.log(element);
    if(player1){
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
    addSymbol(element);
    player1 = !player1;
}));

