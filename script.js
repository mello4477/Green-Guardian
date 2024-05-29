const items = [
  { name: "Garrafa de plástico", type: "plastico", img: "https://w7.pngwing.com/pngs/908/930/png-transparent-water-bottles-plastic-bottle-glass-bottle-mineral-water-bottle-glass-recycling-plastic-bottle.png" },
  { name: "Papelão", type: "reciclavel", img: "https://e7.pngegg.com/pngimages/232/1022/png-clipart-cardboard-material-resources-cardboard-material.png" },
  { name: "Restos de comida", type: "organico", img: "https://w7.pngwing.com/pngs/311/95/png-transparent-leftovers-buffet-food-ragout-char-siu-yen-thumbnail.png" },
  { name: "Garrafa de vidro", type: "vidro", img: "https://w7.pngwing.com/pngs/427/174/png-transparent-clear-glass-bottle-with-cork-cap-bottle-drawing-cartoon-drift-bottle-glass-plastic-bottle-wine-bottle.png" },
  { name: "Lata de alumínio", type: "metal", img: "https://e7.pngegg.com/pngimages/318/812/png-clipart-sublimation-tin-can-aluminium-aluminum-can-white-platos-white-color-thumbnail.png" },
  // Adicione mais itens conforme necessário
];

let errors = 0;
let corrects = 0;
let currentItems = [];

function startGame() {
  errors = 0;
  corrects = 0;
  currentItems = [...items]; // Faz uma cópia dos itens
  document.getElementById('errors').textContent = errors;
  document.getElementById('corrects').textContent = corrects;
  document.getElementById('message').style.display = 'none';
  document.getElementById('item-container').innerHTML = '';
  spawnItem();
}

function spawnItem() {
  if (currentItems.length === 0) {
    showMessage('Parabéns! Você conseguiu!', true);
    return;
  }

  const randomIndex = Math.floor(Math.random() * currentItems.length);
  const item = currentItems.splice(randomIndex, 1)[0];

  const itemElement = document.createElement('div');
  itemElement.className = 'item';
  itemElement.draggable = true;
  itemElement.ondragstart = (event) => {
    event.dataTransfer.setData('text/plain', item.type);
  };

  const itemImage = document.createElement('img');
  itemImage.src = item.img;
  itemImage.alt = item.name;
  itemElement.appendChild(itemImage);

  document.getElementById('item-container').appendChild(itemElement);
}

document.querySelectorAll('.bin').forEach(bin => {
  bin.ondragover = (event) => event.preventDefault();
  bin.ondrop = (event) => {
    event.preventDefault();
    const itemType = event.dataTransfer.getData('text/plain');
    if (bin.getAttribute('data-type') === itemType) {
      corrects++;
      document.getElementById('corrects').textContent = corrects;
      document.getElementById('item-container').innerHTML = '';
      spawnItem();
    } else {
      errors++;
      document.getElementById('errors').textContent = errors;
      if (errors >= 5) {
        showMessage('Oops! Você errou, tente novamente!', false);
      } else {
        document.getElementById('item-container').innerHTML = '';
        spawnItem();
      }
    }
  };
});

function showMessage(text, success) {
  document.getElementById('message-text').textContent = text;
  document.getElementById('message').style.display = 'block';
  if (success) {
    document.getElementById('restart-btn').textContent = 'Jogar novamente';
  } else {
    document.getElementById('restart-btn').textContent = 'Recomeçar';
  }
}

window.onload = startGame;
