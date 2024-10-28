module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('users', []),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('users', null, {})
};
