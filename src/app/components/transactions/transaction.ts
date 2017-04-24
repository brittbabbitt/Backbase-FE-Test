/*Overview
Class: Transaction
Description: creates Transaction object to store transaction information
Variables:
	id - dynamically set for unique record keeping
	amount - holds amount to transfer
	categoryCode - code color of merchant
	merchant - merchant's name
	merchantLogo - merchant's logo
	transactionDate - holds date of transaction, if new transaction date is current date and time
	transactionType - holds transaction type, if new sets default of a transfer
Functions:
	NONE
*/

export class Transaction {
	public id: number;
	public amount: number;
	public categoryCode: string;
	public merchant: string;
	public merchantLogo: string;
	public transactionDate: number;
	public transactionType: string;

	constructor(){
		this.amount = 0;
		this.categoryCode = '';
		this.merchant = '';
		this.merchantLogo = '';
		this.transactionDate = Date.now();
		this.transactionType = 'Online Transfer';
	}
}
