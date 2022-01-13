'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Artists', [
      { name: 'Uppermost' },
      { name: 'Boys Noize' },
      { name: 'Jai Wolf' },
      { name: 'What So Not' },
      { name: 'Porter Robinson' },
      { name: 'Rezz' },
      { name: 'Paul Oakenfold' },
      { name: 'Duke Dumont' },
      { name: 'Aly & Fila' },
      { name: 'Swedish House Mafia' },
      { name: 'Blastoyz' },
      { name: 'Seven Lions' },
      { name: 'Tchami' },
      { name: 'Rufus du Sol' },
      { name: 'Sage Armstrong' },
      { name: 'Hannah Monica' },
      { name: 'RL Grime' },
      { name: 'Alison Wonderland' },
      { name: 'SNBRN' },
      { name: 'Louis the Child' },
      { name: 'Future Funk' },
      { name: 'Wax Motif' },
      { name: 'Illenium' },
      { name: 'Manila Killa' },
      { name: 'Kaytranada' },
      { name: 'Bryan Kearny' },
      { name: 'ATB' },
      { name: 'Armin van Buuren' },
      { name: 'Above & Beyond' },
      { name: 'Illenium' },
      { name: 'Darude' },
      { name: 'Alan Walker' },
      { name: 'Bryan Kearny' },
      { name: 'Blackmill' },
      { name: 'Rameses B' },
      { name: 'Erna' },
      { name: 'Darude' },
      { name: 'Gareth Emery' },
      { name: 'Sakuraburst' },
      { name: 'DABIN' },
      { name: 'Adventure Club' },
      { name: 'Trippy Turtle' },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Artists', null, {});
  }
};
