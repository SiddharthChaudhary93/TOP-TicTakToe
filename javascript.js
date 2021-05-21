const mainGrid = document.querySelector('.grid');

const result = document.querySelector('.result');


let xArray,oArray;
let gridElement;
let player1 = true;

let resultArr = [
    [1, 2, 3], 
    [4, 5, 6], 
    [7, 8, 9], 
    [1, 4, 7], 
    [2, 5, 8], 
    [3, 6, 9], 
    [1, 5, 9], 
    [3, 5, 7]
];

function createGrid(){

    for(let i=0 ; i<9 ; i++){
        let div = document.createElement('div');
        div.classList.add('grid-element');
        div.dataset.column = `${i+1}`;
        div.dataset.filled = `false`;
        div.dataset.symbol = ``;
        mainGrid.appendChild(div);
    }
    gridElement = document.querySelectorAll('.grid-element');
    
}

function addSymbol(element){
    // console.log(element.dataset.filled);
    
    if(player1){
        
        let i = document.createElement('i');
        i.classList.add('fas','fa-times');
        element.appendChild(i);
        element.dataset.symbol=`x`;
    }
    else{
         
        let i = document.createElement('i');
        i.classList.add('far','fa-circle');
        element.appendChild(i);
        element.dataset.symbol=`o`;
      
    }
}

createGrid();
result.innerHTML = `Player X's turn`;

function checkResult(){
    if(player1){
        result.innerHTML = `Player X's turn`;
    }else{
        result.innerHTML = `Player O's turn`;
    }
    
    xArray = [...gridElement]
                                .filter(element=>element.dataset.symbol === 'x')
                                .map(element => element.dataset.column)
                                .map(parseFloat);
    
    oArray = [...gridElement]
                                .filter(element=>element.dataset.symbol === 'o')
                                .map(element => element.dataset.column)
                                .map(parseFloat);  
    

    xArray = splitArrayIntoChunks(xArray,3);
    oArray = splitArrayIntoChunks(oArray,3);
    console.log({xArray,oArray,resultArr})

    let matchesOfX = xArray.filter(arr => JSON.stringify(resultArr).includes(JSON.stringify(arr)));

    let matchesOfO = oArray.filter(arr => JSON.stringify(resultArr).includes(JSON.stringify(arr)));
    console.log({matchesOfO,matchesOfX});

    if(matchesOfX.length > 0){
        console.log(`Player 1 wins`);
        result.textContent = `Player X wins`;
        removeListener();
        resetButton();
        return;
    }
    if(matchesOfO.length > 0){
        console.log(`Player 2 wins`);
        result.textContent = `Player O wins`;
        removeListener();
        resetButton();
        return;
    }

    if([...gridElement].every(element => element.dataset.filled === 'true')){
        console.log(`Draw`);
        result.textContent = `Draw`;
        removeListener();
        resetButton();
        return;
    };
    
    
}

function resetTheGrid(){
    while (mainGrid.firstChild) {
        mainGrid.removeChild(mainGrid.firstChild);
    }
    createGrid();
    xArray = [];
    oArray = [];
    result.innerHTML = `Player X's turn`;
    gridElement = document.querySelectorAll('.grid-element');
    gridElement.forEach(element => element.addEventListener('click',handleClick));
}

function resetButton(){
    mainGrid.innerHTML = `
        <button class='reset'>RESET</button>
    `;
    const reset = document.querySelector('.reset');
    reset.addEventListener('click',resetTheGrid);
    
}

function removeListener(){
    gridElement.forEach(element => element.removeEventListener('click',handleClick));
}


function splitArrayIntoChunks(set, k) {
    var i, j, combs, head, tailcombs;
	if (k > set.length || k <= 0) {
		return [];
	}
	if (k == set.length) {
		return [set];
	}
	if (k == 1) {
		combs = [];
		for (i = 0; i < set.length; i++) {
			combs.push([set[i]]);
		}
		return combs;
	}
	combs = [];
	for (i = 0; i < set.length - k + 1; i++) {
	  head = set.slice(i, i + 1);
		tailcombs = splitArrayIntoChunks(set.slice(i + 1), k - 1);
		for (j = 0; j < tailcombs.length; j++) {
			combs.push(head.concat(tailcombs[j]));
		}
	}
	return combs;
  }


  function handleClick(){
    //for dataset use the value as string it will not recognise the boolean true and false
    if(this.dataset.filled === 'false'){
        // console.log(element.dataset.filled);
        addSymbol(this);
        this.dataset.filled =`true`;
        player1 = !player1;
        checkResult();
    }
   
}

gridElement.forEach(element => element.addEventListener('click',handleClick));

