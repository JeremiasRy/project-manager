# super-project-manager

![PostgresSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Dotnet](https://img.shields.io/badge/-.NET%207.0-blueviolet)
![React](https://img.shields.io/badge/React-v.18-blue)
![Redux toolkit](https://img.shields.io/badge/Redux-v.1.9-purple)
![TypeScript](https://img.shields.io/badge/TypeScript-v.4.9-green)
![SASS](https://img.shields.io/badge/SASS-v.4.9-hotpink)

For ORM I used Dapper.

## Features

It's just a prototype and has a lot of things to improve. Mostly this was done as practicing purposes to see if I can create something little more complex than a basic todo list
It has logig and register functionality using JWT authentication, passwords are hashed into the db. Idea is that one instance of this app is one "team". You can add projects and tasks inside those projects. <br/>
When creating a project you assign a team for it and then individually assing a task to a user. My idea was that a task should be so simple it can be done by one person.

## Notes to myself

I didn't use enough generics on the backend which made a lot of the code repetitive. <br/>
Also my REST api knowledge wasn't on point when designing this so it doesn't fully commit on those guidelines

### Login
![img](./pictures/login.png)
