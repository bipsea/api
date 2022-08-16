# Repinner 

POST to save repin cid

## Setup

Create `.env.local` and add:

`WEB3_STORAGE_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6`

```bash
npm run dev
```

Example to create row in database

```curl
curl --location --request POST 'localhost:3000/api/repin' \
--header 'Content-Type: application/json' \
--data-raw '{
    "cid": "bafkreigjdoplg6qattgtkx7zrfreky3xjk52dpxeqxf7bqx7funa2z6vpu"
}'
```
