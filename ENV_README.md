# Environment Configuration

This project supports multiple environments through dotenv files.

## Environment Files

- `.env.local` - Default/Local development environment
- `.env.test` - Test environment  
- `.env.sit` - SIT (System Integration Testing)
- `.env.st` - ST (System Testing)
- `.env.preprod` - Pre-production
- `.env.prod` - Production
- `.env.ci` - CI/CD pipeline environment (auto-detected when `CI=true`)

## Usage

### Running tests against different environments:

```bash
# Default environment (uses .env.local)
npm run test

# Test environment
npm run test:test

# SIT environment  
npm run test:sit

# ST environment
npm run test:st

# Pre-production
npm run test:preprod

# Production
npm run test:prod

# CI/CD
npm run test:ci
```

### Manual environment selection:

```bash
# Using ENV variable
ENV=test npm run test

# Using NODE_ENV variable  
NODE_ENV=prod npm run test

# CI environment (auto-detected when CI=true)
CI=true npm run test  # Automatically uses .env.ci
```

### CI/CD Integration:

Most CI platforms automatically set `CI=true`, which will:
- Automatically load `.env.ci` configuration
- Use CI-optimized Playwright settings (retries, workers, etc.)
- Generate reports suitable for CI environments

## Environment Variables

Each environment file contains:

- `BASE_URL` - The base URL for the environment
- `TEST_ADDRESS` - Default test address for the environment  
- `ENVIRONMENT` - Environment identifier

## Configuration

The Playwright config automatically loads the appropriate environment file and sets:

- `baseURL` from `BASE_URL` environment variable
- Other test configuration based on environment

## Security

- Add `.env.*` files to `.gitignore` for sensitive environments
- Use environment-specific values for each testing environment