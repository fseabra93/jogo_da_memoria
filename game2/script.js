const gameBoard = document.querySelector('.game-board');
const resetButton = document.querySelector('.reset-button');
const questionOverlay = document.querySelector('.question-overlay');
const questionText = document.querySelector('.question-overlay p');

// Array com os nomes das suas 10 imagens (coloque os nomes exatos dos seus arquivos)
// Certifique-se de que essas imagens estejam na pasta 'images/'
const cardImages = [
    'image1.png', // Exemplo: renomeie para os seus arquivos
    'image2.png',
    'image3.png',
    'image4.png',
    'image5.png',
    'image6.png',
    'image7.png',
    'image8.png',
    'image9.png',
    'image10.png'
];

const backCardImage = 'card-back.png'; // Nome da imagem do verso da carta

// --- NOVAS PERGUNTAS ---
const questions = [
    "1. Qual a capital do Brasil?",
    "2. Quem pintou a Monalisa?",
    "3. Qual o maior oceano do mundo?",
    "4. Quantos planetas há no nosso sistema solar?",
    "5. Qual o animal terrestre mais rápido?",
    "6. Quem escreveu 'Dom Quixote'?",
    "7. Qual elemento químico é simbolizado por 'O'?",
    "8. Em que ano a internet foi criada para uso público?",
    "9. Qual a montanha mais alta do mundo?",
    "10. Qual o rio mais longo do mundo?"
];
// --- FIM DAS NOVAS PERGUNTAS ---

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

    if (matchedPairs < cardImages.length) {
        // --- MODIFICAÇÃO AQUI ---
        // Encontra o índice da imagem que formou o par
        const imageFileName = firstCard.dataset.framework;
        const imageIndex = cardImages.indexOf(imageFileName);
        
        // Se o índice for válido, mostra a pergunta correspondente
        if (imageIndex !== -1 && imageIndex < questions.length) {
            setTimeout(() => showQuestion(questions[imageIndex]), 500);
        } else {
            // Caso algo dê errado (imagem sem pergunta correspondente), apenas reseta o board
            resetBoard(); 
        }
        // --- FIM DA MODIFICAÇÃO ---
    } else {
        setTimeout(() => alert('Parabéns! Você encontrou todos os pares!'), 500);
    }

    resetBoard();
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

// --- NOVAS FUNÇÕES PARA PERGUNTAS ---

// Função para exibir uma pergunta específica
function showQuestion(questionToShow) {
    lockBoard = true; // Trava o jogo
    questionText.textContent = questionToShow; // Define o texto da pergunta
    questionOverlay.style.display = 'flex'; // Torna a sobreposição visível
}

// Função para esconder a pergunta e destravar o jogo
function hideQuestion() {
    questionOverlay.style.display = 'none'; // Esconde a sobreposição
    lockBoard = false; // Destrava o jogo
}

// --- FIM DAS NOVAS FUNÇÕES ---

// Evento para o botão de reiniciar
resetButton.addEventListener('click', () => {
    resetBoard(); // Reseta as variáveis de estado
    hideQuestion(); // Garante que a pergunta esteja escondida
    createBoard(); // Recria o tabuleiro com novas posições
});

// Evento para clicar na sobreposição da pergunta e escondê-la
questionOverlay.addEventListener('click', hideQuestion); // Adiciona listener para fechar a pergunta


// Inicializa o jogo ao carregar a página
createBoard();