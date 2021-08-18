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
```

Start the application in development mode

```bash
npm run dev
```

This will start the react frontend on http://localhost:3000 and the node.js backend on http://localhost:5000. In development, you should access the application through the react frontend. The frontend will proxy requests to the backend during development. In production, the react frontend is compiled to a static set of assets contained in the `build/` folder, and these will be served directly from our backend.

## Set up linting

Do something like [this](https://daveceddia.com/vscode-use-eslintrc/) to automatically lint on saving.
