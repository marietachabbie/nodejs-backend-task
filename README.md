# nodejs-backend-task

A simple app developed on `Node.js` - `Express` that runs migrations for `users` table on launch and supports routes for incrementing and decrementing their balances.

## to run the app:
```
npm i
npm run start
```

## to run unit tests:
```
npm run test
```

## to send HTTP requests with VS Code Rest Client extension:
[requests.http file sample](https://github.com/marietachabbie/nodejs-backend-task/blob/master/requests.http)

## to set environment variables:
[.env file sample](https://github.com/marietachabbie/nodejs-backend-task/blob/master/.env)

---

P.S. There is definitely a smarter way of testing 10000 requests with mocha. `for` loops were chosen because of the lack of time. If you know a better way and think that can teach it, free to reach out with suggestions.
