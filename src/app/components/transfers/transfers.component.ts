/*Overview
Component: Transfers
Subcomponents: Dropdown and Preview
Description: form that displays and collects the information to perform the process of a transfer
Inputs:
	transfers - copy of the list of transactions from bank component
	merchantsList - list of merchants
	balance - overall balance of the user's checking account
	isValidAmount - boolean for checking if amount entered is valid
	isAmountSet - boolean for checking if amount is entered into text field
Outputs:
	send - event emitter for Transaction value to add to transactions list in Bank Component
Variables:
	icon - refresh
	headerTitle - transfer header
  -Data-
	merchantInfo - holds the selected merchant information as a Transaction
	merchantSelected - holds the user selected merchant from the Dropdown
  -View-
  	hide - toggle for submit and preview
  	amount - holds value of amount for transfer
  	errorAmount - shows error if amount is not valid
Functions:
	onNotify - captures and sends the merchantInfo to add to transactions list in Bank Component
	onSelectMerchant - gets value from Dropdown and stores it in merchantSelected
	setMerchantInfo - sets the merchant information in the merchantInfo Transaction object
	getSelectedMerchantInfo - gets the selected merchant information from the transfers list and sends 
		the Transaction object to setMerchantInfo() then returns the selected merchantInfo
	onClick - shows preview information -- utilized this for submit, but did not want the default function of submit 
	onFocus - sets flags and/or clears amount input
	onKeypress - sets flags for submit button
	onBlur - sets flags and checks value for basic valid amount
	roundDecimal - forces currency on input and rounds over entered values to conform to 2 decimal places
*/
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Transaction } from '../transactions/transaction';
import { DropdownComponent } from '../../components/dropdown/dropdown.component';
import { PreviewComponent } from '../../components/preview/preview.component';

@Component({
  selector: 'transfers',
  moduleId: module.id,
  templateUrl: 'transfers.component.html',
  styleUrls: ['transfers.style.css'],
})
export class TransfersComponent{
	@Input() transfers: Transaction[];
	@Input() merchantsList: any;
	@Input() balance: number;
	@Input() isValidAmount: boolean;
	@Input() isAmountSet: boolean;

	@Output() send: EventEmitter<Transaction> = new EventEmitter<Transaction>(); 
	
	private icon: string = 'fa fa-refresh';
	private headerTitle: string = 'Make a Transfer';

	private merchantInfo: Transaction;
	private merchantSelected: string;

	private hide: boolean; //submit button hidden attr
	private amount: number; //output for preview component
	private errorAmount: string;

	constructor(){
		this.hide = false;

		this.merchantSelected = 'The Tea Lounge';
		this.errorAmount = 'Transfer Exceeds Balance';
		this.amount = 0;
		
		this.isValidAmount = true;
		this.isAmountSet = false;
	}
	
	/* onNotify
	@params: value:string
	@return: void

	descript: recieves 'cancel' || 'confirm' 
		-'cancel' - hides preview
		- 'confirm' - sets the selected merchant informaton, resets form, and sends it to the Bank Component
	*/
	onNotify(value:string): void{
		value = value.toLowerCase();

		if(value == 'cancel'){
			this.hide = false;
		}else{
			//add amount to merchantInfo
			this.merchantInfo.amount = this.amount;

			//reset form
			this.merchantSelected = this.transfers[0].merchant;
			this.amount = 0;
			this.hide = false;

			//send information to be transfered with ammount
			this.send.emit(this.merchantInfo);
		}
	}

	/* onSelectMerchant
	@params: value:string
	@return: void

	descript: sets selected merchant from Dropdown
	*/
	onSelectMerchant(value:string):void{
		this.merchantSelected = value;
	}

	/* onClick
	@params: none
	@return: none

	descript: checks amount flag, adds selected merchantInfo, sets id, and shows preview
	*/
	onClick(){
		if(!this.isAmountSet){
			return;
		}
		this.merchantInfo=this.getSelectedMerchantInfo();
		this.merchantInfo.id = this.transfers.length;
		this.hide = true;
	}

	/* onFocus
	@params: none
	@return: none

	descript: checks amount to clear input and resets amount flags
	*/
	onFocus(){
		if(this.amount == 0){
			this.amount = null;
		}else{
			this.amount = this.amount;
		}
		this.isValidAmount = true;
		this.isAmountSet = false;
	}

	/* onKeypress
	@params: value:number
	@return: none

	descript: checks for entered value to set flags to enable/disable submit
	*/
	onKeypress(value: number){
		if(!value){
			this.isValidAmount = true;
			this.isAmountSet = false;
		}else{
			this.isAmountSet = true;
			this.isValidAmount = true;
		}
	}

	/* onBlur
	@params: value:number
	@return: none

	descript: sets amount to a rounded cent value, checks value for invalid value to set flags
		and/or reset amount
		-error cases: value < zero || value > balance
	*/
	onBlur(value: number){
		this.amount = this.roundDecimal(value, 2);
		value = this.amount;

		if(value <= 0){
			this.amount = 0;
			this.errorAmount = 'Transfers cannot be zero nor negative amounts';
			this.isValidAmount = true;
			this.isAmountSet = false;
		}else if(value > 0){
			this.amount = value;
			if(value > this.balance){
				this.errorAmount = 'Transfer Exceeds Balance';
				this.isValidAmount = false;
				this.isAmountSet = false;
			}else{
				//value is vaid and set - ready for confirming
				this.isAmountSet = true;
				this.isValidAmount = true;
			}
		}else{
			this.amount = 0;
			this.isValidAmount = true;
			this.isAmountSet = false;
		}		
	}

	/* getSelectedMerchantInfo
	@params: none
	@return: Transaction

	descript: gets the selected merchant information from the transfers list and sends 
		the Transaction object to setMerchantInfo() then returns the selected merchantInfo
	*/
	private getSelectedMerchantInfo():Transaction{
		var list = this.transfers;
		for(var i = 0; i < list.length; i++){
			if(list[i].merchant == this.merchantSelected){
				this.merchantInfo = this.setMerchantInfo(list[i], i);

				return this.merchantInfo;
			}
		}

		//This should never be reached being that the 
		//merchantSelected comes from a Dropdown
		console.error("Error: Merchant not selected");
	}

	/* setMerchantInfo
	@params: transfer:Transaction, i:number (temp id)
	@return: Transaction

	descript: sets the merchant information in the merchantInfo Transaction object
	*/
	private setMerchantInfo(transfer:Transaction, i: number):Transaction{
		var newTransfer:Transaction = new Transaction();

		newTransfer.id = i+1;
		newTransfer.amount = transfer.amount;
		newTransfer.categoryCode = transfer.categoryCode;
		newTransfer.merchant = transfer.merchant;
		newTransfer.merchantLogo = transfer.merchantLogo;

		return newTransfer;
	}

	/* roundDecimal
	@params: value:number, digits:number (decimial to round to)
	@return: none

	descript: rounds over entered decimal values to specified digit value
	*/
	private roundDecimal(value: number, digits: number): number{
		var multiplicator = Math.pow(10, digits);

		if (isNaN(value))
			return 0;

	    value = parseFloat((value * multiplicator).toFixed(11));
	    return Math.round(value) / multiplicator;
	}
}