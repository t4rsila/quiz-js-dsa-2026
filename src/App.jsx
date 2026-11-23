import { useState, useEffect } from "react";
import { perguntas } from "./data/perguntas.js";
import TelaInicial from "./components/TelaInicial.jsx";
import Progresso from "./components/Progresso.jsx";
import Pergunta from "./components/Pergunta.jsx";
import Feedback from "./components/Feedback.jsx";
import Resultado from "./components/Resultado.jsx";

const CHAVE = "quiz-js-dsa-2026";

// Lê o progresso salvo no navegador. Se não existir ou estiver inválido, retorna null.
function lerProgresso() {
  try {
    const salvo = localStorage.getItem(CHAVE);
    if (!salvo) return null;
    const dados = JSON.parse(salvo);
    if (
      typeof dados.indice === "number" &&
      typeof dados.pontuacao === "number" &&
      dados.indice >= 0 &&
      dados.indice <= perguntas.length
    ) {
      return dados;
    }
  } catch {
    // JSON inválido ou localStorage indisponível: ignora e começa do zero.
  }
  return null;
}

export default function App() {
  // O progresso salvo é lido uma única vez, na criação do estado.
  const [salvo] = useState(lerProgresso);

  const [iniciado, setIniciado] = useState(false);
  const [indice, setIndice] = useState(salvo ? salvo.indice : 0);
  const [pontuacao, setPontuacao] = useState(salvo ? salvo.pontuacao : 0);
  const [selecionada, setSelecionada] = useState(null);
  const [confirmada, setConfirmada] = useState(false);

  const finalizado = indice >= perguntas.length;
  const temProgresso = indice > 0;

  // useEffect: sincroniza o estado do quiz com um recurso externo (localStorage).
  // Roda sempre que o índice ou a pontuação mudam.
  useEffect(() => {
    try {
      localStorage.setItem(CHAVE, JSON.stringify({ indice, pontuacao }));
    } catch {
      // Ignora falhas de armazenamento (modo privado, cota cheia etc.).
    }
  }, [indice, pontuacao]);

  function reiniciar() {
    setIndice(0);
    setPontuacao(0);
    setSelecionada(null);
    setConfirmada(false);
    setIniciado(true);
  }

  function confirmar() {
    if (selecionada === null) return;
    // Condicional: soma ponto somente se a resposta estiver certa.
    if (selecionada === perguntas[indice].correta) {
      setPontuacao(pontuacao + 1);
    }
    setConfirmada(true);
  }

  function proxima() {
    setIndice(indice + 1);
    setSelecionada(null);
    setConfirmada(false);
  }

  let conteudo;

  if (!iniciado && !finalizado) {
    conteudo = (
      <TelaInicial
        total={perguntas.length}
        temProgresso={temProgresso}
        onIniciar={reiniciar}
        onContinuar={() => setIniciado(true)}
      />
    );
  } else if (finalizado) {
    conteudo = (
      <Resultado pontuacao={pontuacao} total={perguntas.length} onReiniciar={reiniciar} />
    );
  } else {
    const pergunta = perguntas[indice];
    const ultima = indice === perguntas.length - 1;

    conteudo = (
      <>
        <Progresso atual={indice + 1} total={perguntas.length} pontuacao={pontuacao} />
        <Pergunta
          pergunta={pergunta}
          selecionada={selecionada}
          confirmada={confirmada}
          onSelecionar={setSelecionada}
        />
        {confirmada && (
          <Feedback
            acertou={selecionada === pergunta.correta}
            explicacao={pergunta.explicacao}
          />
        )}
        <div className="acoes acoes-fixas">
          {!confirmada ? (
            <button
              type="button"
              className="btn btn-primario"
              onClick={confirmar}
              disabled={selecionada === null}
            >
              Confirmar resposta
            </button>
          ) : (
            <button type="button" className="btn btn-primario" onClick={proxima}>
              {ultima ? "Ver resultado" : "Próxima pergunta"}
            </button>
          )}
        </div>
      </>
    );
  }

  return (
    <div className="app">
      <header className="topo">
        <h1>Quiz de JavaScript</h1>
        <p>Revisão DSA 2026</p>
      </header>
      <main>{conteudo}</main>
      <footer className="rodape">Seu progresso é salvo automaticamente neste navegador.</footer>
    </div>
  );
}
