const gameBoard = document.querySelector('.game-board');
const resetButton = document.querySelector('.reset-button');
const questionOverlay = document.querySelector('.question-overlay');
// const questionText = document.querySelector('.question-overlay p'); // --- MUDANÇA AQUI --- Esta linha não é mais necessária

// Array com os nomes das suas 10 imagens (coloque os nomes exatos dos seus arquivos)
const cardImages = [
    'image1.png', 'image2.png', 'image3.png', 'image4.png', 'image5.png',
    'image6.png', 'image7.png', 'image8.png', 'image9.png', 'image10.png'
];

const backCardImage = 'card-back.png';

// Array de perguntas (mantido como está)
const questions = [
    "O que você sabe sobre o que aconteceu?",
    "O que você gostaria de lembrar sobre a pessoa que se foi, mesmo quando estiver crescida?",
    "Se você pudesse criar um desenho sobre como você está se sentindo agora, como seria?",
    "Existe algo que te deixa muito triste ou brava sobre o que aconteceu?",
    "Qual é a sua lembrança favorita?",
    "Quem são as pessoas que você sente que podem te ajudar quando você está triste?",
    "Se você pudesse dizer uma coisa para essa pessoa, o que seria?",
    "Você acha que é certo rir ou se divertir?",
    "Você tem algum medo ou preocupação sobre o futuro?",
    "O que você acha que ela gostaria que você soubesse ou fizesse agora?"
];

// --- MUDANÇA AQUI: NOVO ARRAY PARA AS IMAGENS DAS PERGUNTAS ---
// Associe cada imagem a uma pergunta. A ordem é importante!
// A primeira imagem aqui corresponde à primeira pergunta, e assim por diante.
const questionImages = [
    'images/image1.png', // Imagem para a pergunta 1
    'images/image2.png', // Imagem para a pergunta 2
    'images/image3.png', // Imagem para a pergunta 3
    'images/image4.png', // Imagem para a pergunta 4
    'images/image5.png', // Imagem para a pergunta 5
    'images/image6.png', // Imagem para a pergunta 6
    'images/image7.png', // Imagem para a pergunta 7
    'images/image8.png', // Imagem para a pergunta 8
    'images/image9.png', // Imagem para a pergunta 9
    'images/image10.png'      // Imagem para a pergunta 10
];
// Lembre-se de criar uma pasta "perguntas" dentro da sua pasta "images" ou ajustar os caminhos acima.

let cards = [];
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchedPairs = 0;

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

function createBoard() {
    let gameImages = [...cardImages, ...cardImages];
    gameImages = shuffle(gameImages);
    gameBoard.innerHTML = '';
    matchedPairs = 0;
    cards = [];

    gameImages.forEach(imageName => {
        const memoryCard = document.createElement('div');
        memoryCard.classList.add('memory-card');
        memoryCard.dataset.framework = imageName;

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
        cards.push(memoryCard);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    matchedPairs++;

    if (matchedPairs <= cardImages.length) {
        // --- MUDANÇA AQUI: LÓGICA PARA MOSTRAR PERGUNTA E IMAGEM ---
        const imageFileName = firstCard.dataset.framework;
        const imageIndex = cardImages.indexOf(imageFileName);
        
        if (imageIndex !== -1) {
            // Pega a pergunta e a imagem correspondente usando o mesmo índice
            const questionToShow = questions[imageIndex];
            const imageToShow = questionImages[imageIndex];
            
            // Chama a nova função passando ambos os dados
            setTimeout(() => showQuestionAndImage(questionToShow, imageToShow), 500);
        } else {
            resetBoard(); 
        }
    } else {
        setTimeout(() => alert('Parabéns! Você encontrou todos os pares!'), 500);
    }

    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500); // Reduzi o tempo para 1.5s, 2s é um pouco longo
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// --- MUDANÇA AQUI: FUNÇÃO TOTALMENTE REESCRITA ---
// Função para exibir a pergunta E a imagem
function showQuestionAndImage(question, imageUrl) {
    lockBoard = true;
    
    // 1. Limpa qualquer conteúdo anterior do overlay
    questionOverlay.innerHTML = ''; 

    // 2. Cria o elemento <p> para a pergunta
    const questionElement = document.createElement('p');
    questionElement.textContent = question;

    // 3. Cria o elemento <img> para a imagem
    const imageElement = document.createElement('img');
    imageElement.src = imageUrl;
    imageElement.alt = "Imagem relacionada à pergunta"; // Boa prática de acessibilidade

    // 4. Adiciona a pergunta e a imagem ao overlay
    questionOverlay.appendChild(questionElement);
    questionOverlay.appendChild(imageElement);

    // 5. Mostra o overlay
    questionOverlay.style.display = 'flex';
}


// Função para esconder a pergunta e destravar o jogo (mantida como está)
function hideQuestion() {
    questionOverlay.style.display = 'none';
    lockBoard = false;
}

resetButton.addEventListener('click', () => {
    resetBoard();
    hideQuestion();
    createBoard();
});

questionOverlay.addEventListener('click', hideQuestion);

createBoard();