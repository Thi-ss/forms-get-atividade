const resposta = document.querySelector("#resposta");
const lista = document.querySelector("#lista-animes");
const modelo = document.querySelector("#modelo-anime");

const apiKey = "cv_AWH-r6yLxYXxcCT1Rpp2eeVQktpSaqWUPzjRYZh5LoN_MXbZp44RptRVQxscOI2c";

const apiUrl = "https://api-ds.codeverse.dev.br/api/animes";

async function buscarAnimes() {

    //Mostra uma msg.
    resposta.textContent = "Carregando animes..."

    try {
        //Fazer o get
        const retorno = await fetch(apiUrl, {
            method: "GET",
            headers: { "x-api-key": apiKey },
        });

        //Verificar se não deu certo
        if (!retorno.ok) {
            throw new Error("Não foi possível carregar os animes.");
        }

        // Converter o resultado para JSON, pois será um objeto.
        const resultado = await retorno.json();

        //Percorrer todos os herois que esta dentro de resultado.
        for (const anime of resultado.data) {

            //fazer uma copia do modelo que criamos no html
            const card = modelo.content.cloneNode(true);

            //preecher cada item desse card
            card.querySelector(".nome").textContent = anime.title;
            card.querySelector(".genero").textContent = anime.genero;
            card.querySelector(".episodios").textContent = anime.numero_episodios;
            card.querySelector(".ano_lancamento").textContent = anime.ano_lancamento;
            card.querySelector(".estudio").textContent = anime.estudio;

            const imagem = card.querySelector(".imagem-anime");

            if (anime.imageUrl) {
                imagem.src = anime.imageUrl;
                imagem.alt = anime.title;

                imagem.onerror = () => imagem.remove();

            } else {
                imagem.remove();
            }

            // adiciona o card preenchido na tela

            lista.appendChild(card);
            resposta.textContent = "";

        }

    } catch (error) {
        console.error(error);
        resposta.textContent = "Não foi possível carregar os animes. Tente novamente!"
    }
}

// Executar no arquivo

buscarAnimes();