import { TableStatus } from "./tableStatus";
export function applyEvent (table, event) {
    switch (event.type) {
        case "CALL_WAITER":
            if (table.status !== TableStatus.IDLE)
                throw new Error('Mesa no disponible')
            return {
                ...table,
                status: TableStatus.CALLING_WAITER
            }
        case "REQUEST_BILL": 
            if (table.status !== TableStatus.IDLE)
                throw new Error('Mesa no disponible')
            return {
                ...table,
                status: TableStatus.WAITING_FOR_BILL
            }           
        case"RESOLVE":
            if (table.status === "IDLE"){
                throw new Error('La mesa no tiene ningun estado a resolver')
            }
            return {
                ...table,
                status: TableStatus.IDLE
            }
        default:
            throw new Error(`Evento ${event.type} no soportado`)
    }
}