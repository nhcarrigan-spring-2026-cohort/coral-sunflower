# coral-sunflower
Repository for Team Coral Sunflower - Spring 2026 Cohort

## Local development

### Prerequisites

- Node.js v24.12.0
- Docker

### Baremetal

1. `npm install`
2. `npm run dev`

### Devbox with Nix

1. `devbox shell`
2. Then steps from [Baremetal](#baremetal).

### Run only one app

1. `turbo run dev --filter=frontend`

Generally, use `turbo run <SCRIPT_NAME> --filter=<PACKAGE_NAME>` to run any arbitrary script for a specific app.

Look in the `package.json` of each package to see the available scripts or use `turbo run --filter=<PACKAGE_NAME>` to list all the available scripts for a specific app.
