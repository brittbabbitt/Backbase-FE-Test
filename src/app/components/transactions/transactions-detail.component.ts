/*Overview
Component: Transactions-Detail
Description: grid view list of transactions to merchants
Inputs:
	transactions - list of merchant transactions to display in grid
Variables:
	icon - briefcase
	headerTitle - preview header
Functions:
	NONE
*/

import { Component, Input } from '@angular/core';

import { HeaderComponent } from '../header/header.component';

import { Transaction } from './transaction';

@Component({
  selector: 'transactions-detail',
  moduleId: module.id,
  templateUrl: 'transactions-detail.component.html',
  styleUrls: ['transactions-detail.style.css'],
})

export class TransactionsDetailComponent {
	@Input() transactions: Transaction[];

	private icon:string = 'fa fa-briefcase';
	private headerTitle: string = 'Recent Transactions';

	constructor(){}
 }