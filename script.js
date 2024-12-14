// Adicionando Estilos no CRUD
var estilos = []; // Lista de estilos
var clientes = [];
var clienteAlterado = null;

function mostrarModalEstilo() {
    const modalEstilo = document.getElementById("modal-estilo");
    modalEstilo.style.display = "block";
}

function ocultarModalEstilo() {
    const modalEstilo = document.getElementById("modal-estilo");
    modalEstilo.style.display = "none";
}

function salvarEstilo() {
    let nomeEstilo = document.getElementById("nomeEstilo").value;

    if (nomeEstilo.trim() === "") {
        alert("O nome do estilo não pode estar vazio.");
        return false;
    }

    estilos.push({ id: estilos.length + 1, nome: nomeEstilo });
    alert("Estilo cadastrado com sucesso!");

    atualizarListaEstilos();
    ocultarModalEstilo();
    document.getElementById("nomeEstilo").value = "";
    return false;
}

function atualizarListaEstilos() {
    let estiloSelect = document.getElementById("estilo");
    estiloSelect.innerHTML = "<option value=''>Selecione um estilo</option>";
    estilos.forEach(estilo => {
        let option = document.createElement("option");
        option.value = estilo.id;
        option.textContent = estilo.nome;
        estiloSelect.appendChild(option);
    });
}

function mostrarModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "block";
}

function ocultarModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
}

function adicionar() {
    clienteAlterado = null; // marca que está adicionando um cliente
    limparFormulario();
    atualizarListaEstilos();
    mostrarModal();
}

function salvar() {
    let nome = document.getElementById("nome").value;
    let cpf = document.getElementById("cpf").value;
    let peso = document.getElementById("peso").value;
    let altura = document.getElementById("altura").value;
    let dataNascimento = document.getElementById("dataNascimento").value;
    let sapato = document.getElementById("sapato").value;
    let cidadeNascimento = document.getElementById("cidadeNascimento").value;
    let estiloId = document.getElementById("estilo").value;

    let estiloSelecionado = estilos.find(e => e.id == estiloId);
    if (!estiloSelecionado) {
        alert("Selecione um estilo válido!");
        return false;
    }

    let novoBodyBuilder = {
        nome,
        cpf,
        peso,
        altura,
        dataNascimento,
        sapato,
        cidadeNascimento,
        estilo: estiloSelecionado.nome
    };

    if (clienteAlterado == null) {
        clientes.push(novoBodyBuilder);
        alert("Cadastrado com sucesso!");
    } else {
        clienteAlterado.nome = nome;
        clienteAlterado.peso = peso;
        clienteAlterado.altura = altura;
        clienteAlterado.dataNascimento = dataNascimento;
        clienteAlterado.sapato = sapato;
        clienteAlterado.cidadeNascimento = cidadeNascimento;
        clienteAlterado.estilo = estiloSelecionado.nome;
        alert("Alterado com sucesso!");
    }

    ocultarModal();
    limparFormulario();
    atualizarLista();
    return false;
}

function alterar(cpf) {
    let cliente = clientes.find(c => c.cpf === cpf);
    if (cliente) {
        document.getElementById("nome").value = cliente.nome;
        document.getElementById("cpf").value = cliente.cpf;
        document.getElementById("peso").value = cliente.peso;
        document.getElementById("altura").value = cliente.altura;
        document.getElementById("dataNascimento").value = cliente.dataNascimento;
        document.getElementById("sapato").value = cliente.sapato;
        document.getElementById("cidadeNascimento").value = cliente.cidadeNascimento;
        let estilo = estilos.find(e => e.nome === cliente.estilo);
        document.getElementById("estilo").value = estilo ? estilo.id : "";
        clienteAlterado = cliente;
        mostrarModal();
    }
}

function excluir(cpf) {
    if (confirm("Deseja realmente excluir este body builder?")) {
        clientes = clientes.filter(cliente => cliente.cpf !== cpf);
        alert("Excluído com sucesso!");
        atualizarLista();
    }
}

function limparFormulario() {
    document.getElementById("nome").value = "";
    document.getElementById("cpf").value = "";
    document.getElementById("peso").value = "";
    document.getElementById("altura").value = "";
    document.getElementById("dataNascimento").value = "";
    document.getElementById("sapato").value = "";
    document.getElementById("cidadeNascimento").value = "";
    document.getElementById("estilo").value = "";
}

function atualizarLista() {
    let tbody = document.getElementsByTagName("tbody")[0];
    tbody.innerHTML = "";
    clientes.forEach(cliente => {
        let linhaTabela = document.createElement("tr");
        linhaTabela.innerHTML = `
            <td>${cliente.cpf}</td>
            <td>${cliente.nome}</td>
            <td>${cliente.peso}kg</td>
            <td>${cliente.altura}m</td>
            <td>${cliente.dataNascimento}</td>
            <td>${cliente.sapato}</td>
            <td>${cliente.cidadeNascimento}</td>
            <td>${cliente.estilo}</td>
            <td>
                <button onclick="alterar('${cliente.cpf}')">Alterar</button>
                <button onclick="excluir('${cliente.cpf}')">Excluir</button>
            </td>`;
        tbody.appendChild(linhaTabela);
    });
}

// Inicializa os estilos para evitar erros
atualizarListaEstilos();
