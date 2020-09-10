module.exports = function(){
  const faker = require('faker');
  const _ = require('lodash');
  return {
    persons: _.times(15, function(n) {
      return {
        id: n + 1,
        firstnName: faker.name.firstName(),
        secondName: faker.name.lastName(),
        avatar: faker.image.avatar()
      }
    })
  };
};
