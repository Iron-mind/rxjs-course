console.log("rxjs");
import { fromEvent, Observable, Subject } from 'rxjs'
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
const matrix = []
for (let i = 0; i < 5; i++) {
    matrix.push([]);
    for (let j = 0; j < 5; j++) {
        matrix[i].push(' ')
    }
}

document.body.style.fontSize = "20px"
//the div with class .cells
//recorrer el array de matrix y pintarlo en el html
const cells = document.querySelector('#cells')

function renderCells(){
    matrix.forEach((cell, index) => {
        let p = document.createElement('p')
        p.id = index
        cells.appendChild(p)
        for(let i = 0; i < matrix[index].length; i++){
            let span = document.createElement('span')
            span.style = {marginRight: '30px'}
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
      matrix[i][j] = event.key;
      userAnswer.push(event.key) 
      j++;
      }
      
    }
    if(event.key ==='Enter'){

        j = 0;
        i++;
        userLooseOrWin$.next(userAnswer)
        userAnswer = []
    }
    cells.innerHTML = "";
    renderCells();
  },
};
omKeyUp$.subscribe(observableKey)

//chequear palabras
const checkWord ={
    next: event => {
        if(event.key === 'Enter'){
           console.log(userAnswer.join(''))
           console.log(theWord)
        }
    }
}

omKeyUp$.subscribe(checkWord)
userLooseOrWin$.subscribe(value => {
   console.log(value, i, j)
   alert(value.join('').toUpperCase() === theWord ? 'You win' : 'You loose')
})

