'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Events', [
      {
        name: 'Understated LA',
        date: new Date(),
        description: 'A gathering of local artists and friends.',
        capacity: 700,
        secretLocation: true,
        userId: 1,
        venueId: 1,
        eventTypeId: 4
      }, {
        name: 'Daft Punk & Friends night',
        date: new Date(),
        description: '1720 Presents the first Daft Punk and Friends Tribute Party of 2022, playing the classics, french electro, indie-dance, disco, and More! 🤖',
        capacity: 700,
        secretLocation: true,
        userId: 1,
        venueId: 1,
        eventTypeId: 4
      }, {
        name: 'Techno Takeover',
        date: new Date(),
        description: 'First 100 RSVPs get in free before 11pm. Proof of Full Vaccination Required.',
        capacity: 700,
        secretLocation: true,
        userId: 1,
        venueId: 1,
        eventTypeId: 4
      }, {
        name: 'TCHAMI X AC SLATER',
        date: new Date(),
        description: 'As we move firmly into the new decade, Parisian producer and DJ Tchami has built a loyal fanbase on both sides of the Atlantic with his genre-defying sound and unique brand of spiritual house music.',
        capacity: 8500,
        secretLocation: false,
        userId: 1,
        venueId: 3,
        eventTypeId: 3
      }, {
        name: 'Crush SF',
        date: new Date(),
        description: 'The love returns to San Francisco on Friday, February 11th and Saturday, February 12th! #CRUSHSF. Lineup: BOOMBOX CARTEL // EVAN GIIA // FREAK ON // FRIENDZONE // JAI WOLF // MOORE KISMET // NØLL // NOSTALGIX // PHANTOMS (DJ SET) // SIDEPIECE // WAX MOTIF // XIE',
        capacity: 300,
        secretLocation: false,
        userId: 2,
        venueId: 1,
        eventTypeId: 3
      }, {
        name: 'Polo & Pan SF',
        date: new Date(),
        description: 'With just one full-length album (2017\'s Caravelle) to their name, Polo & Pan have become synonymous with trippy dance tracks that carry equally dreamy melodies.  The duo, consisting of Paul Armand-Delille (Polo) and Alexandre Grynszpan (Pan), first met in 2012 and have since been creating fans around the globe performing to sold-out crowds at notable venues like LA\'s Novo, London\'s Printworks, NY\'s Terminal 5, and Montreal\'s MTELUS. They\'ve played numerous festival stages such as 2019\'s Coachella where Billboard called their performance "without a doubt one of the best performances."',
        capacity: 300,
        secretLocation: false,
        userId: 1,
        venueId: 4,
        eventTypeId: 3
      }, {
        name: 'Said the Sky',
        date: new Date(),
        description: 'Trevor Christensen has been a musician for 20 years, releasing triumphant electronic-pop as Said the Sky since 2014. Freshly signed to friend and collaborator Illenium\'s Kasaya and 12Tone Music, he\'s exploring his limitless potential, blending the lofty melodies of hits "Rush Over Me," "All I Got" and "Where\'d U Go" with the pop-punk energy of his youth.',
        capacity: 300,
        secretLocation: false,
        userId: 1,
        venueId: 4,
        eventTypeId: 3
      }, {
        name: 'Dabin\'s Between Broken @ NYC',
        date: new Date(),
        description: 'Dabin is a JUNO nominated music producer & instrumentalist originally from Toronto. Having spent his teens learning to play the piano, drums and guitar, Dabin started producing electronic music in 2011.',
        capacity: 300,
        secretLocation: false,
        userId: 1,
        venueId: 6,
        eventTypeId: 3
      }, {
        name: 'Beyond Wonderland',
        date: new Date(),
        description: 'Follow Alice on her wondrous journey through the various realms of Beyond Wonderland.',
        capacity: 300,
        secretLocation: false,
        userId: 2,
        venueId: 5,
        eventTypeId: 1
      }, {
        name: 'Wasteland',
        date: new Date(),
        description: 'After a brief hiatus, Basscon Wasteland returns to Southern California for two electrifying nights of hard dance.',
        capacity: 5000,
        secretLocation: false,
        userId: 2,
        venueId: 5,
        eventTypeId: 1
      }, {
        name: 'Electric Forest',
        date: new Date(),
        description: 'Electric Forest is a four-day, one-weekend, multi-genre event with a focus on electronic and jam band genres, held in Rothbury, Michigan, at the Double JJ Resort. In 2017 and 2018, the festival expanded to two weekends back to back, before switching back to one weekend for 2019.',
        capacity: 5000,
        secretLocation: false,
        userId: 1,
        venueId: 4,
        eventTypeId: 1
      }, {
        name: 'Lighning in a Bottle',
        date: new Date(),
        description: 'Lightning in a Bottle is an annual music festival in the Central Valley region of California first held in 2006. It is presented by The Do LaB, which seeks to promote sustainability, social cohesion, and creative expression.',
        capacity: 5000,
        secretLocation: false,
        userId: 1,
        venueId: 4,
        eventTypeId: 1
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Events', null, {});
  }
};
