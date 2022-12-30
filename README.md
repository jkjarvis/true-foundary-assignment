## How To Run
1. Clone the repo.
2. From a terminal, run `npm install` 
3. After packages are installed, we will create migrations by running `npm prisma migrate dev`.
4. Using ngrok, map port to 3000 (or whichever port the nest server is running on your machine), `ngrok http 3000`.
5. Since this project uses github application, you will need a clientId and clientSecret and also need to add a callback url, create a github app here: 
`https://github.com/settings/applications/new`
6. in your project, create a `.env` file and add the values for the following:
  DATABASE_URL= e.g "file:./dev.db"
  GITHUB_CLIENT_ID
  GITHUB_CLIENT_SECRET
  SERVER_BASE_URL = The ngrok link
7. Run the server using `npm run start:dev`
