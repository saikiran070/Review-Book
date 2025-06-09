# Book Review API

## Setup Instructions

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/book-review-api.git
   cd book-review-api

#install dependencies
npm install

Create a .env file with the following variables:

env
Copy code
PORT=3000
DB_URI=mongodb://localhost:27017/bookReviewAPI
JWT_SECRET=your-secret-key

#Run the server
node app.js
