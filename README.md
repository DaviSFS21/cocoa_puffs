# cocoa_puffs

## Overview
***
This project is a Ruby on Rails application, with frontend using React.
The application manages Cocoa Puff lists and its Fruity Pebbles.
It uses PostgreSQL as the database, and Rails as an API for data.

## Prerequisites
***
* Ruby
* Rails
* Node.js
* VSCode, Intellij IDEA or any other IDE

## Getting started
***
1. **Install npm dependencies and Rails :** Using the terminal, access the backend directory, install the gems.
Then, access the frontend directory and install npm dependencies.
```
cd .\backend\
bundle install

cd .\frontend\
npm install
```

2. **Start both React and Rails servers:** Using the terminal, access backend directory and serve the Rails API.
Using another terminal, access frontend directory and serve the React frontend.
```
cd .\backend\
rails s

cd .\frontend\
npm run dev
```

3. **Access the URL that React is being served:** After running locally the frontend of our application,
access the URL. The port used by React should be 5173.
```
http://localhost:5173
```