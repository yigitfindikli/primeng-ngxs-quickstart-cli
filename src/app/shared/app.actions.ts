import { Car } from '../models/car';

export class GetCars {
    static readonly type = '[Car] Get';
}

export class AddCar {
    constructor(public payload: Car){}
    static readonly type = '[Car] Add';
}

export class UpdateCar {
    constructor(public payload: Car, public selectedCar: Car) {}
    static readonly type = '[Car] Update';
}

export class DeleteCar {
    constructor(public payload: Car) {}
    static readonly type = '[Car] Delete'
}