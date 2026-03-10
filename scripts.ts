export {}
interface Aluno {
    nome: string;
    email: string;
    plano: string;
}

const modal = document.getElementById("modal-inscricao") as HTMLElement;
const btnAbrir = document.getElementById("btn-inscrever") as HTMLButtonElement;
const btnFechar = document.querySelector(".close-button") as HTMLElement;
const btnEnviar = document.getElementById("btn-enviar-dados") as HTMLButtonElement;

btnAbrir.onclick = () => {
    modal.style.display = "block";
}

btnFechar.onclick = () => {
    modal.style.display = "none";
}

btnEnviar.onclick = async () => {
    const novoAluno: Aluno = {
        nome: (document.getElementById('nome') as HTMLInputElement).value,
        email: (document.getElementById('email') as HTMLInputElement).value,
        plano: (document.getElementById('plano') as HTMLSelectElement).value
    };

    try {
        const response = await fetch('http://localhost:8080/alunos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novoAluno)
        });

        if (response.ok) {
            const data = await response.json();
            alert(`Matrícula de ${data.nome} confirmada!`);
            modal.style.display = "none";
        }
    } catch (error) {
        alert("Erro de conexão com o Java. Verifique se o Quarkus está rodando!");
    }
}