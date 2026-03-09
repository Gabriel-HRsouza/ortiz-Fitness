const modal = document.getElementById("modal-inscricao");
const btnAbrir = document.getElementById("btn-inscrever"); // O botão vermelho do seu site
const btnFechar = document.querySelector(".close-button");
const btnEnviar = document.getElementById("btn-enviar-dados");

// Abrir o modal
btnAbrir.onclick = function() {
    modal.style.display = "block";
}

// Fechar no X
btnFechar.onclick = function() {
    modal.style.display = "none";
}

// Fechar se clicar fora da caixa
window.onclick = function(event) {
    if (event.target == modal) { modal.style.display = "none"; }
}

// Enviar dados para o Quarkus
btnEnviar.onclick = function() {
    const aluno = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        plano: document.getElementById('plano').value
    };

    fetch('http://localhost:8080/alunos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(aluno)
    })
    .then(res => res.json())
    .then(data => {
        alert("Show, " + data.nome + "! Agora é só treinar.");
        modal.style.display = "none"; // Fecha o modal após sucesso
    })
    .catch(err => alert("Erro ao conectar com o Java!"));
}