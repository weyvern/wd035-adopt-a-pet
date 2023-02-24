const express = require('express');
const petList = require('./petList');
const app = express();

const port = 8000;

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', {
    categories: [
      { name: 'Dogs', href: '/animals/dogs' },
      { name: 'Cats', href: '/animals/cats' },
      { name: 'Rabbits', href: '/animals/rabbits' }
    ]
  });
});

app.get('/animals/:pet_type', (req, res) => {
  const {
    params: { pet_type: animalType }
  } = req; // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
  const availableAnimals = petList[animalType];

  if (availableAnimals) {
    let listItems = '';
    availableAnimals.forEach(animal => {
      listItems += `<li><a href='/animals/${animalType}/${animal.id}'>${animal.name}</a></li>`;
    });
    res.send(`
        <h1>This are our ${animalType}</h1>
        <ul>
         ${listItems}
        </ul>
    `);
  } else {
    res.send(`
      <h1>Sorry, we don't seem to have any ${animalType}</h1>
    `);
  }
});

app.get('/animals/:pet_type/:pet_id', (req, res) => {
  const {
    params: { pet_type, pet_id }
  } = req; // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
  const availableAnimals = petList[pet_type];
  const pet = availableAnimals.find(animal => animal.id === parseInt(pet_id));
  res.send(`
      <h1>${pet.name}</h1>
      <img src=${pet.url} width='400' alt=${pet.name}/>
      <p>Age: ${pet.age}</p>
      <p>Breed: ${pet.breed}</p>
  `);
});

app.get('*', (req, res) => res.send('NOT FOUND'));

app.listen(port, () => console.log(`Server running on port ${port}`));
