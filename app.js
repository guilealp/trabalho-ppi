let equipes = [];
let jogadores = [];
let usuarioLogado = null;

function login() {
    const u = loginUser.value;
    const s = loginPass.value;

    if (u === "admin" && s === "123") {
        usuarioLogado = "admin";

        let ultimo = localStorage.getItem("ultimoAcesso");
        menuAcesso.textContent = ultimo || "Primeiro acesso";

        localStorage.setItem("ultimoAcesso", new Date().toLocaleString());

        menuUser.textContent = usuarioLogado;

        abrir("telaMenu");
    } else {
        loginErro.textContent = "Usuário ou senha inválidos";
    }
}

function logout() {
    usuarioLogado = null;
    abrir("telaLogin");
}

function abrir(tela) {
    document.querySelectorAll(".card").forEach(c => c.classList.add("hidden"));
    document.getElementById(tela).classList.remove("hidden");
}

function cadastrarEquipe() {
    let nome = equipeNome.value.trim();
    let cap = equipeCapitao.value.trim();
    let cont = equipeContato.value.trim();

    if (!nome || !cap || !cont) {
        erroEquipe.textContent = "Todos os campos são obrigatórios.";
        return;
    }

    equipes.push({ id: equipes.length + 1, nome, cap, cont });
    erroEquipe.textContent = "";
    alert("Equipe cadastrada!");
    equipeNome.value = "";
    equipeCapitao.value = "";
    equipeContato.value = "";
}

function listarEquipes() {
    abrir("telaEquipesListar");

    let html = `
        <tr><th>ID</th><th>Nome</th><th>Capitão</th><th>Contato</th></tr>
    `;

    equipes.forEach(e => {
        html += `
            <tr>
                <td>${e.id}</td>
                <td>${e.nome}</td>
                <td>${e.cap}</td>
                <td>${e.cont}</td>
            </tr>
        `;
    });

    tabelaEquipes.innerHTML = html;
}

function atualizarSelectEquipes() {
    jogEquipe.innerHTML = `<option value="">-- escolha --</option>`;
    equipes.forEach(e => {
        jogEquipe.innerHTML += `<option value="${e.id}">${e.nome}</option>`;
    });
}

function cadastrarJogador() {
    let nome = jogNome.value.trim();
    let nick = jogNick.value.trim();
    let func = jogFuncao.value;
    let elo = jogElo.value.trim();
    let gen = jogGenero.value.trim();
    let eq = jogEquipe.value;

    if (!nome || !nick || !func || !elo || !gen || !eq) {
        erroJogador.textContent = "Todos os campos são obrigatórios.";
        return;
    }

    let qtd = jogadores.filter(j => j.equipeId == eq).length;
    if (qtd >= 5) {
        erroJogador.textContent = "A equipe já tem 5 jogadores.";
        return;
    }

    jogadores.push({
        id: jogadores.length + 1, nome, nick, func, elo, gen, equipeId: eq
    });

    erroJogador.textContent = "";
    alert("Jogador cadastrado!");
    jogNome.value = "";
    jogNick.value = "";
    jogFuncao.value = "";
    jogElo.value = "";
    jogGenero.value = "";
    jogEquipe.value = "";
}

function listarJogadores() {
    abrir("telaJogadoresListar");

    let html = "";
    equipes.forEach(e => {
        html += `<h3>${e.nome}</h3>`;
        const lista = jogadores.filter(j => j.equipeId == e.id);

        if (lista.length === 0) {
            html += "<p>Nenhum jogador cadastrado.</p>";
        } else {
            html += `<ul>`;
            lista.forEach(j => {
                html += `<li>${j.nome} (${j.nick}) — ${j.func}, Elo: ${j.elo}</li>`;
            });
            html += `</ul>`;
        }
    });

    listaJogadores.innerHTML = html;
}
