// Componente de apresentação: recebe apenas o que precisa via props.
export default function TelaInicial({ total, temProgresso, onIniciar, onContinuar }) {
  return (
    <section className="cartao" aria-labelledby="titulo-inicio">
      <h2 id="titulo-inicio">Pronto para revisar?</h2>
      <p>
        São {total} perguntas sobre variáveis, condicionais, laços de repetição,
        arrays e funções em JavaScript.
      </p>
      <div className="acoes">
        {temProgresso && (
          <button type="button" className="btn btn-primario" onClick={onContinuar}>
            Continuar de onde parei
          </button>
        )}
        <button
          type="button"
          className={temProgresso ? "btn btn-secundario" : "btn btn-primario"}
          onClick={onIniciar}
        >
          {temProgresso ? "Começar novamente" : "Começar quiz"}
        </button>
      </div>
    </section>
  );
}
