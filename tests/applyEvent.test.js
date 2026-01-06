import { applyEvent } from "../src/domain/table/applyEvent";
import { TableStatus } from "../src/domain/table/tableStatus";

describe( 'applyEvent', () =>{
    test('La mesa debe pasar del estado IDLE al estado CALLING_WAITER frente a un evento CALL_WAITER', () => {
        let event = {
            type: "CALL_WAITER"
        }
        let table = {
            id: 1,
            status: "IDLE"
        }
        let expectedTable = {
            id: 1,
            status: TableStatus.CALLING_WAITER
        }
        expect(applyEvent(table, event)).toStrictEqual(expectedTable)
    }),
    test('La mesa debe pasar del estado IDLE al estado WAITING_FOR_BILL frente a un evento REQUEST_BILL', () =>{
        let event = {
            type: "REQUEST_BILL"
        }
        let table = {
            id: 1,
            status: "IDLE"
        }
        let expectedTable = {
            id: 1,
            status: TableStatus.WAITING_FOR_BILL
        }
        expect(applyEvent(table, event)).toStrictEqual(expectedTable)
    }),
    test('Debe devolver un nuevo error frente al evento CALL_WAITER puesto que la mesa se encuentra en algun estado', () =>{
        let event = {
            type: "CALL_WAITER"
        }
        let table = {
            id: 1,
            status: "CALLING_WAITER"
        }
        expect(() => applyEvent(table, event)).toThrow('Mesa no disponible')
    }),
        test('Debe devolver un nuevo error frente al evento REQUEST_BILL puesto que la mesa se encuentra en algun estado', () =>{
        let event = {
            type: "REQUEST_BILL"
        }
        let table = {
            id: 1,
            status: "CALLING_WAITER"
        }
        expect(() => applyEvent(table, event)).toThrow('Mesa no disponible')
    }),
    test ('El estado de la mesa debe cambiar a IDLE siempre que no este previamente en este estado', () => {
        let event = {
            type: "RESOLVE"
        }
        let table = {
            id: 1,
            status: "CALLING_WAITER"
        }
        let expectedTable = {
            id: 1,
            status: TableStatus.IDLE
        }
        expect(applyEvent(table, event)).toStrictEqual(expectedTable)
    }),
    test('Debe devolverse un error si el evento RESOLVE se llama para una mesa con estado IDLE', () => {
        let event = {
            type: "RESOLVE"
        }
        let table = {
            id: 1,
            status: "IDLE"
        }
        expect(()=> applyEvent(table, event)).toThrow('La mesa no tiene ningun estado a resolver')
    }),
    test('Se debe devolver un error frente a un evento desconocido', ()=> {
        let event = {
            type: "NUEVO_EVENTO"
        }
        let table = {
            id: 1,
            status: "IDLE"
        }
        expect(() =>applyEvent(table,event)).toThrow(`Evento ${event.type} no soportado`)
    })
})