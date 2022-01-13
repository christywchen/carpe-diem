'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Genres', [
      { name: 'Trance' },
      { name: 'House' },
      { name: 'PsyTrance' },
      { name: 'Techno' },
      { name: 'Drum and Bass' },
      { name: 'Hardcore' },
      { name: 'Ambient' },
      { name: 'Acid House' },
      { name: 'SynthPop' },
      { name: 'DubStep' },
      { name: 'Future Base' },
      { name: 'Electro' },
      { name: 'IDM' },
      { name: 'Progressive House' },
      { name: 'Deep House' },
      { name: 'Trap' },
      { name: 'Tropical House' },
      { name: 'Reggaeton' },
      { name: 'Hardstyle' },
      { name: 'Vaporwave' },
      { name: 'Future Funk' },
      { name: 'ElectroPop' },
      { name: 'Big Room House' },
      { name: 'Progressive Trance' },
      { name: 'Complextro' },
      { name: 'Chillwave' },
      { name: 'Synthwave' },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Genres', null, {});
  }
};
