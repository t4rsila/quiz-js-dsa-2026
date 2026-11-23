// Mostra uma pergunta e suas opções.
// Dados recebidos: a pergunta, a opção selecionada e se já foi confirmada.
export default function Pergunta({ pergunta, selecionada, confirmada, onSelecionar }) {
  // Estrutura de repetição: percorre as opções com map.
  const opcoes = pergunta.opcoes.map((texto, indice) => {
    let classe = "opcao";

    if (confirmada) {
      // Condicionais: define a cor conforme certo/errado.
      if (indice === pergunta.correta) classe += " opcao-certa";
      else if (indice === selecionada) classe += " opcao-errada";
    } else if (indice === selecionada) {
      classe += " opcao-selecionada";
    }

    return (
      <li key={indice}>
        <button
          type="button"
          className={classe}
          onClick={() => onSelecionar(indice)}
          disabled={confirmada}
          aria-pressed={indice === selecionada}
        >
          <span className="letra">{String.fromCharCode(65 + indice)}</span>
          <span>{texto}</span>
        </button>
      </li>
    );
  });

  return (
    <section className="cartao" aria-labelledby="enunciado">
      <h2 id="enunciado">{pergunta.enunciado}</h2>
      <ul className="opcoes">{opcoes}</ul>
    </section>
  );
}
