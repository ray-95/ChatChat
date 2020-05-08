# Introduction
A simple IM web app using .NET Core/React/MongoDB.
```
$ git clone https://github.com/ray-95/ChatChat
$ cd ChatChat/front/
$ npm i
$ npm run build
$ cd ../back/
$ mkdir db
$ mongod --dbpath db/

Open another shell
$ mongo
  > use ChatDb
  > db.createCollection('Users')
  > db.createCollection('Messages')
  > exit

cd to ChatChat/back
$ dotnet run

The app is running on http://localhost:5001