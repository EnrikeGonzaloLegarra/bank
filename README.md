# Bank
## Features

- Create a route to create user:-
User will provide there first name, last name, age and bank balance.
You will create user in database will this information and create a 10 digit random account number.
Due to security reasons you will create a 14 digit user password which contains number, letters and special characters
- Users should only be able to make transactions or add connections only after login.
- Users should be able to send and approve connection requests.
- Except the create user and login route, all other routes should use authentication, use can use bearer tokens which are at most valid for 15 mins.
- Users should have the ability to add connections using someone's bank account number.
- User should be able to see the name, age and bank account number of all their connections in a list.
- Users can remove a connection from their account.
- Users can send and receive money to accounts which are there connection. Each transaction should be in the database.
- Bank makes 1% on each transaction below 1,000 and 0.5% every transasction above 1,000.
- Users should be able to see there past transactions.
- Each transction should also be saved in a .csv file in the file system with following format.
- Bank admin should be able to see how much money bank has made from transactions through a separate route, but you can't store that information in an account. We would like you to use mongo's aggregation framework to calculate money made by the bank.
- Make sure you handle all the edge cases and error scenarios for example:-
What should happen when the user has zero balance and user tries to send money.
User tries to send money which is greater than their bank balance.
User tries to send money to someone who is no longer has them as their connection.


## Technologies

- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework 
- [Mongoose] - node ORM

## Installation

Install the dependencies and devDependencies and start the server.

```sh
cd bank
npm i
npm run dev
```

## EndPoints

#### Create User

```sh
localhost:3000/api/create/user
BODY (POST)
{
"name":"User 11",
"lastName":"User 11",
"accountBalance":10000
}
```
#### Login
```sh
localhost:3000/api/login
BODY (POST)
{
	"name": "User 3",
	"password": "1ot%D<X0HVMNBv"
}
```
#### Send Connection
```sh
(POST)
localhost:3000/api/send-connection/:userAccountNumber
```
#### Send Money
```sh
(POST)
localhost:3000/api/send-money
{
    "accountNumber":"8327348218",
    "amount":"2"
}
```
#### Connection List
```sh
(GET)
localhost:3000/api/connection/list
```
#### Delete Connection
```sh
(DELETE)
localhost:3000/api/send-connection/userAccountNumber
```
#### Calculate 
```sh
(GET)
localhost:3000/api/calculate
```

   [node.js]: <http://nodejs.org>
   [express]: <http://expressjs.com>
   [Mongoose]:<https://mongoosejs.com>

