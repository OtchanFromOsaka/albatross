# albatross

This is a web application for an image posting service. The repository name 'albatross' is a codename and is not related to the application's functionality.

## Getting Started

First, change to the `.devcontainer` directory:
```sh
cd .devcontainer
```

Next, build and start the Docker containers in detached mode:
```sh
docker compose up -d
```

Connect to the `albatross-app` container as the root user:
```sh
docker exec -it -u root albatross-app bash
```

Run the setup command (this will install bun, curl, and unzip if they are not already present):
```sh
albatross --setup
```

**Exit the container (Ctrl + D)** and then reconnect to the `albatross-app` container as the `albatross` user:
```sh
docker exec -it albatross-app bash
```

Install dependencies:
```sh
bun install
```

Install Playwright browsers:
```sh
bun x playwright install
```

Start the development server:
```sh
bun dev
```

## Ideal Workflow

Ideally, you should always use the latest versions of dependencies and ensure all tests pass. Also, aim to keep dependencies as shallow as possible.

## Daily Routine

Connect to the `albatross-app` container as the root user:
```sh
docker exec -it -u root albatross-app bash
```

Run the update command:
```sh
albatross
```

**Exit the container (Ctrl + D)** and then reconnect to the `albatross-app` container as the `albatross` user:
```sh
docker exec -it albatross-app bash
```

Update all dependencies to their latest versions:
```sh
bun update
```

Update Playwright browsers:
```sh
bun x playwright install
```

Run unit tests:
```sh
bun test
```

Run E2E tests:
```sh
bun e2e
```
