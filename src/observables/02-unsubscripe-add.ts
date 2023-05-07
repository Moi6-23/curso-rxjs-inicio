import {Observable, Observer} from 'rxjs';

const observer: Observer<any> = {
    next: value => console.log('next', value),
    error: error => console.warn('error: ', error),
    complete: () => console.info('Completado')
};

const intervalo$ = new Observable<number>(subscriber => {
    // crear un contador 1,2,3,4,5....

    let count = 0;
    const interval = setInterval(() => {
        count++ //Aumenta el contador
        subscriber.next(count)
    }, 1000)

    setTimeout(() => {
        subscriber.complete();
    }, 2500);
    //Cuando no tiene ningún subscriptor
    return () => {
        clearInterval(interval);
        console.log('Intervalo destruido');
    }
})
//Cada suscriptor es una instancia nueva del observador, por lo cuál sus valores son desde el inicio
const subs1 = intervalo$.subscribe(observer);
const subs2 = intervalo$.subscribe(observer);
const subs3 = intervalo$.subscribe(observer);

subs1.add(subs2);
subs1.add(subs3);
// Cancelar la subscripción y llama la función de retorno
setTimeout(() => {
    // subs1.unsubscribe()
    // subs2.unsubscribe()
    // Para encadenar subscripciones
    subs1.unsubscribe();
    //Solo se ejecuta el completado del 1er subscriptor
    console.log('Completado timeout') 
}, 6000)

