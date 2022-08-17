# Repinner 

POST to save repin cid

## Setup

Get web3.storage token + request pinning access

Token: https://web3.storage/tokens/

Repin: https://web3.storage/docs/how-tos/pinning-services-api/

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
