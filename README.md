## Hardcoded names to update after forking the template

| path to file | path to text | current text |
-|-|-
[`/package.json`](/package.json) | `$.name` | `"try-monorepo"`
[`/package-lock.json`](/package-lock.json) | `$.name` | `"try-monorepo"`
[`/package-lock.json`](/package-lock.json) | `$.packages[""].name` | `"try-monorepo"`
[`/packages/client/index.html`](/packages/client/index.html) | `html>head>title` | `"Client App"`

## Starting the application stack

### Using Docker (recommended)

Starting the application stack with `npm start` is the simplest approach and also recommended.

- Set environment variables and build arguments in `/.docker-compose.env.local`

  Read `/docker-compose.yaml` for the variables it uses.

- Run application stack:

  ```sh
  npm start
  ```

- Observe the apps:

  - `server` on `http://localhost:<SERVER_PORT_HOST>` (try `GET /v1/health`)

  - `client` on `http://localhost:<CLIENT_PORT_HOST>`

- _(optionally)_ Stop the application stack:

  ```sh
  npm stop
  ```

### Without Docker, all on `localhost`

To start the application stack without Docker, it is necessary to setup/build/start the applications manually on `localhost`, then run server in the background, then run client in "dev" mode.

- Install all dependencies:

  ```sh
  npm ci
  ```

- Build `shared` package (it has to be built first because the other packages depend on it):

  ```sh
  npm run -w shared build
  ```

- Set server port as `PORT` environment variable in `/packages/server/.env.local`:

  ```sh
  echo PORT='<SERVER_PORT>' >> ./packages/server/.env.local
  ```

- Build server:

  ```sh
  npm run -w server build
  ```

- Start server:

  ```sh
  npm run -w server start
  ```

- Share server location with the client:

  ```sh
  echo VITE_SERVER_BASE_URL='http://localhost:<SERVER_PORT>' >> ./packages/client/.env.local
  ```

- Start client (in `dev` mode):

  ```sh
  npm run -w client dev
  ```

- Observe the apps:

  - `server` on `http://localhost:<SERVER_PORT>`

  - `client` on `http://localhost:<CLIENT_PORT>` (usually it is `http://localhost:5173/`)

- _(optionally)_ Stop the application stack:

  - Stop the client (press <kbd>Q</kbd> in the client terminal)

  - Stop the server (press <kbd>Ctrl</kbd>+<kbd>C</kbd> in the server terminal)
