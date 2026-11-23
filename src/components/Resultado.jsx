export default function Resultado({ pontuacao, total, onReiniciar }) {
  const porcentagem = Math.round((pontuacao / total) * 100);

  let mensagem;
  if (porcentagem === 100) mensagem = "Perfeito! Você domina o conteúdo.";
  else if (porcentagem >= 70) mensagem = "Muito bem! Falta pouco para a nota máxima.";
  else if (porcentagem >= 40) mensagem = "Bom começo. Vale revisar alguns tópicos.";
  else mensagem = "Continue estudando e tente novamente.";

  return (
    <section className="cartao resultado" aria-labelledby="titulo-resultado">
      <h2 id="titulo-resultado">Quiz finalizado</h2>
      <p className="placar">
        {pontuacao} <span>de {total}</span>
      </p>
      <p>
        Aproveitamento: <strong>{porcentagem}%</strong>
      </p>
      <p>{mensagem}</p>
      <button type="button" className="btn btn-primario" onClick={onReiniciar}>
        Refazer o quiz
      </button>
    </section>
  );
}
