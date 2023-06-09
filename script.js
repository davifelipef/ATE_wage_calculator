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
    var select_dep = document.getElementById("dependentes");
    // Index 2 corresponds to the default option, QPE03A
    select_ref.selectedIndex = 2;
    select_grau.selectedIndex = 0;
    select_ats.selectedIndex = 0;
    select_days.selectedIndex = 5;
    select_access.selectedIndex = 0;
    select_occup.selectedIndex = 0;
    select_prev.selectedIndex = 0;
    select_dep.selectedIndex = 0;
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
    var pattern_value
    console.log("pattern is " + pattern)
    switch (pattern) {

        // First case is the lowest wage possible
        case "QPE01A":
            // Sets the pattern variable
            pattern_value = 1496.92;
            break;

        case "QPE01B":
        case "QPE02A":
            // Sets the pattern variable
            pattern_value = 1594.15;
            break;

        // QPE03A is the starting value of the ATE career
        case "QPE01C":
        case "QPE02B":
        case "QPE03A":
            // Sets the pattern variable
            pattern_value = 1697.87;
            break;

        case "QPE01D":
        case "QPE02C":
        case "QPE03B":
        case "QPE04A":
            // Sets the pattern variable
            pattern_value = 1808.23;
            break;

        case "QPE01E":
        case "QPE02D":
        case "QPE03C":
        case "QPE04B":
        case "QPE05A":
            // Sets the pattern variable
            pattern_value = 1925.76;
            break;

        case "QPE02E":
        case "QPE03D":
        case "QPE04C":
        case "QPE05B":
        case "QPE06A":
            // Sets the pattern variable
            pattern_value = 2050.99;
            break;

        case "QPE03E":
        case "QPE04D":
        case "QPE05C":
        case "QPE06B":
        case "QPE07A":
            // Sets the pattern variable
            pattern_value = 2184.22;
            break;

        case "QPE04E":
        case "QPE05D":
        case "QPE06C":
        case "QPE07B":
        case "QPE08A":
            // Sets the pattern variable
            pattern_value = 2326.21;
            break;

        case "QPE05E":
        case "QPE06D":
        case "QPE07C":
        case "QPE08B":
        case "QPE09A":
            // Sets the pattern variable
            pattern_value = 2477.39;
            break;

        case "QPE06E":
        case "QPE07D":
        case "QPE08C":
        case "QPE09B":
        case "QPE10A":
            // Sets the pattern variable
            pattern_value = 2638.47;
            break;

        case "QPE07E":
        case "QPE08D":
        case "QPE09C":
        case "QPE10B":    
        case "QPE11A":
            // Sets the pattern variable
            pattern_value = 2809.91;
            break;

        case "QPE08E":
        case "QPE09D":
        case "QPE10C":
        case "QPE11B":
        case "QPE12A":
            // Sets the pattern variable
            pattern_value = 2992.56;
            break;

        case "QPE10E":
        case "QPE11D":
        case "QPE12C":
        case "QPE13B":
        case "QPE14A":
            // Sets the pattern variable
            pattern_value = 3394.24;
            break;

        case "QPE11E":
        case "QPE12D":
        case "QPE13C":
        case "QPE14B":
            // Sets the pattern variable
            pattern_value = 3614.87;
            break;
            
        case "QPE12E":
        case "QPE13D":
        case "QPE14C":
            // Sets the pattern variable
            pattern_value = 3849.84;
            break;

        case "QPE13E":
        case "QPE14D":
            // Sets the pattern variable
            pattern_value = 4100.08;
            break;
            
        // This is the last reference in the ATE career as of now
        case "QPE14E":
            // Sets the pattern variable
            pattern_value = 4366.58;
            break;
        }
    /* Calls the function that sums the values, and pass the pattern and
    the ATS Values to it */
    console.log("pattern value should be " + pattern_value)
    sumValues(pattern_value, ats_number, days_number, prev_type);
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
function sumValues(pattern_value, ats_number, days_number, prev_type) {
    // Declaration of the variables that will be used in the calculation
    let ats_value = 0;
    let social_sec_disc = 0;
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

    // Creates all the wage values that will be used for the calculations of Income Tax
    const ir_v_1 = 2112.01;
    const ir_v_2 = 2826.65;
    const ir_v_3 = 3751.05;
    const ir_v_4 = 4664.68;
    var irrf_aliq = 0;
    var irrf_due = 0;
    var irrf_deduc = 0;
    var depend_deduc = 0;
    var depend_qtt = document.getElementById("dependentes").value;

    // Main calculation
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
                document.getElementById("funx").innerHTML = "Desconto Funfin ou Funprev: - R$ 0.00";
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
                document.getElementById("funx").innerHTML = "Desconto Funfin ou Funprev: - R$ 0.00";
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

    // Verifies the quantity of dependents informed, and the appropriate tax deduction
    switch(depend_qtt) {
        case "dep_0":
            depend_deduc = 0;
            break;
        case "dep_1":
            depend_deduc = 189.59;
            break;
        case "dep_2":
            depend_deduc = 379.18;
            break;
        case "dep_3":
            depend_deduc = 568.77;
            break;
        case "dep_4":
            depend_deduc = 758.36;
            break;
        case "dep_5":
            depend_deduc = 947.90;
            break;
        case "dep_6":
            depend_deduc = 1137.54;
            break;
        case "dep_7":
            depend_deduc = 1327.06;
            break;
        case "dep_8":
            depend_deduc = 1516.72;
            break;
        case "dep_9":
            depend_deduc = 1706.31;
            break;
        case "dep_10":
            depend_deduc = 1895.9;
            break;
    }
    
    // Calculates the IRRF wage
    var irrf_wage = (
        parseFloat(pattern_value) + 
        parseFloat(allowance) +  
        parseFloat(hard_access_value) +
        parseFloat(hard_occupation_value) +
        parseFloat(ats_value) - 
        parseFloat(social_sec_disc)).toFixed(2);
    
    // If the IRRF wage is lower than 2112.01
    if (irrf_wage < ir_v_1) {
        irrf_aliq = 0;
    // IRRF wage is higher or equal to 2112.01 and lower or equal to 2826.65
    } else if (irrf_wage > ir_v_1 <= ir_v_2) {
        irrf_aliq = 0.075;
        irrf_deduc = 158.4;
    // IRRF wage is higher than 2826.65 and lower or equal to 3751.05
    } else if (irrf_wage > ir_v_2 <= ir_v_3) {
        irrf_aliq = 0.15;
        irrf_deduc = 370.4;
    // IRRF wage is higher than 3751.05 and lower or equal to 4664.68
    } else if (irrf_wage > ir_v_3 <= ir_v_4) {
        irrf_aliq = 0.225;
        irrf_deduc = 651.73;
    } else {
        irrf_aliq = 0.275;
        irrf_deduc = 884.96;
    }
    
    /* Calculates the IRRF due by multiplying the aliquote by the IRRF wage then 
    deducting the deduction value and the dependent deduciton*/
    irrf_due = ((irrf_aliq * irrf_wage) - irrf_deduc - depend_deduc).toFixed(2);

    // If the IRRF due is equal to zero or less, no IRRF is paid
    if (irrf_due <= 0) {
        irrf_due = 0;
        document.getElementById("irrf").innerHTML = "Imposto de Renda: Isento";
    // If the is a value higher than zero to be paid, displays the quantity and updates the details screen
    } else {
        document.getElementById("irrf").innerHTML = "Imposto de Renda: - R$ " + irrf_due;
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
        parseFloat(irrf_due) -
        parseFloat(social_sec_disc)).toFixed(2);

    // Updates all the fields not yet updated with the results
    document.getElementById("proventos").innerHTML = "R$ " + liquid_wage;
    document.getElementById("salario").innerHTML = "Salário: + R$ " + pattern_value.toFixed(2);
    document.getElementById("abono").innerHTML = "Abono Complementar: + R$ " + allowance;
    document.getElementById("vale").innerHTML = "Vale Alimentação: + R$ " + food_aid.toFixed(2);
    document.getElementById("auxilio").innerHTML = "Auxílio Refeição: + R$ " + meal_aid;
    document.getElementById("ats_detail").innerHTML = "Adicional por Tempo de Serviço: + R$ " + ats_value;
}
