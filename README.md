# Carpe Diem
Featuring an 80's inspired aesthetic, Carpe Diem is an app for sharing and finding EDM events. 

Carpe Diem takes its inspiration from in [Eventbrite](https://www.eventbrite.com/), an innovative app that puts event ticketing and planning in the hands of anyone and everyone who wishes to share their own events. This app capitalizes on that ability for artists to create and share events in order with audiences.

![carpe-diem](https://user-images.githubusercontent.com/55429132/149492269-f0dc14d7-61f5-4fe7-b276-1ae0ee3685c0.png)

Events can be created with the following special features: 
- **Draft or Published**: Drafted events can be saved and published later on.
- **Secret Event**: Exact location details are revealed on the day of the event.
- **Virtual Event**: Instead of providing a physical address, a stream link can be shared.
- **Event Category**: Describes whether the event is a festival, concert, warehouse event, etc.
- **Other Features**: Event date and time, image, description, location.

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
Create a PostgreSQL user with database creation authority and save the credentials in the **.env**. Then, create a **.env** file based on the example provided in **.env.example**.

```
PORT=
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=
JWT_SECRET=
JWT_EXPIRES_IN=
```

Migrate and seed the database using the following commands. The seeder files contain necesary information to set up a demo user account that can be used to tour the site without needing to register.

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

# Future Features

- Genre tagging for events
- Artist tagging for events
- Liking events
- Registering for events
- Sort events list by tags

# Challenges

One technical challenges involved creating the drafting feature for events. Because venues are recorded on a different table than event records, consideration had to be made for not only how to implement event posting, but how the process of posting/patching a published event and draft event differs. Different actions had to be added in the Redux store in order to accommodate for whether a task is published or drafted upon event creation and editing.

In the backend, Sequelize validations had to be forgone in order to allow drafts to have missing values for users to fill in later. This was made up for by using a more comprehensive set of checks performed by express-validator, which validates the data before sending it to the database.

On the React side of things, the solution was to create helper functions for the event form component. After receiving form data, the steps were as follows:

**Step 1**: If the event input is being saved as a draft, forgo frontend and backend validations.

**Step 2**: If the event input is being published, rely on frontend validations and validations at the API route level to check input data.

**Step 3**: Check if the there is an eventId parameter by using the useParams() hook.

**Step 4**: If an eventId exists, the action will be to update the record.

**Step 5**: If an event does not exist, the action will be to create a new record.

**Step 6**: For either case, first post or update the venue, if it exists, in the database.

**Step 7**: After, use that venue's id from the fetch response to create a foreign key that will go into the event record.

**Step 8**: Move forward with posting or update the event in the database.

**Step 9**: For published events, redirect the user to the event's details page. For draft events, redirect user to the drafts section of the dashboard.

The application uses one form component for both creating and editing events. While many considerations had to be taken to ensure modularity, the result was a more flexible component that can easily accommodate for future changes.
