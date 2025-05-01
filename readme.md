# QuizMaster

QuizMaster is a quiz application built using React, Node.js, and MongoDB. It allows users to create and manage quizzes, view quizzes, and track their progress.

## Features

- Create and manage quizzes
- View quizzes by category
- Track quiz progress
- Admin dashboard for managing users and quizzes

## Installation

1. Clone the repository:

```bash
git clone https://github.com/muhammadranju/quiz-app.git
```

2. Install dependencies:

```bash
cd quiz-app
npm install
```

3. Create a `.env` file in the root directory and add the following environment variables:

```bash
MONGO_URI=mongodb://localhost:27017/quiz-app
JWT_SECRET=your-secret-key
```

4. Start the server:

```bash
npm start
```

5. Open your browser and navigate to `http://localhost:5000/` to access the application.

## Usage

### Registering Users

To register a new user, you can use the following command:

```bash
curl --location --request POST 'http://localhost:5000/api/auth/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "password123"
}'
```

### Logging In

To log in a user, you can use the following command:

```bash
curl --location --request POST 'http://localhost:5000/api/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "johndoe@example.com",
    "password": "password123"
}'
```

### Creating Quizzes

To create a new quiz, you can use the following command:

```bash
curl --location --request POST 'http://localhost:5000/api/quiz' \
--header 'Content-Type: application/json' \
--data-raw '{
    "question": "What is the capital of France?",
    "options": ["Paris", "London", "Berlin"],
    "correctIndex": 0,
    "category": "Geography"
}'
```

### Viewing Quizzes

To view all quizzes, you can use the following command:

```bash
curl --location --request GET 'http://localhost:5000/api/quiz/random'
```

To view quizzes by category, you can use the following command:

```bash
curl --location --request GET 'http://localhost:5000/api/quiz/category/Geography'
```

### Tracking Quiz Progress

To track quiz progress, you can use the following command:

```bash
curl --location --request GET 'http://localhost:5000/api/quiz/random'
```
