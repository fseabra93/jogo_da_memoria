/*function mostrar(){
    document.getElementById('texto1').innerHTML = 'Preparar para cirurgia';
    document.getElementById('texto2').innerHTML = 'Controle da dor e infecção pós-operatórias';
}

function nimesulida(){
    document.getElementById('nim1').innerHTML = 'Porque funciona';
    document.getElementById('nim2').innerHTML = '...na maioria dos casos.';  
}

function cox1_2(){
    document.getElementById("coxes").style.display ='block';
    document.getElementById("cox2_button").style.display ='none';
    document.getElementById("cox1_button").style.display ='none';
    document.getElementById("mas_button").style.display ='none';
}

function cox1(){
    document.getElementById("coxes").style.display ='none';
    document.getElementById("cox2_button").style.display ='none';
    document.getElementById("cox1_button").style.display ='block';
    document.getElementById("mas_button").style.display ='none';
}

function cox2(){
    document.getElementById("coxes").style.display ='none';
    document.getElementById("cox1_button").style.display ='none';
    document.getElementById("cox2_button").style.display ='block';
    document.getElementById("mas_button").style.display ='none';
}

function mas(){
    document.getElementById("coxes").style.display ='none';
    document.getElementById("cox1_button").style.display ='none';
    document.getElementById("cox2_button").style.display ='none';
    document.getElementById("mas_button").style.display ='block';

}

function risco(){
    document.getElementById("risco_button").style.display ='block';
    document.getElementById("outros_button").style.display ='none';
}

function outros(){
    document.getElementById("risco_button").style.display ='none';
    document.getElementById("outros_button").style.display ='block';
}

function limpar(){
    document.getElementById("risco_button").style.display ='none';
    document.getElementById("outros_button").style.display ='none';


}

function limpar2(){
    document.getElementById("escada_button").style.display ='none';
    document.getElementById("tylex_button").style.display ='none';
    document.getElementById("tramal_button").style.display ='none';
    document.getElementById("rce_button").style.display ='none';
}

function limpar3(){
    document.getElementById("bacteria_button").style.display ='none';
    document.getElementById("gram_button").style.display ='none';

}

function escada(){
    document.getElementById("escada_button").style.display ='block';
    document.getElementById("tylex_button").style.display ='none';
    document.getElementById("tramal_button").style.display ='none';
    document.getElementById("rce_button").style.display ='none';

}

function tylex(){
    document.getElementById("escada_button").style.display ='none';
    document.getElementById("tylex_button").style.display ='block';
    document.getElementById("tramal_button").style.display ='none';
    document.getElementById("rce_button").style.display ='none';

}

function tramal(){
    document.getElementById("escada_button").style.display ='none';
    document.getElementById("tylex_button").style.display ='none';
    document.getElementById("tramal_button").style.display ='block';
    document.getElementById("rce_button").style.display ='none';

}

function rce(){
    document.getElementById("escada_button").style.display ='none';
    document.getElementById("tylex_button").style.display ='none';
    document.getElementById("tramal_button").style.display ='none';
    document.getElementById("rce_button").style.display ='block';


}

function bacteria(){
    document.getElementById("bacteria_button").style.display ='block';
    document.getElementById("gram_button").style.display ='none';
}

function gram(){
    document.getElementById("gram_button").style.display ='block';
    document.getElementById("bacteria_button").style.display ='none';
}

function mostrarMensagemAlert() {
    alert("Olá! Esta é uma mensagem simples para o usuário.");
}*/

function carregar_jogo() {
    const sexoElement = document.getElementById("sexo"); // Referência correta ao select

    // Obtenha o valor selecionado do elemento sexoElement
    const selecionar = sexoElement.value;
    
    // Supondo que você tenha uma função para mostrar a mensagem de erro/alerta na tela,
    // como a 'mostrarMensagemNaTela' que sugeri anteriormente.
    // Ou, se for um pop-up simples, use 'alert()'.
    const elementoFeedback = document.getElementById("feedbackMensagem"); // Adicione este elemento no seu HTML

    // 1. Validar se as seleções foram feitas
    if (selecionar === "invalido") { // Use "invalido" que é o valor da sua opção padrão
        if (elementoFeedback) {
            elementoFeedback.textContent = "Por favor, selecione um jogo.";
            elementoFeedback.style.color = "red"; // Mensagem de erro em vermelho
        } else {
            alert("Por favor, selecione um jogo."); // Fallback para alert se elementoFeedback não existir
        }
        return; // Sai da função se a seleção não for válida
    }

    // 2. Lógica de redirecionamento baseada nos VALUES
    if (selecionar === "menina") {
            window.location.href = "game3/index.html";
    } else if (selecionar === "menino"){
            window.location.href = "game1/index.html";
    } else if (selecionar === "garota"){
            window.location.href = "game4/index.html";
    } else if (selecionar === "garoto"){
            window.location.href = "game2/index.html";
    }
}

// Exemplo de uma função mostrarMensagemAlert se você ainda quiser usar o pop-up
function mostrarMensagemAlert() {
    alert("Por favor, selecione uma opção válida."); // Ou uma mensagem mais específica
}




