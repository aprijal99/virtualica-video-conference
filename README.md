# Virtualica (Video Conference)

This is Google Meet-like video conference application, built using Next JS framework for the frontend and Spring Boot framework for the backend.
The application is an implementation of JavaScript Websocket.
To try to run the application on your local computer you need to install
[Node.js 16](https://nodejs.org/),
[Java 11](https://www.oracle.com/java/technologies/javase/jdk11-archive-downloads.html), and
[Maven](https://maven.apache.org/download.cgi)

First, clone this project by typing `git clone https://github.com/aprijal99/virtualica-video-conference.git` on your computer terminal or command prompt

## Build The Backend

In the terminal, go to the directory of `virtualica-server`, then execute the following commands line by line.
The server will run on port `7181`

```bash
# Build the backend
mvn clean
mvn install package spring-boot:repackage

# Run the backend
java -jar ./target/virtualica-server-0.0.1-SNAPSHOT.jar
```

## Build The Frontend

In another terminal, go to the directory of `virtualica-client`, then execute the following commands line by line.
The server will run on port `3000`

```bash
# Build the frontend
npm install
npm run build

# Run the server
npm run start
```

## Usage
Open the application on `localhost:3000`, in the home page try to login using the following account.
You will be redirected to the dashboard page. Go to `Room` section, choose one of available rooms, copy the room ID,
to go to room page copy url of `localhost:3000/room/{roomId}`

*Account*\
email: aprijalghiyas@gmail.com\
password: subang12345
