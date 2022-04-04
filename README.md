# Supervisor

- Front-end files repo for the Supervisor app.

SUPERVISOR is an app for keeping track of your employees. You can add, edit and delete them, as well as search them by name or department they work in. At the same time, you can sort them by last name, salary or age. You can also keep track of their goals, email them or give them a raise. Last but not least, you get a motivational quote just to keep you going through the day!

## Deployed Supervisor App:

#### [Supervisor App](https://supervisor-app.herokuapp.com/home)

##### Feel free to register and use the app, or to use profile bellow.

| EMAIL              | PASSWORD |
| ------------------ | :------: |
| `stevieG@mail.com` |  `123`   |

### User Flow:

![user flow](https://i.imgur.com/aYR4utv.png "Supervisor user flow")

### Tech Stack:

- React.JS (with React-Bootstrap & MaterialUI libraries)
- Mongo.DB
- Mongoose
- JavaScript
- Express.JS
- Bcrypt
- Heroku
- GitHub

### API:

- Quotes Inspirational Quotes Motivational Quotes API

### Restful Routes:

![routes](https://i.imgur.com/wH7GFw8.png?1 "restful routes")

### Aproach:

Used react-routing, as well as react libraries for importing different components to elevate user experience. The whole app was built with minimal loading time in mind, and I tried to experiment with handling and filtering the data in the react states as much as possible, without unnecessary immediate requests to the back-end API. Implemented 3rd party API quote of the day. Made a search and sort function with changable arguments. The search and sort are executing in real time and they can run simultaneously.

### MVP:

- A working full-stack application, built by you, using the MERN stack: Node.js, Mongoose, Express and React
- Adhere to MVC file structure
- At least one model with full CRUD.
- A git repo.
- Be deployed online and accessible to the public via Heroku.

### Strech Goals:

- Pull from a 3rd party API
- Have Users who can log in to see the content of the app
- Have routing using react-router-dom
- Have two models that are related
- Graceful error handling for both front-end and server-side errors
- Use a CSS framework like Skeleton or Bootstrap
- Add quality styling

### Additional Notes:

Future strech goals would include adding pagination to the user's workers page, and adding cloudinary API for uploading photos.
