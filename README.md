# star-anise

**star-anise** is the codename for our amazing <insert idea here> project.

## Pre-requisites

- Node.js
- `npm` Node.js Package Manager

## Installation

Install dependencies for running and developing the project

```bash
npm install --save-dev
```

## Running

Create a `.env` file with the required variables

```bash
MONGO_URI=
COOKIE_KEY=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
FACEBOOK_CLIENT_ID=
FACEBOOK_CLIENT_SECRET=
```

Start the application in development mode

```bash
npm run dev
```

This will start the react frontend on http://localhost:3000 and the node.js backend on http://localhost:5000. In development, you should access the application through the react frontend. The frontend will proxy requests to the backend during development.

In production, the react frontend is compiled into a static set of assets saved to the `build/` folder. These will be served directly by our node.js backend.

## Deployment

The application is deployed continuously to *Heroku* and triggered by commits to the `main` branch. Check the repo description for the URL.

## Set up linting

Do something like [this](https://daveceddia.com/vscode-use-eslintrc/) to automatically lint on saving.
