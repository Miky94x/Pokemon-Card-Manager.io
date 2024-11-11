// Lista globale delle carte
let cards = [];

// Funzione per caricare le carte dal localStorage
function loadCardsFromStorage() {
    const storedCards = localStorage.getItem('cards');
    if (storedCards) {
        cards = JSON.parse(storedCards);
    }
    loadCards();  // Ricarica le carte nella vista
}

// Funzione per salvare le carte nel localStorage
function saveCardsToStorage() {
    localStorage.setItem('cards', JSON.stringify(cards));
}

// Funzione per aggiungere la carta
document.getElementById('card-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const cardData = {
        image: document.getElementById('card-image').value,
        name: document.getElementById('card-name').value,
        number: document.getElementById('card-number').value,
        setCode: document.getElementById('card-set-code').value,
        cost: parseFloat(document.getElementById('card-cost').value.replace(',', '.')), // sostituzione virgola con punto
        quantity: parseInt(document.getElementById('card-quantity').value),
        language: document.getElementById('card-language').value,
        cardmarketLink: document.getElementById('card-link').value,
    };

    // Validazione del costo
    if (isNaN(cardData.cost)) {
        alert('Il costo inserito non è valido.');
        return;
    }

    // Aggiungi la carta all'array
    cards.push(cardData);

    // Salva le carte nel localStorage
    saveCardsToStorage();

    // Mostra il messaggio di successo
    document.getElementById('message').innerText = 'Carta aggiunta con successo!';

    // Nascondi il form e mostra il bottone per aggiungere una carta
    document.getElementById('form-container').style.display = 'none';
    document.getElementById('show-form-button').style.display = 'inline-block';

    // Ricarica la lista delle carte
    loadCards();

    // Pulisci il form
    document.getElementById('card-form').reset();
});

// Funzione per caricare le carte nella vista
function loadCards() {
    const cardsList = document.getElementById('cards-list');
    cardsList.innerHTML = ''; // Pulisce la lista esistente

    cards.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        cardDiv.innerHTML = `
            <img src="${card.image}" alt="${card.name}" class="card-image">
            <p><strong>Nome:</strong> ${card.name}</p>
            <p><strong>Numero:</strong> ${card.number}</p>
            <p><strong>Set:</strong> ${card.setCode}</p>
            <p><strong>Costo:</strong> €${card.cost}</p>
            <p><strong>Lingua:</strong> ${card.language}</p>
            <p><strong>Quantità:</strong> ${card.quantity}</p>
            <p><strong>Link:</strong> <a href="${card.cardmarketLink}" target="_blank">Cardmarket</a></p>
        `;
        cardsList.appendChild(cardDiv);
    });
}

// Funzione per passare alla vista lista
document.getElementById('list-view-button').addEventListener('click', () => {
    document.getElementById('cards-list').classList.remove('tile-view');
    document.getElementById('cards-list').classList.add('list-view');
});

// Funzione per passare alla vista tile
document.getElementById('tile-view-button').addEventListener('click', () => {
    document.getElementById('cards-list').classList.remove('list-view');
    document.getElementById('cards-list').classList.add('tile-view');
});

// Funzione per salvare il backup dei dati in un file JSON
document.getElementById('save-backup').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(cards, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'backup_carte.json';
    a.click();

    URL.revokeObjectURL(url);
});

// Funzione per visualizzare il form per aggiungere una carta
document.getElementById('show-form-button').addEventListener('click', () => {
    document.getElementById('form-container').style.display = 'block';
    document.getElementById('show-form-button').style.display = 'none';
});

// Carica le carte salvate quando la pagina viene caricata
loadCardsFromStorage();
