# Design Doc

The purpose of this app is to allow users to manager their Bitcoin wallet, specifically granting the ability to add or remove addresses, sync transactions, retrieve current balances, and retrieve transaction histories for these addresses.

## Functional requirements

-> Add address
-> Remove address
-> Sync transactions by address
-> Get current balance for address
-> Get all transactions for address

## Target components

1. Web API Service
2. Database
3. UI

Background wallet synchronization job will be left as a reach goal assuming the first 3 components are integrated and functional.

## Assumptions

Given the time constraint, the project primary focus is building an MVP. This means the boiling down the app to the core components needed to carry out each of the functional requirements without polish, monitoring...In other words, build a working prototype the satisfies the requirements, identify any possible obstacles and capture them, and iterate.

As of now this means:

* Data model/normalization will not be optimal but rather enough to clearly outline main entities (e.g. wallet, transaction, etc)
* Data models to track state over time which would be ideal (e.g. history/audit table/event sourcing) will be out of scope but should be considered as updating things like transactions, balances, etc in our models should not be destructive operations ideally
* User authentication will be out of the initial scope
* Will not spend a great deal of time building frontend components for the initial iteration

## High-level component design

### Data

* Address
  * id
  * address (external_id)
  * nickname
  * transactions
  * balance
* Transaction
  * id
  * amount
  * sender
  * receiver
  * wallet_id

### API Endpoints

* Address
  * Get by id
  * Get all
  * Update by id (nickname, balance)
  * Create
  * Remove
* Transactions
  * Sync transactions by address id
  * Sync transactions for all (ideally this would be a job that could be triggered and/or scheduled to run)
  * Get by id
  * Get all for address
* Balance
  * Get all
  * Get by address

* note on the get all, ideally these would be scoped by user account, meaning you cannot just grab data that is not associated with an account. But for this first iteration, it will return everything as I it will allow for the surrounding components to be built and tested. If time permits, these types of operations would be guarded by permission (ever permission sets if say an account could have sub-accounts...e.g. more than one authorized user with one user being the owner)

### Frontend

* Landing page/Dashboard
  * View list of all addresses with current balance (e.g. Grid of selectable cards)
  * View most recent transaction
  * Add address button
* Address details page
  * View all transactions sorted by most recent (ideally paginated)
  * View balance
  * Delete address button with confirmation

## Tooling

* Docker/Compose
  * dev will consist of just database, frontend and backend can run locally
  * prod will have the binaries for both frontend client server and backend web api server, database as well
* Database: Postgres
* Backend:
  * Python
  * FastAPI
  * SQLAlchemy
  * migrate
  * blockchain api
* Frontend
  * Vite + React (vanilla react)
