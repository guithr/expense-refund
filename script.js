// Seleciona os elementos do formulario
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

//Seleciona os elementos da lista
const expenseList = document.querySelector("ul");
const expensesTotal = document.querySelector("aside header h2");
const expenseQuantity = document.querySelector("aside header p span");

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

//Captura o evento de submit do formulario para obter os valores.
form.onsubmit = (event) => {
  // Previne o comportamento padrão de recarregar a pagina
  event.preventDefault();

  // Cria um objeto com os detalhes da nova despesa
  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
  };

  //Chama a função que ira adicionar o item na lista.
  expenseAdd(newExpense);
};

// Adiciona um novo item na lista
function expenseAdd(newExpense) {
  try {
    // Cria o elemento de li (item) para adiconar na lista (ul).
    const expenseItem = document.createElement("li");
    expenseItem.classList.add("expense");

    // Cria o icone da categoria
    const expenseIcon = document.createElement("img");
    expenseIcon.setAttribute("src", `./img/${newExpense.category_id}.svg`);
    expenseIcon.setAttribute("alt", `${newExpense.category_name}`);

    // Cria a informação da despesa
    const expenseInfo = document.createElement("div");
    expenseInfo.classList.add("expense-info");

    // Cria o nome da despesa
    const expenseName = document.createElement("strong");
    expenseName.textContent = newExpense.expense;

    //Cria a categoria da despesa
    const expenseCategory = document.createElement("span");
    expenseCategory.textContent = newExpense.category_name;

    // Adiciona nome e categoria na div (expense-info)
    expenseInfo.append(expenseName, expenseCategory);

    //Cria valor da despesa
    const expenseAmount = document.createElement("span");
    expenseAmount.classList.add("expense-amount");
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount
      .toUpperCase()
      .replace("R$", "")}`;

    //Cria o icone de remover
    const removeIcon = document.createElement("img");
    removeIcon.classList.add("remove-icon");
    removeIcon.setAttribute("src", "img/remove.svg");
    removeIcon.setAttribute("alt", "remover");

    //  Adiciona as informações no item
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon);

    //Adiciona o item na lista
    expenseList.append(expenseItem);

    //Atualiza os totais
    updateTotals();
  } catch (error) {
    alert("Não foi possivel atualizar a lista de despesas");
    console.log(error);
  }
}

// Atualiza os totais
function updateTotals() {
  try {
    //Recuperar todo os Items (li) da lista (ul)
    const items = expenseList.children;

    // Atualiza quantidade de itens da lista
    expenseQuantity.textContent = `${items.length}  ${
      items.length > 1 ? "despesas" : "despesa"
    } `;

    // Variavel para incrementar o total
    let total = 0;

    //  Percorre cada item (LI) da lista (UL)
    for (let item = 0; item < items.length; item++) {
      const itemAmount = items[item].querySelector(".expense-amount");

      //Removendo caracteres não númericos e substitui a virgula pelo ponto.
      let value = itemAmount.textContent
        .replace(/[^\d,]/g, "")
        .replace(",", ".");

      value = parseFloat(value);

      //Verifica se é um número valido.

      if (isNaN(value)) {
        return alert("Não foi possível  ");
      }

      // Incrementar o valor total

      total += Number(value);
    }

    //cria span para adicionar o R$ formatado

    const symbolBRL = document.createElement("small");
    symbolBRL.textContent = "R$";

    //Formata o valor e remove o R$ que será exibido pela small com um estilo costumizado.
    total = formatCurrencyBRL(total).toUpperCase().replace("R$", "");

    // Limpa o conteudo do elemento
    expensesTotal.innerHTML = "";

    //Adiciona o símbolo da moeda e do valor formatado.
    expensesTotal.append(symbolBRL, total);
  } catch (error) {
    console.log(error);
    alert("Não foi possivel atualizar os totais");
  }
}
