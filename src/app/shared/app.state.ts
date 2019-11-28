// user.action.ts

import { State, Action, StateContext, Selector } from '@ngxs/store';
import { GetCars, AddCar, UpdateCar, DeleteCar } from './app.actions';
import { Car } from '../models/car';
import { CarService } from '../services/carservice';
import { Injectable } from '@angular/core';

export class CarStateModel {
    cars: Car[];
}

@Injectable()
export class CarState {
    constructor(private carService:CarService){}

    @Selector()
    static getCarList(state: CarStateModel) {
        return state.cars;
    }

    @Action(GetCars)
    getCars({getState, setState}: StateContext<CarStateModel>) {
        return this.carService.getCarsSmall().then(cars => {
            const state = getState();
            setState({
                ...state,
                cars: cars
            });
        })
    }

    @Action(AddCar)
    addCar({getState,patchState}:StateContext<CarStateModel>,{payload}:AddCar) {
        const state = getState();
        patchState({
            cars: [...state.cars,payload]
        });
    }

    @Action(UpdateCar)
    updateCar({getState,setState}:StateContext<CarStateModel>,{payload,selectedCar}:UpdateCar) {
        const state = getState();
        const index = this.findCarIndex(state.cars,selectedCar);
        const cars = [...state.cars];
        cars[index] = payload;

        setState({
            ...state,
            cars: cars
        })
    }

    @Action(DeleteCar)
    deleteCar({getState,setState}:StateContext<CarStateModel>,{payload}:UpdateCar) {
        const state = getState();
        const index = this.findCarIndex(state.cars,payload);
        const cars = state.cars.filter((val, i) => i !== index);
        setState({
            ...state,
            cars: cars
        });
    }

    findCarIndex(cars,car): number {
        return cars.indexOf(car);
    }
}