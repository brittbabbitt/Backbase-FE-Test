/*Overview
Component: Dropdown
Description: selection list of Merchant options from the transactions.json file
Inputs:
	merchants - list of merchants
	merchantSelected - user selected merchant value
Outputs:
	merchant - event emitter for merchant value
Functions:
	OnChange - captures and sends the merchant selected value
*/

import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'dropdown',
	moduleId: module.id,
	templateUrl: './dropdown.component.html',
	styleUrls: ['dropdown.component.css'],
})

export class DropdownComponent{
	@Input() merchants: string[];
	@Input() merchantSelected: string;

	@Output() merchant: EventEmitter<string> = new EventEmitter<string>(); 

	/* onChange
	@params: value:string
	@return: void

	descript: on selecting a merchant, the merhant emitter sends the merchant Selected
	*/
	onChange(value:string):void{
		this.merchant.emit(value);
	}
}