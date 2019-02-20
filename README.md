# Bluejay Backend
This app is the API server associated with the bluejay-frontend app.
It connects to a mock-census database and allows viewing of that data through a web-interface.

## Organization and Conventions
This app is developed in typescript, and all operation source files are compiled to the build directory.
This excludes the boilerplate entry point, bin, which is generally left untouched.

Within source, each set of utility functions (if necessary) will have its own directory, like that used for database.

Actual API routes are in the routes directory, imported into and coordinated by app.ts.

If subroutes are needed, the root should have one 'parent' router that exposes its children. 
See the api.ts route for an example.

## Deployment
This app must be built locally during development. When deploying, do not commit the build directory.
It will automatically be built on-server. 
The environment variables SQL_HOST, SQL_USER, SQL_DB, SQL_PASSWORD, and SQL_PORT are also needed.

Commiting to master will trigger an auto deployment.

## Key Design Decisions
1. While the frontend was thoroughly regression tested, the backend does not have tests. 
This was decided upon because of the unstable nature of free-tier servers. It would be difficult to isolate test cases
from external server and db connectivity. On its own, this side of the app does no interesting 'business logic' other than this retrieval.

2.  A seperate database file allows us to configure the wrapper centrally.

3. "Only 100" filtering was done on-server instead of on DB. Since the filter had to be performed on the already queried data, but also return the total number of unqueried rows, 
it appeared a single query would become complex and hard to read.
If server-db throughput was an issue, my first reaction would be to used a stored procedure on db. Barring this, in a more complicated app I'd refactor queries into their own files for reuse.
This could offset the readability issue.
