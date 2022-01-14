# Carpe Diem
Featuring an 80's inspired aesthetic, Carpe Diem is an app for sharing and finding EDM events. 

Carpe Diem takes its inspiration from in [Eventbrite](https://www.eventbrite.com/), an innovative app that puts event ticketing and planning in the hands of anyone and everyone who wishes to share their own events. This app capitalizes on that ability for artists to create and share events in order with audiences.

Events can be created with the following special features: 
- Draft or Published: Drafted events can be saved and published later on.
- Secret Event: Exact location details are revealed on the day of the event.
- Virtual Event: Instead of providing a physical address, a stream link can be shared.
- Event Category: Describes whether the event is a festival, concert, warehouse event, etc.
- Other Features: Event date and time, image, description, location.

Visit the [wiki](https://github.com/christywchen/carpe-diem/wiki) for information about features and routes. 

A live demo of this application can be found [here](https://carpe-diem-app.herokuapp.com/).

# Implementation
This app was built using **JavaScript** in conjunction with backend tools like **Node.js**, **Express**, **Sequelize**, and **PostgreSQL** for data management. The API routes were designed with RESTful architecture in mind and utilizes a services layer to communicate between server and database. Other libraries used include **csurf**, **express-validator**, and **bcrypt.js**.

The frontend was utilizes **React** and **Redux** along with **React Router** for frontend routing. RESTful architecture also formed the basis for frontend route structure. The application's CSS was written from entirely scratch and uses no external libraries.

# Local Installation

Running this application locally requires Node.js, NPM, and PostgreSQL. The root folder holds a frontend directory as well as a backend directory.

## Step 1: Download
Clone the project repository.
```
git clone https://github.com/christywchen/carpe-diem
```
## Step 2: Backend Setup

### Server Installation
Inside of ``/backend``, run the following command to set up the necessary Node.js dependencies for running the backend server and database.
```
npm install
```

### Database Creation
Create a **.env** file based on the example provided in **.env.example**. Create a PostgreSQL user with database creation authority and save the credentials in the **.env**.

```
PORT=
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=
JWT_SECRET=
JWT_EXPIRES_IN=
```

Migrate and seed the database using the following commands. The seeder files contain necesary information to set up a demo user account that can be used to tour the site without needing to create an account.

```
npx dotenv sequelize db:create
npx dotenv sequelize db:migrate
npx dotenv sequelize db:seed:all
```

At this point, the server can be started by running the following command from the ```/backend``` directory.
```
npm start
```
## Step 3: Frontend Setup
Switch over to ``/frontend``, run the following command to set up the necessary Node.js dependencies for running the frontend server.
```
npm install
```
After installation completes, run the following to start the server and begin using the application.
```
npm start 
```
