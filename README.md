Initial Setup
`npm i` to install dependencies

This will generate drizzle folder with the migrations and seeds folders.

Debugging
From the command line, `press shift + m` to access a dev menu. There you can select drizzle studio to inspect the database as well as any other debugging tools such as the profiler or element inspector.

Database
`./database/schema` is where we define the tables and columns for our database

Run `npx drizzle-kit generate` to generate the migrations when there are changes to the database schema. The `./drizzle/` folder will be updated with the new migrations and seeds folders.
