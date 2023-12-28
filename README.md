# Description

## Run on dev
1. Clone repository
2. Create a copy of ``` .env.template``` rename to ``` .env``` and change the values of environment variables
3. Install dependencies ``` npm install```
4. Build database ``` docker compose up -d```
5. Run prisma migrations ``` npx prima migrate dev```
6. Run seed ``` npx run seed```
7. Run the project ``` npm run dev```


## Run on prod

