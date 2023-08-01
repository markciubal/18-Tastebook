const connection = require('../config/connection');
const { User, Thought, Reaction } = require('../models');
const { getRandomUsername, getRandomThought } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
    // Delete the collections if they exist
    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck.length) {
      await connection.dropCollection('thoughts');
    }

    let usersCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (usersCheck.length) {
      await connection.dropCollection('users');
    }


  // Create empty array to hold the users
  const users = [];

  // Loop 20 times -- add users to the users array
  for (let i = 0; i < 20; i++) {
    // Get some random assignment objects using a helper function that we imported from ./data
    const thoughts = getRandomThought(20);
    const username = getRandomUsername();

    users.push({
      username,
      thoughts
    });
  }

  // Add users to the collection and await the results
  await User.collection.insertMany(users);

  // // Add thoughts to the collection and await the results
  // await thought.collection.insertOne({
  //   thoughtName: 'UCLA',
  //   inPerson: false,
  //   users: [...users],
  // });

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
