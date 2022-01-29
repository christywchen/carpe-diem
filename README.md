# Carpe Diem
Featuring an 80's inspired aesthetic, Carpe Diem is an app for finding and sharing EDM events.

Carpe Diem takes its inspiration from in [Eventbrite](https://www.eventbrite.com/), an innovative app that puts event ticketing and planning in the hands of anyone and everyone who wishes to share their own events. This app capitalizes on that functionality in order to give independent artists the chance to connect with audiences by sharing their upcoming events.

Users can also sort events by category while browsing and authenticated users have an can register to attend by clicking the ticket icon on any given event card.

A live demo of this application can be found [here](https://carpe-diem-app.herokuapp.com/).

![carpe-diem-md](https://user-images.githubusercontent.com/55429132/151637455-607e8329-8bfd-4df5-92d0-746b2ead4fbb.png)


Events can be created with the following information:
- **Draft or Published**: Drafted events can be saved and published later on.
- **Secret Event**: Exact location details are revealed on the day of the event.
- **Virtual Event**: Instead of providing a physical address, a stream link can be shared.
- **Event Category**: Describes whether the event is a festival, concert, warehouse event, etc.
- **Other Features**: Event date and time, image, description, location.

Visit the [wiki](https://github.com/christywchen/carpe-diem/wiki) for information about features and routes.


# Implementation
This app was built using **JavaScript** in conjunction with backend tools like **Node.js**, **Express.js**, **Sequelize.js**, and **PostgreSQL** for data management. The API routes were designed with RESTful architecture in mind and utilizes a services layer to facilitate communication between server and database. Other libraries used include **csurf**, **express-validator**, and **bcrypt.js**.

The frontend uses **React** and **Redux** along with **React Router** for frontend routing. RESTful convention also formed the basis for frontend route structure. The application's **HTML** and **CSS** was written from entirely scratch and uses no external libraries.

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
- User profile and credential updating

# Challenges

One technical challenges involved creating the drafting feature for events. Because venues are recorded on a different table than event records, consideration had to be made for not only how to implement event posting, but how the process of posting/patching a published event and draft event differs. Different actions had to be added in the Redux store in order to accommodate for whether a task is published or drafted upon event creation and editing.

In the backend, Sequelize validations had to be forgone in order to allow drafts to have missing values for users to fill in later. This was made up for by using a more comprehensive set of checks performed by express-validator, which validates the data before sending it to the database.

On the React side of things, the solution was to create helper functions for the event form component. After receiving form data, the steps were as follows:

**Step 1**. Check if the event is being saved as a draft or published event to determine course of action.
- If the event input is being saved as a draft, forgo validations.
- If the event input is being published, rely on frontend validations and validations at the API route level to check input data.

**Step 2**. Check if the there is an eventId parameter by using the useParams() hook:
- If eventId exists, event is already in the database, the action will be to update the record.
- Otherwise, the action will be to create a record.

**Step 3**: Before creating or updating the event, create or update the associated event venue:
- If the event already exists and the venue is being updated, no other steps need to be taken because the venue already has an associated venue foreign key.
- If the event exists but does not have an associated venue, OR the event does not exist, get the venue id from the venue creation fetch response. This will be included in the fetch request for creating or updating an event.

**Step 4**: Move forward with posting or updating the event in the database.

**Step 5**: Redirection after form submission:
- For published events, redirect the user to the event's details page.
- For draft events, redirect user to the drafts section of the dashboard.

**Step 6**: After event creation, the update form will pre-populate event info and show a different set of buttons than in the create event form.

The application uses one form component for both creating and updating events. While many considerations had to be taken to ensure modularity, the result is a more form flexible component that can easily accommodate for future changes.
