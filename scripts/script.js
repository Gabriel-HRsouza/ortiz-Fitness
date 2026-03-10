const modal = document.getElementById("modal-inscricao");
const btnAbrir = document.getElementById("btn-inscrever");
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

// Enviar dados para a página de cadastro
btnEnviar.onclick = function() {
    const nome     = document.getElementById('nome').value.trim();
    const email    = document.getElementById('email').value.trim();
    const plano    = document.getElementById('plano').value;
    const telefone = document.getElementById('telefone').value.trim();

    if (!nome || !email || !telefone) {
        alert("Por favor, preencha todos os campos antes de continuar.");
        return;
    }

    // Salva os dados para a próxima página
    sessionStorage.setItem('ortiz_pre_cadastro', JSON.stringify({
        nome,
        email,
        plano,
        telefone
    }));

    // Redireciona para a página de cadastro
    window.location.href = 'cadastro.html';
}