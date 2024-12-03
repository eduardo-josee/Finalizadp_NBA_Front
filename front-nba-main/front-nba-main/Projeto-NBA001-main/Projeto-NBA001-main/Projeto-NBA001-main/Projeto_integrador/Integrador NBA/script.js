const modal = document.getElementById('modal');
const closeButton = document.querySelector('.close');
const comentarioText = document.getElementById('comentario-text');
const comentariosList = document.getElementById('comentarios-list');
const enviarComentarioBtn = document.getElementById('enviar-comentario');
const imagemPerfilInput = document.getElementById('imagem-perfil');
let imagemPerfilURL = '';   
let comentarioEditando = null;  
let imagemAtualEditando = '';  // Variável para armazenar a imagem atual do comentário sendo editado


// Abrir o modal
function openModal() {
    modal.style.display = 'flex';
}

// Fechar o modal
closeButton.onclick = function() {
    modal.style.display = 'none';
}

// Fechar o modal clicando fora
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Remover um comentário
function removerComentario(event) {
    const comentarioElemento = event.target.closest('.comentario');
    comentarioElemento.remove();
}

// Editar um comentário
function editarComentario(event) {
    const comentarioElemento = event.target.closest('.comentario');
    const comentarioTexto = comentarioElemento.querySelector('p').innerText;
    const imagem = comentarioElemento.querySelector('img.imagem-perfil').src;

    // Preencher o modal com o texto e imagem do comentário
    comentarioText.value = comentarioTexto;
    imagemAtualEditando = imagem;  // Armazenar a imagem atual para poder atualizá-la
    imagemPerfilURL = imagem;  // Exibir a imagem atual no campo do modal

    comentarioEditando = comentarioElemento;  // Definir o comentário sendo editado

    openModal();  // Abrir o modal
}

// Adicionar ou atualizar o comentário
function adicionarComentarioNoFooter() {
    const comentario = comentarioText.value.trim();

    if (comentario) {
        if (comentarioEditando) {
            // Atualizando o comentário existente
            const comentarioTextoElemento = comentarioEditando.querySelector('p');
            comentarioTextoElemento.innerText = comentario;

            // Atualizando a imagem
            const comentarioImagem = comentarioEditando.querySelector('img.imagem-perfil');
            comentarioImagem.src = imagemPerfilURL || './img/default-avatar.png';

            comentarioEditando = null;  // Limpar a variável
        } else {
            // Criar um novo comentário
            const comentarioElemento = document.createElement('div');
            comentarioElemento.classList.add('comentario');

            // Adicionar imagem de perfil
            const imgPerfil = document.createElement('img');
            imgPerfil.src = imagemPerfilURL || './img/default-avatar.png';
            imgPerfil.alt = 'Imagem de Perfil';
            imgPerfil.classList.add('imagem-perfil');
            comentarioElemento.appendChild(imgPerfil);

            // Adicionar texto do comentário
            const comentarioTexto = document.createElement('p');
            comentarioTexto.innerText = comentario;
            comentarioElemento.appendChild(comentarioTexto);

            // Adicionar ícones de excluir e editar
            const lixeira = document.createElement('img');
            lixeira.src = './img/image 13.png';
            lixeira.alt = 'Excluir';
            lixeira.onclick = removerComentario;
            comentarioElemento.appendChild(lixeira);

            const lapis = document.createElement('img');
            lapis.src = './img/lapis.png';
            lapis.alt = 'Editar';
            lapis.onclick = editarComentario;
            comentarioElemento.appendChild(lapis);

            comentariosList.appendChild(comentarioElemento);  // Adicionar ao DOM
        }

        // Limpar o modal após salvar o comentário
        comentarioText.value = '';
        imagemPerfilURL = '';   
        imagemPerfilInput.value = '';  

        modal.style.display = 'none';  // Fechar o modal
    } else {
        alert("Por favor, digite um comentário.");
    }
}

// Abrir o modal ao clicar nas imagens
document.querySelectorAll('.imagem-modal').forEach(img => {
    img.onclick = function() {
        openModal();
    };
});

// Enviar o comentário
enviarComentarioBtn.onclick = adicionarComentarioNoFooter;

// Atualizar a imagem de perfil quando o usuário selecionar um arquivo
imagemPerfilInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagemPerfilURL = e.target.result;  // Armazenar a URL da imagem carregada
        }
        reader.readAsDataURL(file);
    }
});
