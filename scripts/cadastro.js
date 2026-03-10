// 1. Carregar dados do sessionStorage
const dados = JSON.parse(sessionStorage.getItem('ortiz_pre_cadastro') || '{}');

function inicializar() {
    const { nome = '', email = '', telefone = '', plano = '' } = dados;

    // Preencher campos Visíveis
    document.getElementById('field-nome').value = nome;
    document.getElementById('field-email').value = email;
    document.getElementById('field-telefone').value = telefone;
    document.getElementById('plano-badge').textContent = plano ? `PLANO ORTIZ ${plano.toUpperCase()}` : '—';

    // Preencher Resumo
    document.getElementById('summary-nome').textContent = nome || '—';
    document.getElementById('summary-email').textContent = email || '—';
    document.getElementById('summary-telefone').textContent = telefone || '—';
}

// 2. Toggle mostrar/ocultar senha
document.getElementById('btn-toggle-senha').addEventListener('click', function() {
    const input = document.getElementById('field-senha');
    if (input.type === 'password') {
        input.type = 'text';
        this.textContent = 'Ocultar';
    } else {
        input.type = 'password';
        this.textContent = 'Mostrar';
    }
});

// 3. Força da senha
document.getElementById('field-senha').addEventListener('input', function() {
    const val = this.value;
    const fill = document.getElementById('strength-fill');
    const text = document.getElementById('strength-text');
    let score = 0;

    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;

    const levels = [
        { pct: '0%', color: '#333', label: 'Digite uma senha' },
        { pct: '25%', color: '#e3000f', label: 'Fraca' },
        { pct: '50%', color: '#ff8c00', label: 'Razoável' },
        { pct: '75%', color: '#f0c000', label: 'Boa' },
        { pct: '100%', color: '#00c851', label: 'Forte' },
    ];

    const lvl = val.length === 0 ? levels[0] : levels[score] || levels[4];
    fill.style.width = lvl.pct;
    fill.style.background = lvl.color;
    text.textContent = lvl.label;
});

// 4. Função Finalizar Cadastro
async function finalizar() {
    const erroEl = document.getElementById('error-msg');
    const btn = document.getElementById('btn-finalizar');
    erroEl.style.display = 'none';

    const senha = document.getElementById('field-senha').value;
    const senha2 = document.getElementById('field-senha2').value;
    const dataNasc = document.getElementById('field-data').value;

    // Validações
    if (!dataNasc) return mostrarErro('Por favor, informe sua data de nascimento.');
    if (senha.length < 8) return mostrarErro('A senha deve ter no mínimo 8 caracteres.');
    if (senha !== senha2) return mostrarErro('As senhas não coincidem.');

    const aluno = {
        nome: dados.nome || '',
        email: dados.email || '',
        plano: dados.plano || '',
        telefone: dados.telefone || '',
        dataNascimento: dataNasc,
        senha: senha
    };

    // UI Loading
    btn.textContent = 'ENVIANDO...';
    btn.classList.add('loading');

    try {
        const response = await fetch('http://localhost:8080/alunos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(aluno)
        });

        if (response.ok) {
            const resData = await response.json();
            sessionStorage.removeItem('ortiz_pre_cadastro');
            document.getElementById('success-msg').textContent = `Bem-vindo(a), ${resData.nome}! Seu treino começa agora. 💪`;
            document.getElementById('form-view').style.display = 'none';
            document.getElementById('success-view').style.display = 'block';
        } else {
            mostrarErro('Erro ao salvar cadastro no servidor.');
            resetBtn(btn);
        }
    } catch (err) {
        mostrarErro('Erro de conexão. O Quarkus está rodando?');
        resetBtn(btn);
    }
}

function mostrarErro(msg) {
    const el = document.getElementById('error-msg');
    el.textContent = msg;
    el.style.display = 'block';
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function resetBtn(btn) {
    btn.textContent = 'GARANTIR MINHA VAGA';
    btn.classList.remove('loading');
}

// Event Listeners
document.getElementById('btn-finalizar').addEventListener('click', finalizar);
document.addEventListener('DOMContentLoaded', inicializar);

function toggleSenha2() {
    const input = document.getElementById('field-senha2');
    const btn   = document.querySelectorAll('.toggle-pw')[1];
    if (input.type === 'password') {
        input.type = 'text';
        btn.textContent = 'Ocultar';
    } else {
        input.type = 'password';
        btn.textContent = 'Mostrar';
    }
}
