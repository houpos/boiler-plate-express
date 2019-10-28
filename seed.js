const db = require('./server/db/index');
// Require all models
const Model1 = require('./server/db/models/model1');
const User = require('./server/db/models/users');

// Create arrays of objects for each model
const model1 = [
  {name: 'Jane'},
  {name: 'Doe'}
];

const users = [
  {
    email: 'jane.doe@aol.com',
    password: 'bird'
  },
  {
    email: 'blah.doe@gmail.com',
    password: 'duck'
  }
]

// ONLY done during dev. The force: true should be removed for prod.
const seed = async () => {
  await db.sync({ force: true });

  await Promise.all(
    model1.map(model => {
      return Model1.create(model);
    })
  );

  await Promise.all(
    users.map(user => {
      return User.create(user);
    })
  );

  console.log('Seeding success!');
  db.close();
};

seed().catch(err => {
  console.error('Oh noes! Something went wrong!');
  console.error(err);
  db.close();
});
