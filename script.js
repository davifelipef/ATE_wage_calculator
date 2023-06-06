// Activates the change between the options D.A. and D.L.
window.onload = function() {
    updateSelects();
};

// Call the function to reset all the options when the page is reloaded
window.addEventListener("load", resetSelectedOption);

// Declares the da_prev as a global variable
var da_prev = false;

// Function that resets the all the selected options on page reload
function resetSelectedOption() {
    var select_ref = document.getElementById("referencias");
    var select_grau = document.getElementById("graus");
    var select_ats = document.getElementById("ats");
    var select_days = document.getElementById("dias");
    var select_access = document.getElementById("dificil_acesso");
    var select_occup = document.getElementById("dificil_lotacao");
    var select_prev = document.getElementById("desconto_prev");
    // Index 2 corresponds to the default option, QPE03A
    select_ref.selectedIndex = 2;
    select_grau.selectedIndex = 0;
    select_ats.selectedIndex = 0;
    select_days.selectedIndex = 5;
    select_access.selectedIndex = 0;
    select_occup.selectedIndex = 0;
    select_prev.selectedIndex = 0;
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
    // Gets the social security discount value
    const prev_type = document.getElementById("desconto_prev").value;
    // Gets the pattern value by the sum of the reference and the grade
    const pattern = ref_value + grad_value;
    /* Calls the function that sums the values, and pass the pattern and
    the ATS Values to it */
    sumValues(pattern, ats_number, days_number, prev_type);
}

function updateButton() {
    /* Determines if the hard access will contribute to the social security discount or not
    and lights the button when selected*/
    var button = document.getElementById("button");
    if (!button.classList.contains("colored")) {
      button.classList.remove("disabled");
      button.classList.add("colored");
      da_prev = true;
      screenUpdate();
    } else {
        button.classList.remove("colored");
        button.classList.add("disabled");
        da_prev = false;
        screenUpdate();
    }
}

function updateSelects() {
    var dif_acesso_select = document.getElementById("dificil_acesso");
    var dif_lotacao_select = document.getElementById("dificil_lotacao");

    dif_acesso_select.addEventListener("change", function() {
      if (dif_acesso_select.value !== "") {
        dif_lotacao_select.value = ""; // Reset 'dificil_lotacao' value
      }
      screenUpdate();
    });
  
    dif_lotacao_select.addEventListener("change", function() {
      if (dif_lotacao_select.value !== "") {
        dif_acesso_select.value = ""; // Reset 'dificil_acesso' value 
        document.getElementById("button").classList.add("disabled");
        da_prev = false;
      }
      screenUpdate();
    });
} 

