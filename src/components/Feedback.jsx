export default function Feedback({ acertou, explicacao }) {
  return (
    <div
      className={`feedback ${acertou ? "feedback-certo" : "feedback-errado"}`}
      role="status"
      aria-live="polite"
    >
      <strong>{acertou ? "Resposta correta!" : "Resposta incorreta."}</strong>
      <p>{explicacao}</p>
    </div>
  );
}
