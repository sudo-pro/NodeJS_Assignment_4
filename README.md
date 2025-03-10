## NodeJS Assignment 4

### Project Description
This project is a Node.js application that provides a platform for users to manage their profiles and establish friendships. It utilizes Express.js for the server framework and Sequelize for database interactions.

### Getting Started

#### Prerequisites
- Node.js (version 14 or higher)
- npm (Node Package Manager)

#### Installation

```sh
git clone https://github.com/sudo-pro/NodeJS_Assignment_4
cd NodeJS_Assignment_4
npm i
npm start
```

### Workflow

#### Project Setup

```sh
gh repo create NodeJS_Assignment_4 --private
mkdir NodeJS_Assignment_4
cd NodeJS_Assignment_4
git init .
git remote add origin git@github.com:sudo-pro/NodeJS_Assignment_4.git

npm init -y
npm i express ejs body-parser dotenv sequelize pg
npm i nodemon -D
echo "node_modules" > .gitignore
echo "## NodeJS Assignment 4" > README.md
touch server.js
```

#### Implementations

| Method   | Endpoint      | Description                                                               |
| -------- | ------------- | ------------------------------------------------------------------------- |
| `GET`    | `/`           | Displays a welcome message when the user accesses the homepage            |
| `GET`    | `/create`     | Serves a form with an input field for userName and a submit button        |
| `POST`   | `/add`        | A POST request to stores the username in the SQL database using Sequelize |
| `GET`    | `/users`      | Retrieves and displays all users stored in the database                   |
| `GET`    | `/edit/:id`   | Displays a pre-filled form with the existing username for editing         |
| `POST`   | `/update/:id` | On form submission update the user in an array or JSON file               |
| `DELETE` | `/delete/:id` | Deletes a user from the database using Sequelize’s .destroy() method      |
| `GET`    | `/user/:id`   | Display make friends page to establish One to Many Relationship           |
| `POST`   | `/user/:userId/friend/:friendId`   | To make a friend request                                                  |
| `DELETE` | `/user/:userId/friend/:friendId`   | To remove friendship DELETE request at this endpoint                      |

#### Repository Structure

```
$ROOT
├── config/                    # Configuration files for the application
├── controllers/               # Contains the logic for handling requests and responses
├── public/                    # Directory for static files (CSS, icons etc.)
├── routes/                    # Definitions of application routes
├── middlewares/               # Middleware functions for request validation and processing
├── models/                    # Database models for Sequelize
├── utils/                     # Utility functions used across the application
├── views/                     # EJS templates for rendering HTML views
├── .env.sample                # Sample environment variables file
├── .gitignore                 # Specifies files and directories to be ignored by Git
├── package.json               # Project metadata and dependencies
├── server.js                  # Entry point for the server application
└── README.md                  # Project documentation
```

