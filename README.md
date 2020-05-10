# Introduction
A simple IM web app using .NET Core/React/MongoDB.

# Running it
```
$ git clone https://github.com/ray-95/ChatChat
$ cd ChatChat/front/
$ npm i
$ npm run build
$ cd ..
$ mkdir db
$ mongod --dbpath db/

Open a new shell
$ mongo
  > use ChatDb
  > db.createCollection('Users')
  > db.createCollection('Messages')
  > exit

cd to ChatChat/back
$ dotnet run
```
