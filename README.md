# Express Health Middleware

This middleware adds four useful API's to monitor the express application.

## Installation

```bash
$ npm install --save express-health-middleware
```

## Usage

```js
const app = express();
const expressHealth = require('express-health-middleware');

app.use(expressHealth());

or 

app.use('/basePath', expressHealth());
```


# API's

API | Description
--- | ---
`/about` | Returns application information.
`/health` | Returns 200 status code.
`/memory-usage` | Returns Memory usage of application.
`/uptime` | Returns application running time.


# API Sample Responses

### /about

> **NOTE:**
> 1. Returns data from package.json.
> 2. Without package.json '/about' will returns application default 404 page. 

```json

{
    "name":"My App",
    "description":"App Description",
    "version":"1.0.0",
    "author":"Mr.XYZ",
    "license":"MIT",
    "homepage":"homepage url"
}

```


### /health

```
OK
```

### /memory-usage

```json

{
    "rss":"25.28 MB",
    "heapTotal":"8.79 MB","
    heapUsed":"6.58 MB",
    "external":"1.31 MB",
    "arrayBuffers":"25.77 KB"
}

```


### /uptime

```json

{ "uptime" : "00:16:49" }

```

### License

MIT 
