# Backbase Code Challenge - Front-end: Bank Module

## Intro

Below you should find a Brief Description of the application, how to install and run as well as some extra information on the project files.

## Brief Description - Revised verbage -

This single page application is designed in the provided JPEG (in the design folder) with the functionality of transferring money and showing the past transactions in a historical transactions list. Historical transactions were provided in a JSON file to begin the application.

### Before Starting - This is what you need on your 'puter'.

1. A computer, wait, you're on that. Nevermind.

2. Command Line - I don't care which, Terminal or Command Prompt. 
		_I'm a **PowerShell** fan, but to each ones own_

3. [Node.js](https://nodejs.org). 
	>He's my best friend on this project. He's pretty cool.
	>You've probably hear his name around, always lends a hand.
	
## Getting Started

### Installing and Running

1. Open Command/Terminal

2. run *npm install* in the root folder

3. run *npm start* and wait...the index page will generate in a browser on it's own.

## User Functionality

### Transfering Money

Using the Transfer Money form the user shoulb be able to:

1. Fill in the TO and AMOUNT fields of the form (the FROM field is DISABLED - i.e. this would be changed in another part of the full application).

2. Press "Submit" to preview the entered data.

3. Press "Transfer" on the preview screen. The Transaction should appear in the list of transactions and the balance should have also decreased in the FROM field.

### Transaction History

Displays a list of Transactions.

## Project Development

### File Structure

```
/Backbase-Test-Babbitt
	-/src
		-/app
			-/assets
				-background.jpg
				-logo.jpg
				-transactions.json
			-/components
				-/dropdown
				-/preview
				-/transactions
				-/transfers
			-/css
				-/font-awesome-4.7.0
				-styles.css
			-/services
				-transaction.service.ts (since there's only one)
			-bank.component.html
			-bank.component.ts
			-bank.module.ts
```

### Assets
*consists of*: background.jpg, logo.jpg, and transactions.json
*challenges*: icons didn't have transparent background, so I added font-awesome and used the same type of icon with their help.

### Components Model
	  	      
	  	      Root: Bank Component - app/bank.component.html

					Bank Component
						/   \
				Transfers	Transactions
				  /  \
		   Dropdown  Preview

#### Service Communication: TransactionService

*Injected Component*: Bank
*Data*: List of Transactions and Balance

*Errors*: All error reporting is handled via TransactionService

### Mobile First 

App designed with mobile first in mind. Uses Bootstrap and @media tag to shift elements when needed.

### Additions

In reacting to the design, modifications were made to it's living component.
	
1. Dropdown in Transfers Form changes on hover to identify it as clickable and not disabled or open text field.

2. Error messages are added when transfer amount is over the balance or negative. Also resets the amount to zero for negative or empty field.

3. Keypress reactive submit button.

4. Preview area (instead of a modal - most people don't like pop-ups) and button colors (cancel).

5. Mobile capability
