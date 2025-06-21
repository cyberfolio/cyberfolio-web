# Cyberfolio Web

Client application where you can track DEX and CEX portfolio, built with React and TypeScript.

## Features

- React with TypeScript
- Vite for bundling
- SCSS for styling

## Getting Started

1. **Clone the repo**  
   git clone git@github.com:cyberfolio/cyberfolio-web.git
   cd cyberfolio-web

2. **Install dependencies**  
   yarn install

3. **Run the app**  
   yarn dev

## Folder Structure

src/  
 ├── app/ — App initialization logic (e.g. providers, routing)  
 ├── assets/ — Static assets like images and icons  
 ├── components/ — Reusable UI components  
 ├── config/ — Configuration files (e.g. api client)  
 ├── constants/ — Application-wide constant values  
 ├── hooks/ — Custom React hooks  
 ├── pages/ — Route-based components  
 ├── services/ — API service handlers  
 ├── store/ — Global state management  
 ├── structures/ — Shared types and interfaces  
 ├── styles/ — Global styles and theme setup  
 ├── utils/ — Helper functions and utilities  
 ├── index.tsx — App entry point  
 └── vite-env.d.ts — Vite-specific types

## Environment Variables

Create a `.env` file in the root directory and add your environment variables. For example:

```env
VITE_APP_ENV=${environtment of the app, e.g. development, production}
VITE_APP_TITLE=${title of the app, e.g. Cyberfolio}
VITE_BACKEND_URL=${main backend URL, e.g. https://api.cyberfolio.com}
VITE_WALLETCONNECT_PROJECT_ID=${your WalletConnect project ID}
VITE_ALCHEMY_API_KEY=${your Alchemy API key}

```

## Scripts

- `yarn dev` – start the development server
- `yarn build` – build for production
- `yarn preview` – preview production build

## License

MIT
