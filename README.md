# express-mongoose-todolist
Express app that uses Mongoose to hold data inputs. Allows users to create custom lists, as well as insert and delete any items to them.

Npm dependencies include Express, Lodash, and Mongosh.

1. Create work directory and cd into it.
2. Download this project and put the contents of this repo into that work directory.
3. Assuming you have already installed Node.js and MongoDB, inside your command line run npm init and accept all defaults.
4. Run npm i mongoose express lodash
5. Run mongosh
6. Now that your connected to the local database server, open this project/work folder in your ide and make sure it's saved. You should see the package.json and node_modules downloaded.
7. Inside your command line create a new tab or terminal (don't stop running mongosh). Run node app.js (or nodemon if you have that installed).
8. Open your browser and go to localhost:3000. This will be the default list, and will offer basic instructions for functionality.
9. Type anything into the text box and click the plus button, or hit enter to add content to your list.
10. If you would like a custom list, simply type a / followed by what you would like the title of your list to be (Ex: localhost:3000/groceries). The casing of the custom parameter will not matter, thanks to Lodash).
11. Click on the checkbox next to any item to delete it.
12. Before shutting down, do remember to Ctrl+c and stop the MongoDB shell before exiting everything. The same procedure is not necessary for stopping the Node server.

There is a version of this project that is fully deployed on a public Heroku server and MongoDB Atlas, but this version of the project has been left to local server use only.

Future ambitions would be to add optional subcategories to items; add an input for user to type and create new lists; use EJS to create different templates and themes for different generated lists;
