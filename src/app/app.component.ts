import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CarState } from 'src/app/shared/app.state';
import { Car } from 'src/app/models/car';
import { GetCars, AddCar, UpdateCar, DeleteCar } from 'src/app/shared/app.actions';

export class PrimeCar implements Car {
    constructor(public vin?, public year?, public brand?, public color?) {}
}
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	@Select(CarState.getCarList) cars: Observable<Car[]>;

	cols = [
		{ field: 'vin', header: 'Vin' },
		{ field: 'year', header: 'Year' },
		{ field: 'brand', header: 'Brand' },
		{ field: 'color', header: 'Color' }
	];

	selectedCar: Car;

	newCar: boolean;

	displayDialog: boolean;

	car: Car = new PrimeCar();

	constructor(private store: Store) { }

	ngOnInit() {
		this.store.dispatch(new GetCars());
	}

	showDialogToAdd() {
		this.newCar = true;
		this.car = new PrimeCar();
		this.displayDialog = true;
	}

	onRowSelect(event) {
		this.newCar = false;
		this.car = { ...event.data };
		this.displayDialog = true;
	}

	delete() {
		if (this.selectedCar)
			this.store.dispatch(new DeleteCar(this.selectedCar));

		this.car = null;
		this.displayDialog = false;
	}

	save() {
		if (this.newCar) {
			this.store.dispatch(new AddCar(this.car));
		}
		else {
			this.store.dispatch(new UpdateCar(this.car, this.selectedCar));
		}

		this.car = null;
		this.displayDialog = false;
	}

}
