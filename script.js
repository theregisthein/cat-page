//Cadastro de novo usuario e seus testes
$("#cadastroBut").click(function(){
    var usuarioCadastro = {
        
        cNome: $('#cInputNome').val(),
        cSobrenome: $('#cInputSobrenome').val(),
        cEmail: $('#cInputEmail').val(),
        cSenha: $('#cInputSenha').val(),
        cConfirmaSenha: $('#cConfirmaSenha').val(),
        cGatos: $('#cInputQtdeGatos').val()
    };

    if (usuarioCadastro.cNome == ""){
        alert("Preencha todos os campos obrigatórios");
        return
    } else if (usuarioCadastro.cEmail == ""){
        alert("Preencha todos os campos obrigatórios");
        return;
    }else if(usuarioCadastro.cSenha == ""){
        alert("Preencha todos os campos obrigatórios");
        return;
    }else if(usuarioCadastro.cConfirmaSenha == ""){
        alert("Preencha todos os campos obrigatórios");
        return;
    }else if(usuarioCadastro.cGatos == ""){
        alert("Preencha todos os campos obrigatórios");
        return;
    }else if(usuarioCadastro.cConfirmaSenha != usuarioCadastro.cSenha){
        alert("As senhas não conferem");
        return;
    };

    let listaUsuarios = JSON.parse(localStorage.getItem("usuCadastro")) || [];
    if(!Array.isArray(listaUsuarios)){
        listaUsuarios = [];
    }

    const usuarioExiste = listaUsuarios.find(user => user.cEmail === usuarioCadastro.cEmail);
    if(usuarioExiste){
        alert("Usuário já existente!");
        return;
    }

    //Adiciona novo usuario ao LocalStorage
    listaUsuarios.push(usuarioCadastro);
    salvaLocalStorage("usuCadastro" ,listaUsuarios)
    window.location = "index.html"
    alert("Cadastro feito com sucesso!")
});

//Sair da pagina de cadastro para o login
$("#voltarLogin").click(function() {
    window.location = "index.html";
})

//Login do usuario e seus testes
$("#loginBut").click(function(){
    var usuarioLogin = {
        email: $('#inputUsuario').val(), 
        senha: $('#inputSenha').val()};

        if(usuarioLogin.email.trim() === ""){
            alert("Usuário e senha obrigatórios");
            $('#inputUsuario').val("");
            $('#inputSenha').val("");
            return;
        }else if(usuarioLogin.senha.trim() === ""){
            alert("Usuário e senha obrigatórios");
            $('#inputUsuario').val("");
            $('#inputSenha').val("");
            return;
        }

        let listaUsuarios = JSON.parse(localStorage.getItem("usuCadastro")) || [];
        const usuarioEncontrado = listaUsuarios.find(user => user.cEmail === usuarioLogin.email && user.cSenha === usuarioLogin.senha);
        if(usuarioEncontrado){
            alert("Login Bem Sucedido");
            window.location.href = "dashboard.html"
        }else{
            alert("Nome ou Senha incorretos");
            return;
        }
});

//Ao clicar em "Configurações" é informado que a função não está implementada
$(document).on("click", "#config", function () {
    alert("Função 'Configurações' ainda não implementada");
  });


//Dialog para deslogar e voltar ao login
$("#sair").click(function (event) {
    event.preventDefault(); // Vai garantir o comportamento normal do link
    $("#confirmarSair").show(); 
    $(this).hide(); // Esconde botão "Sair"
});

$(document).on("click", "#sim", function () {
    alert("Você foi deslogado");
    window.location.href = "index.html";
});

$(document).on("click", "#nao", function () {
    $("#confirmarSair").hide();
    $("#sair").show(); 
});

//Fecha dialog da confirmação de sair ao fechar a Sidebar pelo X
$(document).on("click", "#fecharSidebar", function () {
    $("#confirmarSair").hide(); 
    $("#sair").show(); 
});

//Fecha dialog da confirmação de sair ao fechar a Sidebar clicando fora dela
document.addEventListener("DOMContentLoaded", function () {
    const offcanvas = document.getElementById("offcanvasExample");

    if (offcanvas) {
        offcanvas.addEventListener("hidden.bs.offcanvas", function () {
            $("#confirmarSair").hide();
            $("#sair").show();
        });
    }
});

