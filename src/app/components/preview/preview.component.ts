/*Overview
Component: Preview
Description: allows user to preview the transfer before confirming the transaction
Inputs:
	toAccount - merchant to transfer funds to
	amount - amount to transfer
Outputs:
	notify - event emitter for holding 'confirm' || 'cancel' 
Variables:
	fromAccount - checking account
	headerTitle - preview header
Functions:
	onNotify - notifies whether to commit or cancel the transaction
	resetPreview - resets values in preview
*/

import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'preview',
	moduleId: module.id,
	templateUrl: './preview.component.html',
})

export class PreviewComponent{
	@Input() toAccount: string;
	@Input() amount: string;

	@Output() notify: EventEmitter<string> = new EventEmitter<string>(); 

	private fromAccount: string = 'Free Checking(4692)';
	private headerTitle: string = 'Preview';

	/* onNotify
	@params: value:string
	@return: void

	descript: after clicking 'confirm' || 'cancel', the preview resets, and
	the notify emitter sends the user's descision to transfer or cancel
	*/
	onNotify(value: string): void{
		this.resetPreview();
		this.notify.emit(value);
	}

	/* resetPreview
	@params: value:string
	@return: void

	descript: the notify emitter sends the user's descision to transfer or cancel
	*/
	resetPreview(){
		this.fromAccount = "";
		this.toAccount = "";
		this.amount=null;
	}
}