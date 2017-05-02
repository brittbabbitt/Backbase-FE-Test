/*Overview
Component: Header
Description: Bank header information
Variables:
	icon - briefcase
	headerTitle - preview header
Functions:
	NONE
*/

import { Component, Input } from '@angular/core';

@Component({
  selector: 'header',
  moduleId: module.id,
  templateUrl: 'header.component.html'
})

export class HeaderComponent {
	@Input() icon: string;
	@Input() headerTitle: string;

	constructor(){}
 }