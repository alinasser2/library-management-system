
  

# Library Management System

  

## Overview

  

The Library Management System is a backend API built with Node.js, Express, and Sequelize, using a MySQL database. It allows for managing books, borrowers, and the borrowing process, as well as generating analytical reports. This API supports CRUD operations, borrowing functionality, and reporting features.

 


## FAQ

### what did i achieve in this assessment ?
1. all the basic requirements (Books, Borrowers, Borrowing)
2. Performance : indexed data in the database so the reading operations are optimized
3. scalability (service, repository) patterns and modularity
4. Security all inputs are validated 
5. The system can show analytical reports of the borrowing process in a specific period and
export the borrowing process data in CSV sheet format
6. Exports all overdue borrows of the last month.
7. Exports all borrowing processes of the last month.
8. rate limiting for the API 
9. Dockerizing the application using docker-compose.
10. soft deleting
### what design patterns used in this project ?

#### 1. **Service Layer** (Business Logic)

-   **Role**: The service layer is responsible for handling the core business logic of the application. It receives requests from controllers, processes the necessary logic, and interacts with repositories to fetch or store data.
-   **Purpose**:
    -   **Encapsulate Business Logic**: The service layer processes all business rules, such as borrowing logic, validating data, calculating due dates, or enforcing borrowing limits. This ensures the controller layer remains clean and focused on HTTP-related tasks.
    -   **Error Handling and Validation**: The service layer can handle custom errors or validations specific to business rules. For instance, if a borrower is not eligible to borrow more books, the service layer handles this condition and throws an appropriate error.
    -   **Maintainability**: Any change to business rules (like adjusting the borrowing policy) only affects the service layer without impacting the controllers or data access layer.

#### 2. **Repository Layer** (Data Access)

-   **Role**: The repository layer provides an abstraction over direct database interactions. It serves as the bridge between the data storage (database) and the service layer, handling raw CRUD operations.
-   **Purpose**:
    -   **Data Access Abstraction**: The repository layer abstracts direct SQL queries or ORM operations. For example, it encapsulates all Sequelize calls (like `findAll`, `create`, `update`, etc.) within repository methods.
    -   **Centralized Data Logic**: By centralizing data access logic in repositories, your app avoids spreading SQL or ORM code across the service and controller layers. This centralization simplifies code and allows for easier updates to the data access layer.
    -   **Swappable Data Sources**: If you decide to change the database technology (e.g., switching from MySQL to PostgreSQL), you’d only need to adjust repository implementations, leaving your services and controllers unaffected.


### what is the advantage of using service-repository design patterns ?

-   **Separation of Concerns**:
    -   Each layer has a distinct role: controllers handle HTTP, services manage business logic, and repositories access data. This separation makes it easier to understand and maintain each component.
-   **Testability**:
    -   Services and repositories are easily testable in isolation. Repositories can be mocked during service tests to verify that services handle business logic independently of database behavior.
-   **Scalability**:
    -   As your application grows, adding new features, business rules, or data access requirements becomes simpler with this modular structure. New repositories or services can be introduced without altering existing ones.
-   **Flexibility**:
    -   Using the repository pattern allows you to change data storage strategies with minimal impact on other layers. Additionally, the service layer can adapt as business rules evolve, ensuring flexibility in responding to new requirements.

  ### how did i improve database reading and what could go wrong because of this technique ? 
  i actually used indexing , i indexed the most important columns in each table this technique is generally good but after a while it will cause anomaly problems as the indexing tree will become bigger and the real time the crud operations need to execute will become really big
#### solution 
horizontal partitioning


### what SOLID principles did i achieve and what not and why ?

single responsibility : the code is partitioned to multiple layers 
1. controllers which are responsible for encapsulating the HTTP layer 
2. services which is responsible for encapsulating all the business logic
3. repository which is responsible for all the data access operations (centralizing the queries)

#### the other prinsibles OLID depends on the interfaces but it was hard to implement interfaces in this time frame


## Features

  

### Books

-  **Add Book**: Create a new book record with title, author, ISBN, quantity, and location.

-  **Update Book**: Update details of an existing book.

-  **Delete Book**: Remove a book from the library database.

-  **List and Search Books**: Retrieve a list of books or search by id, title, author, or ISBN.

  

### Borrowers

-  **Register Borrower**: Add a new borrower with basic details (name, email).

-  **Update Borrower**: Update information about a borrower.

-  **Delete Borrower**: Remove a borrower from the library system.

-  **List Borrowers**: Retrieve a list of all borrowers.

  

### Borrowing Process

-  **Borrow a Book**: Record the borrowing of a book by a borrower, including a due date.

-  **Return a Book**: Record the return of a borrowed book.

-  **List Borrowed Books**: View books currently borrowed by a borrower.

  

### Reports

-  **Export Borrowing Data**: Generate a report for borrowings within a specified date range (CSV).

-  **Export Overdue Borrowings**: Export all overdue borrowings from the last month.

-  **Export Monthly Borrowing Data**: Generate a report for all borrowing activities within the last month.




## Optional Features

  

1.  **Rate Limiting**: Implemented on selected endpoints to prevent abuse.

2.  **CSV/XLSX Export**: Export reports in CSV or XLSX formats for analytical purposes.

3.  **Docker**: A `docker-compose.yml` file is available for containerized deployment.

  
  

## Installation

  

1.  **Clone the Repository**:

```bash

git clone https://github.com/alinasser2/library-management-system.git

cd library-management-system

```

  

2.  **Install Dependencies**:

```bash

npm install

```

  

3.  **Configure Environment Variables**:

Create a `.env` file in the root directory and add the following variables:

```plaintext

DB_NAME=library_dev

DB_USER=root

DB_PASSWORD=root

DB_HOST=127.0.0.1

DB_PORT=3306

DB_DIALECT=mysql

NODE_ENV=development

```

  

4.  **Run Database Migrations**:

```bash

npx sequelize db:migrate

```

  

5.  **Start the Server**:

```bash

npm run dev

```

  

The API will be available at `http://localhost:3000`.

 

  

## Postman Collection

  

To test the API, you can use the provided Postman collection. Import the collection JSON file into Postman to access pre-configured requests for all API endpoints.

https://drive.google.com/file/d/1jp82_cnchzfNTcqWyeo7rebA1JQDM5Xc/view?usp=sharing
  

### Usage Instructions

  

1. Open Postman.

2. Import the collection file: `Library Management System.postman_collection.json`.

4. Use the pre-configured requests to test each endpoint.



  

## Error Handling

  

The API returns structured error responses for validation errors, missing resources, and duplicate entries. Responses follow this format:

**note** : error resource is centralized means the error response structure returns the same error structure in the whole project also i raise custom exception and handled it in the global exception handler which provides error handling centralization

  

```json

{

"status": "error",

"message": "Error message",

"errors": ["Detailed errors if available"]

}

```

  


## Schema Diagram

  

Refer to the [schema image](https://drive.google.com/file/d/1NZfganPL74LhPPf21XJ0RI3n2pDgoSyt/view?usp=sharing) file for the database schema diagram, illustrating the structure and relationships between `Books`, `Borrowers`, and `Borrows`.

  

## Repository

  

[GitHub Repository](https://github.com/alinasser2/library-management-system)
