/* =========================
   DADOS
========================= */

let pesos = JSON.parse(localStorage.getItem("pesos")) || [];
let meta = localStorage.getItem("meta") || "";
let perfil = JSON.parse(localStorage.getItem("perfil")) || {};
let medidas = JSON.parse(localStorage.getItem("medidas")) || [];
let fotos = JSON.parse(localStorage.getItem("fotos")) || [];


/* =========================
   ELEMENTOS DA PÁGINA
========================= */

const pesoInput = document.getElementById("peso");
const btnAdicionar = document.getElementById("btnAdicionar");
const listaPesos = document.getElementById("listaPesos");

const metaInput = document.getElementById("meta");
const btnMeta = document.getElementById("btnMeta");

const pesoAtual = document.getElementById("pesoAtual");
const pesoInicial = document.getElementById("pesoInicial");
const metaAtual = document.getElementById("metaAtual");

const textoProgresso =
    document.getElementById("textoProgresso");

const barraPreenchida =
    document.querySelector(".barra-preenchida");

const boasVindas =
    document.getElementById("boasVindas");


/* =========================
   META
========================= */

if (metaInput) {

    metaInput.value = meta;

}

if (btnMeta) {

    btnMeta.addEventListener("click", function() {

        const novaMeta = metaInput.value;

        if (novaMeta === "") {

            alert("Digite sua meta.");

            return;

        }

        meta = novaMeta;

        localStorage.setItem("meta", meta);

        alert("Meta salva!");

        atualizarInicio();

    });

}


/* =========================
   HISTÓRICO DE PESO
========================= */

function mostrarPesos() {

    if (!listaPesos) {
        return;
    }

    listaPesos.innerHTML = "";

    pesos.forEach(function(registro, index) {

        const card =
            document.createElement("div");

        card.classList.add("card-peso");

       card.innerHTML = `
    <span>${registro.data} • ${registro.hora || ""}</span>
    <strong>${registro.peso} kg</strong>
    <button onclick="excluirPeso(${index})">Excluir</button>
`;

        listaPesos.appendChild(card);

    });

}


/* =========================
   ADICIONAR PESO
========================= */

if (btnAdicionar) {

    btnAdicionar.addEventListener("click", function() {

        const peso = pesoInput.value;

        if (peso === "") {

            alert("Digite seu peso.");

            return;

        }

        const dataAtual = new Date();

const dataFormatada = dataAtual.toLocaleDateString("pt-BR");

const horaFormatada = dataAtual.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit"
});

       const novoRegistro = {
    peso: peso,
    data: dataFormatada,
    hora: horaFormatada
};

        pesos.push(novoRegistro);

        localStorage.setItem(
            "pesos",
            JSON.stringify(pesos)
        );

        pesoInput.value = "";

        mostrarPesos();

        atualizarInicio();

    });

}


/* =========================
   EXCLUIR PESO
========================= */

function excluirPeso(index) {

    pesos.splice(index, 1);

    localStorage.setItem(
        "pesos",
        JSON.stringify(pesos)
    );

    mostrarPesos();

    atualizarInicio();

}


/* =========================
   ATUALIZAR INÍCIO
========================= */

function atualizarInicio() {

    /* Peso atual */

    if (pesoAtual && pesos.length > 0) {

        const ultimoRegistro =
            pesos[pesos.length - 1];

        pesoAtual.textContent =
            ultimoRegistro.peso + " kg";

    }


    /* Peso inicial */

    if (pesoInicial && pesos.length > 0) {

        const primeiroRegistro =
            pesos[0];

        pesoInicial.textContent =
            primeiroRegistro.peso + " kg";

    }


    /* Peso perdido */

    const resumoPeso =
        document.getElementById("resumoPeso");

    const pesoPerdido =
        document.getElementById("pesoPerdido");

    if (pesos.length > 0) {

        const pesoInicialValor =
            parseFloat(pesos[0].peso);

        const pesoAtualValor =
            parseFloat(
                pesos[pesos.length - 1].peso
            );

        const diferenca =
            pesoInicialValor - pesoAtualValor;


        if (resumoPeso) {

            resumoPeso.textContent =
                "Você já perdeu " +
                diferenca.toFixed(1) +
                " kg";

        }


        if (pesoPerdido) {

            pesoPerdido.textContent =
                "Você já perdeu " +
                diferenca.toFixed(1) +
                " kg";

        }

    }


    /* Meta */

    if (metaAtual && meta !== "") {

        metaAtual.textContent =
            meta + " kg";

    }


    /* Progresso */

    if (
        textoProgresso &&
        barraPreenchida &&
        pesos.length > 0 &&
        meta !== ""
    ) {

        const pesoInicialValor =
            parseFloat(pesos[0].peso);

        const pesoAtualValor =
            parseFloat(
                pesos[pesos.length - 1].peso
            );

        const metaValor =
            parseFloat(meta);

        const totalParaPerder =
            pesoInicialValor - metaValor;

        const jaPerdeu =
            pesoInicialValor - pesoAtualValor;


        let progresso =
            (jaPerdeu / totalParaPerder) * 100;


        progresso =
            Math.max(
                0,
                Math.min(progresso, 100)
            );


        textoProgresso.textContent =
            "Você já percorreu " +
            progresso.toFixed(0) +
            "% do caminho!";


        barraPreenchida.style.width =
            progresso + "%";

    }


    /* Boas-vindas */

    if (boasVindas && perfil.nome) {

        boasVindas.textContent =
            "Bem-vinda, " +
            perfil.nome +
            "! 👋";

    }

}


