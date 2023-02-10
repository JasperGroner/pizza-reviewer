# Pizza Reviewer

A app to find the best pizza place!

## Features: 

  - View pizza places and reviews

  - Register, log-in, and log out as a user

  - Create and change user image

  - Create, delete, and edit pizza places

  - Create, delete, and edit pizza place reviews

  - Upvote and downvote reviews

## To set up:

  - Clone the repository

  - Set up your .env based on .env.example. This will require you to have an AWS account.

  - Run `yarn install`

  - Run `createdb pizza-reviewer_development`

  - Navigate to the server folder and run:

    * `yarn migrate:latest`

    * `yarn db:seed`

  - Navigate to the app root directory and run `yarn dev`

  - Go to `localhost:3000` in a browser to see the app!

## Creators:

James Young

Muizz Jakhar

William Vo

Jasper Groner

## Technologies used: 

Front End: ReactJS, Sass, HTML

Back End: NodeJS, Express, Objection, Knex