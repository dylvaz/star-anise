const randomAnimalName = require('random-animal-name');

module.exports = () => `${randomAnimalName().toLowerCase().replace(' ', '')}${Math.floor(Math.random() * 999)}`;
