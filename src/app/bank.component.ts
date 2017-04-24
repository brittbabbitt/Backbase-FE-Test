/*Overview
**Main Component**[ROOT]
Component: Bank
Subcomponents: Transfers, TransactionsDetail
Services: TransactionService
Description: communicates transfers between the subcomponents and service
Variables:
	transfer - holds transferInformation to update transactions when needed
	transactions - holds the list of transactions
	merchantsList - holds a unique merchant list
	balance - holds overall balance
Functions:
	updateTransactions - sends the recieved Transaction object from Transfers Component
		to addTransaction in TransactionService
	getInitTransactions - gets the balance and list of transactions from TransactionService
		sets the transactions list and sends a list to getUniqueMerchantList()
	getUniqueMerchantList - ensures that the dropdown list has unque values in Transfers Component
*/

import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Transaction } from './components/transactions/transaction';
import { TransfersComponent } from './components/transfers/transfers.component';
import { TransactionsDetailComponent } from './components/transactions/transactions-detail.component';
import { TransactionService } from './services/transaction.service';

@Component({
  selector: 'bank',
  moduleId: module.id,
  templateUrl: 'bank.component.html',
  providers: [TransactionService]
})

export class BankComponent implements OnInit{

	private transfer: Transaction;
	private transactions: Transaction[] = [];
	private merchantsList: any;
	private balance: number;

	constructor(private service: TransactionService){
		this.transfer = new Transaction();
	}

	ngOnInit(){
		this.merchantsList = new Set();
		this.getInitTransactions();

	}

	/* updateTransactions
	@params: transfer:Transaction
	@return: void

	descript: sends the recieved Transaction object from Transfers Component
		to addTransaction in TransactionService, and updates the account balance
	*/
	updateTransactions(transfer: Transaction):void{
		var promiseTransactions = this.service.addTransaction(transfer);
		var p = Promise.resolve(promiseTransactions);
		p.then(transactions => {
			this.transactions = transactions;
		})
		.catch(error => this.service.handleError(error));

		this.balance = this.service.calculateNewBalance(transfer.amount);
	}

	/* getInitTransactions
	@params: none
	@return: void

	descript: gets the balance and list of transactions from TransactionService
		sets the transactions list and sends a list to getUniqueMerchantList()
	*/
	getInitTransactions():void{
		this.balance = this.service.getBalance();

		this.service.getTransactions()
					.then(transactions=>{
						var p = Promise.resolve(transactions);

						console.log('getInitTransactions: ');
						console.log(transactions);
						p.then(transactions => {
							this.transactions = transactions;
							this.getUniqueMerchantList(transactions);
							});
							//this.transactions = transactions;
					})
					.catch(error => this.service.handleError(error));
	}

	/* getUniqueMerchantList
	@params: transfers:Transaction[]
	@return: void

	descript: ensures that the dropdown list has unque values in Transfers Component
	*/
	private getUniqueMerchantList(transfers:Transaction[]):void{
		for(var i = 1; i < transfers.length; i++){
				this.merchantsList.add(transfers[i].merchant);
		}
	}
}