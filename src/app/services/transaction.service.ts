/*Overview
Service: Bank
Description: stores a list of transactions and account balance
Variables:
	transactionsUrl - holds url of transaction data
	transactions - holds the list of transactions
	balance - holds overall balance
Functions:
	getTransactions - checks for transactions list to be empty, if empty calls getFile() to populate list and 
		return a promise of that list
	initTransactions - copys a list of transactions with UIDs to service's copy of the list
	setTransferProperties - copies information from Transaction object to a new Transaction object (unique objects)
	addTransaction - adds a Transaction object from Transfer Component to list of transactions,
		and returns a promise that the transations have been updated along with the current list
	handleError - prints error on the console and returns a rejected Promise
	getBalance - returns the current balance of the account
	calculateNewBalance - checks the transaction amount to ensure it is less than balance 
		then subtracts the amount from current balance and returns balance value
	getFile - gets the data list of transactions from the json file

*/
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { Transaction } from '../components/transactions/transaction';

@Injectable()

export class TransactionService{

	private transactionsUrl: string = './app/assets/transactions.json'; // URL to JSON file
	private transactions: Transaction[];
	private balance: number = 5824.76;

	constructor (private _http: Http) {}

	/* getTransactions
	@params: none
	@return: Promise of Transactions[]

	descript: checks for transactions list to be empty, if empty calls getFile() to populate list and 
		return a promise of that list
		- helper: initTransactions()
	*/
  	getTransactions(): Promise<Transaction[]>{
  		if(this.transactions){
  			return Observable.of(this.transactions).toPromise();
  		}else{
  			return this.getFile()
  					.then(transactions =>{ 
  						this.initTransactions(transactions);
  						return Observable.of(this.transactions).toPromise();
  					 })
					.catch(error => this.handleError(error));
  		}
  	}

  	/* initTransactions
	@params: transactions:Transaction[]
	@return: void

	descript: copys a list of transactions with UIDs to service's copy of the list
		- helper: setTransferProperties()
	*/
  	private initTransactions(transactions: Transaction[]): void{
		this.transactions = [];

		for(var i = 0; i < transactions.length; i++){
			var newTransfer = this.setTransferProperties(transactions[i]);
			newTransfer.id = i;
			this.transactions.push(newTransfer);
		}
	}

	/* setTransferProperties
	@params: transfer:Transaction
	@return: Transaction

	descript: copies information from Transaction object to a new Transaction object (unique objects)
	*/
	setTransferProperties(transfer:Transaction): Transaction{
		var newTransfer:Transaction = new Transaction();

		newTransfer.amount = transfer.amount;
		newTransfer.categoryCode = transfer.categoryCode;
		newTransfer.merchant = transfer.merchant;
		newTransfer.merchantLogo = transfer.merchantLogo;
		newTransfer.transactionDate = transfer.transactionDate;
		newTransfer.transactionType = transfer.transactionType;

		return newTransfer;
	}

	/* addTransaction
	@params: transfer:Transaction
	@return: Promise of Transactions[]

	descript: adds a Transaction object from Transfer Component to list of transactions,
		and returns a promise that the transations have been updated along with the current list
		- helper: setTransferProperties()
	*/
	addTransaction(transfer: Transaction): Promise<Transaction[]>{
		var newTransfer = this.setTransferProperties(transfer);
		newTransfer.id = this.transactions.length;
		this.transactions.unshift(newTransfer);
		return Observable.of(this.transactions).toPromise();
	}

	/* handleError
	@params: error:any
	@return: Promise of any

	descript: prints error on the console and returns a rejected Promise
	*/
	handleError(error: any): Promise<any> {
	    console.error('An error occurred', error); // for demo purposes only
	    return Promise.reject(error.message || error);
  	}

	/* getBalance
	@params: none
	@return: number

	descript: returns the current balance of the account
	*/
  	getBalance(): number{
  		return this.balance;
  	}

  	/* calculateNewBalance
	@params: transaction:number
	@return: number

	descript: checks the transaction amount to ensure it is less than balance 
		then subtracts the amount from current balance and returns balance value
		- error case: transaction < balance
	*/
  	calculateNewBalance(transaction: number): number{
  		if(transaction < this.balance){
  			this.balance = this.balance - transaction;
  		}else{
  			//shouldn't be able to reach this line with the form validation error checking
  			console.error("Error: Balance can not fall below zero.");
  		}
  		return this.balance;
  	}

  	/* getFile
	@params: none
	@return: Promise of Transaction[]

	descript: gets the data list of transactions from the json file
	*/
	private getFile(): Promise<Transaction[]>{
		return this._http.get(this.transactionsUrl)
						.toPromise()
						.then(response => response.json().data as Transaction[])
						.catch(error => this.handleError(error));
	}

	
}