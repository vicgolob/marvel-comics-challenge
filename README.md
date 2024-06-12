# Marvel Characters Application

This project is a React application that allows users to search for Marvel characters and view their details and comics. It uses the Marvel API to fetch character data.

## Prerequisites

To run this application, you need to have Node.js and NPM installed on your machine.

## Environment Variables

For the application to work correctly, you need to configure the environment variables. To do this, copy the `env.example` file and rename it to `.env`. The values you need to set are as follows:

- `VITE_BASE_URL=https://gateway.marvel.com:443/v1/public`
- `VITE_PUBLIC_KEY=your_public_key`
- `VITE_PRIVATE_KEY=your_private_key`

To obtain the public key and private key, create an account by following this [link](https://developer.marvel.com/documentation/getting_started).

It is also important to configure the authorized referrers to authorize API calls. You can set "localhost" for the local development environment (when running `npm run dev`).
[Check your account](https://developer.marvel.com/account) to set the authorized referrers.

API documentation can be found at this [link](https://developer.marvel.com/docs).

## Scripts

These are the available scripts:

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run lint`: Lints the codebase.
- `npm run format`: Formats the code using Prettier.
- `npm run test`: Runs the tests using Vitest.

## Project Structure

Here is an overview of the project's structure:

- src/**tests**: Contains the tests.
- src/api: Contains the services to consume the Marvel API.
- src/assets: Contains SVG icons.
- src/components: Contains common components.
- src/context: Contains the application context for managing favorites and some navigation flows.
- src/hooks: Contains the useDebounce hook used to update the search value with a delay to prevent unnecessary requests.
- src/pages: Contains the different views of the application.

## Application Layout

The layout of the application is structured as follows:

```jsx
<CharactersContextProvider>
  <Header />
  <Router />
</CharactersContextProvider>
```

## Routes

There are only two routes in the application:

1. / or /characters: Renders src/pages/Characters. From this view, you can fetch characters from the API or view favorite characters by clicking on the favorites button in the Header component.
2. /characters/:characterSlug: Renders src/pages/CharacterDetail. Here, you can view a description of the character, including their name and photo, as well as a list of comics featuring the character, ordered by release date (most recent first).
   > **Note:** You can't navigate directly to the Character Detail view because the Slug Name is used to format a user-friendly URL. You must navigate to this view from the Characters view; otherwise, you'll see an error message in the UI.
