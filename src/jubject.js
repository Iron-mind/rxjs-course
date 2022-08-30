import { Observable, Subject,timer, of, from, asyncScheduler, interval  } from "rxjs";


// let numbersRandom$ = new Observable(observer => {
//     observer.next(Math.random())
// })

// let observer1 = {
//     next: value => console.log(value+', observer 1'),
//     error: err => console.log(err),
//     complete: () => console.log('complete')
// }
// let observer2 = {
//     next: value => console.log(value+', observer 2'),
//     error: err => console.log(err),
//     complete: () => console.log('complete')
// }
// let observer3 = {
//     next: value => console.log(value+', observer 3'),
//     error: err => console.log(err),
//     complete: () => console.log('complete')
// }
// //ahora con subject
// let numbersRandomSubject$ = new Subject()

// console.log('primera ejecución')
// numbersRandom$.subscribe(observer1)
// numbersRandom$.subscribe(observer2)
// console.log('segunda ejecución')
// //el subject permite emitir el mismo valor a todos los suscritos
// numbersRandomSubject$.subscribe(observer1)
// numbersRandomSubject$.subscribe(observer2)

// numbersRandomSubject$.next(Math.random())


// //otro ejemplo con subject como observable
// let observer21 = {
//     next: value => console.log(value+', observer 1'),
//     error: err => console.log(err),
//     complete: () => console.log('complete')
// }
// let observer22 = {
//     next: value => console.log(value+', observer 2'),
//     error: err => console.log(err),
//     complete: () => console.log('complete')
// }

// let numbersRandom$2 = new Observable(observer => {
//     observer.next(Math.random())
// })
// //ahora con subject
// let numbersRandomSubject$2 = new Subject()

// console.log('segundo ejemplo única ejecución')
// //el subject permite emitir el mismo valor a todos los suscritos
// numbersRandomSubject$2.subscribe(observer21)
// numbersRandomSubject$2.subscribe(observer22) //para que funcione debe ser en este orden porque numbersRandom$2 emite valores apenas se suscribe alguien
// numbersRandom$2.subscribe(numbersRandomSubject$2)









///of and from

let fruits = ['apple', 'banana', 'orange']
let fruits$ = of(...fruits) //of no recibe un array, sino una lista de elementos
fruits$.subscribe(console.log) ///puedo poner directamente una función

//lo mismo pero on un array

let fruits2$ = from(fruits, asyncScheduler) //from convierte un array en un observable
fruits2$.subscribe(console.log) ///puedo poner directamente una función
//asyncSchedule para ejecutar una función asíncrona

//INTERVALS
const sequenceNumbers$ = interval(2000)
sequenceNumbers$.subscribe(console.log)

//timer
const delayedNumbers$ = timer(2000)
delayedNumbers$.subscribe(console.log)
