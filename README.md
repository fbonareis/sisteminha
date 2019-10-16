# **Sisteminha** application


## Startup

First, install the `adonis cli` global, if you don't have.

```bash
npm i -g @adonisjs/cli
```

Install node dependencies using `yarn`.

```bash
cd backend
yarn install
```

Create a `.env` file in `backend/.env`, and generate a `adonis app key`.
```bash
adonis key:generate
```



## Start

Use this command to run application

```bash
cd backend
adonis serve --dev
```

## Tests

Use this command to run test

```bash
cd backend
adonis test
```

> [!NOTE]
> When install a new adonis dependence add  `--yarn` parameter.
