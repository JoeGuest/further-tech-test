# Joseph Guest - Further Tech Test

This is Joseph Guests submission for the Further Tech Test.

## Prerequisites

- Node.js
- NPM

## Installation

To get started, clone the repository and run `npm install`.

## Running the app

To run the application:

Run `npm run dev` to start the development server.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Running the tests

Run `npm run test` to execute the unit tests.

# Exercise Requirements

See here: https://gist.github.com/jblok/335fe03094e4772452fb12d1a8a9b9a9

# Notes

- This solution doesn't take into account bank holidays
- What if the phone investment is outside UK working hours? Did it get made the next working day? - Assumption: investment made at exact date detailed
- Looked at the supplied table and wrote a test suite for it, checking what the results should be manually via [savvytime](https://savvytime.com/). Another approach would have been to write tests for the rules first, but I wanted to ensure I was directly testing the intended output
- Let's store dates as dates, not as 3 separate strings please 😄
