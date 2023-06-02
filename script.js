// Function called whenever a field is changed
function screenUpdate() {
    // Gets the reference value and saves it to a const
    const ref_value = document.getElementById("referencias").value;
    // Gets the grade value and saves it to a const
    const grad_value = document.getElementById("graus").value;
    // Gets the ATS value and saves it to a const
    const ats_number = document.getElementById("ats").value;
    // Gets the number of working days in the month and saves it to a variable
    const days_number = document.getElementById("dias").value;
    //console.log(days_number)
    //console.log("Número de ATS é: " + ats_number)
    // Gets the pattern value by the sum of the reference and the grade
    const pattern = ref_value + grad_value;
    // Log for debugging
    //console.log("Primeiro padrão: "+ pattern);
    /* Calls the function that sums the values, and pass the pattern and
    the ATS Values to it */
    sumValues(pattern, ats_number, days_number);
}

function updateSelects() {
    var dif_acesso_select = document.getElementById("dificil_acesso");
    var dif_lotacao_select = document.getElementById("dificil_lotacao");
  
    dif_acesso_select.addEventListener("change", function() {
      if (dif_acesso_select.value !== "") {
        dif_lotacao_select.value = ""; // Reset 'dificil_lotacao' value
      }
    });
  
    dif_lotacao_select.addEventListener("change", function() {
      if (dif_lotacao_select.value !== "") {
        dif_acesso_select.value = ""; // Reset 'dificil_acesso' value
      }
    });
}

