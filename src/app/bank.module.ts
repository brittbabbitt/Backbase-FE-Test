import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { BankComponent } from './bank.component';

import { TransfersComponent } from './components/transfers/transfers.component';
import { TransactionsDetailComponent } from './components/transactions/transactions-detail.component';

import { DropdownComponent } from './components/dropdown/dropdown.component';
import { PreviewComponent } from './components/preview/preview.component';

@NgModule({
  imports: [ 
  				BrowserModule, 
  				FormsModule, 
  				HttpModule
			],
  declarations: [ 
  					BankComponent, 
  					TransfersComponent, 
  					TransactionsDetailComponent,
            DropdownComponent,
            PreviewComponent
				],
  bootstrap:    [ BankComponent ]
})
export class BankModule { }
