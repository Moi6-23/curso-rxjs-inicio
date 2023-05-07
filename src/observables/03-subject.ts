import {Observable, Observer, Subject} from 'rxjs';

const observer: Observer<any> = {
    next: value => console.log('next', value),
    error: error => console.warn('error: ', error),
    complete: () => console.info('Completado')
};

const intervalo$ = new Observable<number>(subs => {

    const intervalId = setInterval(() => {
        subs.next(Math.random())
        console.log('sigue')
    }, 1000)

    return(() => {
        clearInterval(intervalId);
        console.info('Completado observador')
    })
});

// Caracteristicas importantes
// 1- Multiple casteo, distribuye la misma información a muchas subscripciones
// 2- Es un observador
// 3- Se puede manejar el next, error y complete

const subject$ = new Subject()
// Se toma la instancia de ese suscriptor
const suscriptionObservableMain = intervalo$.subscribe(subject$);

// const subs1 = intervalo$.subscribe(rnd =>  console.log('subs1: ', rnd))
// const subs2 = intervalo$.subscribe(rnd =>  console.log('subs1: ', rnd))


const subs1 = subject$.subscribe(observer)
const subs2 = subject$.subscribe(observer)


setTimeout(() => {
    subject$.next(10);
    // Se completa el observador subject$
    subject$.complete();
    // Se realiza el unsubscribe al observador intervalo$
    suscriptionObservableMain.unsubscribe();
}, 3500);