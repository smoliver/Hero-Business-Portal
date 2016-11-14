# Hero App Business Portal

## Config

Before running or building, you need to add a .env file to the root of the project (we use dotenv - https://github.com/motdotla/dotenv).  Your .env should look something like this:

```
	PROD_API_DOMAIN='https://example.com'
	STAGE_API_DOMAIN='https://stage.example.com'
```
If, for whatever reason, you want to build the app with a different api domain, just add <ENV>_API_DOMAIN to the .env and run 'webpack --env=<ENV>'.

## Running locally

```
	// In the root directory
	npm install
	npm start // By default, starts a live reloading dev server at http://localhost:8080/webpack-dev-server/
```

## Deploying

```
	// In the root
	npm run build
```

This will put the production-ready webpack bundle in the dist directory.  Copy bundle.min.js and index.html to your static site host, making sure both files are in the root directory.