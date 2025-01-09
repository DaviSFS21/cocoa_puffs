# cocoa_puffs

## Overview
This project is a Ruby on Rails application, with frontend using React.
The application manages Cocoa Puff lists and its Fruity Pebbles.
It uses PostgreSQL as the database, and Rails as an API for data.

## Prerequisites
* Ruby
* Rails
* Node.js
* npm
* PostgreSQL
* VSCode, Intellij IDEA or any other IDE

## Getting started
### These are some inital steps to serve this application in your own machine.

1. **Install npm dependencies and Rails:** Using the terminal, access the backend directory, install the gems.
Then, access the frontend directory and install npm dependencies.
```
cd .\backend\
bundle install

cd .\frontend\
npm install
```

2. **Set database parameters so Rails can connect and create the database and its tables and registers:**
Edit username and password. Make sure that your PostgreSQL doesn't have any databases called 'cocoa_puffs_development' or
'cocoa_puffs_test'.

`config/database.yml`
```
  default: &default
  adapter: postgresql
  encoding: unicode
  username: {use your PostgreSQL user name}
  password: {use your PostgreSQL user password}
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>


development:
  <<: *default
  database: cocoa_puffs_development

test:
  <<: *default
  database: cocoa_puffs_test
```

3. **Using your terminal, create and migrate the database into your environment:** Now, we'll create the database
and its tables.
```
rails db:create
rails db:migrate
```

4. **Start both React and Rails servers:** Using the terminal, access backend directory and serve the Rails API.
Using another terminal, access frontend directory and serve the React page.
```
cd .\backend\
rails s

cd .\frontend\
npm run dev
```

5. **Access the URL that React is being served:** After running locally the frontend of our application,
access the URL. The port used by React should be 5173.
```
http://localhost:5173
```

***Now that we have both backend and frontend services being executed, enjoy the application!***
