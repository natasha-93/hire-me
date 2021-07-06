# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

Design Notes:

- react-query uses hooks to fetch data, with built-in loading, error state, etc.
- material-ui to add quick styles.
- react-infinite-scroller to lazy load children. Created mock pagination using react-query which is overfetching to simulate a paginated API.
- Normally, wouldn't commit .env file or secrets
