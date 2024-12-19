document.addEventListener("DOMContentLoaded", () => {
    const input = document.querySelector(".input-calculadora input"); // Campo de entrada
    const buttons = document.querySelectorAll(".btn-calculadora div"); // Botões

    // Adiciona eventos de clique aos botões
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const value = button.textContent;

            if (value === "=") {
                input.value = calculateExpression(input.value); // Calcula a expressão
            } else if (value === "C") {
                input.value = ""; // Limpa o campo
            } else {
                input.value += value; // Adiciona o valor ao campo
            }
        });
    });

    // Função para calcular a expressão sem usar `eval`
    function calculateExpression(expression) {
        try {
            const tokens = tokenize(expression.replace("X", "*")); // Divide em tokens
            const result = evaluateTokens(tokens); // Avalia os tokens
            return result;
        } catch (error) {
            return "Erro";
        }
    }

    // Tokeniza a expressão em números e operadores
    function tokenize(expression) {
        const regex = /\d+(\.\d+)?|[\+\-\*\/]/g; // Números ou operadores
        return expression.match(regex) || [];
    }

    // Avalia os tokens em ordem de precedência
    function evaluateTokens(tokens) {
        // Resolver multiplicação e divisão primeiro
        let stack = [];
        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            if (token === "*" || token === "/") {
                const left = parseFloat(stack.pop());
                const right = parseFloat(tokens[++i]);
                stack.push(token === "*" ? left * right : left / right);
                console.log(stack)
            } else {
                stack.push(token);
            }
        }

        // Resolver soma e subtração
        let result = parseFloat(stack[0]);
        for (let i = 1; i < stack.length; i += 2) {
            const operator = stack[i];
            const value = parseFloat(stack[i + 1]);
            if (operator === "+") {
                result += value;
            } else if (operator === "-") {
                result -= value;
            }
        }
        return result;
    }
});
