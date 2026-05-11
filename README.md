# Wanderlust

Wanderlust is a full-stack travel listing web application where users can explore stays, search by country, browse categories, create listings, upload images, and share reviews. It is built as a practical Airbnb-style project with authentication, authorization, cloud image storage, server-side rendering, and MongoDB persistence.

Visit the live website: [https://wanderlust-mvf4.onrender.com/listings](https://wanderlust-mvf4.onrender.com/listings)

## Project Overview

Wanderlust is designed for discovering and managing travel stays in a simple, familiar, and responsive interface. Users can view listings by category, search for places by country, check listing details, leave ratings and reviews, and manage their own listings after logging in.

The project focuses on real-world backend and frontend concepts: routing, MVC structure, database relationships, sessions, authentication, image uploads, validation, authorization, flash messages, and deployment.

## Features

- Explore all travel listings in a responsive card layout
- Filter listings by categories like Rooms, Mountains, Castles, Beach, Farms, Camping, and more
- Search listings by country
- View detailed listing pages with image, price, location, owner, and reviews
- User signup, login, and logout
- Create, edit, and delete listings as an authenticated user
- Upload listing images using Cloudinary
- Add and delete reviews with star ratings
- Authorization checks so users can only manage their own content
- Flash messages for success and error feedback
- Server-side validation using Joi
- MongoDB session storage using connect-mongo
- Responsive navigation and listing UI

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- EJS
- EJS Mate
- Bootstrap
- Passport.js
- Passport Local Mongoose
- Cloudinary
- Multer
- Joi
- Express Session
- Connect Mongo

## Folder Structure

```text
Wanderlust/
├── app.js
├── cloudConfig.js
├── middleware.js
├── schema.js
├── controllers/
├── models/
├── routes/
├── views/
├── public/
├── init/
├── utils/
├── package.json
└── README.md
```

## Environment Variables

Create a `.env` file in the project root and add:

```env
ATLASDB_URL=your_mongodb_atlas_connection_string
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
SECRET=your_session_secret
```

Do not upload `.env` to GitHub. This project already keeps `.env` ignored through `.gitignore`.

## Run Locally

Install dependencies:

```bash
npm install
```

Start the server:

```bash
node app.js
```

Open:

```text
http://localhost:3000/listings
```

If port `3000` is already in use, run with another port:

```bash
PORT=3001 node app.js
```

## Main Routes

```text
GET    /listings              View all listings
GET    /listings/new          Create listing form
POST   /listings              Create a listing
GET    /listings/:id          View listing details
GET    /listings/:id/edit     Edit listing form
PUT    /listings/:id          Update listing
DELETE /listings/:id          Delete listing
POST   /listings/:id/reviews  Add review
DELETE /listings/:id/reviews/:reviewId Delete review
GET    /signup                Signup page
GET    /login                 Login page
GET    /logout                Logout user
```

## What I Learned

This project helped me understand how a real full-stack web application is structured. I practiced connecting frontend views with backend routes, handling user authentication, protecting private actions, storing images in the cloud, validating form data, and deploying a complete application online.

## Author

Made by Debabrata Andia.
