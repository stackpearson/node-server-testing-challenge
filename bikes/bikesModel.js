const db = require('../data/dbConfig.js');

module.exports = {
  insert,
  update,
  remove,
  getAll,
  findById,
};

async function insert(bike) {
  const [id] = await db('bikes').insert(bike, 'id');
  return db('bikes').where({id}).first();
}

async function update(id, changes) {
  return null;
}

function remove(id) {
  return null;
}

function getAll() {
  return db('bikes');
}

function findById(id) {
  return null;
}