/* =========================
   INICIALIZAÇÃO
========================= */

mostrarPesos();

atualizarInicio();


/* =========================
   MEDIDAS
========================= */

const btnAdicionarMedidas =
    document.getElementById(
        "btnAdicionarMedidas"
    );

const listaMedidas =
    document.getElementById(
        "listaMedidas"
    );


if (btnAdicionarMedidas) {

    btnAdicionarMedidas.addEventListener(
        "click",
        function() {

            const cintura =
                document.getElementById(
                    "cintura"
                ).value;

            const abdomen =
                document.getElementById(
                    "abdomen"
                ).value;

            const quadril =
                document.getElementById(
                    "quadril"
                ).value;

            const braco =
                document.getElementById(
                    "braco"
                ).value;

            const coxa =
                document.getElementById(
                    "coxa"
                ).value;

            const panturrilha =
                document.getElementById(
                    "panturrilha"
                ).value;

            const peito =
                document.getElementById(
                    "peito"
                ).value;


            if (
                cintura === "" &&
                abdomen === "" &&
                quadril === "" &&
                braco === "" &&
                coxa === "" &&
                panturrilha === "" &&
                peito === ""
            ) {

                alert(
                    "Preencha pelo menos uma medida."
                );

                return;

            }


            const dataAtual = new Date();

            const dataFormatada =
                dataAtual.toLocaleDateString(
                    "pt-BR"
                );


            const novaMedida = {

                data: dataFormatada,

                cintura: cintura,

                abdomen: abdomen,

                quadril: quadril,

                braco: braco,

                coxa: coxa,

                panturrilha: panturrilha,

                peito: peito

            };


            medidas.push(novaMedida);


            localStorage.setItem(
                "medidas",
                JSON.stringify(medidas)
            );


            document.getElementById(
                "cintura"
            ).value = "";

            document.getElementById(
                "abdomen"
            ).value = "";

            document.getElementById(
                "quadril"
            ).value = "";

            document.getElementById(
                "braco"
            ).value = "";

            document.getElementById(
                "coxa"
            ).value = "";

            document.getElementById(
                "panturrilha"
            ).value = "";

            document.getElementById(
                "peito"
            ).value = "";


            mostrarMedidas();

        }
    );

}


function mostrarMedidas() {

    if (!listaMedidas) {
        return;
    }

    listaMedidas.innerHTML = "";


    medidas.forEach(function(
        registro,
        index
    ) {

        const card =
            document.createElement("div");

        card.classList.add(
            "card-medidas"
        );


        card.innerHTML = `

            <h3>${registro.data}</h3>

            <p>
                Cintura:
                ${registro.cintura || "--"} cm
            </p>

            <p>
                Abdômen:
                ${registro.abdomen || "--"} cm
            </p>

            <p>
                Quadril:
                ${registro.quadril || "--"} cm
            </p>

            <p>
                Braço:
                ${registro.braco || "--"} cm
            </p>

            <p>
                Coxa:
                ${registro.coxa || "--"} cm
            </p>

            <p>
                Panturrilha:
                ${registro.panturrilha || "--"} cm
            </p>

            <p>
                Peito:
                ${registro.peito || "--"} cm
            </p>

            <button onclick="excluirMedida(${index})">
                Excluir
            </button>

        `;


        listaMedidas.appendChild(card);

    });

}


function excluirMedida(index) {

    medidas.splice(index, 1);

    localStorage.setItem(
        "medidas",
        JSON.stringify(medidas)
    );

    mostrarMedidas();

}


mostrarMedidas();


/* =========================
   FOTOS
========================= */

const fotoInput =
    document.getElementById("foto");

const btnAdicionarFoto =
    document.getElementById(
        "btnAdicionarFoto"
    );

