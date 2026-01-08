# Rentman

NX Monorepo for building scalable Angular applications created as a part of job application - front-end assignment. The assignment took around half a day - around 9-10h to complete :)

**Note:**
This repository showcases a basic example of how I currently structure and architect Angular Applications.
Angular 20 is used - still my local stup & there was no need to use any of the latest Angular features.

# Applications

- **DEMO** - Application used to demo new features/components.
- **...**

## Requirements

Node versions: 24.x, ^22.12.0, ^20.19.0. [Reference](https://nx.dev/docs/reference/nodejs-typescript-compatibility)

## Scripts

**Before running any scripts, please install the packages by running `npm install`**

- **DEMO :**

  - Run `npm run start:demo ` to start local dev server
  - Run `npm run build:demo:production ` to create production bundle
  - Run `npm run lint ` to run ES linter
  - Run `npm run test ` to execute unit tests
  - Run `npm run graph` to create NX Graph
  - Run `npm run reset` to reset NX cache
  - Run commands with `:affected` to exectute the scripts only for the affected apps/libs
