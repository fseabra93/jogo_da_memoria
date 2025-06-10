function mostrar(){
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
}

function carregar_jogo() {
    const sexoElement = document.getElementById("sexo");
    const faixaEtariaElement = document.getElementById("faixa_etaria");

    // É mais seguro usar o 'value' das opções, que são os identificadores reais.
    const sexo = sexoElement.value;
    const faixa_etaria = faixaEtariaElement.value;
    
    // Supondo que você tenha uma função para mostrar a mensagem de erro/alerta na tela,
    // como a 'mostrarMensagemNaTela' que sugeri anteriormente.
    // Ou, se for um pop-up simples, use 'alert()'.
    const elementoFeedback = document.getElementById("feedbackMensagem"); // Adicione este elemento no seu HTML

    // 1. Validar se as seleções foram feitas
    if (sexo === "" || faixa_etaria === "") {
        if (elementoFeedback) {
            elementoFeedback.textContent = "Por favor, selecione tanto o Sexo quanto a Faixa Etária.";
            elementoFeedback.style.color = "red"; // Mensagem de erro em vermelho
        } else {
            alert("Por favor, selecione tanto o Sexo quanto a Faixa Etária.");
        }
        return; // Sai da função se a seleção não for válida
    }

    // 2. Lógica de redirecionamento baseada nos VALUES
    if (sexo === "masc") {
        if (faixa_etaria === "ate10") {
            window.location.href = "game1/index.html";
        } else if (faixa_etaria === "10mais") {
            window.location.href = "game2/index.html";
        }
        // Não há uma condição 'invalido' para faixa etária no HTML,
        // então não precisamos de um if para ela aqui, pois já validamos acima.
    } else if (sexo === "fem") { // Use else if para 'fem' para garantir que apenas uma ramificação seja executada
        if (faixa_etaria === "ate10") {
            window.location.href = "dor_pos.html";
        } else if (faixa_etaria === "10mais") {
            window.location.href = "nimesulida.html";
        }
        // Não há uma condição 'invalido' para faixa etária no HTML
    } else {
        // Caso algum 'sexo' inesperado seja selecionado (improvável com seu HTML atual)
        if (elementoFeedback) {
            elementoFeedback.textContent = "Seleção de sexo inválida.";
            elementoFeedback.style.color = "red";
        } else {
            alert("Seleção de sexo inválida.");
        }
    }
}

// Exemplo de uma função mostrarMensagemAlert se você ainda quiser usar o pop-up
function mostrarMensagemAlert() {
    alert("Por favor, selecione uma opção válida."); // Ou uma mensagem mais específica
}





