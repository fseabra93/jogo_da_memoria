const gameBoard = document.querySelector('.game-board');
const resetButton = document.querySelector('.reset-button');

// Array com os nomes das suas 10 imagens (coloque os nomes exatos dos seus arquivos)
// Certifique-se de que essas imagens estejam na pasta 'images/'
const cardImages = [
    '1_2.png', // Exemplo: renomeie para os seus arquivos
    '2_2.png',
    '3_2.png',
    '4_2.png',
    '5_2.png',
    '6_2.png',
    '7_2.png',
    '8_2.png',
    '9_2.png',
    '10_2.png'
];

const backCardImage = 'card-back.png'; // Nome da imagem do verso da carta

let cards = [];
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchedPairs = 0;

// Função para embaralhar um array
function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // Enquanto houver elementos para embaralhar
    while (currentIndex !== 0) {
        // Pega um elemento restante
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // E troca com o elemento atual
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

// Função para criar o tabuleiro do jogo
function createBoard() {
    // Duplica as imagens para termos pares
    let gameImages = [...cardImages, ...cardImages];
    // Embaralha as imagens
    gameImages = shuffle(gameImages);

    gameBoard.innerHTML = ''; // Limpa o tabuleiro existente
    matchedPairs = 0; // Reseta o contador de pares

    cards = []; // Limpa o array de cartas

    gameImages.forEach(imageName => {
        const memoryCard = document.createElement('div');
        memoryCard.classList.add('memory-card');
        memoryCard.dataset.framework = imageName; // Usamos o nome da imagem como identificador

        const frontFace = document.createElement('img');
        frontFace.classList.add('front-face');
        frontFace.src = `images/${imageName}`;
        frontFace.alt = 'Card front';

        const backFace = document.createElement('img');
        backFace.classList.add('back-face');
        backFace.src = `images/${backCardImage}`;
        backFace.alt = 'Card back';

        memoryCard.appendChild(frontFace);
        memoryCard.appendChild(backFace);

        memoryCard.addEventListener('click', flipCard);
        gameBoard.appendChild(memoryCard);
        cards.push(memoryCard); // Adiciona a carta ao array de cartas
    });
}

// Função para virar a carta
function flipCard() {
    if (lockBoard) return; // Se o tabuleiro estiver travado, não faz nada
    if (this === firstCard) return; // Impede clicar na mesma carta duas vezes

    this.classList.add('flip');

    if (!hasFlippedCard) {
        // Primeira carta virada
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    // Segunda carta virada
    secondCard = this;
    checkForMatch();
}

// Função para verificar se as cartas são iguais
function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disableCards() : unflipCards();
}

// Função para desabilitar as cartas (se forem iguais)
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    matchedPairs++;
    resetBoard();

    if (matchedPairs === cardImages.length) { // Se o número de pares encontrados for igual ao número de imagens únicas
        setTimeout(() => alert('Parabéns! Você encontrou todos os pares!'), 500);
    }
}

// Função para desvirar as cartas (se forem diferentes)
function unflipCards() {
    lockBoard = true; // Trava o tabuleiro para que o jogador não clique em outras cartas

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 2000); // Vira as cartas de volta após 2 segundos
}

// Função para resetar as variáveis do tabuleiro
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// Evento para o botão de reiniciar
resetButton.addEventListener('click', () => {
    resetBoard(); // Reseta as variáveis de estado
    createBoard(); // Recria o tabuleiro com novas posições
});

// Inicializa o jogo ao carregar a página
createBoard();