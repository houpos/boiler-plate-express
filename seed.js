const db = require('./server/db/index');
// Require all models
const Model1 = require('./server/db/models/model1');

// Create arrays of objects for each model
const model1 = [
  {name: 'Jane'},
  {name: 'Doe'}
];

// ONLY done during dev. The force: true should be removed for prod.
const seed = async () => {
  await db.sync({ force: true });

  await Promise.all(
    model1.map(model => {
      return Model1.create(model);
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
