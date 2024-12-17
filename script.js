// Seleciona os elementos do formulario
const amount = document.getElementById("amount");

// (METODO) - Captura o evento de input para formatar o valor
amount.oninput = () => {
  // Obtem o valor  atual do input e remove os caracteres não numericos
  let value = amount.value.replace(/\D/g, "");

  // Transformar o valor em centavos. ( Exemplo: 150 / 10 = 1.5 que e equivalente a 1,50)

  value = Number(value) / 100;

  // Atualiza o valor do input
  amount.value = formatCurrencyBRL(value);
};

function formatCurrencyBRL(value) {
  // Formata o valor no padrão BRL (Real Brasileiro)
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  //Retorna o valor formatado
  return value;
}
