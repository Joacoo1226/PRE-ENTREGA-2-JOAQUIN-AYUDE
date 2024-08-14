function solicitarDatos() {
  let loanAmount, interestRate, loanTerm;
  let validInput = false;

  while (!validInput) {
    loanAmount = parseFloat(prompt("Ingrese el monto del préstamo (USD):"));
    interestRate = parseFloat(prompt("Ingrese la tasa de interés anual (%):"));
    loanTerm = parseInt(prompt("Ingrese el plazo del préstamo (años):"));

    if (isNaN(loanAmount) || isNaN(interestRate) || isNaN(loanTerm) ||
        loanAmount <= 0 || interestRate <= 0 || loanTerm <= 0) {
      alert("Por favor, ingrese valores numéricos válidos y mayores a cero.");
    } else {
      validInput = true;
    }
  }

  return { loanAmount, interestRate, loanTerm };
}

function calcularPagoMensual(datos) {
  let { loanAmount, interestRate, loanTerm } = datos;

  let monthlyInterestRate = (interestRate / 100) / 12;
  let numberOfPayments = loanTerm * 12;

  if (monthlyInterestRate === 0) {
    return loanAmount / numberOfPayments;
  }

  let numerator = monthlyInterestRate * Math.pow((1 + monthlyInterestRate), numberOfPayments);
  let denominator = Math.pow((1 + monthlyInterestRate), numberOfPayments) - 1;
  let monthlyPayment = loanAmount * (numerator / denominator);

  return monthlyPayment;
}

function mostrarResultado(monthlyPayment) {
  const resultDiv = document.getElementById('result');
  resultDiv.textContent = "Pago Mensual: $" + monthlyPayment.toFixed(2);
}

function simuladorDePagos() {
  let datos = solicitarDatos();
  if (datos !== null) {
    let monthlyPayment = calcularPagoMensual(datos);
    mostrarResultado(monthlyPayment);
  }
}

simuladorDePagos();
