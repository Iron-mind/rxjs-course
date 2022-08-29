// console.log('rxjs')
// import { fromEvent, Observable } from 'rxjs'

// const observable$ = new Observable(observer => {
//     observer.next('Hello')
//     observer.next('World')
//     observer.complete()// here finish the observable
//     observer.next('!!!') // this will not be executed
//     })

// //observer
// const observer = {
//     next: value => console.log(value),
//     error: err => console.log(err),
//     complete: () => console.log('complete')
// }

// observable$.subscribe(observer)

// //observable que emite eventos
// const onMouseMove$ = fromEvent(document, "mousemove" )

// const observableMouse = {
//     next: event => console.log(event.clientX, event.clientY),
// }

// onMouseMove$.subscribe(observableMouse)

//peleando con promesas

const promesas = [
    ()=>new Promise((resolve) =>
      setTimeout(() => {
        console.log(1);
        resolve("uno");
      }, 4000)
    ),
    ()=>new Promise((resolve) =>
      setTimeout(() => {
        console.log(2);
        resolve("dos");
      }, 2000)
    ),
    ()=>new Promise((resolve) =>
      setTimeout(() => {
        console.log(3);
        resolve("tres");
      }, 3000)
    ),
    ()=>new Promise((resolve) =>
      setTimeout(() => {
        console.log(4);
        resolve("cuatro");
      }, 4000)
    ),
  ];
  
  let mockArray = [1, 2, 4, 5, 6, 7,3, 8, 9, 10];
  
  let otrasPromesas = []
  for (let i = 0; i < mockArray.length; i++) {
      otrasPromesas.push(()=>
      //////////////////////////////////////// aqui dentro la promesa
      new Promise((resolve) =>
          setTimeout(() => {
              console.log(mockArray[i]);
              resolve(mockArray[i]);
          }, mockArray[i]==3?6000:1000)

        ////////////////////////////////
      ))
  }
  
  //ejecutar promesas secuencialmente
 
  async function runPromisesInSequence(promises) {
      for (let promise of promises) {
        await promise()
      }
    }
 
  runPromisesInSequence(otrasPromesas);
  