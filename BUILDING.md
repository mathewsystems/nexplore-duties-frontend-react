# DEVELOPMENT AND BUILD INSTRUCTIONS

## SUMMARY

This micro-service full client-side frontend is suitable for all CDN architecture deployments with technically no horizonal scalability limitation.

The application runs fully on the client side on the browser javascript framework with no dependency installation required.

## DEVELOPMENT NOTE

The application is written entirely in TYPE-STRICT Typescript. All objects, procedures, functions are encapsulated at the highest possibility, in an attempt to mimick consistencies with type-safe languages such as Java and C#.  

Custom exception types are also created to mimick languages capable of fully type-safe exception handling procedures.

## BUILDING

### PREREQUISITES

#### Development Tools

**Node.JS Runtimes: >= v18 LTS**

Required Libraries: Typescript v5.4, ts-node Typescript to Javascript transpiler.

```
npm install -g typescript ts-node
```

### BUILD

At the project directory containing the package.json file (<project_root>), run

#### DEVELOPMENT RUN

```
npm start
```

The default value of the API server host is http://localhost:8080, refer to README.md for more information.

#### PRODUCTION BUILD

```
npm run build
```

Output Directory: <project_root>/build

The default value of the API server host is http://localhost, it **MUST BE CHANGED** for production deployment. Refer to README.md for more information.

#### Directory Layouts

##### Output

build/ : All compiled runnable JS files and dependencies, entrypoint: index.html

##### Source Directory

Source Directory: <project_root>/src  
Test Codes: All component files ending with .test.tsx

###### Directory Summary

-/src/

* commons: Common functions, e.g. object sanitization
* models: Class and function definitions, webservice exchange type definitions, etc.
* models/exceptions: Custom exception types, to mimick type-safe exceptional handling.
* models/interfaces: Interfaces
* models/wsTypes: Webservice data exchange types.
* validations: Validator classes
* services: Service modules, designed as dependency injectable modules.
* components: Custom React reusable components
* pages: Application routing pages

## RUN TESTS AFTER BUILD

### Test Prerequsites

The Postgres database server must be online and accessible. The test scripts connect to the database server and executes data-correlated integration tests.

For configuration of the database server, refer to README.md file.

The project uses the Node JEST engine for testing.

```
npm install -g jest
```

Start Regression Tests

```
npm test
```

Current tests include:

* Page rendering correctness tests (e.g. Component injections)
* Component rendering correctness tests (e.g. Lists and items, dynamic data and rendered item counts)
* Component implementation functional tests (e.g. Sub-components implementations, rendering, events callbacks firing, firing sequences, firing counts, callback parameters correctness)
* Functional Mockups

### Example Test Output

```
npm test

 PASS  src/components/TaskList/TaskList.test.tsx
 PASS  src/App.test.tsx
 PASS  src/pages/Duties/Duties.test.tsx

Test Suites: 3 passed, 3 total
Tests:       6 passed, 6 total
Snapshots:   0 total
Time:        1.686 s, estimated 2 s
```
## Common Build and Test Issues


### Node Typescript and build toolchain libraries not installed, or version incompatible

```
# npm run build

> nexplore-duties-api-backend@1.0.0 build
> npx tsc

sh: 1: tsc: Permission denied
```

#### Solution

Reinstall Toolchains in the global library

```
npm install -g typescript ts-node
```

### Node JEST library not installed, or version incompatible

```
# npm test

> nexplore-duties-api-backend@1.0.0 test
> jest

sh: 1: jest: Permission denied
```

#### Solution

Reinstall JEST in the global library

```
npm install -g jest
```

## DEVELOPMENT GUIDE

The application is completed modularized to mimick a dependency injection (DI) capable framework. Services and URL routers are separated into service modules.
  
Create new service handlers under the src/services/ directory. Do not modify the entrypoints and skeleton of the framework.

### ENTRYPOINT

The application entry point is index.html .

## TEST BOARDS

Most test boards are separated into 2 groups:

* Page / component Rendering Tests
* Component Functional Tests