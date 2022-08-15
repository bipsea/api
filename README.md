# API

POST to save metadata to database

## Setup

Make sure database is set up: https://github.com/bipsea/database

Create `.env.local` and add:

`POSTRESQL_CONNECTION=postgresql://dbuser:password@database.com:3211/mydb`

```bash
npm run dev
# or
yarn dev
```

Example to create row in database

```curl
curl --location --request POST 'localhost:3000/api/create' \
--header 'Content-Type: application/json' \
--data-raw '{
    "metadataUri": "https://ipfs.io/ipfs/bafkreigjdoplg6qattgtkx7zrfreky3xjk52dpxeqxf7bqx7funa2z6vpu"
}'
```
