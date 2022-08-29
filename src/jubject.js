import { Observable, Subject  } from "rxjs";


let numbersRandom$ = new Observable(observer => {
    observer.next(Math.random())
})

let observer1 = {
    next: value => console.log(value+', observer 1'),
    error: err => console.log(err),
    complete: () => console.log('complete')
}
let observer2 = {
    next: value => console.log(value+', observer 2'),
    error: err => console.log(err),
    complete: () => console.log('complete')
}
let observer3 = {
    next: value => console.log(value+', observer 3'),
    error: err => console.log(err),
    complete: () => console.log('complete')
}
//ahora con subject
let numbersRandomSubject$ = new Subject()

console.log('primera ejecución')
numbersRandom$.subscribe(observer1)
numbersRandom$.subscribe(observer2)
console.log('segunda ejecución')
//el subject permite emitir el mismo valor a todos los suscritos
numbersRandomSubject$.subscribe(observer1)
numbersRandomSubject$.subscribe(observer2)

numbersRandomSubject$.next(Math.random())


//otro ejemplo con subject como observable
let observer21 = {
    next: value => console.log(value+', observer 1'),
    error: err => console.log(err),
    complete: () => console.log('complete')
}
let observer22 = {
    next: value => console.log(value+', observer 2'),
    error: err => console.log(err),
    complete: () => console.log('complete')
}

let numbersRandom$2 = new Observable(observer => {
    observer.next(Math.random())
})
//ahora con subject
let numbersRandomSubject$2 = new Subject()

console.log('segundo ejemplo unica ejecución')
//el subject permite emitir el mismo valor a todos los suscritos
numbersRandomSubject$2.subscribe(observer21)
numbersRandomSubject$2.subscribe(observer22) //para que funcione debe ser en este orden porque numbersRandom$2 emite valores apenas se suscribe alguien
numbersRandom$2.subscribe(numbersRandomSubject$2)



