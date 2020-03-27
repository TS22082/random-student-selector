# Random Student Selector

This console tool will let teachers add students to a database drop select or all students, and choose a random student (cold call).
When a student is selected it will remove them from the call list so everyone is sure to be called. When everyone has been called in the call list the database will repopulate the callist array

# Motivation

I want to make sure everyone gets called in class so everyone can participate. As a teacher I need to be able to add students to my class, make sure everyone gets called. I also need to be able to delete specific users if they drop midway and at the end of the cohort I need to delete everyone to make way for the new class.

# Build Status

Program is working.

# Requirements

- NodeJS
- MongoDB

# Setup

- clone to computer
- run npm install from inside project folder. (Where app.js is)

From inside project folder type:

```
node app.js
```

\*Note:
A mongodb database instance named "student-selector" will be created

\*\*\*optional

Use pkg from npm to make an executable. Add to system variables to make executable from any folder from terminal
