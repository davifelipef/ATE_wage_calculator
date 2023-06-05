window.onload = function() {
    updateSelects();
};

// Call the function to reset the QPE when the page is reloaded
window.addEventListener("load", resetSelectedOption);

// Function that resets the QPE on page reload
function resetSelectedOption() {
    var selectElement = document.getElementById("referencias");
    // Index 2 corresponds to the default option, QPE03A
    selectElement.selectedIndex = 2;
}

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
    // Gets the pattern value by the sum of the reference and the grade
    const pattern = ref_value + grad_value;
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
      screenUpdate();
      //sumValues(); // Update 'gratificacao' element
    });
  
    dif_lotacao_select.addEventListener("change", function() {
      if (dif_lotacao_select.value !== "") {
        dif_acesso_select.value = ""; // Reset 'dificil_acesso' value 
      }
      screenUpdate();
      //sumValues(); // Update 'gratificacao' element
    });
} 

// Function that sums all the values to get the final salary
function sumValues(pattern, ats_number, days_number) {
    let total = 0;
    let ats_value = 0;
    let funprev = 0;
    let pattern_value = 0;
    let hard_access_value = 0;
    let hard_occupation_value = 0;
    let food_aid = 600;
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
    //const minimum_wage = 2780.61; - yet to be approved by law

    // Calculates the hard access value
    var hard_access = document.getElementById("dificil_acesso").value;
    switch(hard_access) {
        case "0":
            break;
        case "faixa_1":
            hard_occupation_value = 0;
            hard_access_value = 220;
            document.getElementById("gratificacao").innerHTML = "Gratificação D.A.: + R$ " + hard_access_value.toFixed(2);
            break;
        case "faixa_2":
            hard_occupation_value = 0;
            hard_access_value = 275;
            document.getElementById("gratificacao").innerHTML = "Gratificação D.A.: + R$ " + hard_access_value.toFixed(2);
            break;
        case "faixa_3":
            hard_occupation_value = 0;
            hard_access_value = 330;
            document.getElementById("gratificacao").innerHTML = "Gratificação D.A.: + R$ " + hard_access_value.toFixed(2);
            break;
    }

    // Calculates the hard occupation value
    var hard_occupation = document.getElementById("dificil_lotacao").value;
    switch(hard_occupation) {
        case "0":
            break;
        case "dl_1":
            hard_access_value = 0;
            hard_occupation_value = 200;
            document.getElementById("gratificacao").innerHTML = "Gratificação D.L.: + R$ " + hard_occupation_value.toFixed(2);
            break;
        case "dl_2":
            hard_access_value = 0;
            hard_occupation_value = 300;
            document.getElementById("gratificacao").innerHTML = "Gratificação D.L.: + R$ " + hard_occupation_value.toFixed(2);
            break;
        case "dl_3":
            hard_access_value = 0;
            hard_occupation_value = 350;
            document.getElementById("gratificacao").innerHTML = "Gratificação D.L.: + R$ " + hard_occupation_value.toFixed(2);
            break;
        case "dl_4":
            hard_access_value = 0;
            hard_occupation_value = 400;
            document.getElementById("gratificacao").innerHTML = "Gratificação D.L.: + R$ " + hard_occupation_value.toFixed(2);
            break;
        case "dl_5":
            hard_access_value = 0;
            hard_occupation_value = 450;
            document.getElementById("gratificacao").innerHTML = "Gratificação D.L.: + R$ " + hard_occupation_value.toFixed(2);
            break;
        case "dl_6":
            hard_access_value = 0;
            hard_occupation_value = 500;
            document.getElementById("gratificacao").innerHTML = "Gratificação D.L.: + R$ " + hard_occupation_value.toFixed(2);
            break;
    }

    switch (pattern) {
        // First case is the lowest wage possible
        case "QPE01A":
            // Sets the pattern variable
            pattern_value = 1496.92;
            // Calculates the allowance by subtracting the pattern from the minimum wage
            allowance = (minimum_wage - pattern_value).toFixed(2);
            if (allowance <= 0) {
                allowance = 0;
            }
            // Creates and calculates the salary for the funprev discount of 14%
            prev_pattern = (
                // Sums the wage, the allowance and the hard access
                parseFloat(pattern_value) + 
                parseFloat(allowance) + 
                parseFloat(hard_access_value));
            // Funprev costs 14% per month
            funprev = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
            // Calculates the liquid wage
            var liquid_wage = (
                parseFloat(pattern_value) + 
                parseFloat(allowance) + 
                parseFloat(food_aid) +
                parseFloat(meal_aid) +
                parseFloat(hard_access_value) +
                parseFloat(hard_occupation_value) -
                parseFloat(funprev)).toFixed(2);
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
            // Sums the liquid wage and the ATS value
            total = parseFloat(liquid_wage) + parseFloat(ats_value);
            // Updates the total to be received to the liquid wage field
            document.getElementById("proventos").innerHTML = "R$ " + total.toFixed(2);
            document.getElementById("salario").innerHTML = "Salário: + R$ " + pattern_value.toFixed(2);
            document.getElementById("abono").innerHTML = "Abono Complementar: + R$ " + allowance;
            document.getElementById("vale").innerHTML = "Vale Alimentação: + R$ " + food_aid.toFixed(2);
            document.getElementById("auxilio").innerHTML = "Auxílio Refeição: + R$ " +meal_aid;
            document.getElementById("ats_detail").innerHTML = "Adicional por Tempo de Serviço: + R$ " + ats_value;
            document.getElementById("funprev").innerHTML = "Funprev: - R$ "+ funprev;
            break;

        case "QPE01B":
        case "QPE02A":
            // Sets the pattern variable
            pattern_value = 1594.15;
            // Calculates the allowance by subtracting the pattern from the minimum wage
            allowance = (minimum_wage - pattern_value).toFixed(2);
            if (allowance <= 0) {
                allowance = 0;
            }
            // Creates and calculates the salary for the funprev discount of 14%
            prev_pattern = (
                // Sums the wage, the allowance and the hard access
                parseFloat(pattern_value) + 
                parseFloat(allowance) + 
                parseFloat(hard_access_value));
            // Funprev costs 14% per month
            funprev = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
            // Calculates the liquid wage
            var liquid_wage = (
                parseFloat(pattern_value) + 
                parseFloat(allowance) + 
                parseFloat(food_aid) +
                parseFloat(meal_aid) +
                parseFloat(hard_access_value) +
                parseFloat(hard_occupation_value) -
                parseFloat(funprev)).toFixed(2);
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
            // Sums the liquid wage and the ATS value
            total = parseFloat(liquid_wage) + parseFloat(ats_value);
            // Updates the total to be received to the liquid wage field
            document.getElementById("proventos").innerHTML = "R$ " + total.toFixed(2);
            document.getElementById("salario").innerHTML = "Salário: + R$ " + pattern_value.toFixed(2);
            document.getElementById("abono").innerHTML = "Abono Complementar: + R$ " + allowance;
            document.getElementById("vale").innerHTML = "Vale Alimentação: + R$ " + food_aid.toFixed(2);
            document.getElementById("auxilio").innerHTML = "Auxílio Refeição: + R$ " +meal_aid;
            document.getElementById("ats_detail").innerHTML = "Adicional por Tempo de Serviço: + R$ " + ats_value;
            document.getElementById("funprev").innerHTML = "Funprev: - R$ "+ funprev;
            break;
        
        // QPE03A is the starting value of the ATE career
        case "QPE01C":
        case "QPE02B":
        case "QPE03A":
            // Sets the pattern variable
            pattern_value = 1697.84;
            // Calculates the allowance by subtracting the pattern from the minimum wage
            allowance = (minimum_wage - pattern_value).toFixed(2);
            if (allowance <= 0) {
                allowance = 0;
            }
            // Creates and calculates the salary for the funprev discount of 14%
            prev_pattern = (
                // Sums the wage, the allowance and the hard access
                parseFloat(pattern_value) + 
                parseFloat(allowance) + 
                parseFloat(hard_access_value));
            // Funprev costs 14% per month
            funprev = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
            // Calculates the liquid wage
            var liquid_wage = (
                parseFloat(pattern_value) + 
                parseFloat(allowance) + 
                parseFloat(food_aid) +
                parseFloat(meal_aid) +
                parseFloat(hard_access_value) +
                parseFloat(hard_occupation_value) -
                parseFloat(funprev)).toFixed(2);
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
            // Sums the liquid wage and the ATS value
            total = parseFloat(liquid_wage) + parseFloat(ats_value);
            // Updates the total to be received to the liquid wage field
            document.getElementById("proventos").innerHTML = "R$ " + total.toFixed(2);
            document.getElementById("salario").innerHTML = "Salário: + R$ " + pattern_value.toFixed(2);
            document.getElementById("abono").innerHTML = "Abono Complementar: + R$ " + allowance;
            document.getElementById("vale").innerHTML = "Vale Alimentação: + R$ " + food_aid.toFixed(2);
            document.getElementById("auxilio").innerHTML = "Auxílio Refeição: + R$ " +meal_aid;
            document.getElementById("ats_detail").innerHTML = "Adicional por Tempo de Serviço: + R$ " + ats_value;
            document.getElementById("funprev").innerHTML = "Funprev: - R$ "+ funprev;
            break;
        
        case "QPE01D":
        case "QPE02C":
        case "QPE03B":
        case "QPE04A":
            // Sets the pattern variable
            pattern_value = 1808.23;
            // Calculates the allowance by subtracting the pattern from the minimum wage
            allowance = (minimum_wage - pattern_value).toFixed(2);
            if (allowance <= 0) {
                allowance = 0;
            }
            // Creates and calculates the salary for the funprev discount of 14%
            prev_pattern = (
                // Sums the wage, the allowance and the hard access
                parseFloat(pattern_value) + 
                parseFloat(allowance) + 
                parseFloat(hard_access_value));
            // Funprev costs 14% per month
            funprev = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
            // Calculates the liquid wage
            var liquid_wage = (
                parseFloat(pattern_value) + 
                parseFloat(allowance) + 
                parseFloat(food_aid) +
                parseFloat(meal_aid) +
                parseFloat(hard_access_value) +
                parseFloat(hard_occupation_value) -
                parseFloat(funprev)).toFixed(2);
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
            // Sums the liquid wage and the ATS value
            total = parseFloat(liquid_wage) + parseFloat(ats_value);
            // Updates the total to be received to the liquid wage field
            document.getElementById("proventos").innerHTML = "R$ " + total.toFixed(2);
            document.getElementById("salario").innerHTML = "Salário: + R$ " + pattern_value.toFixed(2);
            document.getElementById("abono").innerHTML = "Abono Complementar: + R$ " + allowance;
            document.getElementById("vale").innerHTML = "Vale Alimentação: + R$ " + food_aid.toFixed(2);
            document.getElementById("auxilio").innerHTML = "Auxílio Refeição: + R$ " +meal_aid;
            document.getElementById("ats_detail").innerHTML = "Adicional por Tempo de Serviço: + R$ " + ats_value;
            document.getElementById("funprev").innerHTML = "Funprev: - R$ "+ funprev;
            break;
        
        case "QPE01E":
        case "QPE02D":
        case "QPE03C":
        case "QPE04B":
        case "QPE05A":
            // Sets the pattern variable
            pattern_value = 1925.76;
            // Calculates the allowance by subtracting the pattern from the minimum wage
            allowance = (minimum_wage - pattern_value).toFixed(2);
            if (allowance <= 0) {
                allowance = 0;
            }
            // Creates and calculates the salary for the funprev discount of 14%
            prev_pattern = (
                // Sums the wage, the allowance and the hard access
                parseFloat(pattern_value) + 
                parseFloat(allowance) + 
                parseFloat(hard_access_value));
            // Funprev costs 14% per month
            funprev = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
            // Calculates the liquid wage
            var liquid_wage = (
                parseFloat(pattern_value) + 
                parseFloat(allowance) + 
                parseFloat(food_aid) +
                parseFloat(meal_aid) +
                parseFloat(hard_access_value) +
                parseFloat(hard_occupation_value) -
                parseFloat(funprev)).toFixed(2);
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
            // Sums the liquid wage and the ATS value
            total = parseFloat(liquid_wage) + parseFloat(ats_value);
            // Updates the total to be received to the liquid wage field
            document.getElementById("proventos").innerHTML = "R$ " + total.toFixed(2);
            document.getElementById("salario").innerHTML = "Salário: + R$ " + pattern_value.toFixed(2);
            document.getElementById("abono").innerHTML = "Abono Complementar: + R$ " + allowance;
            document.getElementById("vale").innerHTML = "Vale Alimentação: + R$ " + food_aid.toFixed(2);
            document.getElementById("auxilio").innerHTML = "Auxílio Refeição: + R$ " +meal_aid;
            document.getElementById("ats_detail").innerHTML = "Adicional por Tempo de Serviço: + R$ " + ats_value;
            document.getElementById("funprev").innerHTML = "Funprev: - R$ "+ funprev;
            break;

        case "QPE02E":
        case "QPE03D":
        case "QPE04C":
        case "QPE05B":
        case "QPE06A":
            // Sets the pattern variable
            pattern_value = 2050.91;
            // Calculates the allowance by subtracting the pattern from the minimum wage
            allowance = (minimum_wage - pattern_value).toFixed(2);
            if (allowance <= 0) {
                allowance = 0;
            }
            // Creates and calculates the salary for the funprev discount of 14%
            prev_pattern = (
                // Sums the wage, the allowance and the hard access
                parseFloat(pattern_value) + 
                parseFloat(allowance) + 
                parseFloat(hard_access_value));
            // Funprev costs 14% per month
            funprev = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
            // Calculates the liquid wage
            var liquid_wage = (
                parseFloat(pattern_value) + 
                parseFloat(allowance) + 
                parseFloat(food_aid) +
                parseFloat(meal_aid) +
                parseFloat(hard_access_value) +
                parseFloat(hard_occupation_value) -
                parseFloat(funprev)).toFixed(2);
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
            // Sums the liquid wage and the ATS value
            total = parseFloat(liquid_wage) + parseFloat(ats_value);
            // Updates the total to be received to the liquid wage field
            document.getElementById("proventos").innerHTML = "R$ " + total.toFixed(2);
            document.getElementById("salario").innerHTML = "Salário: + R$ " + pattern_value.toFixed(2);
            document.getElementById("abono").innerHTML = "Abono Complementar: + R$ " + allowance;
            document.getElementById("vale").innerHTML = "Vale Alimentação: + R$ " + food_aid.toFixed(2);
            document.getElementById("auxilio").innerHTML = "Auxílio Refeição: + R$ " +meal_aid;
            document.getElementById("ats_detail").innerHTML = "Adicional por Tempo de Serviço: + R$ " + ats_value;
            document.getElementById("funprev").innerHTML = "Funprev: - R$ "+ funprev;
            break;

        case "QPE03E":
        case "QPE04D":
        case "QPE05C":
        case "QPE06B":
        case "QPE07A":
            // Sets the pattern variable
            pattern_value = 2184.22;
            // Calculates the allowance by subtracting the pattern from the minimum wage
            allowance = (minimum_wage - pattern_value).toFixed(2);
            if (allowance <= 0) {
                allowance = 0;
            }
            // Creates and calculates the salary for the funprev discount of 14%
            prev_pattern = (
                // Sums the wage, the allowance and the hard access
                parseFloat(pattern_value) + 
                parseFloat(allowance) + 
                parseFloat(hard_access_value));
            // Funprev costs 14% per month
            funprev = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
            // Calculates the liquid wage
            var liquid_wage = (
                parseFloat(pattern_value) + 
                parseFloat(allowance) + 
                parseFloat(food_aid) +
                parseFloat(meal_aid) +
                parseFloat(hard_access_value) +
                parseFloat(hard_occupation_value) -
                parseFloat(funprev)).toFixed(2);
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
            // Sums the liquid wage and the ATS value
            total = parseFloat(liquid_wage) + parseFloat(ats_value);
            // Updates the total to be received to the liquid wage field
            document.getElementById("proventos").innerHTML = "R$ " + total.toFixed(2);
            document.getElementById("salario").innerHTML = "Salário: + R$ " + pattern_value.toFixed(2);
            document.getElementById("abono").innerHTML = "Abono Complementar: + R$ " + allowance;
            document.getElementById("vale").innerHTML = "Vale Alimentação: + R$ " + food_aid.toFixed(2);
            document.getElementById("auxilio").innerHTML = "Auxílio Refeição: + R$ " +meal_aid;
            document.getElementById("ats_detail").innerHTML = "Adicional por Tempo de Serviço: + R$ " + ats_value;
            document.getElementById("funprev").innerHTML = "Funprev: - R$ "+ funprev;
            break;

        case "QPE04E":
        case "QPE05D":
        case "QPE06C":
        case "QPE07B":
        case "QPE08A":
            // Sets the pattern variable
            pattern_value = 2326.19;
            // Calculates the allowance by subtracting the pattern from the minimum wage
            allowance = (minimum_wage - pattern_value).toFixed(2);
            if (allowance <= 0) {
                allowance = 0;
            }
            // Creates and calculates the salary for the funprev discount of 14%
            prev_pattern = (
                // Sums the wage, the allowance and the hard access
                parseFloat(pattern_value) + 
                parseFloat(allowance) + 
                parseFloat(hard_access_value));
            // Funprev costs 14% per month
            funprev = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
            // Calculates the liquid wage
            var liquid_wage = (
                parseFloat(pattern_value) + 
                parseFloat(allowance) + 
                parseFloat(food_aid) +
                parseFloat(meal_aid) +
                parseFloat(hard_access_value) +
                parseFloat(hard_occupation_value) -
                parseFloat(funprev)).toFixed(2);
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
            // Sums the liquid wage and the ATS value
            total = parseFloat(liquid_wage) + parseFloat(ats_value);
            // Updates the total to be received to the liquid wage field
            document.getElementById("proventos").innerHTML = "R$ " + total.toFixed(2);
            document.getElementById("salario").innerHTML = "Salário: + R$ " + pattern_value.toFixed(2);
            document.getElementById("abono").innerHTML = "Abono Complementar: + R$ " + allowance;
            document.getElementById("vale").innerHTML = "Vale Alimentação: + R$ " + food_aid.toFixed(2);
            document.getElementById("auxilio").innerHTML = "Auxílio Refeição: + R$ " +meal_aid;
            document.getElementById("ats_detail").innerHTML = "Adicional por Tempo de Serviço: + R$ " + ats_value;
            document.getElementById("funprev").innerHTML = "Funprev: - R$ "+ funprev;
            break;

        case "QPE05E":
        case "QPE06D":
        case "QPE07C":
        case "QPE08B":
        case "QPE09A":
            // Sets the pattern variable
            pattern_value = 2477.39;
            // Calculates the allowance by subtracting the pattern from the minimum wage
            allowance = (minimum_wage - pattern_value).toFixed(2);
            if (allowance <= 0) {
                allowance = 0;
            }
            // Creates and calculates the salary for the funprev discount of 14%
            prev_pattern = (
                // Sums the wage, the allowance and the hard access
                parseFloat(pattern_value) + 
                parseFloat(allowance) + 
                parseFloat(hard_access_value));
            // Funprev costs 14% per month
            funprev = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
            // Calculates the liquid wage
            var liquid_wage = (
                parseFloat(pattern_value) + 
                parseFloat(allowance) + 
                parseFloat(food_aid) +
                parseFloat(meal_aid) +
                parseFloat(hard_access_value) +
                parseFloat(hard_occupation_value) -
                parseFloat(funprev)).toFixed(2);
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
            // Sums the liquid wage and the ATS value
            total = parseFloat(liquid_wage) + parseFloat(ats_value);
            // Updates the total to be received to the liquid wage field
            document.getElementById("proventos").innerHTML = "R$ " + total.toFixed(2);
            document.getElementById("salario").innerHTML = "Salário: + R$ " + pattern_value.toFixed(2);
            document.getElementById("abono").innerHTML = "Abono Complementar: + R$ " + allowance;
            document.getElementById("vale").innerHTML = "Vale Alimentação: + R$ " + food_aid.toFixed(2);
            document.getElementById("auxilio").innerHTML = "Auxílio Refeição: + R$ " +meal_aid;
            document.getElementById("ats_detail").innerHTML = "Adicional por Tempo de Serviço: + R$ " + ats_value;
            document.getElementById("funprev").innerHTML = "Funprev: - R$ "+ funprev;
            break;

        case "QPE06E":
        case "QPE07D":
        case "QPE08C":
        case "QPE09B":
        case "QPE10A":
            // Sets the pattern variable
            pattern_value = 2638.43;
            // Calculates the allowance by subtracting the pattern from the minimum wage
            allowance = (minimum_wage - pattern_value).toFixed(2);
            if (allowance <= 0) {
                allowance = 0;
            }
            // Creates and calculates the salary for the funprev discount of 14%
            prev_pattern = (
                // Sums the wage, the allowance and the hard access
                parseFloat(pattern_value) + 
                parseFloat(allowance) + 
                parseFloat(hard_access_value));
            // Funprev costs 14% per month
            funprev = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
            // Calculates the liquid wage
            var liquid_wage = (
                parseFloat(pattern_value) + 
                parseFloat(allowance) + 
                parseFloat(food_aid) +
                parseFloat(meal_aid) +
                parseFloat(hard_access_value) +
                parseFloat(hard_occupation_value) -
                parseFloat(funprev)).toFixed(2);
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
            // Sums the liquid wage and the ATS value
            total = parseFloat(liquid_wage) + parseFloat(ats_value);
            // Updates the total to be received to the liquid wage field
            document.getElementById("proventos").innerHTML = "R$ " + total.toFixed(2);
            document.getElementById("salario").innerHTML = "Salário: + R$ " + pattern_value.toFixed(2);
            document.getElementById("abono").innerHTML = "Abono Complementar: + R$ " + allowance;
            document.getElementById("vale").innerHTML = "Vale Alimentação: + R$ " + food_aid.toFixed(2);
            document.getElementById("auxilio").innerHTML = "Auxílio Refeição: + R$ " +meal_aid;
            document.getElementById("ats_detail").innerHTML = "Adicional por Tempo de Serviço: + R$ " + ats_value;
            document.getElementById("funprev").innerHTML = "Funprev: - R$ "+ funprev;
            break;

        case "QPE07E":
        case "QPE08D":
        case "QPE09C":
        case "QPE10B":    
        case "QPE11A":
            // Sets the pattern variable
            pattern_value = 2809.91;
            // Calculates the allowance by subtracting the pattern from the minimum wage
            allowance = (minimum_wage - pattern_value).toFixed(2);
            if (allowance <= 0) {
                allowance = 0;
            }
            // Creates and calculates the salary for the funprev discount of 14%
            prev_pattern = (
                // Sums the wage, the allowance and the hard access
                parseFloat(pattern_value) + 
                parseFloat(allowance) + 
                parseFloat(hard_access_value));
            // Funprev costs 14% per month
            funprev = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
            // Calculates the liquid wage
            var liquid_wage = (
                parseFloat(pattern_value) + 
                parseFloat(allowance) + 
                parseFloat(food_aid) +
                parseFloat(meal_aid) +
                parseFloat(hard_access_value) +
                parseFloat(hard_occupation_value) -
                parseFloat(funprev)).toFixed(2);
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
            // Sums the liquid wage and the ATS value
            total = parseFloat(liquid_wage) + parseFloat(ats_value);
            // Updates the total to be received to the liquid wage field
            document.getElementById("proventos").innerHTML = "R$ " + total.toFixed(2);
            document.getElementById("salario").innerHTML = "Salário: + R$ " + pattern_value.toFixed(2);
            document.getElementById("abono").innerHTML = "Abono Complementar: + R$ " + allowance;
            document.getElementById("vale").innerHTML = "Vale Alimentação: + R$ " + food_aid.toFixed(2);
            document.getElementById("auxilio").innerHTML = "Auxílio Refeição: + R$ " +meal_aid;
            document.getElementById("ats_detail").innerHTML = "Adicional por Tempo de Serviço: + R$ " + ats_value;
            document.getElementById("funprev").innerHTML = "Funprev: - R$ "+ funprev;
            break;

        case "QPE08E":
        case "QPE09D":
        case "QPE10C":
        case "QPE11B":
        case "QPE12A":
            // Sets the pattern variable
            pattern_value = 2992.56;
            // Calculates the allowance by subtracting the pattern from the minimum wage
            allowance = (minimum_wage - pattern_value).toFixed(2);
            if (allowance <= 0) {
                allowance = 0;
            }
            // Creates and calculates the salary for the funprev discount of 14%
            prev_pattern = (
                // Sums the wage, the allowance and the hard access
                parseFloat(pattern_value) + 
                parseFloat(allowance) + 
                parseFloat(hard_access_value));
            // Funprev costs 14% per month
            funprev = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
            // Calculates the liquid wage
            var liquid_wage = (
                parseFloat(pattern_value) + 
                parseFloat(allowance) + 
                parseFloat(food_aid) +
                parseFloat(meal_aid) +
                parseFloat(hard_access_value) +
                parseFloat(hard_occupation_value) -
                parseFloat(funprev)).toFixed(2);
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
            // Sums the liquid wage and the ATS value
            total = parseFloat(liquid_wage) + parseFloat(ats_value);
            // Updates the total to be received to the liquid wage field
            document.getElementById("proventos").innerHTML = "R$ " + total.toFixed(2);
            document.getElementById("salario").innerHTML = "Salário: + R$ " + pattern_value.toFixed(2);
            document.getElementById("abono").innerHTML = "Abono Complementar: + R$ " + allowance;
            document.getElementById("vale").innerHTML = "Vale Alimentação: + R$ " + food_aid.toFixed(2);
            document.getElementById("auxilio").innerHTML = "Auxílio Refeição: + R$ " +meal_aid;
            document.getElementById("ats_detail").innerHTML = "Adicional por Tempo de Serviço: + R$ " + ats_value;
            document.getElementById("funprev").innerHTML = "Funprev: - R$ "+ funprev;
            break;

        case "QPE09E":
        case "QPE10D":
        case "QPE11C":
        case "QPE12B":
        case "QPE13A":
            // Sets the pattern variable
            pattern_value = 3187.08;
            // Calculates the allowance by subtracting the pattern from the minimum wage
            allowance = (minimum_wage - pattern_value).toFixed(2);
            if (allowance <= 0) {
                allowance = 0;
            }
            // Creates and calculates the salary for the funprev discount of 14%
            prev_pattern = (
                // Sums the wage, the allowance and the hard access
                parseFloat(pattern_value) + 
                parseFloat(allowance) + 
                parseFloat(hard_access_value));
            // Funprev costs 14% per month
            funprev = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
            // Calculates the liquid wage
            var liquid_wage = (
                parseFloat(pattern_value) + 
                parseFloat(allowance) + 
                parseFloat(food_aid) +
                parseFloat(meal_aid) +
                parseFloat(hard_access_value) +
                parseFloat(hard_occupation_value) -
                parseFloat(funprev)).toFixed(2);
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
            // Sums the liquid wage and the ATS value
            total = parseFloat(liquid_wage) + parseFloat(ats_value);
            // Updates the total to be received to the liquid wage field
            document.getElementById("proventos").innerHTML = "R$ " + total.toFixed(2);
            document.getElementById("salario").innerHTML = "Salário: + R$ " + pattern_value.toFixed(2);
            document.getElementById("abono").innerHTML = "Abono Complementar: + R$ " + allowance;
            document.getElementById("vale").innerHTML = "Vale Alimentação: + R$ " + food_aid.toFixed(2);
            document.getElementById("auxilio").innerHTML = "Auxílio Refeição: + R$ " +meal_aid;
            document.getElementById("ats_detail").innerHTML = "Adicional por Tempo de Serviço: + R$ " + ats_value;
            document.getElementById("funprev").innerHTML = "Funprev: - R$ "+ funprev;
            break;

        case "QPE10E":
        case "QPE11D":
        case "QPE12C":
        case "QPE13B":
        case "QPE14A":
            // Sets the pattern variable
            pattern_value = 3394.24;
            // Calculates the allowance by subtracting the pattern from the minimum wage
            allowance = (minimum_wage - pattern_value).toFixed(2);
            if (allowance <= 0) {
                allowance = 0;
            }
            // Creates and calculates the salary for the funprev discount of 14%
            prev_pattern = (
                // Sums the wage, the allowance and the hard access
                parseFloat(pattern_value) + 
                parseFloat(allowance) + 
                parseFloat(hard_access_value));
            // Funprev costs 14% per month
            funprev = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
            // Calculates the liquid wage
            var liquid_wage = (
                parseFloat(pattern_value) + 
                parseFloat(allowance) + 
                parseFloat(food_aid) +
                parseFloat(meal_aid) +
                parseFloat(hard_access_value) +
                parseFloat(hard_occupation_value) -
                parseFloat(funprev)).toFixed(2);
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
            // Sums the liquid wage and the ATS value
            total = parseFloat(liquid_wage) + parseFloat(ats_value);
            // Updates the total to be received to the liquid wage field
            document.getElementById("proventos").innerHTML = "R$ " + total.toFixed(2);
            document.getElementById("salario").innerHTML = "Salário: + R$ " + pattern_value.toFixed(2);
            document.getElementById("abono").innerHTML = "Abono Complementar: + R$ " + allowance;
            document.getElementById("vale").innerHTML = "Vale Alimentação: + R$ " + food_aid.toFixed(2);
            document.getElementById("auxilio").innerHTML = "Auxílio Refeição: + R$ " +meal_aid;
            document.getElementById("ats_detail").innerHTML = "Adicional por Tempo de Serviço: + R$ " + ats_value;
            document.getElementById("funprev").innerHTML = "Funprev: - R$ "+ funprev;
            break;

        case "QPE11E":
        case "QPE12D":
        case "QPE13C":
        case "QPE14B":
            // Sets the pattern variable
            pattern_value = 3614.87;
            // Calculates the allowance by subtracting the pattern from the minimum wage
            allowance = (minimum_wage - pattern_value).toFixed(2);
            if (allowance <= 0) {
                allowance = 0;
            }
            // Creates and calculates the salary for the funprev discount of 14%
            prev_pattern = (
                // Sums the wage, the allowance and the hard access
                parseFloat(pattern_value) + 
                parseFloat(allowance) + 
                parseFloat(hard_access_value));
            // Funprev costs 14% per month
            funprev = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
            // Calculates the liquid wage
            var liquid_wage = (
                parseFloat(pattern_value) + 
                parseFloat(allowance) + 
                parseFloat(food_aid) +
                parseFloat(meal_aid) +
                parseFloat(hard_access_value) +
                parseFloat(hard_occupation_value) -
                parseFloat(funprev)).toFixed(2);
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
            // Sums the liquid wage and the ATS value
            total = parseFloat(liquid_wage) + parseFloat(ats_value);
            // Updates the total to be received to the liquid wage field
            document.getElementById("proventos").innerHTML = "R$ " + total.toFixed(2);
            document.getElementById("salario").innerHTML = "Salário: + R$ " + pattern_value.toFixed(2);
            document.getElementById("abono").innerHTML = "Abono Complementar: + R$ " + allowance;
            document.getElementById("vale").innerHTML = "Vale Alimentação: + R$ " + food_aid.toFixed(2);
            document.getElementById("auxilio").innerHTML = "Auxílio Refeição: + R$ " +meal_aid;
            document.getElementById("ats_detail").innerHTML = "Adicional por Tempo de Serviço: + R$ " + ats_value;
            document.getElementById("funprev").innerHTML = "Funprev: - R$ "+ funprev;
            break;

        case "QPE12E":
        case "QPE13D":
        case "QPE14C":
            // Sets the pattern variable
            pattern_value = 3849.84;
            // Calculates the allowance by subtracting the pattern from the minimum wage
            allowance = (minimum_wage - pattern_value).toFixed(2);
            if (allowance <= 0) {
                allowance = 0;
            }
            // Creates and calculates the salary for the funprev discount of 14%
            prev_pattern = (
                // Sums the wage, the allowance and the hard access
                parseFloat(pattern_value) + 
                parseFloat(allowance) + 
                parseFloat(hard_access_value));
            // Funprev costs 14% per month
            funprev = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
            // Calculates the liquid wage
            var liquid_wage = (
                parseFloat(pattern_value) + 
                parseFloat(allowance) + 
                parseFloat(food_aid) +
                parseFloat(meal_aid) +
                parseFloat(hard_access_value) +
                parseFloat(hard_occupation_value) -
                parseFloat(funprev)).toFixed(2);
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
            // Sums the liquid wage and the ATS value
            total = parseFloat(liquid_wage) + parseFloat(ats_value);
            // Updates the total to be received to the liquid wage field
            document.getElementById("proventos").innerHTML = "R$ " + total.toFixed(2);
            document.getElementById("salario").innerHTML = "Salário: + R$ " + pattern_value.toFixed(2);
            document.getElementById("abono").innerHTML = "Abono Complementar: + R$ " + allowance;
            document.getElementById("vale").innerHTML = "Vale Alimentação: + R$ " + food_aid.toFixed(2);
            document.getElementById("auxilio").innerHTML = "Auxílio Refeição: + R$ " +meal_aid;
            document.getElementById("ats_detail").innerHTML = "Adicional por Tempo de Serviço: + R$ " + ats_value;
            document.getElementById("funprev").innerHTML = "Funprev: - R$ "+ funprev;
            break;

        case "QPE13E":
        case "QPE14D":
            // Sets the pattern variable
            pattern_value = 4100.08;
            // Calculates the allowance by subtracting the pattern from the minimum wage
            allowance = (minimum_wage - pattern_value).toFixed(2);
            if (allowance <= 0) {
                allowance = 0;
            }
            // Creates and calculates the salary for the funprev discount of 14%
            prev_pattern = (
                // Sums the wage, the allowance and the hard access
                parseFloat(pattern_value) + 
                parseFloat(allowance) + 
                parseFloat(hard_access_value));
            // Funprev costs 14% per month
            funprev = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
            // Calculates the liquid wage
            var liquid_wage = (
                parseFloat(pattern_value) + 
                parseFloat(allowance) + 
                parseFloat(food_aid) +
                parseFloat(meal_aid) +
                parseFloat(hard_access_value) +
                parseFloat(hard_occupation_value) -
                parseFloat(funprev)).toFixed(2);
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
            // Sums the liquid wage and the ATS value
            total = parseFloat(liquid_wage) + parseFloat(ats_value);
            // Updates the total to be received to the liquid wage field
            document.getElementById("proventos").innerHTML = "R$ " + total.toFixed(2);
            document.getElementById("salario").innerHTML = "Salário: + R$ " + pattern_value.toFixed(2);
            document.getElementById("abono").innerHTML = "Abono Complementar: + R$ " + allowance;
            document.getElementById("vale").innerHTML = "Vale Alimentação: + R$ " + food_aid.toFixed(2);
            document.getElementById("auxilio").innerHTML = "Auxílio Refeição: + R$ " +meal_aid;
            document.getElementById("ats_detail").innerHTML = "Adicional por Tempo de Serviço: + R$ " + ats_value;
            document.getElementById("funprev").innerHTML = "Funprev: - R$ "+ funprev;
            break;
        
        // This is the last reference in the ATE career as of now
        case "QPE14E":
            // Sets the pattern variable
            pattern_value = 4366.58;
            // Calculates the allowance by subtracting the pattern from the minimum wage
            allowance = (minimum_wage - pattern_value).toFixed(2);
            if (allowance <= 0) {
                allowance = 0;
            }
            // Creates and calculates the salary for the funprev discount of 14%
            prev_pattern = (
                // Sums the wage, the allowance and the hard access
                parseFloat(pattern_value) + 
                parseFloat(allowance) + 
                parseFloat(hard_access_value));
            // Funprev costs 14% per month
            funprev = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
            // Calculates the liquid wage
            var liquid_wage = (
                parseFloat(pattern_value) + 
                parseFloat(allowance) + 
                parseFloat(food_aid) +
                parseFloat(meal_aid) +
                parseFloat(hard_access_value) +
                parseFloat(hard_occupation_value) -
                parseFloat(funprev)).toFixed(2);
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
            // Sums the liquid wage and the ATS value
            total = parseFloat(liquid_wage) + parseFloat(ats_value);
            // Updates the total to be received to the liquid wage field
            document.getElementById("proventos").innerHTML = "R$ " + total.toFixed(2);
            document.getElementById("salario").innerHTML = "Salário: + R$ " + pattern_value.toFixed(2);
            document.getElementById("abono").innerHTML = "Abono Complementar: + R$ " + allowance;
            document.getElementById("vale").innerHTML = "Vale Alimentação: + R$ " + food_aid.toFixed(2);
            document.getElementById("auxilio").innerHTML = "Auxílio Refeição: + R$ " +meal_aid;
            document.getElementById("ats_detail").innerHTML = "Adicional por Tempo de Serviço: + R$ " + ats_value;
            document.getElementById("funprev").innerHTML = "Funprev: - R$ "+ funprev;
            break;
    }
}
