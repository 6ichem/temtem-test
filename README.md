# Challenge: Fullstack Movies

Creation of a web application: Movie app FlixFlex.

## Run

Install dependencies (in the root directory temtem-test):
```sh
yarn install
```

Android:
```sh
yarn run-android
```

iOS:
```sh
yarn run-ios
```

API/Backend:
```sh
yarn dev
```

## User stories

- As a user, I should be able to create an account with a username and a password ✅
- As a user, I should be able to view the list of movies and series on different pages ✅
- As a user, I should be able to consult, in the movies and series pages, all the movies/series available in batches of 10 ✅
- As a user, I should be able to add a movie or a series to my favorites list ✅
- As a user, I should be able to delete a movie or a series from my favorites list As a user, I should be able to view the list of my favorite movies and series As a user, I should be able to search for movies and series ✅
- As a user, I should be able to view the details of a movie or a series ✅
- As a user, I should be able to watch the trailer of a movie or a series ✅

## Tech used
- Mobile: React Native with TypeScript. Custom UI components, no use of UI libraries.
- Backend: Express.js with TypeScript
- Database: Prisma ORM and PostgreSQL with Supabase
- Architecture: Monorepo created using Turbo with DDD architecture for the front-end and DDD with microservices for the backend.

## API Documentation

This document provides an overview of the API endpoints available in this project. The API allows users to perform various operations related to authentication, content retrieval, and favorites management.

### Table of Contents

- [Auth](#auth)
  - [Sign Up](#sign-up)
  - [Sign In](#sign-in)
  - [Get User](#get-user)
- [Content](#content)
  - [Trending](#trending)
  - [Search](#search)
  - [Content Details](#content-details)
  - [Content Trailer](#content-trailer)
  - [Airing Today](#airing-today)
  - [Upcoming Movies](#upcoming-movies)
  - [Top Rated Movies](#top-rated-movies)
  - [Top Rated Shows](#top-rated-shows)
- [Favorites](#favorites)
  - [Add to Favorites](#add-to-favorites)
  - [Remove from Favorites](#remove-from-favorites)

## Auth

### Sign Up

Creates a new user.

- **URL:** `/auth/sign-up`
- **Method:** `POST`
- **Request Body:**
  - `createUserDto` (object): User information.
- **Authentication:** Not required
- **Response:**
  - Success:
    - Status Code: `200`
    - Body: User information.
  - Error:
    - Status Code: `400`
    - Body: Error message.

### Sign In

Authenticates a user and generates an access token.

- **URL:** `/auth/sign-in`
- **Method:** `POST`
- **Request Body:**
  - `createUserDto` (object): User information.
- **Authentication:** Not required
- **Response:**
  - Success:
    - Status Code: `200`
    - Body: Access token.
  - Error:
    - Status Code: `400`
    - Body: Error message.

### Get User

Retrieves user information.

- **URL:** `/auth/user`
- **Method:** `GET`
- **Authentication:** Required (JWT)
- **Response:**
  - Success:
    - Status Code: `200`
    - Body: User information.
  - Error:
    - Status Code: `400`
    - Body: Error message.

## Content

### Trending

Gets a list of trending content.

- **URL:** `/content/trending`
- **Method:** `GET`
- **Authentication:** Required (JWT)
- **Response:**
  - Success:
    - Status Code: `200`
    - Body: List of trending content.
  - Error:
    - Status Code: `400`
    - Body: Error message.

### Search

Performs a search for content based on a query.

- **URL:** `/content/search`
- **Method:** `GET`
- **Authentication:** Required (JWT)
- **Query Parameters:**
  - `q` (string): Search query.
- **Response:**
  - Success:
    - Status Code: `200`
    - Body: Search results.
  - Error:
    - Status Code: `400`
    - Body: Error message.

### Content Details

Gets detailed information about a specific content item.

- **URL:** `/content/details`
- **Method:** `GET`
- **Authentication:** Required (JWT)
- **Query Parameters:**
  - `id` (string): Content ID.
- **Response:**
  - Success:
    - Status Code: `200`
    - Body: Content details.
  - Error:
    - Status Code: `400`
    - Body: Error message.

### Content Trailer

Gets the trailer for a specific content item.

- **URL:** `/content/trailer`
- **Method:** `GET`
- **Authentication:** Required (JWT)
- **Query Parameters:**
  - `id` (string): Content ID.
- **Response:**
  - Success:
    - Status Code: `200`
    - Body: Trailer information.
  - Error:
    - Status Code: `400`
    - Body: Error message.

### Airing Today

Gets a list of content items airing today.

- **URL:** `/content/airing-today`
- **Method:** `GET`
- **Authentication:** Required (JWT)
- **Response:**
  - Success:
    - Status Code: `200`
    - Body: List of content airing today.
  - Error:
    - Status Code: `400`
    - Body: Error message.

### Upcoming Movies

Gets a list of upcoming movies.

- **URL:** `/content/upcoming-movies`
- **Method:** `GET`
- **Authentication:** Required (JWT)
- **Response:**
  - Success:
    - Status Code: `200`
    - Body: List of upcoming movies.
  - Error:
    - Status Code: `400`
    - Body: Error message.

### Top Rated Movies

Gets a list of top-rated movies.

- **URL:** `/content/top-rated-movies`
- **Method:** `GET`
- **Authentication:** Required (JWT)
- **Response:**
  - Success:
    - Status Code: `200`
    - Body: List of top-rated movies.
  - Error:
    - Status Code: `400`
    - Body: Error message.

### Top Rated Shows

Gets a list of top-rated shows.

- **URL:** `/content/top-rated-shows`
- **Method:** `GET`
- **Authentication:** Required (JWT)
- **Response:**
  - Success:
    - Status Code: `200`
    - Body: List of top-rated shows.
  - Error:
    - Status Code: `400`
    - Body: Error message.

## Favorites

### Add to Favorites

Adds a content item to the user's favorites.

- **URL:** `/favorites/add`
- **Method:** `PUT`
- **Request Body:**
  - `createFavoriteDto` (object): Favorite content information.
- **Authentication:** Required (JWT)
- **Response:**
  - Success:
    - Status Code: `200`
    - Body: Success message.
  - Error:
    - Status Code: `400`
    - Body: Error message.

### Remove from Favorites

Removes a content item from the user's favorites.

- **URL:** `/favorites/remove`
- **Method:** `DELETE`
- **Query Parameters:**
  - `id` (string): Content ID.
- **Authentication:** Required (JWT)
- **Response:**
  - Success:
    - Status Code: `200`
    - Body: Success message.
  - Error:
    - Status Code: `400`
    - Body: Error message.


## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