const listaFotos =
    document.getElementById(
        "listaFotos"
    );


if (btnAdicionarFoto) {

    btnAdicionarFoto.addEventListener(
        "click",
        function() {

            const arquivo =
                fotoInput.files[0];


            if (!arquivo) {

                alert(
                    "Selecione uma foto."
                );

                return;

            }


            const leitor =
                new FileReader();


            leitor.onload =
                function(evento) {

                    const dataAtual =
                        new Date();

                    const dataFormatada =
                        dataAtual.toLocaleDateString(
                            "pt-BR"
                        );


                    const novaFoto = {

                        data: dataFormatada,

                        imagem:
                            evento.target.result

                    };


                    fotos.push(novaFoto);


                    localStorage.setItem(
                        "fotos",
                        JSON.stringify(fotos)
                    );


                    fotoInput.value = "";


                    mostrarFotos();

                };


            leitor.readAsDataURL(arquivo);

        }
    );

}


function mostrarFotos() {

    if (!listaFotos) {
        return;
    }

    listaFotos.innerHTML = "";


    fotos.forEach(function(
        foto,
        index
    ) {

        const card =
            document.createElement("div");


        card.classList.add(
            "card-foto"
        );


        card.innerHTML = `

            <p>${foto.data}</p>

            <img
                src="${foto.imagem}"
                alt="Foto de evolução"
            >

            <button onclick="excluirFoto(${index})">
                Excluir
            </button>

        `;


        listaFotos.appendChild(card);

    });

}


function excluirFoto(index) {

    fotos.splice(index, 1);

    localStorage.setItem(
        "fotos",
        JSON.stringify(fotos)
    );

    mostrarFotos();

}


mostrarFotos();


/* =========================
   PERFIL
========================= */

const nomeInput =
    document.getElementById("nome");

const alturaInput =
    document.getElementById("altura");

const dataInicioInput =
    document.getElementById(
        "dataInicio"
    );

const btnSalvarPerfil =
    document.getElementById(
        "btnSalvarPerfil"
    );


/* CARREGAR PERFIL */

if (nomeInput) {

    nomeInput.value =
        perfil.nome || "";

}

if (alturaInput) {

    alturaInput.value =
        perfil.altura || "";

}

if (dataInicioInput) {

    dataInicioInput.value =
        perfil.dataInicio || "";

}


/* SALVAR PERFIL */

if (btnSalvarPerfil) {

    btnSalvarPerfil.addEventListener(
        "click",
        function() {

            perfil = {

                nome: nomeInput.value,

                altura: alturaInput.value,

                dataInicio:
                    dataInicioInput.value

            };


            localStorage.setItem(
                "perfil",
                JSON.stringify(perfil)
            );


            alert(
                "Informações salvas!"
            );


            atualizarInicio();

        }
    );

}
/* =========================
   GRÁFICO DE PESO
========================= */

const graficoPeso =
    document.getElementById("graficoPeso");

if (graficoPeso && pesos.length > 0) {

    const datas = pesos.map(function(registro) {

    if (registro.hora) {
        return registro.data + " " + registro.hora;
    }

    return registro.data;

});

    const valoresPeso = pesos.map(function(registro) {
        return parseFloat(registro.peso);
    });

    new Chart(graficoPeso, {

        type: "line",

        data: {

            labels: datas,

           datasets: [{

    label: "Peso (kg)",

    data: valoresPeso,

    borderColor: "#9b7e6b",

    backgroundColor: "#9b7e6b",

    borderWidth: 2,

    pointRadius: 4,

    pointHoverRadius: 6,

    tension: 0.3,

    fill: false

}]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {
                    display: false
                }

            },

            scales: {

    y: {

        beginAtZero: false,

        grid: {
            display: true
        },

        ticks: {
            callback: function(valor) {
                return valor + " kg";
            }
        }

    },

    x: {

        grid: {
            display: false
        }

    }

}

        }

    });

}
/* =========================
   RESUMO DA EVOLUÇÃO
========================= */

const totalPerdido =
    document.getElementById("totalPerdido");

const faltaMeta =
    document.getElementById("faltaMeta");


if (
    totalPerdido &&
    pesos.length > 0
) {

    const pesoInicialValor =
        parseFloat(pesos[0].peso);

    const pesoAtualValor =
        parseFloat(
            pesos[pesos.length - 1].peso
        );

    const perdido =
        pesoInicialValor - pesoAtualValor;


    totalPerdido.textContent =
        perdido.toFixed(1) + " kg";

}


