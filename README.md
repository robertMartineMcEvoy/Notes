# Notes
---
## Running App + API Together

1. Open "Notes.sln" in Visual Studio 2022
2. Right click Solution and verify both projects are set as startup projects (see screenshot):
![Alt text](./startupconfig.jpg "Optional title")
3. Select "Start"
4. Both Apps should now start on localhost at the following ports.
     - React App* on localhost:3000
     ![Alt text](./NotesApp.jpg "Optional title")
     - Notes API on localhost:7777 (Swagger index will be displayed)
     ![Alt text](./NotesAPISwagger.jpg "Optional title")

\*If two browsers start up for React App, either can be used. see **Notes App** Section for more detail.  

### Notes API 
A basic CRUD API using SQLite and Dapper.

### Notes App
A React App that consumes the Notes API. 

**NOTE**: This was my first time building a React App from scratch and there were a few things I would like to come back and fine tune.

I believe they all have to do with my project setup as they only seem to be an issue on the initial runs. Subsequent runs do not encounter these issues.

 - Two instances of the app would Start when running from Visual Studio.

- I  disabled es-lint in `packages.json` as it was throwing an error due to the capitalization of my file paths.

- I would like to set a custom port so it's not running on the default port of 3000. 
    - I was able to change this in `packages.json` as well but the aforementioned anomaly of two app instances meant one would start on port 3000, another on the custom port.

Also, there has to be a better way to filter out only the packages needed in `node_modules`.