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

    listaUsuarios.push(usuarioCadastro);
    
    salvaLocalStorage("usuCadastro" ,listaUsuarios)
    window.location = "index.html"

    alert("Cadastro feito com sucesso!")

});



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




// --------------------------VERRRRRRRRRRRRRRRR-----------------------------

$("#sair").click(function () {
    event.preventDefault(); // Impede o redirecionamento imediato
    $("#sair").html(`
        <div style="display: flex; justify-content: space-around; padding: 5px; background-color: #fdf9f4; color: #e98b17;">
          <label style="font-weight: 700;">Deseja sair?</label>
          <button class="buttonsSair" id="sim" >Sair</button>
          <button class="buttonsSair" id="nao" style="background-color: #e98b17;">Cancelar</button>
        </div>
    `);
});

$(document).on("click", "#sim", function () {
    alert("Você foi deslogado");
    window.location.href = "index.html";
});

$(document).on("click", "#nao", function () {
    location.reload();
});



// ----------------------------------------------------------------
// Funções Admin


// if (usuarioLogin === "admin"){
//     $(".addCard").show();
    
// } else {
//     $(".addCard").hide();
// }


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


document.addEventListener("DOMContentLoaded", () => {


    function carregaMateriasSalvas() {
        const listaMaterias = JSON.parse(localStorage.getItem("materias")) || [];
    
        listaMaterias.forEach((materia, index) => {
            $(".cardHeader").append(`
                <div class="card" data-index="${index}" style="margin-top: 5px;">
                    <img class="card-img-top" src="${materia.imagem}" alt="Card image cap">
                        <svg xmlns="http://www.w3.org/2000/svg" style=" height: 30px; top: 10px; right: 10px; position: absolute; color: red;" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                        </svg>
                    <div class="card-body">
                        <h5 class="card-title">${materia.nome}</h5>
                        <a href="#" class="btn btn-primary" style="background-color: #fdf9f4; border-color: black; color: black;">Saiba mais</a>
                    </div>
                </div>
            `);
        });
    }

    carregaMateriasSalvas();

    const dialog = document.getElementById("dialogAddCard");
    const buttonAbrir = document.getElementById("abrirDialogAddCard");
    const buttonFechar = document.getElementById("cancelarMateria");   
    const buttonConfirmar = document.getElementById("confirmarAddMateria");
    let idMateria = 0;

    buttonAbrir.addEventListener("click", () => {
        dialog.showModal();
    })

    buttonFechar.addEventListener("click", () => {
        dialog.close();
        location.reload();
    })

    buttonConfirmar.addEventListener("click", () => {
        idMateria++;
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

});




$(document).on("click", ".bi-x-circle", function () {
    const index = $(this).closest(".card").data("index");
    let listaMaterias = JSON.parse(localStorage.getItem("materias")) || [];
    listaMaterias.splice(index, 1);
    localStorage.setItem("materias", JSON.stringify(listaMaterias));
    location.reload();
})























// Função para salvar no localStorage
// Essa função recebe dois parâmetros: a chave (key) e o objeto JSON (meuJson) que você deseja salvar
// O método JSON.stringify() converte o objeto JSON em uma string
// O método window.localStorage.setItem() armazena a string no localStorage com a chave especificada
// O localStorage é uma forma de armazenar dados no navegador do usuário, permitindo que você salve informações entre sessões
// Essa função é útil para persistir dados, como preferências do usuário ou informações de sessão
// Você pode usar essa função para salvar dados no localStorage de forma simples e eficiente
// A função salvaLocalStorage é responsável por armazenar um objeto JSON no localStorage do navegador









function salvaLocalStorage(key, meuJson){
    var texto = JSON.stringify(meuJson);  //STRINGIFY TRANSFORMA JSON EM STRING
    window.localStorage.setItem(key, texto);
}