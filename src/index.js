console.log("rxjs");
import { fromEvent, Observable, Subject } from 'rxjs'
import _ from 'lodash';
//observable que emite eventos
const omKeyUp$ = fromEvent(document, "keyup" )
const userLooseOrWin$ = new Subject()
let userAnswer = []
import WORD_LIST from './wordList.json'


function getRandomWord(){
    return WORD_LIST[Math.floor(Math.random()*WORD_LIST.length)]
}
const theWord = getRandomWord()
//matrix 5X5
let classMatrix = []
const matrix = []
for (let i = 0; i < 5; i++) {
    matrix.push([]);
    classMatrix.push([]);
    for (let j = 0; j < 5; j++) {
        matrix[i].push(' ')
        classMatrix[i].push('')
    }
}

document.body.style.fontSize = "20px"
//the div with class .cells
//recorrer el array de matrix y pintarlo en el html
const cells = document.querySelector('#cells')
function renderCells(){
    cells.innerHTML = "";
    matrix.forEach((cell, index) => {
        let p = document.createElement('p')
        p.id = index
        cells.appendChild(p)
        for(let i = 0; i < matrix[index].length; i++){
            let span = document.createElement('span')
            span.style = {marginRight: '30px'}
            span.className = classMatrix[index][i];
            span.innerText = matrix[index][i]
            p.appendChild(span)
        }
    }
    )
}
renderCells()

let [i,j] = [0,0]
const observableKey = {
  next: (event) => {
    if (/^[a-zA-Z]$/.test(event.key)) {
      if(matrix[i].length > j){
      matrix[i][j] = event.key.toUpperCase() ;
      userAnswer.push(event.key) 
      j++;
      }
      
    }
    if(event.key ==='Enter' && matrix[i].length === userAnswer.length){

        j = 0;
        i++;
        userLooseOrWin$.next(userAnswer)
        
    }
    if(event.key ==='Backspace'){
        if(j > 0){
            j--;
            matrix[i][j] = ' ';
            userAnswer.pop()
        }
    }
    
    renderCells();
  },
};

function setColors(){
    let  repeated = _.countBy(matrix[i-1])
    for(let index = 0; index < userAnswer.length; index++){
         
         console.log(repeated);
         let letterCorrect =userAnswer[index].toUpperCase() === theWord[index];
         if(letterCorrect){
             classMatrix[i-1][index] = 'correct'
         }
         else if(theWord.includes(userAnswer[index].toUpperCase())&& repeated[matrix[i-1][index]]==1){
             classMatrix[i-1][index] = 'soso'
         }
        console.log(matrix[i-1][index])
        console.log(repeated[matrix[i-1][index]]);

        
    }
}

omKeyUp$.subscribe(observableKey)

//chequear palabras
const checkWord ={
    next: event => {
        
           setColors()
           console.log(userAnswer.join(''),matrix[i-1])
           console.log(classMatrix);
           console.log(theWord)
           userAnswer = []
           renderCells()
     
    }
}

userLooseOrWin$.subscribe(checkWord)
userLooseOrWin$.subscribe(value => {
   console.log(value, i, j)
   alert(value.join('').toUpperCase() === theWord ? 'You win' : 'You loose')
})

