exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries and resets ids
  return knex('bikes')
    .truncate()
    .then(function() {
      return knex('bikes').insert([
        { make: 'Yamaha', model: 'YZF-R3', year: 2016 },
        { make: 'Yamaha', model: 'YZF-R6', year: 2010 },
        { make: 'Yamaha', model: 'YZF-R1', year: 2020 }
      ]);
    });
};