//Cria o novo card com os dados da materia
document.addEventListener("DOMContentLoaded", () => {
    function carregaMateriasSalvas() {
        const listaMaterias = JSON.parse(localStorage.getItem("materias")) || [];
        listaMaterias.forEach((materia, index) => {
            $(".cardHeader").append(`
                <div class="card" data-index="${index}" style="margin-top: 5px;">
                    <img class="card-img-top" src="${materia.imagem}" alt="Card image cap">
                        <svg xmlns="http://www.w3.org/2000/svg" style="height: 30px; top: 10px; right: 10px; position: absolute; color: red;" data-bs-target="#confirmarExclusaoModal" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                        </svg>
                    <div class="card-body">
                        <h5 class="card-title">${materia.nome}</h5>
                        <a href="#" class="btn btn-primary saibaMais" style="background-color: #fdf9f4; border-color: black; color: black;">Saiba mais</a>
                    </div>
                </div>
            `);
        });
    }
    //Carrega materias salvas no LocalStorage
    carregaMateriasSalvas();

    const dialog = document.getElementById("dialogAddCard");
    const buttonAbrir = document.getElementById("abrirDialogAddCard");
    const buttonFechar = document.getElementById("cancelarMateria");   
    const buttonConfirmar = document.getElementById("confirmarAddMateria");

    //Abre Dialog para adicionar matéria
    if(buttonAbrir && dialog){
        buttonAbrir.addEventListener("click", () => {
            dialog.showModal();
        });
    }
    //Botão Cancelar, fecha o dialog de adicionar matéria
    if(buttonAbrir && dialog){
        buttonFechar.addEventListener("click", () => {
            dialog.close();
            location.reload();
        })
    }

    //Adiciona nova materia
    if(buttonConfirmar && dialog){
        buttonConfirmar.addEventListener("click", () => {
            const nomeMateria = document.getElementById("tituloMateria").value;
            const imagemFile = document.getElementById("imagemMateria").files[0];
            const descricao = document.getElementById("textoMateria").value;

            if(nomeMateria && imagemFile && descricao){
                const reader = new FileReader();
                reader.onload = function(event) {
                const base64Image = event.target.result;

                const novaMateria = {
                    nome: nomeMateria,
                    imagem: base64Image,
                    descricao: descricao
                }
            
                let listaMaterias = JSON.parse(localStorage.getItem("materias")) || [];
                listaMaterias.push(novaMateria);
                localStorage.setItem("materias", JSON.stringify(listaMaterias));
                dialog.close();
                alert("Matéria adicionada com sucesso!");
                location.reload();
            };
                reader.readAsDataURL(imagemFile); //inicia leitura imagem
            } else {
                alert("Preencha todos os campos obrigatórios");
                return;
            }
        })
    }
});


//Ao clicar em "Saima mais" é informado que a função não está implementada
$(document).ready(function () {
    $(document).on("click", ".saibaMais", function (e) {
      e.preventDefault(); // impede navegação do link
      alert("Função 'Saiba mais' ainda não implementada");
    });
});

//Preview da imagem dentro do Dialog de adicionar materias
function imagemPreview(event) {
    const imagemPreview = document.getElementById("imagemPreview");
    const file = event.target.files[0]; // Pega o primeiro arquivo

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imagemPreview.src = e.target.result; // Atualiza o src da imagem
            imagemPreview.style.display = 'block'; // Exibe a imagem
        };
        reader.readAsDataURL(file); // Lê a imagem como base64
    }
}

//Exclui materia
let indiceParaExcluir = null;
const dialogConfirmarExclusao = document.getElementById("confirmarExclusaoDialog");

$(document).on("click", ".bi-x-circle", function () {
    indiceParaExcluir = $(this).closest(".card").data("index");
    dialogConfirmarExclusao.showModal();
});

///Exclui a materia e fecha o Dialog de exclusão de materia
document.getElementById("btnConfirmarExclusao").addEventListener("click", () => {
    if (indiceParaExcluir !== null) {
        let listaMaterias = JSON.parse(localStorage.getItem("materias")) || [];
        listaMaterias.splice(indiceParaExcluir, 1);
        localStorage.setItem("materias", JSON.stringify(listaMaterias));

        $(`.card[data-index="${indiceParaExcluir}"]`).remove();

        dialogConfirmarExclusao.close();
        indiceParaExcluir = null;
    }
});

//Cancela a exclusão da materia e fecha o Dialog de Exclusao
document.getElementById("cancelarExclusao").addEventListener("click", () => {
    dialogConfirmarExclusao.close();
    indiceParaExcluir = null;
});



function salvaLocalStorage(key, meuJson){
    var texto = JSON.stringify(meuJson);  //STRINGIFY TRANSFORMA JSON EM STRING
    window.localStorage.setItem(key, texto);
}