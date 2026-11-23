export default function Progresso({ atual, total, pontuacao }) {
  const porcentagem = Math.round((atual / total) * 100);

  return (
    <div className="progresso">
      <div className="progresso-texto">
        <span>
          Pergunta {atual} de {total}
        </span>
        <span>Pontos: {pontuacao}</span>
      </div>
      <div
        className="barra"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={atual}
        aria-label="Progresso do quiz"
      >
        <div className="barra-preenchida" style={{ width: `${porcentagem}%` }} />
      </div>
    </div>
  );
}
