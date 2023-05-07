import {Observable, Observer} from 'rxjs';


// const obs$ = Observable.create();
const obs$ = new Observable<string>(subs => {
    subs.next('Hola');
    subs.next('Mundo');
    subs.next('Hola');
    subs.next('Mundo');

    // Forzar un error
    const a = undefined;
    a.nombre = 'Ejemplo de error'; //Si detecta un error el error finaliza
    subs.complete();
    // Como ya emitió el complete no sigue emitiendo valores
    subs.next('Hola');
    subs.next('Mundo');
});
// Para que un observador se ejecute tiene que tener una suscripción, sino no tiene a quien notificar
// obs$.subscribe(
//     valor => console.log('next: ', valor),
//     error => console.warn('error: ', error),
//     () => console.info('Completado')
// );

// Nueva forma de realizar, actualización del paquete
obs$.subscribe({
    next: valor => console.log('next2: ', valor),
    error: (error) => console.warn('error2: ', error),
    complete: () => console.info('Completado2')
})

// Otra forma de realizar
const observer: Observer<any> = {
    next: value => console.log('siguiente1', value),
    error: error => console.error('error1: ', error),
    complete: () => console.info('Completado1')
}

obs$.subscribe(observer)