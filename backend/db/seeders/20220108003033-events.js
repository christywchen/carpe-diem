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
        startTime: '2022-01-22 19:00:00',
        endTime: '2022-01-23 04:00:00',
        description: 'A gathering of local artists and friends.',
        capacity: 700,
        secretLocation: true,
        published: true,
        virtualEvent: true,
        hostId: 1,
        venueId: 1,
        categoryId: 4
      }, {
        name: 'Daft Punk & Friends Night',
        startTime: '2022-01-20 05:57:38',
        endTime: '2022-01-20 00:00:00',
        endTime: new Date(),
        description: '1720 Presents the first Daft Punk and Friends Tribute Party of 2022, playing the classics, french electro, indie-dance, disco, and More! 🤖',
        capacity: 700,
        secretLocation: false,
        published: true,
        virtualEvent: false,
        hostId: 1,
        venueId: 1,
        categoryId: 4
      }, {
        name: 'Techno Takeover',
        startTime: '2022-01-11 05:57:38',
        endTime: '2022-01-15 00:00:00',
        description: 'First 100 RSVPs get in free before 11pm. Proof of Full Vaccination Required.',
        capacity: 700,
        secretLocation: true,
        published: true,
        virtualEvent: false,
        hostId: 3,
        venueId: 1,
        categoryId: 2
      }, {
        name: 'TCHAMI X AC SLATER',
        startTime: '2022-01-14 19:00:00',
        endTime: '2022-01-15 00:00:00',
        description: 'As we move firmly into the new decade, Parisian producer and DJ Tchami has built a loyal fanbase on both sides of the Atlantic with his genre-defying sound and unique brand of spiritual house music.',
        capacity: 8500,
        secretLocation: false,
        published: false,
        virtualEvent: false,
        hostId: 1,
        venueId: 4,
        categoryId: 2
      }, {
        name: 'Crush SF',
        startTime: '2022-02-11 19:00:00',
        endTime: '2022-02-13 01:00:00',
        endTime: new Date(),
        description: 'The love returns to San Francisco on Friday, February 11th and Saturday, February 12th! #CRUSHSF. Lineup: BOOMBOX CARTEL // EVAN GIIA // FREAK ON // FRIENDZONE // JAI WOLF // MOORE KISMET // NØLL // NOSTALGIX // PHANTOMS (DJ SET) // SIDEPIECE // WAX MOTIF // XIE',
        capacity: 300,
        secretLocation: false,
        published: true,
        virtualEvent: true,
        hostId: 2,
        venueId: 3,
        categoryId: 1
      }, {
        name: 'Polo & Pan SF',
        startTime: '2022-01-14 19:00:00',
        endTime: '2022-01-15 01:00:00',
        description: 'With just one full-length album (2017\'s Caravelle) to their name, Polo & Pan have become synonymous with trippy dance tracks that carry equally dreamy melodies.  The duo, consisting of Paul Armand-Delille (Polo) and Alexandre Grynszpan (Pan), first met in 2012 and have since been creating fans around the globe performing to sold-out crowds at notable venues like LA\'s Novo, London\'s Printworks, NY\'s Terminal 5, and Montreal\'s MTELUS. They\'ve played numerous festival stages such as 2019\'s Coachella where Billboard called their performance "without a doubt one of the best performances."',
        capacity: 300,
        secretLocation: false,
        published: true,
        virtualEvent: false,
        hostId: 3,
        venueId: 3,
        categoryId: 3
      }, {
        name: 'Said the Sky',
        startTime: '2022-01-18 19:00:00',
        endTime: new Date(),
        description: 'Trevor Christensen has been a musician for 20 years, releasing triumphant electronic-pop as Said the Sky since 2014. Freshly signed to friend and collaborator Illenium\'s Kasaya and 12Tone Music, he\'s exploring his limitless potential, blending the lofty melodies of hits "Rush Over Me," "All I Got" and "Where\'d U Go" with the pop-punk energy of his youth.',
        capacity: 300,
        secretLocation: false,
        published: true,
        virtualEvent: false,
        hostId: 2,
        venueId: 5,
        categoryId: 3
      }, {
        name: 'Dabin\'s Between Broken @ NYC',
        startTime: '2022-01-21 20:00:00',
        endTime: '2022-01-21 23:00:00',
        endTime: new Date(),
        description: 'Dabin is a JUNO nominated music producer & instrumentalist originally from Toronto. Having spent his teens learning to play the piano, drums and guitar, Dabin started producing electronic music in 2011.',
        capacity: 300,
        secretLocation: false,
        published: true,
        virtualEvent: false,
        hostId: 1,
        venueId: 5,
        categoryId: 3
      }, {
        name: 'Beyond Wonderland',
        startTime: '2022-03-21 20:00:00',
        endTime: '2022-03-22 02:00:00',
        description: 'Follow Alice on her wondrous journey through the various realms of Beyond Wonderland.',
        capacity: 300,
        secretLocation: false,
        published: true,
        virtualEvent: false,
        hostId: 2,
        venueId: 4,
        categoryId: 1
      }, {
        name: 'Wasteland',
        startTime: '2022-08-21 19:00:00',
        endTime: '2022-08-21 23:30:00',
        description: 'After a brief hiatus, Basscon Wasteland returns to Southern California for two electrifying nights of hard dance.',
        capacity: 5000,
        secretLocation: false,
        published: false,
        virtualEvent: true,
        hostId: 2,
        venueId: 4,
        categoryId: 1
      }, {
        name: 'Electric Forest',
        startTime: '2022-06-23 19:30:00',
        endTime: '2022-06-26 02:00:00',
        description: 'Electric Forest is a four-day, one-weekend, multi-genre event with a focus on electronic and jam band genres, held in Rothbury, Michigan, at the Double JJ Resort. In 2017 and 2018, the festival expanded to two weekends back to back, before switching back to one weekend for 2019.',
        secretLocation: false,
        published: true,
        virtualEvent: true,
        hostId: 3,
        categoryId: 4
      }, {
        name: 'Lightning in a Bottle',
        startTime: '2022-05-25 15:00:00',
        endTime: '2022-05-30 15:00:00',
        description: 'Lightning in a Bottle is an annual music festival in the Central Valley region of California first held in 2006. It is presented by The Do LaB, which seeks to promote sustainability, social cohesion, and creative expression.',
        secretLocation: false,
        published: false,
        virtualEvent: true,
        hostId: 1,
        categoryId: 4
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