// Function that sums all the values to get the final salary
function sumValues(pattern, ats_number, days_number, prev_type) {
    // Declaration of the variables that will be used in the calculation
    let ats_value = 0;
    let social_sec_disc = 0;
    let pattern_value = 0;
    let hard_access_value = 0;
    let hard_occupation_value = 0;
    // Food aid value is a fixed value
    const food_aid = 600;
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

    // Main calculation
    // First checks what is the pattern informed
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
            if (da_prev==true) {
                switch(prev_type) {
                    case "":
                        document.getElementById("funx").innerHTML = "Desconto Previdenciário (selecione): - R$ 0.00";
                        break;
                    case "Funfin":
                        // Creates and calculates the salary for the funprev discount of 14%
                        prev_pattern = (
                            // Sums the wage, the allowance, the hard access and the ats values
                            parseFloat(pattern_value) + 
                            parseFloat(allowance) +
                            parseFloat(hard_access_value) +
                            parseFloat(ats_value));
                        // Social security discount costs 14% per month
                        social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                        document.getElementById("funx").innerHTML = "Desconto Funfin: - R$ "+ 
                        social_sec_disc;
                        break;
                    case "Funprev":
                        // Creates and calculates the salary for the funprev discount of 14%
                        prev_pattern = (
                            // Sums the wage, the allowance, the hard access and the ats values
                            parseFloat(pattern_value) + 
                            parseFloat(allowance) + 
                            parseFloat(hard_access_value) +
                            parseFloat(ats_value));
                        // Social security discount costs 14% per month
                        social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                        document.getElementById("funx").innerHTML = "Desconto Funprev: - R$ "+ 
                        social_sec_disc;
                        break;
                        }
            } else {
                switch(prev_type) {
                    case "":
                        document.getElementById("funx").innerHTML = "Desconto Previdenciário (selecione): - R$ 0.00";
                        break;
                    case "Funfin":
                        // Creates and calculates the salary for the funprev discount of 14%
                        prev_pattern = (
                            // Sums the wage, the allowance, the hard access and the ats values
                            parseFloat(pattern_value) + 
                            parseFloat(allowance) +
                            parseFloat(ats_value));
                        // Social security discount costs 14% per month
                        social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                        document.getElementById("funx").innerHTML = "Desconto Funfin: - R$ "+ 
                        social_sec_disc;
                        break;
                    case "Funprev":
                        // Creates and calculates the salary for the funprev discount of 14%
                        prev_pattern = (
                            // Sums the wage, the allowance, the hard access and the ats values
                            parseFloat(pattern_value) + 
                            parseFloat(allowance) + 
                            parseFloat(ats_value));
                        // Social security discount costs 14% per month
                        social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                        document.getElementById("funx").innerHTML = "Desconto Funprev: - R$ "+ 
                        social_sec_disc;
                        break;
                        }
            }
            
            // Calculates the liquid wage
            var liquid_wage = (
                parseFloat(pattern_value) + 
                parseFloat(allowance) + 
                parseFloat(food_aid) +
                parseFloat(meal_aid) +
                parseFloat(hard_access_value) +
                parseFloat(hard_occupation_value) +
                parseFloat(ats_value) - 
                parseFloat(social_sec_disc)).toFixed(2);

            // Updates all the fields not yet updated with the results
            document.getElementById("proventos").innerHTML = "R$ " + liquid_wage;
            document.getElementById("salario").innerHTML = "Salário: + R$ " + pattern_value.toFixed(2);
            document.getElementById("abono").innerHTML = "Abono Complementar: + R$ " + allowance;
            document.getElementById("vale").innerHTML = "Vale Alimentação: + R$ " + food_aid.toFixed(2);
            document.getElementById("auxilio").innerHTML = "Auxílio Refeição: + R$ " + meal_aid;
            document.getElementById("ats_detail").innerHTML = "Adicional por Tempo de Serviço: + R$ " + ats_value;
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
            if (da_prev==true) {
                switch(prev_type) {
                    case "":
                        document.getElementById("funx").innerHTML = "Desconto Previdenciário (selecione): - R$ 0.00";
                        break;
                    case "Funfin":
                        // Creates and calculates the salary for the funprev discount of 14%
                        prev_pattern = (
                            // Sums the wage, the allowance, the hard access and the ats values
                            parseFloat(pattern_value) + 
                            parseFloat(allowance) +
                            parseFloat(hard_access_value) +
                            parseFloat(ats_value));
                        // Social security discount costs 14% per month
                        social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                        document.getElementById("funx").innerHTML = "Desconto Funfin: - R$ "+ 
                        social_sec_disc;
                        break;
                    case "Funprev":
                        // Creates and calculates the salary for the funprev discount of 14%
                        prev_pattern = (
                            // Sums the wage, the allowance, the hard access and the ats values
                            parseFloat(pattern_value) + 
                            parseFloat(allowance) + 
                            parseFloat(hard_access_value) +
                            parseFloat(ats_value));
                        // Social security discount costs 14% per month
                        social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                        document.getElementById("funx").innerHTML = "Desconto Funprev: - R$ "+ 
                        social_sec_disc;
                        break;
                        }
            } else {
                switch(prev_type) {
                    case "":
                        document.getElementById("funx").innerHTML = "Desconto Previdenciário (selecione): - R$ 0.00";
                        break;
                    case "Funfin":
                        // Creates and calculates the salary for the funprev discount of 14%
                        prev_pattern = (
                            // Sums the wage, the allowance, the hard access and the ats values
                            parseFloat(pattern_value) + 
                            parseFloat(allowance) +
                            parseFloat(ats_value));
                        // Social security discount costs 14% per month
                        social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                        document.getElementById("funx").innerHTML = "Desconto Funfin: - R$ "+ 
                        social_sec_disc;
                        break;
                    case "Funprev":
                        // Creates and calculates the salary for the funprev discount of 14%
                        prev_pattern = (
                            // Sums the wage, the allowance, the hard access and the ats values
                            parseFloat(pattern_value) + 
                            parseFloat(allowance) + 
                            parseFloat(ats_value));
                        // Social security discount costs 14% per month
                        social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                        document.getElementById("funx").innerHTML = "Desconto Funprev: - R$ "+ 
                        social_sec_disc;
                        break;
                        }
            }
            
            // Calculates the liquid wage
            var liquid_wage = (
                parseFloat(pattern_value) + 
                parseFloat(allowance) + 
                parseFloat(food_aid) +
                parseFloat(meal_aid) +
                parseFloat(hard_access_value) +
                parseFloat(hard_occupation_value) +
                parseFloat(ats_value) - 
                parseFloat(social_sec_disc)).toFixed(2);

            // Updates all the fields not yet updated with the results
            document.getElementById("proventos").innerHTML = "R$ " + liquid_wage;
            document.getElementById("salario").innerHTML = "Salário: + R$ " + pattern_value.toFixed(2);
            document.getElementById("abono").innerHTML = "Abono Complementar: + R$ " + allowance;
            document.getElementById("vale").innerHTML = "Vale Alimentação: + R$ " + food_aid.toFixed(2);
            document.getElementById("auxilio").innerHTML = "Auxílio Refeição: + R$ " + meal_aid;
            document.getElementById("ats_detail").innerHTML = "Adicional por Tempo de Serviço: + R$ " + ats_value;
            break;
        
        // QPE03A is the starting value of the ATE career
        case "QPE01C":
        case "QPE02B":
        case "QPE03A":

            // Sets the pattern variable
            pattern_value = 1697.87;

            // Calculates the allowance by subtracting the pattern from the minimum wage
            allowance = (minimum_wage - pattern_value).toFixed(2);
            if (allowance <= 0) {
                allowance = 0;
            }

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
            if (da_prev==true) {
                switch(prev_type) {
                    case "":
                        document.getElementById("funx").innerHTML = "Desconto Previdenciário (selecione): - R$ 0.00";
                        break;
                    case "Funfin":
                        // Creates and calculates the salary for the funprev discount of 14%
                        prev_pattern = (
                            // Sums the wage, the allowance, the hard access and the ats values
                            parseFloat(pattern_value) + 
                            parseFloat(allowance) +
                            parseFloat(hard_access_value) +
                            parseFloat(ats_value));
                        // Social security discount costs 14% per month
                        social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                        document.getElementById("funx").innerHTML = "Desconto Funfin: - R$ "+ 
                        social_sec_disc;
                        break;
                    case "Funprev":
                        // Creates and calculates the salary for the funprev discount of 14%
                        prev_pattern = (
                            // Sums the wage, the allowance, the hard access and the ats values
                            parseFloat(pattern_value) + 
                            parseFloat(allowance) + 
                            parseFloat(hard_access_value) +
                            parseFloat(ats_value));
                        // Social security discount costs 14% per month
                        social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                        document.getElementById("funx").innerHTML = "Desconto Funprev: - R$ "+ 
                        social_sec_disc;
                        break;
                        }
            } else {
                switch(prev_type) {
                    case "":
                        document.getElementById("funx").innerHTML = "Desconto Previdenciário (selecione): - R$ 0.00";
                        break;
                    case "Funfin":
                        // Creates and calculates the salary for the funprev discount of 14%
                        prev_pattern = (
                            // Sums the wage, the allowance, the hard access and the ats values
                            parseFloat(pattern_value) + 
                            parseFloat(allowance) +
                            parseFloat(ats_value));
                        // Social security discount costs 14% per month
                        social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                        document.getElementById("funx").innerHTML = "Desconto Funfin: - R$ "+ 
                        social_sec_disc;
                        break;
                    case "Funprev":
                        // Creates and calculates the salary for the funprev discount of 14%
                        prev_pattern = (
                            // Sums the wage, the allowance, the hard access and the ats values
                            parseFloat(pattern_value) + 
                            parseFloat(allowance) + 
                            parseFloat(ats_value));
                        // Social security discount costs 14% per month
                        social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                        document.getElementById("funx").innerHTML = "Desconto Funprev: - R$ "+ 
                        social_sec_disc;
                        break;
                        }
            }
            
            // Calculates the liquid wage
            var liquid_wage = (
                parseFloat(pattern_value) + 
                parseFloat(allowance) + 
                parseFloat(food_aid) +
                parseFloat(meal_aid) +
                parseFloat(hard_access_value) +
                parseFloat(hard_occupation_value) +
                parseFloat(ats_value) - 
                parseFloat(social_sec_disc)).toFixed(2);

            // Updates all the fields not yet updated with the results
            document.getElementById("proventos").innerHTML = "R$ " + liquid_wage;
            document.getElementById("salario").innerHTML = "Salário: + R$ " + pattern_value.toFixed(2);
            document.getElementById("abono").innerHTML = "Abono Complementar: + R$ " + allowance;
            document.getElementById("vale").innerHTML = "Vale Alimentação: + R$ " + food_aid.toFixed(2);
            document.getElementById("auxilio").innerHTML = "Auxílio Refeição: + R$ " + meal_aid;
            document.getElementById("ats_detail").innerHTML = "Adicional por Tempo de Serviço: + R$ " + ats_value;
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
            if (da_prev==true) {
                switch(prev_type) {
                    case "":
                        document.getElementById("funx").innerHTML = "Desconto Previdenciário (selecione): - R$ 0.00";
                        break;
                    case "Funfin":
                        // Creates and calculates the salary for the funprev discount of 14%
                        prev_pattern = (
                            // Sums the wage, the allowance, the hard access and the ats values
                            parseFloat(pattern_value) + 
                            parseFloat(allowance) +
                            parseFloat(hard_access_value) +
                            parseFloat(ats_value));
                        // Social security discount costs 14% per month
                        social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                        document.getElementById("funx").innerHTML = "Desconto Funfin: - R$ "+ 
                        social_sec_disc;
                        break;
                    case "Funprev":
                        // Creates and calculates the salary for the funprev discount of 14%
                        prev_pattern = (
                            // Sums the wage, the allowance, the hard access and the ats values
                            parseFloat(pattern_value) + 
                            parseFloat(allowance) + 
                            parseFloat(hard_access_value) +
                            parseFloat(ats_value));
                        // Social security discount costs 14% per month
                        social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                        document.getElementById("funx").innerHTML = "Desconto Funprev: - R$ "+ 
                        social_sec_disc;
                        break;
                        }
            } else {
                switch(prev_type) {
                    case "":
                        document.getElementById("funx").innerHTML = "Desconto Previdenciário (selecione): - R$ 0.00";
                        break;
                    case "Funfin":
                        // Creates and calculates the salary for the funprev discount of 14%
                        prev_pattern = (
                            // Sums the wage, the allowance, the hard access and the ats values
                            parseFloat(pattern_value) + 
                            parseFloat(allowance) +
                            parseFloat(ats_value));
                        // Social security discount costs 14% per month
                        social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                        document.getElementById("funx").innerHTML = "Desconto Funfin: - R$ "+ 
                        social_sec_disc;
                        break;
                    case "Funprev":
                        // Creates and calculates the salary for the funprev discount of 14%
                        prev_pattern = (
                            // Sums the wage, the allowance, the hard access and the ats values
                            parseFloat(pattern_value) + 
                            parseFloat(allowance) + 
                            parseFloat(ats_value));
                        // Social security discount costs 14% per month
                        social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                        document.getElementById("funx").innerHTML = "Desconto Funprev: - R$ "+ 
                        social_sec_disc;
                        break;
                        }
            }
            
            // Calculates the liquid wage
            var liquid_wage = (
                parseFloat(pattern_value) + 
                parseFloat(allowance) + 
                parseFloat(food_aid) +
                parseFloat(meal_aid) +
                parseFloat(hard_access_value) +
                parseFloat(hard_occupation_value) +
                parseFloat(ats_value) - 
                parseFloat(social_sec_disc)).toFixed(2);

            // Updates all the fields not yet updated with the results
            document.getElementById("proventos").innerHTML = "R$ " + liquid_wage;
            document.getElementById("salario").innerHTML = "Salário: + R$ " + pattern_value.toFixed(2);
            document.getElementById("abono").innerHTML = "Abono Complementar: + R$ " + allowance;
            document.getElementById("vale").innerHTML = "Vale Alimentação: + R$ " + food_aid.toFixed(2);
            document.getElementById("auxilio").innerHTML = "Auxílio Refeição: + R$ " + meal_aid;
            document.getElementById("ats_detail").innerHTML = "Adicional por Tempo de Serviço: + R$ " + ats_value;
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
            if (da_prev==true) {
                switch(prev_type) {
                    case "":
                        document.getElementById("funx").innerHTML = "Desconto Previdenciário (selecione): - R$ 0.00";
                        break;
                    case "Funfin":
                        // Creates and calculates the salary for the funprev discount of 14%
                        prev_pattern = (
                            // Sums the wage, the allowance, the hard access and the ats values
                            parseFloat(pattern_value) + 
                            parseFloat(allowance) +
                            parseFloat(hard_access_value) +
                            parseFloat(ats_value));
                        // Social security discount costs 14% per month
                        social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                        document.getElementById("funx").innerHTML = "Desconto Funfin: - R$ "+ 
                        social_sec_disc;
                        break;
                    case "Funprev":
                        // Creates and calculates the salary for the funprev discount of 14%
                        prev_pattern = (
                            // Sums the wage, the allowance, the hard access and the ats values
                            parseFloat(pattern_value) + 
                            parseFloat(allowance) + 
                            parseFloat(hard_access_value) +
                            parseFloat(ats_value));
                        // Social security discount costs 14% per month
                        social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                        document.getElementById("funx").innerHTML = "Desconto Funprev: - R$ "+ 
                        social_sec_disc;
                        break;
                        }
            } else {
                switch(prev_type) {
                    case "":
                        document.getElementById("funx").innerHTML = "Desconto Previdenciário (selecione): - R$ 0.00";
                        break;
                    case "Funfin":
                        // Creates and calculates the salary for the funprev discount of 14%
                        prev_pattern = (
                            // Sums the wage, the allowance, the hard access and the ats values
                            parseFloat(pattern_value) + 
                            parseFloat(allowance) +
                            parseFloat(ats_value));
                        // Social security discount costs 14% per month
                        social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                        document.getElementById("funx").innerHTML = "Desconto Funfin: - R$ "+ 
                        social_sec_disc;
                        break;
                    case "Funprev":
                        // Creates and calculates the salary for the funprev discount of 14%
                        prev_pattern = (
                            // Sums the wage, the allowance, the hard access and the ats values
                            parseFloat(pattern_value) + 
                            parseFloat(allowance) + 
                            parseFloat(ats_value));
                        // Social security discount costs 14% per month
                        social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                        document.getElementById("funx").innerHTML = "Desconto Funprev: - R$ "+ 
                        social_sec_disc;
                        break;
                        }
            }
            
            // Calculates the liquid wage
            var liquid_wage = (
                parseFloat(pattern_value) + 
                parseFloat(allowance) + 
                parseFloat(food_aid) +
                parseFloat(meal_aid) +
                parseFloat(hard_access_value) +
                parseFloat(hard_occupation_value) +
                parseFloat(ats_value) - 
                parseFloat(social_sec_disc)).toFixed(2);

            // Updates all the fields not yet updated with the results
            document.getElementById("proventos").innerHTML = "R$ " + liquid_wage;
            document.getElementById("salario").innerHTML = "Salário: + R$ " + pattern_value.toFixed(2);
            document.getElementById("abono").innerHTML = "Abono Complementar: + R$ " + allowance;
            document.getElementById("vale").innerHTML = "Vale Alimentação: + R$ " + food_aid.toFixed(2);
            document.getElementById("auxilio").innerHTML = "Auxílio Refeição: + R$ " + meal_aid;
            document.getElementById("ats_detail").innerHTML = "Adicional por Tempo de Serviço: + R$ " + ats_value;
            break;

        case "QPE02E":
        case "QPE03D":
        case "QPE04C":
        case "QPE05B":
        case "QPE06A":
            // Sets the pattern variable
            pattern_value = 2050.99;
            // Calculates the allowance by subtracting the pattern from the minimum wage
            allowance = (minimum_wage - pattern_value).toFixed(2);
            if (allowance <= 0) {
                allowance = 0;
            }

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
            if (da_prev==true) {
                switch(prev_type) {
                    case "":
                        document.getElementById("funx").innerHTML = "Desconto Previdenciário (selecione): - R$ 0.00";
                        break;
                    case "Funfin":
                        // Creates and calculates the salary for the funprev discount of 14%
                        prev_pattern = (
                            // Sums the wage, the allowance, the hard access and the ats values
                            parseFloat(pattern_value) + 
                            parseFloat(allowance) +
                            parseFloat(hard_access_value) +
                            parseFloat(ats_value));
                        // Social security discount costs 14% per month
                        social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                        document.getElementById("funx").innerHTML = "Desconto Funfin: - R$ "+ 
                        social_sec_disc;
                        break;
                    case "Funprev":
                        // Creates and calculates the salary for the funprev discount of 14%
                        prev_pattern = (
                            // Sums the wage, the allowance, the hard access and the ats values
                            parseFloat(pattern_value) + 
                            parseFloat(allowance) + 
                            parseFloat(hard_access_value) +
                            parseFloat(ats_value));
                        // Social security discount costs 14% per month
                        social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                        document.getElementById("funx").innerHTML = "Desconto Funprev: - R$ "+ 
                        social_sec_disc;
                        break;
                        }
            } else {
                switch(prev_type) {
                    case "":
                        document.getElementById("funx").innerHTML = "Desconto Previdenciário (selecione): - R$ 0.00";
                        break;
                    case "Funfin":
                        // Creates and calculates the salary for the funprev discount of 14%
                        prev_pattern = (
                            // Sums the wage, the allowance, the hard access and the ats values
                            parseFloat(pattern_value) + 
                            parseFloat(allowance) +
                            parseFloat(ats_value));
                        // Social security discount costs 14% per month
                        social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                        document.getElementById("funx").innerHTML = "Desconto Funfin: - R$ "+ 
                        social_sec_disc;
                        break;
                    case "Funprev":
                        // Creates and calculates the salary for the funprev discount of 14%
                        prev_pattern = (
                            // Sums the wage, the allowance, the hard access and the ats values
                            parseFloat(pattern_value) + 
                            parseFloat(allowance) + 
                            parseFloat(ats_value));
                        // Social security discount costs 14% per month
                        social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                        document.getElementById("funx").innerHTML = "Desconto Funprev: - R$ "+ 
                        social_sec_disc;
                        break;
                        }
            }
            
            // Calculates the liquid wage
            var liquid_wage = (
                parseFloat(pattern_value) + 
                parseFloat(allowance) + 
                parseFloat(food_aid) +
                parseFloat(meal_aid) +
                parseFloat(hard_access_value) +
                parseFloat(hard_occupation_value) +
                parseFloat(ats_value) - 
                parseFloat(social_sec_disc)).toFixed(2);

            // Updates all the fields not yet updated with the results
            document.getElementById("proventos").innerHTML = "R$ " + liquid_wage;
            document.getElementById("salario").innerHTML = "Salário: + R$ " + pattern_value.toFixed(2);
            document.getElementById("abono").innerHTML = "Abono Complementar: + R$ " + allowance;
            document.getElementById("vale").innerHTML = "Vale Alimentação: + R$ " + food_aid.toFixed(2);
            document.getElementById("auxilio").innerHTML = "Auxílio Refeição: + R$ " + meal_aid;
            document.getElementById("ats_detail").innerHTML = "Adicional por Tempo de Serviço: + R$ " + ats_value;
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
            if (da_prev==true) {
                switch(prev_type) {
                    case "":
                        document.getElementById("funx").innerHTML = "Desconto Previdenciário (selecione): - R$ 0.00";
                        break;
                    case "Funfin":
                        // Creates and calculates the salary for the funprev discount of 14%
                        prev_pattern = (
                            // Sums the wage, the allowance, the hard access and the ats values
                            parseFloat(pattern_value) + 
                            parseFloat(allowance) +
                            parseFloat(hard_access_value) +
                            parseFloat(ats_value));
                        // Social security discount costs 14% per month
                        social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                        document.getElementById("funx").innerHTML = "Desconto Funfin: - R$ "+ 
                        social_sec_disc;
                        break;
                    case "Funprev":
                        // Creates and calculates the salary for the funprev discount of 14%
                        prev_pattern = (
                            // Sums the wage, the allowance, the hard access and the ats values
                            parseFloat(pattern_value) + 
                            parseFloat(allowance) + 
                            parseFloat(hard_access_value) +
                            parseFloat(ats_value));
                        // Social security discount costs 14% per month
                        social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                        document.getElementById("funx").innerHTML = "Desconto Funprev: - R$ "+ 
                        social_sec_disc;
                        break;
                        }
            } else {
                switch(prev_type) {
                    case "":
                        document.getElementById("funx").innerHTML = "Desconto Previdenciário (selecione): - R$ 0.00";
                        break;
                    case "Funfin":
                        // Creates and calculates the salary for the funprev discount of 14%
                        prev_pattern = (
                            // Sums the wage, the allowance, the hard access and the ats values
                            parseFloat(pattern_value) + 
                            parseFloat(allowance) +
                            parseFloat(ats_value));
                        // Social security discount costs 14% per month
                        social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                        document.getElementById("funx").innerHTML = "Desconto Funfin: - R$ "+ 
                        social_sec_disc;
                        break;
                    case "Funprev":
                        // Creates and calculates the salary for the funprev discount of 14%
                        prev_pattern = (
                            // Sums the wage, the allowance, the hard access and the ats values
                            parseFloat(pattern_value) + 
                            parseFloat(allowance) + 
                            parseFloat(ats_value));
                        // Social security discount costs 14% per month
                        social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                        document.getElementById("funx").innerHTML = "Desconto Funprev: - R$ "+ 
                        social_sec_disc;
                        break;
                        }
            }
            
            // Calculates the liquid wage
            var liquid_wage = (
                parseFloat(pattern_value) + 
                parseFloat(allowance) + 
                parseFloat(food_aid) +
                parseFloat(meal_aid) +
                parseFloat(hard_access_value) +
                parseFloat(hard_occupation_value) +
                parseFloat(ats_value) - 
                parseFloat(social_sec_disc)).toFixed(2);

            // Updates all the fields not yet updated with the results
            document.getElementById("proventos").innerHTML = "R$ " + liquid_wage;
            document.getElementById("salario").innerHTML = "Salário: + R$ " + pattern_value.toFixed(2);
            document.getElementById("abono").innerHTML = "Abono Complementar: + R$ " + allowance;
            document.getElementById("vale").innerHTML = "Vale Alimentação: + R$ " + food_aid.toFixed(2);
            document.getElementById("auxilio").innerHTML = "Auxílio Refeição: + R$ " + meal_aid;
            document.getElementById("ats_detail").innerHTML = "Adicional por Tempo de Serviço: + R$ " + ats_value;
            break;

        case "QPE04E":
        case "QPE05D":
        case "QPE06C":
        case "QPE07B":
        case "QPE08A":
            // Sets the pattern variable
            pattern_value = 2326.21;
            // Calculates the allowance by subtracting the pattern from the minimum wage
            allowance = (minimum_wage - pattern_value).toFixed(2);
            if (allowance <= 0) {
                allowance = 0;
            }

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
            if (da_prev==true) {
                switch(prev_type) {
                    case "":
                        document.getElementById("funx").innerHTML = "Desconto Previdenciário (selecione): - R$ 0.00";
                        break;
                    case "Funfin":
                        // Creates and calculates the salary for the funprev discount of 14%
                        prev_pattern = (
                            // Sums the wage, the allowance, the hard access and the ats values
                            parseFloat(pattern_value) + 
                            parseFloat(allowance) +
                            parseFloat(hard_access_value) +
                            parseFloat(ats_value));
                        // Social security discount costs 14% per month
                        social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                        document.getElementById("funx").innerHTML = "Desconto Funfin: - R$ "+ 
                        social_sec_disc;
                        break;
                    case "Funprev":
                        // Creates and calculates the salary for the funprev discount of 14%
                        prev_pattern = (
                            // Sums the wage, the allowance, the hard access and the ats values
                            parseFloat(pattern_value) + 
                            parseFloat(allowance) + 
                            parseFloat(hard_access_value) +
                            parseFloat(ats_value));
                        // Social security discount costs 14% per month
                        social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                        document.getElementById("funx").innerHTML = "Desconto Funprev: - R$ "+ 
                        social_sec_disc;
                        break;
                        }
            } else {
                switch(prev_type) {
                    case "":
                        document.getElementById("funx").innerHTML = "Desconto Previdenciário (selecione): - R$ 0.00";
                        break;
                    case "Funfin":
                        // Creates and calculates the salary for the funprev discount of 14%
                        prev_pattern = (
                            // Sums the wage, the allowance, the hard access and the ats values
                            parseFloat(pattern_value) + 
                            parseFloat(allowance) +
                            parseFloat(ats_value));
                        // Social security discount costs 14% per month
                        social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                        document.getElementById("funx").innerHTML = "Desconto Funfin: - R$ "+ 
                        social_sec_disc;
                        break;
                    case "Funprev":
                        // Creates and calculates the salary for the funprev discount of 14%
                        prev_pattern = (
                            // Sums the wage, the allowance, the hard access and the ats values
                            parseFloat(pattern_value) + 
                            parseFloat(allowance) + 
                            parseFloat(ats_value));
                        // Social security discount costs 14% per month
                        social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                        document.getElementById("funx").innerHTML = "Desconto Funprev: - R$ "+ 
                        social_sec_disc;
                        break;
                        }
            }
            
            // Calculates the liquid wage
            var liquid_wage = (
                parseFloat(pattern_value) + 
                parseFloat(allowance) + 
                parseFloat(food_aid) +
                parseFloat(meal_aid) +
                parseFloat(hard_access_value) +
                parseFloat(hard_occupation_value) +
                parseFloat(ats_value) - 
                parseFloat(social_sec_disc)).toFixed(2);

            // Updates all the fields not yet updated with the results
            document.getElementById("proventos").innerHTML = "R$ " + liquid_wage;
            document.getElementById("salario").innerHTML = "Salário: + R$ " + pattern_value.toFixed(2);
            document.getElementById("abono").innerHTML = "Abono Complementar: + R$ " + allowance;
            document.getElementById("vale").innerHTML = "Vale Alimentação: + R$ " + food_aid.toFixed(2);
            document.getElementById("auxilio").innerHTML = "Auxílio Refeição: + R$ " + meal_aid;
            document.getElementById("ats_detail").innerHTML = "Adicional por Tempo de Serviço: + R$ " + ats_value;
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
            if (da_prev==true) {
                switch(prev_type) {
                    case "":
                        document.getElementById("funx").innerHTML = "Desconto Previdenciário (selecione): - R$ 0.00";
                        break;
                    case "Funfin":
                        // Creates and calculates the salary for the funprev discount of 14%
                        prev_pattern = (
                            // Sums the wage, the allowance, the hard access and the ats values
                            parseFloat(pattern_value) + 
                            parseFloat(allowance) +
                            parseFloat(hard_access_value) +
                            parseFloat(ats_value));
                        // Social security discount costs 14% per month
                        social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                        document.getElementById("funx").innerHTML = "Desconto Funfin: - R$ "+ 
                        social_sec_disc;
                        break;
                    case "Funprev":
                        // Creates and calculates the salary for the funprev discount of 14%
                        prev_pattern = (
                            // Sums the wage, the allowance, the hard access and the ats values
                            parseFloat(pattern_value) + 
                            parseFloat(allowance) + 
                            parseFloat(hard_access_value) +
                            parseFloat(ats_value));
                        // Social security discount costs 14% per month
                        social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                        document.getElementById("funx").innerHTML = "Desconto Funprev: - R$ "+ 
                        social_sec_disc;
                        break;
                        }
            } else {
                switch(prev_type) {
                    case "":
                        document.getElementById("funx").innerHTML = "Desconto Previdenciário (selecione): - R$ 0.00";
                        break;
                    case "Funfin":
                        // Creates and calculates the salary for the funprev discount of 14%
                        prev_pattern = (
                            // Sums the wage, the allowance, the hard access and the ats values
                            parseFloat(pattern_value) + 
                            parseFloat(allowance) +
                            parseFloat(ats_value));
                        // Social security discount costs 14% per month
                        social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                        document.getElementById("funx").innerHTML = "Desconto Funfin: - R$ "+ 
                        social_sec_disc;
                        break;
                    case "Funprev":
                        // Creates and calculates the salary for the funprev discount of 14%
                        prev_pattern = (
                            // Sums the wage, the allowance, the hard access and the ats values
                            parseFloat(pattern_value) + 
                            parseFloat(allowance) + 
                            parseFloat(ats_value));
                        // Social security discount costs 14% per month
                        social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                        document.getElementById("funx").innerHTML = "Desconto Funprev: - R$ "+ 
                        social_sec_disc;
                        break;
                        }
            }
            
            // Calculates the liquid wage
            var liquid_wage = (
                parseFloat(pattern_value) + 
                parseFloat(allowance) + 
                parseFloat(food_aid) +
                parseFloat(meal_aid) +
                parseFloat(hard_access_value) +
                parseFloat(hard_occupation_value) +
                parseFloat(ats_value) - 
                parseFloat(social_sec_disc)).toFixed(2);

            // Updates all the fields not yet updated with the results
            document.getElementById("proventos").innerHTML = "R$ " + liquid_wage;
            document.getElementById("salario").innerHTML = "Salário: + R$ " + pattern_value.toFixed(2);
            document.getElementById("abono").innerHTML = "Abono Complementar: + R$ " + allowance;
            document.getElementById("vale").innerHTML = "Vale Alimentação: + R$ " + food_aid.toFixed(2);
            document.getElementById("auxilio").innerHTML = "Auxílio Refeição: + R$ " + meal_aid;
            document.getElementById("ats_detail").innerHTML = "Adicional por Tempo de Serviço: + R$ " + ats_value;
            break;

        case "QPE06E":
        case "QPE07D":
        case "QPE08C":
        case "QPE09B":
        case "QPE10A":
            // Sets the pattern variable
            pattern_value = 2638.47;
            // Calculates the allowance by subtracting the pattern from the minimum wage
            allowance = (minimum_wage - pattern_value).toFixed(2);
            if (allowance <= 0) {
                allowance = 0;
            }

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
            if (da_prev==true) {
                switch(prev_type) {
                    case "":
                        document.getElementById("funx").innerHTML = "Desconto Previdenciário (selecione): - R$ 0.00";
                        break;
                    case "Funfin":
                        // Creates and calculates the salary for the funprev discount of 14%
                        prev_pattern = (
                            // Sums the wage, the allowance, the hard access and the ats values
                            parseFloat(pattern_value) + 
                            parseFloat(allowance) +
                            parseFloat(hard_access_value) +
                            parseFloat(ats_value));
                        // Social security discount costs 14% per month
                        social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                        document.getElementById("funx").innerHTML = "Desconto Funfin: - R$ "+ 
                        social_sec_disc;
                        break;
                    case "Funprev":
                        // Creates and calculates the salary for the funprev discount of 14%
                        prev_pattern = (
                            // Sums the wage, the allowance, the hard access and the ats values
                            parseFloat(pattern_value) + 
                            parseFloat(allowance) + 
                            parseFloat(hard_access_value) +
                            parseFloat(ats_value));
                        // Social security discount costs 14% per month
                        social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                        document.getElementById("funx").innerHTML = "Desconto Funprev: - R$ "+ 
                        social_sec_disc;
                        break;
                        }
            } else {
                switch(prev_type) {
                    case "":
                        document.getElementById("funx").innerHTML = "Desconto Previdenciário (selecione): - R$ 0.00";
                        break;
                    case "Funfin":
                        // Creates and calculates the salary for the funprev discount of 14%
                        prev_pattern = (
                            // Sums the wage, the allowance, the hard access and the ats values
                            parseFloat(pattern_value) + 
                            parseFloat(allowance) +
                            parseFloat(ats_value));
                        // Social security discount costs 14% per month
                        social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                        document.getElementById("funx").innerHTML = "Desconto Funfin: - R$ "+ 
                        social_sec_disc;
                        break;
                    case "Funprev":
                        // Creates and calculates the salary for the funprev discount of 14%
                        prev_pattern = (
                            // Sums the wage, the allowance, the hard access and the ats values
                            parseFloat(pattern_value) + 
                            parseFloat(allowance) + 
                            parseFloat(ats_value));
                        // Social security discount costs 14% per month
                        social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                        document.getElementById("funx").innerHTML = "Desconto Funprev: - R$ "+ 
                        social_sec_disc;
                        break;
                        }
            }
            
            // Calculates the liquid wage
            var liquid_wage = (
                parseFloat(pattern_value) + 
                parseFloat(allowance) + 
                parseFloat(food_aid) +
                parseFloat(meal_aid) +
                parseFloat(hard_access_value) +
                parseFloat(hard_occupation_value) +
                parseFloat(ats_value) - 
                parseFloat(social_sec_disc)).toFixed(2);

            // Updates all the fields not yet updated with the results
            document.getElementById("proventos").innerHTML = "R$ " + liquid_wage;
            document.getElementById("salario").innerHTML = "Salário: + R$ " + pattern_value.toFixed(2);
            document.getElementById("abono").innerHTML = "Abono Complementar: + R$ " + allowance;
            document.getElementById("vale").innerHTML = "Vale Alimentação: + R$ " + food_aid.toFixed(2);
            document.getElementById("auxilio").innerHTML = "Auxílio Refeição: + R$ " + meal_aid;
            document.getElementById("ats_detail").innerHTML = "Adicional por Tempo de Serviço: + R$ " + ats_value;
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
            if (da_prev==true) {
                switch(prev_type) {
                    case "":
                        document.getElementById("funx").innerHTML = "Desconto Previdenciário (selecione): - R$ 0.00";
                        break;
                    case "Funfin":
                        // Creates and calculates the salary for the funprev discount of 14%
                        prev_pattern = (
                            // Sums the wage, the allowance, the hard access and the ats values
                            parseFloat(pattern_value) + 
                            parseFloat(allowance) +
                            parseFloat(hard_access_value) +
                            parseFloat(ats_value));
                        // Social security discount costs 14% per month
                        social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                        document.getElementById("funx").innerHTML = "Desconto Funfin: - R$ "+ 
                        social_sec_disc;
                        break;
                    case "Funprev":
                        // Creates and calculates the salary for the funprev discount of 14%
                        prev_pattern = (
                            // Sums the wage, the allowance, the hard access and the ats values
                            parseFloat(pattern_value) + 
                            parseFloat(allowance) + 
                            parseFloat(hard_access_value) +
                            parseFloat(ats_value));
                        // Social security discount costs 14% per month
                        social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                        document.getElementById("funx").innerHTML = "Desconto Funprev: - R$ "+ 
                        social_sec_disc;
                        break;
                        }
            } else {
                switch(prev_type) {
                    case "":
                        document.getElementById("funx").innerHTML = "Desconto Previdenciário (selecione): - R$ 0.00";
                        break;
                    case "Funfin":
                        // Creates and calculates the salary for the funprev discount of 14%
                        prev_pattern = (
                            // Sums the wage, the allowance, the hard access and the ats values
                            parseFloat(pattern_value) +
                            parseFloat(allowance) + 
                            parseFloat(ats_value));
                        // Social security discount costs 14% per month
                        social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                        document.getElementById("funx").innerHTML = "Desconto Funfin: - R$ "+ 
                        social_sec_disc;
                        break;
                    case "Funprev":
                        // Creates and calculates the salary for the funprev discount of 14%
                        prev_pattern = (
                            // Sums the wage, the allowance, the hard access and the ats values
                            parseFloat(pattern_value) + 
                            parseFloat(allowance) + 
                            parseFloat(ats_value));
                        // Social security discount costs 14% per month
                        social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                        document.getElementById("funx").innerHTML = "Desconto Funprev: - R$ "+ 
                        social_sec_disc;
                        break;
                        }
            }
            
            // Calculates the liquid wage
            var liquid_wage = (
                parseFloat(pattern_value) + 
                parseFloat(allowance) + 
                parseFloat(food_aid) +
                parseFloat(meal_aid) +
                parseFloat(hard_access_value) +
                parseFloat(hard_occupation_value) +
                parseFloat(ats_value) - 
                parseFloat(social_sec_disc)).toFixed(2);

            // Updates all the fields not yet updated with the results
            document.getElementById("proventos").innerHTML = "R$ " + liquid_wage;
            document.getElementById("salario").innerHTML = "Salário: + R$ " + pattern_value.toFixed(2);
            document.getElementById("abono").innerHTML = "Abono Complementar: + R$ " + allowance;
            document.getElementById("vale").innerHTML = "Vale Alimentação: + R$ " + food_aid.toFixed(2);
            document.getElementById("auxilio").innerHTML = "Auxílio Refeição: + R$ " + meal_aid;
            document.getElementById("ats_detail").innerHTML = "Adicional por Tempo de Serviço: + R$ " + ats_value;
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
            if (da_prev==true) {
                switch(prev_type) {
                    case "":
                        document.getElementById("funx").innerHTML = "Desconto Previdenciário (selecione): - R$ 0.00";
                        break;
                    case "Funfin":
                        // Creates and calculates the salary for the funprev discount of 14%
                        prev_pattern = (
                            // Sums the wage, the allowance, the hard access and the ats values
                            parseFloat(pattern_value) + 
                            parseFloat(allowance) +
                            parseFloat(hard_access_value) +
                            parseFloat(ats_value));
                        // Social security discount costs 14% per month
                        social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                        document.getElementById("funx").innerHTML = "Desconto Funfin: - R$ "+ 
                        social_sec_disc;
                        break;
                    case "Funprev":
                        // Creates and calculates the salary for the funprev discount of 14%
                        prev_pattern = (
                            // Sums the wage, the allowance, the hard access and the ats values
                            parseFloat(pattern_value) + 
                            parseFloat(allowance) + 
                            parseFloat(hard_access_value) +
                            parseFloat(ats_value));
                        // Social security discount costs 14% per month
                        social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                        document.getElementById("funx").innerHTML = "Desconto Funprev: - R$ "+ 
                        social_sec_disc;
                        break;
                        }
            } else {
                switch(prev_type) {
                    case "":
                        document.getElementById("funx").innerHTML = "Desconto Previdenciário (selecione): - R$ 0.00";
                        break;
                    case "Funfin":
                        // Creates and calculates the salary for the funprev discount of 14%
                        prev_pattern = (
                            // Sums the wage, the allowance, the hard access and the ats values
                            parseFloat(pattern_value) + 
                            parseFloat(allowance) +
                            parseFloat(ats_value));
                        // Social security discount costs 14% per month
                        social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                        document.getElementById("funx").innerHTML = "Desconto Funfin: - R$ "+ 
                        social_sec_disc;
                        break;
                    case "Funprev":
                        // Creates and calculates the salary for the funprev discount of 14%
                        prev_pattern = (
                            // Sums the wage, the allowance, the hard access and the ats values
                            parseFloat(pattern_value) + 
                            parseFloat(allowance) + 
                            parseFloat(ats_value));
                        // Social security discount costs 14% per month
                        social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                        document.getElementById("funx").innerHTML = "Desconto Funprev: - R$ "+ 
                        social_sec_disc;
                        break;
                        }
            }
            
            // Calculates the liquid wage
            var liquid_wage = (
                parseFloat(pattern_value) + 
                parseFloat(allowance) + 
                parseFloat(food_aid) +
                parseFloat(meal_aid) +
                parseFloat(hard_access_value) +
                parseFloat(hard_occupation_value) +
                parseFloat(ats_value) - 
                parseFloat(social_sec_disc)).toFixed(2);

            // Updates all the fields not yet updated with the results
            document.getElementById("proventos").innerHTML = "R$ " + liquid_wage;
            document.getElementById("salario").innerHTML = "Salário: + R$ " + pattern_value.toFixed(2);
            document.getElementById("abono").innerHTML = "Abono Complementar: + R$ " + allowance;
            document.getElementById("vale").innerHTML = "Vale Alimentação: + R$ " + food_aid.toFixed(2);
            document.getElementById("auxilio").innerHTML = "Auxílio Refeição: + R$ " + meal_aid;
            document.getElementById("ats_detail").innerHTML = "Adicional por Tempo de Serviço: + R$ " + ats_value;
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
            if (da_prev==true) {
                switch(prev_type) {
                    case "":
                        document.getElementById("funx").innerHTML = "Desconto Previdenciário (selecione): - R$ 0.00";
                        break;
                    case "Funfin":
                        // Creates and calculates the salary for the funprev discount of 14%
                        prev_pattern = (
                            // Sums the wage, the allowance, the hard access and the ats values
                            parseFloat(pattern_value) + 
                            parseFloat(allowance) +
                            parseFloat(hard_access_value) +
                            parseFloat(ats_value));
                        // Social security discount costs 14% per month
                        social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                        document.getElementById("funx").innerHTML = "Desconto Funfin: - R$ "+ 
                        social_sec_disc;
                        break;
                    case "Funprev":
                        // Creates and calculates the salary for the funprev discount of 14%
                        prev_pattern = (
                            // Sums the wage, the allowance, the hard access and the ats values
                            parseFloat(pattern_value) + 
                            parseFloat(allowance) + 
                            parseFloat(hard_access_value) +
                            parseFloat(ats_value));
                        // Social security discount costs 14% per month
                        social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                        document.getElementById("funx").innerHTML = "Desconto Funprev: - R$ "+ 
                        social_sec_disc;
                        break;
                        }
            } else {
                switch(prev_type) {
                    case "":
                        document.getElementById("funx").innerHTML = "Desconto Previdenciário (selecione): - R$ 0.00";
                        break;
                    case "Funfin":
                        // Creates and calculates the salary for the funprev discount of 14%
                        prev_pattern = (
                            // Sums the wage, the allowance, the hard access and the ats values
                            parseFloat(pattern_value) + 
                            parseFloat(allowance) +
                            parseFloat(ats_value));
                        // Social security discount costs 14% per month
                        social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                        document.getElementById("funx").innerHTML = "Desconto Funfin: - R$ "+ 
                        social_sec_disc;
                        break;
                    case "Funprev":
                        // Creates and calculates the salary for the funprev discount of 14%
                        prev_pattern = (
                            // Sums the wage, the allowance, the hard access and the ats values
                            parseFloat(pattern_value) + 
                            parseFloat(allowance) + 
                            parseFloat(ats_value));
                        // Social security discount costs 14% per month
                        social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                        document.getElementById("funx").innerHTML = "Desconto Funprev: - R$ "+ 
                        social_sec_disc;
                        break;
                        }
            }
            
            // Calculates the liquid wage
            var liquid_wage = (
                parseFloat(pattern_value) + 
                parseFloat(allowance) + 
                parseFloat(food_aid) +
                parseFloat(meal_aid) +
                parseFloat(hard_access_value) +
                parseFloat(hard_occupation_value) +
                parseFloat(ats_value) - 
                parseFloat(social_sec_disc)).toFixed(2);

            // Updates all the fields not yet updated with the results
            document.getElementById("proventos").innerHTML = "R$ " + liquid_wage;
            document.getElementById("salario").innerHTML = "Salário: + R$ " + pattern_value.toFixed(2);
            document.getElementById("abono").innerHTML = "Abono Complementar: + R$ " + allowance;
            document.getElementById("vale").innerHTML = "Vale Alimentação: + R$ " + food_aid.toFixed(2);
            document.getElementById("auxilio").innerHTML = "Auxílio Refeição: + R$ " + meal_aid;
            document.getElementById("ats_detail").innerHTML = "Adicional por Tempo de Serviço: + R$ " + ats_value;
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
            if (da_prev==true) {
                switch(prev_type) {
                    case "":
                        document.getElementById("funx").innerHTML = "Desconto Previdenciário (selecione): - R$ 0.00";
                        break;
                    case "Funfin":
                        // Creates and calculates the salary for the funprev discount of 14%
                        prev_pattern = (
                            // Sums the wage, the allowance, the hard access and the ats values
                            parseFloat(pattern_value) + 
                            parseFloat(allowance) +
                            parseFloat(hard_access_value) +
                            parseFloat(ats_value));
                        // Social security discount costs 14% per month
                        social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                        document.getElementById("funx").innerHTML = "Desconto Funfin: - R$ "+ 
                        social_sec_disc;
                        break;
                    case "Funprev":
                        // Creates and calculates the salary for the funprev discount of 14%
                        prev_pattern = (
                            // Sums the wage, the allowance, the hard access and the ats values
                            parseFloat(pattern_value) + 
                            parseFloat(allowance) + 
                            parseFloat(hard_access_value) +
                            parseFloat(ats_value));
                        // Social security discount costs 14% per month
                        social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                        document.getElementById("funx").innerHTML = "Desconto Funprev: - R$ "+ 
                        social_sec_disc;
                        break;
                        }
            } else {
                switch(prev_type) {
                    case "":
                        document.getElementById("funx").innerHTML = "Desconto Previdenciário (selecione): - R$ 0.00";
                        break;
                    case "Funfin":
                        // Creates and calculates the salary for the funprev discount of 14%
                        prev_pattern = (
                            // Sums the wage, the allowance, the hard access and the ats values
                            parseFloat(pattern_value) + 
                            parseFloat(allowance) +
                            parseFloat(ats_value));
                        // Social security discount costs 14% per month
                        social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                        document.getElementById("funx").innerHTML = "Desconto Funfin: - R$ "+ 
                        social_sec_disc;
                        break;
                    case "Funprev":
                        // Creates and calculates the salary for the funprev discount of 14%
                        prev_pattern = (
                            // Sums the wage, the allowance, the hard access and the ats values
                            parseFloat(pattern_value) + 
                            parseFloat(allowance) + 
                            parseFloat(ats_value));
                        // Social security discount costs 14% per month
                        social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                        document.getElementById("funx").innerHTML = "Desconto Funprev: - R$ "+ 
                        social_sec_disc;
                        break;
                        }
            }
            
            // Calculates the liquid wage
            var liquid_wage = (
                parseFloat(pattern_value) + 
                parseFloat(allowance) + 
                parseFloat(food_aid) +
                parseFloat(meal_aid) +
                parseFloat(hard_access_value) +
                parseFloat(hard_occupation_value) +
                parseFloat(ats_value) - 
                parseFloat(social_sec_disc)).toFixed(2);

            // Updates all the fields not yet updated with the results
            document.getElementById("proventos").innerHTML = "R$ " + liquid_wage;
            document.getElementById("salario").innerHTML = "Salário: + R$ " + pattern_value.toFixed(2);
            document.getElementById("abono").innerHTML = "Abono Complementar: + R$ " + allowance;
            document.getElementById("vale").innerHTML = "Vale Alimentação: + R$ " + food_aid.toFixed(2);
            document.getElementById("auxilio").innerHTML = "Auxílio Refeição: + R$ " + meal_aid;
            document.getElementById("ats_detail").innerHTML = "Adicional por Tempo de Serviço: + R$ " + ats_value;
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
           if (da_prev==true) {
               switch(prev_type) {
                   case "":
                       document.getElementById("funx").innerHTML = "Desconto Previdenciário (selecione): - R$ 0.00";
                       break;
                   case "Funfin":
                       // Creates and calculates the salary for the funprev discount of 14%
                       prev_pattern = (
                           // Sums the wage, the allowance, the hard access and the ats values
                           parseFloat(pattern_value) + 
                           parseFloat(allowance) +
                           parseFloat(hard_access_value) +
                           parseFloat(ats_value));
                       // Social security discount costs 14% per month
                       social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                       document.getElementById("funx").innerHTML = "Desconto Funfin: - R$ "+ 
                       social_sec_disc;
                       break;
                   case "Funprev":
                       // Creates and calculates the salary for the funprev discount of 14%
                       prev_pattern = (
                           // Sums the wage, the allowance, the hard access and the ats values
                           parseFloat(pattern_value) + 
                           parseFloat(allowance) + 
                           parseFloat(hard_access_value) +
                           parseFloat(ats_value));
                       // Social security discount costs 14% per month
                       social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                       document.getElementById("funx").innerHTML = "Desconto Funprev: - R$ "+ 
                       social_sec_disc;
                       break;
                       }
           } else {
               switch(prev_type) {
                   case "":
                       document.getElementById("funx").innerHTML = "Desconto Previdenciário (selecione): - R$ 0.00";
                       break;
                   case "Funfin":
                       // Creates and calculates the salary for the funprev discount of 14%
                       prev_pattern = (
                           // Sums the wage, the allowance, the hard access and the ats values
                           parseFloat(pattern_value) + 
                           parseFloat(allowance) +
                           parseFloat(ats_value));
                       // Social security discount costs 14% per month
                       social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                       document.getElementById("funx").innerHTML = "Desconto Funfin: - R$ "+ 
                       social_sec_disc;
                       break;
                   case "Funprev":
                       // Creates and calculates the salary for the funprev discount of 14%
                       prev_pattern = (
                           // Sums the wage, the allowance, the hard access and the ats values
                           parseFloat(pattern_value) + 
                           parseFloat(allowance) + 
                           parseFloat(ats_value));
                       // Social security discount costs 14% per month
                       social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                       document.getElementById("funx").innerHTML = "Desconto Funprev: - R$ "+ 
                       social_sec_disc;
                       break;
                       }
           }
           
           // Calculates the liquid wage
           var liquid_wage = (
               parseFloat(pattern_value) + 
               parseFloat(allowance) + 
               parseFloat(food_aid) +
               parseFloat(meal_aid) +
               parseFloat(hard_access_value) +
               parseFloat(hard_occupation_value) +
               parseFloat(ats_value) - 
               parseFloat(social_sec_disc)).toFixed(2);

           // Updates all the fields not yet updated with the results
           document.getElementById("proventos").innerHTML = "R$ " + liquid_wage;
           document.getElementById("salario").innerHTML = "Salário: + R$ " + pattern_value.toFixed(2);
           document.getElementById("abono").innerHTML = "Abono Complementar: + R$ " + allowance;
           document.getElementById("vale").innerHTML = "Vale Alimentação: + R$ " + food_aid.toFixed(2);
           document.getElementById("auxilio").innerHTML = "Auxílio Refeição: + R$ " + meal_aid;
           document.getElementById("ats_detail").innerHTML = "Adicional por Tempo de Serviço: + R$ " + ats_value;
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
            if (da_prev==true) {
                switch(prev_type) {
                    case "":
                        document.getElementById("funx").innerHTML = "Desconto Previdenciário (selecione): - R$ 0.00";
                        break;
                    case "Funfin":
                        // Creates and calculates the salary for the funprev discount of 14%
                        prev_pattern = (
                            // Sums the wage, the allowance, the hard access and the ats values
                            parseFloat(pattern_value) + 
                            parseFloat(allowance) +
                            parseFloat(hard_access_value) +
                            parseFloat(ats_value));
                        // Social security discount costs 14% per month
                        social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                        document.getElementById("funx").innerHTML = "Desconto Funfin: - R$ "+ 
                        social_sec_disc;
                        break;
                    case "Funprev":
                        // Creates and calculates the salary for the funprev discount of 14%
                        prev_pattern = (
                            // Sums the wage, the allowance, the hard access and the ats values
                            parseFloat(pattern_value) + 
                            parseFloat(allowance) + 
                            parseFloat(hard_access_value) +
                            parseFloat(ats_value));
                        // Social security discount costs 14% per month
                        social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                        document.getElementById("funx").innerHTML = "Desconto Funprev: - R$ "+ 
                        social_sec_disc;
                        break;
                        }
            } else {
                switch(prev_type) {
                    case "":
                        document.getElementById("funx").innerHTML = "Desconto Previdenciário (selecione): - R$ 0.00";
                        break;
                    case "Funfin":
                        // Creates and calculates the salary for the funprev discount of 14%
                        prev_pattern = (
                            // Sums the wage, the allowance, the hard access and the ats values
                            parseFloat(pattern_value) + 
                            parseFloat(allowance) +
                            parseFloat(ats_value));
                        // Social security discount costs 14% per month
                        social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                        document.getElementById("funx").innerHTML = "Desconto Funfin: - R$ "+ 
                        social_sec_disc;
                        break;
                    case "Funprev":
                        // Creates and calculates the salary for the funprev discount of 14%
                        prev_pattern = (
                            // Sums the wage, the allowance, the hard access and the ats values
                            parseFloat(pattern_value) + 
                            parseFloat(allowance) + 
                            parseFloat(ats_value));
                        // Social security discount costs 14% per month
                        social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                        document.getElementById("funx").innerHTML = "Desconto Funprev: - R$ "+ 
                        social_sec_disc;
                        break;
                        }
            }
            
            // Calculates the liquid wage
            var liquid_wage = (
                parseFloat(pattern_value) + 
                parseFloat(allowance) + 
                parseFloat(food_aid) +
                parseFloat(meal_aid) +
                parseFloat(hard_access_value) +
                parseFloat(hard_occupation_value) +
                parseFloat(ats_value) - 
                parseFloat(social_sec_disc)).toFixed(2);

            // Updates all the fields not yet updated with the results
            document.getElementById("proventos").innerHTML = "R$ " + liquid_wage;
            document.getElementById("salario").innerHTML = "Salário: + R$ " + pattern_value.toFixed(2);
            document.getElementById("abono").innerHTML = "Abono Complementar: + R$ " + allowance;
            document.getElementById("vale").innerHTML = "Vale Alimentação: + R$ " + food_aid.toFixed(2);
            document.getElementById("auxilio").innerHTML = "Auxílio Refeição: + R$ " + meal_aid;
            document.getElementById("ats_detail").innerHTML = "Adicional por Tempo de Serviço: + R$ " + ats_value;
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
            if (da_prev==true) {
                switch(prev_type) {
                    case "":
                        document.getElementById("funx").innerHTML = "Desconto Previdenciário (selecione): - R$ 0.00";
                        break;
                    case "Funfin":
                        // Creates and calculates the salary for the funprev discount of 14%
                        prev_pattern = (
                            // Sums the wage, the allowance, the hard access and the ats values
                            parseFloat(pattern_value) + 
                            parseFloat(allowance) +
                            parseFloat(hard_access_value) +
                            parseFloat(ats_value));
                        // Social security discount costs 14% per month
                        social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                        document.getElementById("funx").innerHTML = "Desconto Funfin: - R$ "+ 
                        social_sec_disc;
                        break;
                    case "Funprev":
                        // Creates and calculates the salary for the funprev discount of 14%
                        prev_pattern = (
                            // Sums the wage, the allowance, the hard access and the ats values
                            parseFloat(pattern_value) + 
                            parseFloat(allowance) + 
                            parseFloat(hard_access_value) +
                            parseFloat(ats_value));
                        // Social security discount costs 14% per month
                        social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                        document.getElementById("funx").innerHTML = "Desconto Funprev: - R$ "+ 
                        social_sec_disc;
                        break;
                        }
            } else {
                switch(prev_type) {
                    case "":
                        document.getElementById("funx").innerHTML = "Desconto Previdenciário (selecione): - R$ 0.00";
                        break;
                    case "Funfin":
                        // Creates and calculates the salary for the funprev discount of 14%
                        prev_pattern = (
                            // Sums the wage, the allowance, the hard access and the ats values
                            parseFloat(pattern_value) + 
                            parseFloat(allowance) +
                            parseFloat(ats_value));
                        // Social security discount costs 14% per month
                        social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                        document.getElementById("funx").innerHTML = "Desconto Funfin: - R$ "+ 
                        social_sec_disc;
                        break;
                    case "Funprev":
                        // Creates and calculates the salary for the funprev discount of 14%
                        prev_pattern = (
                            // Sums the wage, the allowance, the hard access and the ats values
                            parseFloat(pattern_value) + 
                            parseFloat(allowance) + 
                            parseFloat(ats_value));
                        // Social security discount costs 14% per month
                        social_sec_disc = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
                        document.getElementById("funx").innerHTML = "Desconto Funprev: - R$ "+ 
                        social_sec_disc;
                        break;
                        }
            }
            
            // Calculates the liquid wage
            var liquid_wage = (
                parseFloat(pattern_value) + 
                parseFloat(allowance) + 
                parseFloat(food_aid) +
                parseFloat(meal_aid) +
                parseFloat(hard_access_value) +
                parseFloat(hard_occupation_value) +
                parseFloat(ats_value) - 
                parseFloat(social_sec_disc)).toFixed(2);

            // Updates all the fields not yet updated with the results
            document.getElementById("proventos").innerHTML = "R$ " + liquid_wage;
            document.getElementById("salario").innerHTML = "Salário: + R$ " + pattern_value.toFixed(2);
            document.getElementById("abono").innerHTML = "Abono Complementar: + R$ " + allowance;
            document.getElementById("vale").innerHTML = "Vale Alimentação: + R$ " + food_aid.toFixed(2);
            document.getElementById("auxilio").innerHTML = "Auxílio Refeição: + R$ " + meal_aid;
            document.getElementById("ats_detail").innerHTML = "Adicional por Tempo de Serviço: + R$ " + ats_value;
            break;
        }
    }
