# User auth with graphql

Node 20

1. Run server

Add .env with env vars
```
MONGO_USER
MONGO_PW
JWT_SECRET
```

```
cd server
npm i
npm run codegen
npm run dev
```

Server will start in port 3001

2. Run client

```
cd client
npm i
npm start
```