if (
    faltaMeta &&
    pesos.length > 0 &&
    meta !== ""
) {

    const pesoAtualValor =
        parseFloat(
            pesos[pesos.length - 1].peso
        );

    const metaValor =
        parseFloat(meta);

    const falta =
        pesoAtualValor - metaValor;


    if (falta > 0) {

        faltaMeta.textContent =
            falta.toFixed(1) + " kg";

    } else {

        faltaMeta.textContent =
            "Meta alcançada! 🎉";

    }

}
/* =========================
   GRÁFICO DE MEDIDAS
========================= */

const graficoMedidas =
    document.getElementById("graficoMedidas");

const medidaGrafico =
    document.getElementById("medidaGrafico");

let graficoMedidasInstancia = null;


function criarGraficoMedidas() {

    if (
        !graficoMedidas ||
        !medidaGrafico ||
        medidas.length === 0
    ) {
        return;
    }


    const medidaSelecionada =
        medidaGrafico.value;


    const registrosValidos =
        medidas.filter(function(registro) {

            return (
                registro[medidaSelecionada] !== "" &&
                registro[medidaSelecionada] != null
            );

        });


    const datas =
        registrosValidos.map(function(registro) {

            return registro.data;

        });


    const valores =
        registrosValidos.map(function(registro) {

            return parseFloat(
                registro[medidaSelecionada]
            );

        });


    if (graficoMedidasInstancia) {

        graficoMedidasInstancia.destroy();

    }


    graficoMedidasInstancia =
        new Chart(graficoMedidas, {

            type: "line",

            data: {

                labels: datas,

                datasets: [{

                    label: medidaSelecionada,

                    data: valores,

                    borderColor: "#9b7e6b",

                    backgroundColor: "#9b7e6b",

                    borderWidth: 2,

                    pointRadius: 4,

                    pointHoverRadius: 6,

                    tension: 0.3,

                    fill: false

                }]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {
                        display: false
                    }

                },

                scales: {

                    y: {

                        beginAtZero: false,

                        grid: {
                            display: true
                        },

                        ticks: {

                            callback: function(valor) {

                                return valor + " cm";

                            }

                        }

                    },

                    x: {

                        grid: {
                            display: false
                        }

                    }

                }

            }

        });

}


if (medidaGrafico) {

    medidaGrafico.addEventListener(
        "change",
        criarGraficoMedidas
    );

}


criarGraficoMedidas();
/* =========================
   COMPARAÇÃO DE FOTOS
========================= */

const fotoAntes =
    document.getElementById("fotoAntes");

const fotoDepois =
    document.getElementById("fotoDepois");

const resultadoComparacao =
    document.getElementById(
        "resultadoComparacao"
    );


function carregarFotosComparacao() {

    if (!fotoAntes || !fotoDepois) {
        return;
    }


    fotos.forEach(function(foto, index) {

        const opcaoAntes =
            document.createElement("option");

        opcaoAntes.value = index;

        opcaoAntes.textContent =
            foto.data;

        fotoAntes.appendChild(
            opcaoAntes
        );


        const opcaoDepois =
            document.createElement("option");

        opcaoDepois.value = index;

        opcaoDepois.textContent =
            foto.data;

        fotoDepois.appendChild(
            opcaoDepois
        );

    });

}


function mostrarComparacao() {

    if (
        !resultadoComparacao ||
        !fotoAntes ||
        !fotoDepois
    ) {
        return;
    }


    if (
        fotoAntes.value === "" ||
        fotoDepois.value === ""
    ) {

        resultadoComparacao.innerHTML = "";

        return;

    }


    const antes =
        fotos[fotoAntes.value];

    const depois =
        fotos[fotoDepois.value];


    resultadoComparacao.innerHTML = `

        <div class="comparacao-resultado">

            <div>

                <span>Antes</span>

                <img
                    src="${antes.imagem}"
                    alt="Foto antes"
                >

                <small>
                    ${antes.data}
                </small>

            </div>


            <div>

                <span>Depois</span>

                <img
                    src="${depois.imagem}"
                    alt="Foto depois"
                >

                <small>
                    ${depois.data}
                </small>

            </div>

        </div>

    `;

}


if (fotoAntes) {

    fotoAntes.addEventListener(
        "change",
        mostrarComparacao
    );

}


if (fotoDepois) {

    fotoDepois.addEventListener(
        "change",
        mostrarComparacao
    );

}


carregarFotosComparacao();

/* =========================
   SERVICE WORKER
========================= */

if ("serviceWorker" in navigator) {

    window.addEventListener("load", function() {

        navigator.serviceWorker.register(
            "service-worker.js"
        )

        .then(function() {

            console.log(
                "Service Worker registrado com sucesso!"
            );

        })

        .catch(function(erro) {

            console.log(
                "Erro ao registrar Service Worker:",
                erro
            );

        });

    });

}