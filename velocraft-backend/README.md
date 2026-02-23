# Velocrafts Technologies – API Backend

LoopBack 4 REST API backend for Velocrafts Technologies. Generated with [LoopBack 4 CLI](https://loopback.io/doc/en/lb4/Command-line-interface.html).

## Database Setup (MySQL / PHPMyAdmin)

1. Create the database in PHPMyAdmin (e.g. `velocraft`)
2. Copy `.env.example` to `.env` and set your MySQL credentials:

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=velocraft
```

3. Run migration to create tables:

```bash
npm run migrate
```

- `npm run migrate` - Creates/updates tables (preserves data)
- `npm run migrate -- --rebuild` - Drops and recreates tables (**deletes all data**)

Alternatively, you can create the `contacts` table manually using `database/create_contacts.sql` in PHPMyAdmin.

## Install dependencies

By default, dependencies were installed when this application was generated.
Whenever dependencies in `package.json` are changed, run the following command:

```sh
npm install
```

To only install resolved dependencies in `package-lock.json`:

```sh
npm ci
```

## Run the application

```sh
npm start
```

You can also run `node .` to skip the build step.

- **API**: http://127.0.0.1:3000
- **API Explorer**: http://127.0.0.1:3000/explorer
- **Health check**: http://127.0.0.1:3000/ping

## Rebuild the project

To incrementally build the project:

```sh
npm run build
```

To force a full build by cleaning up cached artifacts:

```sh
npm run rebuild
```

## Fix code style and formatting issues

```sh
npm run lint
```

To automatically fix such issues:

```sh
npm run lint:fix
```

## Other useful commands

- `npm run migrate`: Migrate database schemas for models
- `npm run openapi-spec`: Generate OpenAPI spec into a file

## Tests

```sh
npm test
```

## What's next

Please check out [LoopBack 4 documentation](https://loopback.io/doc/en/lb4/) to
understand how you can continue to add features to this application.

[![LoopBack](https://github.com/loopbackio/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png)](http://loopback.io/)