// Function that sums all the values to get the final salary
function sumValues(pattern, ats_number, days_number) {
    // estabilish the total as 0 initially
    let total = 0;
    let ats_value = 0;
    let funprev = 0;
    let pattern_value = 0;
    let hard_access = 0;
    let food_aid = 0;
    let meal_aid = 0;
    let prev_pattern = 0;
    let allowance = 0;
    // Calculates the meal aid value
    switch(days_number) {
        case 0:
            meal_aid = (0).toFixed(2);
            break;
        default:
            meal_aid = (days_number * 25).toFixed(2);
            break;
    }
    // Sets the minimum wage constant
    const minimum_wage = 2130.74;
    //const minimum_wage = 2780.61;
    // The first switch checks for the QPE
    switch (pattern) {
        // First case is the lowest wage possible
        case "QPE01A":
            // Sets the pattern variable
            pattern_value = 1496.92;
            // Sets the hard access variable
            hard_access = 275.00;
            // Creates the fod aid variable
            food_aid = 600.00;
            // Creates previdenciary pattern
            prev_pattern = 0;
            // Calculates the allowance by subtraing the pattern from the minimum wage
            allowance = (minimum_wage - pattern_value).toFixed(2);
            // Log for debugging
            //console.log("Abono: " + allowance); 
            // Creates and calculates the salary for the funprev discount of 14%
            prev_pattern = (
                // Sums the wage, the allowance and the hard access
                parseFloat(pattern_value) + 
                parseFloat(allowance) + 
                parseFloat(hard_access)).toFixed(2);
            // Log for debugging
            //console.log("Salário para fins de desconto previdenciário: " + prev_pattern); 
            // Funprev costs 14% per month
            funprev = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
            //console.log("Desconto Funprev: " + funprev);
            // Calculates the liquid wage
            var liquid_wage = (
                parseFloat(pattern_value) + 
                parseFloat(allowance) + 
                parseFloat(food_aid) +
                parseFloat(meal_aid) +
                parseFloat(hard_access) -
                parseFloat(funprev)).toFixed(2);
            // Log for debugging
            //console.log("Salário líquido: " + liquid_wage)
            // Calculates the value of the ATS
            switch (ats_number) {
                // Do nothing if there is 0 ATS
                case "0":
                    ats_value = (0).toFixed(2);
                    break;
                // Calculates the value of the 1st ATS
                case "1":
                    // 1st ATS is 5%
                    ats_value = ((5 / 100) * pattern_value).toFixed(2);
                    // Log for debugging
                    console.log("ATS: " + ats_value);
                    break;
                case "2":
                    // 2nd ATS is 10.25%
                    ats_value = ((10.25 / 100) * pattern_value).toFixed(2);
                    break;
                case "3":
                    // 3rd ATS is 15.76%
                    ats_value = ((15.76 / 100) * pattern_value).toFixed(2);
                    break;
                case "4":
                    // 4th ATS is 21.55%
                    ats_value = ((21.55 / 100) * pattern_value).toFixed(2);
                    break;
                case "5":
                    // 5th ATS is 27.63%
                    ats_value = ((27.63 / 100) * pattern_value).toFixed(2);
                    break;
                case "6":
                    // 6th ATS is 34.01%
                    ats_value = ((34.01 / 100) * pattern_value).toFixed(2);
                    break;
                case "7":
                    // 7th ATS is 40.71%
                    ats_value = ((40.71 / 100) * pattern_value).toFixed(2);
                    break;
            }
            // Sums the pattern and the ATS values
            total = parseFloat(liquid_wage) + parseFloat(ats_value);
            // Log for debugging
            //console.log("total is: " + total.toFixed(2))
            // Updates the total to be received to the liquid wage field
            document.getElementById("proventos").innerHTML = "R$ " + total.toFixed(2);
            document.getElementById("salario").innerHTML = "Salário: + R$ " + pattern_value.toFixed(2);
            document.getElementById("abono").innerHTML = "Abono Complementar: + R$ " + allowance;
            document.getElementById("vale").innerHTML = "Vale Alimentação: + R$ " + food_aid.toFixed(2);
            document.getElementById("auxilio").innerHTML = "Auxílio Refeição: + R$ " + meal_aid;
            document.getElementById("ats_detail").innerHTML = "Adicional por Tempo de Serviço: + R$ " + ats_value
            document.getElementById("gratificacao").innerHTML = "Gratificação Difícil Acesso: + R$ "+hard_access.toFixed(2);
            document.getElementById("funprev").innerHTML = "Funprev: - R$ "+ funprev;
            break;

        case "QPE01B":
        case "QPE02A":
            // Sets the pattern variable
            pattern_value = 1594.15;
            // Sets the hard access variable
            hard_access = 275.00;
            // Creates the fod aid variable
            food_aid = 600.00;
            // Creates previdenciary pattern
            prev_pattern = 0;
            // Calculates the allowance by subtraing the pattern from the minimum wage
            allowance = (minimum_wage - pattern_value).toFixed(2);
            // Log for debugging
            console.log("Abono: " + allowance); 
            // Creates and calculates the salary for the funprev discount of 14%
            prev_pattern = (
                // Sums the wage, the allowance and the hard access
                parseFloat(pattern_value) + 
                parseFloat(allowance) + 
                parseFloat(hard_access)).toFixed(2);
            // Log for debugging
            console.log("Salário para fins de desconto previdenciário: " + 
            prev_pattern); 
            // Funprev costs 14% per month
            funprev = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
            console.log("Desconto Funprev: " + funprev);
            // Calculates the liquid wage
            var liquid_wage = (
                parseFloat(pattern_value) + 
                parseFloat(allowance) + 
                parseFloat(food_aid) +
                parseFloat(meal_aid) +
                parseFloat(hard_access) -
                parseFloat(funprev)).toFixed(2);
            // Log for debugging
            console.log("Salário líquido: " + liquid_wage)
            // Calculates the value of the ATS
            switch (ats_number) {
                // Do nothing if there is 0 ATS
                case "0":
                    ats_value = (0).toFixed(2);
                    break;
                // Calculates the value of the 1st ATS
                case "1":
                    // 1st ATS is 5%
                    ats_value = ((5 / 100) * pattern_value).toFixed(2);
                    // Log for debugging
                    console.log("ATS: " + ats_value);
                    break;
                case "2":
                    // 2nd ATS is 10.25%
                    ats_value = ((10.25 / 100) * pattern_value).toFixed(2);
                    break;
                case "3":
                    // 3rd ATS is 15.76%
                    ats_value = ((15.76 / 100) * pattern_value).toFixed(2);
                    break;
                case "4":
                    // 4th ATS is 21.55%
                    ats_value = ((21.55 / 100) * pattern_value).toFixed(2);
                    break;
                case "5":
                    // 5th ATS is 27.63%
                    ats_value = ((27.63 / 100) * pattern_value).toFixed(2);
                    break;
                case "6":
                    // 6th ATS is 34.01%
                    ats_value = ((34.01 / 100) * pattern_value).toFixed(2);
                    break;
                case "7":
                    // 7th ATS is 40.71%
                    ats_value = ((40.71 / 100) * pattern_value).toFixed(2);
                    break;
            }
            // Sums the pattern and the ATS values
            total = parseFloat(liquid_wage) + parseFloat(ats_value);
            // Log for debugging
            console.log("total is: " + total.toFixed(2))
            // Updates the total to be received to the liquid wage field
            document.getElementById("proventos").innerHTML = "R$ " + total.toFixed(2);
            document.getElementById("salario").innerHTML = "Salário: + R$ " + pattern_value.toFixed(2);
            document.getElementById("abono").innerHTML = "Abono Complementar: + R$ " + allowance;
            document.getElementById("vale").innerHTML = "Vale Alimentação: + R$ " + food_aid.toFixed(2);
            document.getElementById("auxilio").innerHTML = "Auxílio Refeição: + R$ " +meal_aid;
            document.getElementById("ats_detail").innerHTML = "Adicional por Tempo de Serviço: + R$ " + ats_value;
            document.getElementById("gratificacao").innerHTML = "Gratificação Difícil Acesso: + R$ "+hard_access.toFixed(2);
            document.getElementById("funprev").innerHTML = "Funprev: - R$ "+ funprev;
            break;
        
        // QPE03A is the starting value of the ATE career
        case "QPE01C":
        case "QPE02B":
        case "QPE03A":
            // Sets the pattern variable
            pattern_value = 1697.84;
            // Sets the hard access variable
            hard_access = 275.00;
            // Creates the fod aid variable
            food_aid = 600.00;
            // Creates previdenciary pattern
            prev_pattern = 0;
            // Calculates the allowance by subtraing the pattern from the minimum wage
            allowance = (minimum_wage - pattern_value).toFixed(2);
            // Log for debugging
            console.log("Abono: " + allowance); 
            // Creates and calculates the salary for the funprev discount of 14%
            prev_pattern = (
                // Sums the wage, the allowance and the hard access
                parseFloat(pattern_value) + 
                parseFloat(allowance) + 
                parseFloat(hard_access)).toFixed(2);
            // Log for debugging
            console.log("Salário para fins de desconto previdenciário: " + 
            prev_pattern); 
            // Funprev costs 14% per month
            funprev = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
            console.log("Desconto Funprev: " + funprev);
            // Calculates the liquid wage
            var liquid_wage = (
                parseFloat(pattern_value) + 
                parseFloat(allowance) + 
                parseFloat(food_aid) +
                parseFloat(meal_aid) +
                parseFloat(hard_access) -
                parseFloat(funprev)).toFixed(2);
            // Log for debugging
            console.log("Salário líquido: " + liquid_wage)
            // Calculates the value of the ATS
            switch (ats_number) {
                // Do nothing if there is 0 ATS
                case "0":
                    ats_value = (0).toFixed(2);
                    break;
                // Calculates the value of the 1st ATS
                case "1":
                    // 1st ATS is 5%
                    ats_value = ((5 / 100) * pattern_value).toFixed(2);
                    // Log for debugging
                    console.log("ATS: " + ats_value);
                    break;
                case "2":
                    // 2nd ATS is 10.25%
                    ats_value = ((10.25 / 100) * pattern_value).toFixed(2);
                    break;
                case "3":
                    // 3rd ATS is 15.76%
                    ats_value = ((15.76 / 100) * pattern_value).toFixed(2);
                    break;
                case "4":
                    // 4th ATS is 21.55%
                    ats_value = ((21.55 / 100) * pattern_value).toFixed(2);
                    break;
                case "5":
                    // 5th ATS is 27.63%
                    ats_value = ((27.63 / 100) * pattern_value).toFixed(2);
                    break;
                case "6":
                    // 6th ATS is 34.01%
                    ats_value = ((34.01 / 100) * pattern_value).toFixed(2);
                    break;
                case "7":
                    // 7th ATS is 40.71%
                    ats_value = ((40.71 / 100) * pattern_value).toFixed(2);
                    break;
            }
            // Sums the pattern and the ATS values
            total = parseFloat(liquid_wage) + parseFloat(ats_value);
            // Log for debugging
            console.log("total is: " + total.toFixed(2))
            // Updates the total to be received to the liquid wage field
            document.getElementById("proventos").innerHTML = "R$ " + total.toFixed(2);
            document.getElementById("salario").innerHTML = "Salário: + R$ " + pattern_value.toFixed(2);
            document.getElementById("abono").innerHTML = "Abono Complementar: + R$ " + allowance;
            document.getElementById("vale").innerHTML = "Vale Alimentação: + R$ " + food_aid.toFixed(2);
            document.getElementById("auxilio").innerHTML = "Auxílio Refeição: + R$ " +meal_aid;
            document.getElementById("ats_detail").innerHTML = "Adicional por Tempo de Serviço: + R$ " + ats_value;
            document.getElementById("gratificacao").innerHTML = "Gratificação Difícil Acesso: + R$ "+hard_access.toFixed(2);
            document.getElementById("funprev").innerHTML = "Funprev: - R$ "+ funprev;
            break;
        
        case "QPE01D":
        case "QPE02C":
        case "QPE03B":
        case "QPE04A":
            // Sets the pattern variable
            pattern_value = 1808.23;
            // Sets the hard access variable
            hard_access = 275.00;
            // Creates the fod aid variable
            food_aid = 600.00;
            // Creates previdenciary pattern
            prev_pattern = 0;
            // Calculates the allowance by subtraing the pattern from the minimum wage
            allowance = (minimum_wage - pattern_value).toFixed(2);
            // Log for debugging
            console.log("Abono: " + allowance); 
            // Creates and calculates the salary for the funprev discount of 14%
            prev_pattern = (
                // Sums the wage, the allowance and the hard access
                parseFloat(pattern_value) + 
                parseFloat(allowance) + 
                parseFloat(hard_access)).toFixed(2);
            // Log for debugging
            console.log("Salário para fins de desconto previdenciário: " + 
            prev_pattern); 
            // Funprev costs 14% per month
            funprev = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
            console.log("Desconto Funprev: " + funprev);
            // Calculates the liquid wage
            var liquid_wage = (
                parseFloat(pattern_value) + 
                parseFloat(allowance) + 
                parseFloat(food_aid) +
                parseFloat(meal_aid) +
                parseFloat(hard_access) -
                parseFloat(funprev)).toFixed(2);
            // Log for debugging
            console.log("Salário líquido: " + liquid_wage)
            // Calculates the value of the ATS
            switch (ats_number) {
                // Do nothing if there is 0 ATS
                case "0":
                    ats_value = (0).toFixed(2);
                    break;
                // Calculates the value of the 1st ATS
                case "1":
                    // 1st ATS is 5%
                    ats_value = ((5 / 100) * pattern_value).toFixed(2);
                    // Log for debugging
                    console.log("ATS: " + ats_value);
                    break;
                case "2":
                    // 2nd ATS is 10.25%
                    ats_value = ((10.25 / 100) * pattern_value).toFixed(2);
                    break;
                case "3":
                    // 3rd ATS is 15.76%
                    ats_value = ((15.76 / 100) * pattern_value).toFixed(2);
                    break;
                case "4":
                    // 4th ATS is 21.55%
                    ats_value = ((21.55 / 100) * pattern_value).toFixed(2);
                    break;
                case "5":
                    // 5th ATS is 27.63%
                    ats_value = ((27.63 / 100) * pattern_value).toFixed(2);
                    break;
                case "6":
                    // 6th ATS is 34.01%
                    ats_value = ((34.01 / 100) * pattern_value).toFixed(2);
                    break;
                case "7":
                    // 7th ATS is 40.71%
                    ats_value = ((40.71 / 100) * pattern_value).toFixed(2);
                    break;
            }
            // Sums the pattern and the ATS values
            total = parseFloat(liquid_wage) + parseFloat(ats_value);
            // Log for debugging
            console.log("total is: " + total.toFixed(2))
            // Updates the total to be received to the liquid wage field
            document.getElementById("proventos").innerHTML = "R$ " + total.toFixed(2);
            document.getElementById("salario").innerHTML = "Salário: + R$ " + pattern_value.toFixed(2);
            document.getElementById("abono").innerHTML = "Abono Complementar: + R$ " + allowance;
            document.getElementById("vale").innerHTML = "Vale Alimentação: + R$ " + food_aid.toFixed(2);
            document.getElementById("auxilio").innerHTML = "Auxílio Refeição: + R$ " +meal_aid;
            document.getElementById("ats_detail").innerHTML = "Adicional por Tempo de Serviço: + R$ " + ats_value;
            document.getElementById("gratificacao").innerHTML = "Gratificação Difícil Acesso: + R$ "+hard_access.toFixed(2);
            document.getElementById("funprev").innerHTML = "Funprev: - R$ "+ funprev;
            break;
        
        case "QPE01E":
        case "QPE02D":
        case "QPE03C":
        case "QPE04B":
        case "QPE05A":
            // Sets the pattern variable
            pattern_value = 1925.76;
            // Sets the hard access variable
            hard_access = 275.00;
            // Creates the fod aid variable
            food_aid = 600.00;
            // Creates previdenciary pattern
            prev_pattern = 0;
            // Calculates the allowance by subtraing the pattern from the minimum wage
            allowance = (minimum_wage - pattern_value).toFixed(2);
            // Log for debugging
            console.log("Abono: " + allowance); 
            // Creates and calculates the salary for the funprev discount of 14%
            prev_pattern = (
                // Sums the wage, the allowance and the hard access
                parseFloat(pattern_value) + 
                parseFloat(allowance) + 
                parseFloat(hard_access)).toFixed(2);
            // Log for debugging
            console.log("Salário para fins de desconto previdenciário: " + 
            prev_pattern); 
            // Funprev costs 14% per month
            funprev = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
            console.log("Desconto Funprev: " + funprev);
            // Calculates the liquid wage
            var liquid_wage = (
                parseFloat(pattern_value) + 
                parseFloat(allowance) + 
                parseFloat(food_aid) +
                parseFloat(meal_aid) +
                parseFloat(hard_access) -
                parseFloat(funprev)).toFixed(2);
            // Log for debugging
            console.log("Salário líquido: " + liquid_wage)
            // Calculates the value of the ATS
            switch (ats_number) {
                // Do nothing if there is 0 ATS
                case "0":
                    ats_value = (0).toFixed(2);
                    break;
                // Calculates the value of the 1st ATS
                case "1":
                    // 1st ATS is 5%
                    ats_value = ((5 / 100) * pattern_value).toFixed(2);
                    // Log for debugging
                    console.log("ATS: " + ats_value);
                    break;
                case "2":
                    // 2nd ATS is 10.25%
                    ats_value = ((10.25 / 100) * pattern_value).toFixed(2);
                    break;
                case "3":
                    // 3rd ATS is 15.76%
                    ats_value = ((15.76 / 100) * pattern_value).toFixed(2);
                    break;
                case "4":
                    // 4th ATS is 21.55%
                    ats_value = ((21.55 / 100) * pattern_value).toFixed(2);
                    break;
                case "5":
                    // 5th ATS is 27.63%
                    ats_value = ((27.63 / 100) * pattern_value).toFixed(2);
                    break;
                case "6":
                    // 6th ATS is 34.01%
                    ats_value = ((34.01 / 100) * pattern_value).toFixed(2);
                    break;
                case "7":
                    // 7th ATS is 40.71%
                    ats_value = ((40.71 / 100) * pattern_value).toFixed(2);
                    break;
            }
            // Sums the pattern and the ATS values
            total = parseFloat(liquid_wage) + parseFloat(ats_value);
            // Log for debugging
            console.log("total is: " + total.toFixed(2))
            // Updates the total to be received to the liquid wage field
            document.getElementById("proventos").innerHTML = "R$ " + total.toFixed(2);
            document.getElementById("salario").innerHTML = "Salário: + R$ " + pattern_value.toFixed(2);
            document.getElementById("abono").innerHTML = "Abono Complementar: + R$ " + allowance;
            document.getElementById("vale").innerHTML = "Vale Alimentação: + R$ " + food_aid.toFixed(2);
            document.getElementById("auxilio").innerHTML = "Auxílio Refeição: + R$ " + meal_aid;
            document.getElementById("ats_detail").innerHTML = "Adicional por Tempo de Serviço: + R$ " + ats_value;
            document.getElementById("gratificacao").innerHTML = "Gratificação Difícil Acesso: + R$ "+hard_access.toFixed(2);
            document.getElementById("funprev").innerHTML = "Funprev: - R$ "+ funprev;
            break;

    }
}
