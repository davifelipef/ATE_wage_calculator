// Function called whenever a field is changed
function screenUpdate() {
    // Gets the reference value and saves it to a const
    const refValue = document.getElementById("referencias").value;
    // Gets the grade value and saves it to a const
    const gradValue = document.getElementById("graus").value;
    // Gets the ATS value and saves it to a const
    const atsNumber = document.getElementById("ats").value;
    console.log("Número de ATS é: " + atsNumber)
    // Gets the pattern value by the sum of the reference and the grade
    const pattern = refValue + gradValue;
    // Log for debugging
    console.log("Primeiro padrão: "+ pattern);
    /* Calls the function that sums the values, and pass the pattern and
    the ATS Values to it */
    sumValues(pattern, atsNumber);
}

// Function that sums all the values to get the final salary
function sumValues(pattern, atsNumber) {
    // estabilish the total as 0 initially
    let total = 0;
    // The first switch checks for the QPE
    switch (pattern) {
        // First case is the lowest wage possible
        case "QPE01A":
            pattern = 1496.92;
            funprev = ((14 / 100) * pattern).toFixed(2);
            console.log(funprev)
            switch (atsNumber) {
                case "0":
                    break;
                case "1":
                    // 1st ATS is 5%
                    atsValue = ((5 / 100) * pattern).toFixed(2);
                    total = parseFloat(atsValue) + parseFloat(pattern);
                    console.log(atsValue);
                    console.log(total.toFixed(2));
                    break;
                case "2":
                    // 2nd ATS is 10.25%
                    atsValue = ((10.25 / 100) * pattern).toFixed(2);
                    total = parseFloat(atsValue) + parseFloat(pattern);
                    console.log(atsValue);
                    console.log(total.toFixed(2));
                    break;
                case "3":
                    // 3rd ATS is 15.76%
                    atsValue = ((15.76 / 100) * pattern).toFixed(2);
                    total = parseFloat(atsValue) + parseFloat(pattern);
                    console.log(atsValue);
                    console.log(total.toFixed(2));
                    break;
                case "4":
                    // 4th ATS is 21.55%
                    atsValue = ((21.55 / 100) * pattern).toFixed(2);
                    total = parseFloat(atsValue) + parseFloat(pattern);
                    console.log(atsValue);
                    console.log(total.toFixed(2));
                    break;
                case "5":
                    // 5th ATS is 27.63%
                    atsValue = ((27.63 / 100) * pattern).toFixed(2);
                    total = parseFloat(atsValue) + parseFloat(pattern);
                    console.log(atsValue);
                    console.log(total.toFixed(2));
                    break;
                case "6":
                    // 6th ATS is 34.01%
                    atsValue = ((34.01 / 100) * pattern).toFixed(2);
                    total = parseFloat(atsValue) + parseFloat(pattern);
                    console.log(atsValue);
                    console.log(total.toFixed(2));
                    break;
                case "7":
                    // 7th ATS is 40.71%
                    atsValue = ((40.71 / 100) * pattern).toFixed(2);
                    total = parseFloat(atsValue) + parseFloat(pattern);
                    console.log(atsValue);
                    console.log(total.toFixed(2));
                    break;
            }
            console.log(pattern);
            // Sums the pattern and the ATS values
            total = parseFloat(pattern) + parseFloat(atsValue);
            document.getElementById("proventos").innerHTML = total.toFixed(2);
            break;

        case "QPE01B":
        case "QPE02A":
            pattern = 1594.15;
            switch (atsValue) {
                case "0":
                    break;
                case "1":
                    // 1st ATS is 5%
                    atsValue = ((5 / 100) * pattern).toFixed(2);
                    total = parseFloat(atsValue) + parseFloat(pattern);
                    console.log(atsValue);
                    console.log(total.toFixed(2));
                    break;
                case "2":
                    // 2nd ATS is 10.25%
                    atsValue = ((10.25 / 100) * pattern).toFixed(2);
                    total = parseFloat(atsValue) + parseFloat(pattern);
                    console.log(atsValue);
                    console.log(total.toFixed(2));
                    break;
                case "3":
                    // 3rd ATS is 15.76%
                    atsValue = ((15.76 / 100) * pattern).toFixed(2);
                    total = parseFloat(atsValue) + parseFloat(pattern);
                    console.log(atsValue);
                    console.log(total.toFixed(2));
                    break;
                case "4":
                    // 4th ATS is 21.55%
                    atsValue = ((21.55 / 100) * pattern).toFixed(2);
                    total = parseFloat(atsValue) + parseFloat(pattern);
                    console.log(atsValue);
                    console.log(total.toFixed(2));
                    break;
                case "5":
                    // 5th ATS is 27.63%
                    atsValue = ((27.63 / 100) * pattern).toFixed(2);
                    total = parseFloat(atsValue) + parseFloat(pattern);
                    console.log(atsValue);
                    console.log(total.toFixed(2));
                    break;
                case "6":
                    // 6th ATS is 34.01%
                    atsValue = ((34.01 / 100) * pattern).toFixed(2);
                    total = parseFloat(atsValue) + parseFloat(pattern);
                    console.log(atsValue);
                    console.log(total.toFixed(2));
                    break;
                case "7":
                    // 7th ATS is 40.71%
                    atsValue = ((40.71 / 100) * pattern).toFixed(2);
                    total = parseFloat(atsValue) + parseFloat(pattern);
                    console.log(atsValue);
                    console.log(total.toFixed(2));
                    break;
            }
            console.log(pattern);
            total = parseFloat(pattern) + parseFloat(atsValue);
            document.getElementById("proventos").innerHTML = total.toFixed(2);
            break;
        
        // QPE03A is the starting value of the ATE career
        case "QPE01C":
        case "QPE02B":
        case "QPE03A":
            // Sets the minimum wage variable
            var minimum_wage = 2130.74;
            // Sets the pattern variable
            var pattern = 1697.84;
            // Sets the hard access variable
            var hard_access = 275.00;
            // Creates the fod aid variable
            var food_aid = 600.00;
            // Creates the meal aid variable
            var meal_aid = 450.00;
            /* Creates the new pattern variable, to be updated
            after all the sums and discounts*/
            var prev_pattern = 0;
            // Calculates the allowance by subtraing the pattern from the minimum wage
            var allowance = (minimum_wage - pattern).toFixed(2);
            // Log for debugging
            console.log("Abono: " + allowance); 
            // Creates and calculates the salary for the funprev discount of 14%
            prev_pattern = (
                // Sums the salary, the allowance and the hard access
                parseFloat(pattern) + 
                parseFloat(allowance) + 
                parseFloat(hard_access)).toFixed(2);
            // Log for debugging
            console.log("Salário para fins de desconto previdenciário: " + 
            prev_pattern); 

            var funprev = ((14 / 100) * parseFloat(prev_pattern)).toFixed(2);
            console.log("Desconto Funprev: " + funprev);

            var liquid_wage = (
                parseFloat(pattern) + 
                parseFloat(allowance) + 
                parseFloat(food_aid) +
                parseFloat(meal_aid) +
                parseFloat(hard_access) -
                parseFloat(funprev)).toFixed(2);
                
            console.log("Salário líquido: " + liquid_wage)

            switch (atsValue) {
                case "0":
                    total = liquid_wage; 
                    // Prints the pattern value
                    console.log("Last print: " + total);
                    // Updates the salary value in the screen
                    document.getElementById("proventos").innerHTML = total.toFixed(2);
                    break;
                case "1":
                    // 1st ATS is 5%
                    console.log("Case 1 accessed.")
                    atsValue = ((5 / 100) * pattern).toFixed(2);
                    total = parseFloat(atsValue) + parseFloat(liquid_wage);
                    console.log(atsValue);
                    console.log(total.toFixed(2));
                    break;
                case "2":
                    // 2nd ATS is 10.25%
                    console.log("Case 2 accessed.")
                    atsValue = ((10.25 / 100) * pattern).toFixed(2);
                    total = parseFloat(atsValue) + parseFloat(liquid_wage);
                    console.log(atsValue);
                    console.log(total.toFixed(2));
                    break;
                case "3":
                    // 3rd ATS is 15.76%
                    console.log("Case 3 accessed.")
                    atsValue = ((15.76 / 100) * pattern).toFixed(2);
                    total = parseFloat(atsValue) + parseFloat(liquid_wage);
                    console.log(atsValue);
                    console.log(total.toFixed(2));
                    break;
                case "4":
                    // 4th ATS is 21.55%
                    console.log("Case 4 accessed.")
                    atsValue = ((21.55 / 100) * pattern).toFixed(2);
                    total = parseFloat(atsValue) + parseFloat(liquid_wage);
                    console.log(atsValue);
                    console.log(total.toFixed(2));
                    break;
                case "5":
                    // 5th ATS is 27.63%
                    console.log("Case 5 accessed.")
                    atsValue = ((27.63 / 100) * pattern).toFixed(2);
                    total = parseFloat(atsValue) + parseFloat(liquid_wage);
                    console.log(atsValue);
                    console.log(total.toFixed(2));
                    break;
                case "6":
                    // 6th ATS is 34.01%
                    console.log("Case 6 accessed.")
                    atsValue = ((34.01 / 100) * pattern).toFixed(2);
                    total = parseFloat(atsValue) + parseFloat(liquid_wage);
                    console.log(atsValue);
                    console.log(total.toFixed(2));
                    break;
                case "7":
                    // 7th ATS is 40.71%
                    console.log("Case 7 accessed.")
                    atsValue = ((40.71 / 100) * pattern).toFixed(2);
                    total = parseFloat(atsValue) + parseFloat(liquid_wage);
                    console.log(atsValue);
                    console.log(total.toFixed(2));
                    break;
            }
            // Prints the pattern value
            console.log("Last print: " + total);
            // Updates the salary value in the screen
            document.getElementById("proventos").innerHTML = total.toFixed(2);
            break;
        
        case "QPE01D":
        case "QPE02C":
        case "QPE03B":
        case "QPE04A":
            pattern = 1808.20;
            switch (atsValue) {
                case "0":
                    break;
                case "1":
                    // 1st ATS is 5%
                    atsValue = ((5 / 100) * pattern).toFixed(2);
                    total = parseFloat(atsValue) + parseFloat(pattern);
                    console.log(atsValue);
                    console.log(total.toFixed(2));
                    break;
                case "2":
                    // 2nd ATS is 10.25%
                    atsValue = ((10.25 / 100) * pattern).toFixed(2);
                    total = parseFloat(atsValue) + parseFloat(pattern);
                    console.log(atsValue);
                    console.log(total.toFixed(2));
                    break;
                case "3":
                    // 3rd ATS is 15.76%
                    atsValue = ((15.76 / 100) * pattern).toFixed(2);
                    total = parseFloat(atsValue) + parseFloat(pattern);
                    console.log(atsValue);
                    console.log(total.toFixed(2));
                    break;
                case "4":
                    // 4th ATS is 21.55%
                    atsValue = ((21.55 / 100) * pattern).toFixed(2);
                    total = parseFloat(atsValue) + parseFloat(pattern);
                    console.log(atsValue);
                    console.log(total.toFixed(2));
                    break;
                case "5":
                    // 5th ATS is 27.63%
                    atsValue = ((27.63 / 100) * pattern).toFixed(2);
                    total = parseFloat(atsValue) + parseFloat(pattern);
                    console.log(atsValue);
                    console.log(total.toFixed(2));
                    break;
                case "6":
                    // 6th ATS is 34.01%
                    atsValue = ((34.01 / 100) * pattern).toFixed(2);
                    total = parseFloat(atsValue) + parseFloat(pattern);
                    console.log(atsValue);
                    console.log(total.toFixed(2));
                    break;
                case "7":
                    // 7th ATS is 40.71%
                    atsValue = ((40.71 / 100) * pattern).toFixed(2);
                    total = parseFloat(atsValue) + parseFloat(pattern);
                    console.log(atsValue);
                    console.log(total.toFixed(2));
                    break;
            }
            console.log(pattern);
            total = parseFloat(pattern) + parseFloat(atsValue);
            document.getElementById("proventos").innerHTML = total.toFixed(2);
            break;
            
        case "QPE14A":
            pattern = 4366.58;
            switch (atsValue) {
                case "0":
                    break;
                case "1":
                    // 1st ATS is 5%
                    atsValue = ((5 / 100) * pattern).toFixed(2);
                    total = parseFloat(atsValue) + parseFloat(pattern);
                    console.log(atsValue);
                    console.log(total.toFixed(2));
                    break;
                case "2":
                    // 2nd ATS is 10.25%
                    atsValue = ((10.25 / 100) * pattern).toFixed(2);
                    total = parseFloat(atsValue) + parseFloat(pattern);
                    console.log(atsValue);
                    console.log(total.toFixed(2));
                    break;
                case "3":
                    // 3rd ATS is 15.76%
                    atsValue = ((15.76 / 100) * pattern).toFixed(2);
                    total = parseFloat(atsValue) + parseFloat(pattern);
                    console.log(atsValue);
                    console.log(total.toFixed(2));
                    break;
                case "4":
                    // 4th ATS is 21.55%
                    atsValue = ((21.55 / 100) * pattern).toFixed(2);
                    total = parseFloat(atsValue) + parseFloat(pattern);
                    console.log(atsValue);
                    console.log(total.toFixed(2));
                    break;
                case "5":
                    // 5th ATS is 27.63%
                    atsValue = ((27.63 / 100) * pattern).toFixed(2);
                    total = parseFloat(atsValue) + parseFloat(pattern);
                    console.log(atsValue);
                    console.log(total.toFixed(2));
                    break;
                case "6":
                    // 6th ATS is 34.01%
                    atsValue = ((34.01 / 100) * pattern).toFixed(2);
                    total = parseFloat(atsValue) + parseFloat(pattern);
                    console.log(atsValue);
                    console.log(total.toFixed(2));
                    break;
                case "7":
                    // 7th ATS is 40.71%
                    atsValue = ((40.71 / 100) * pattern).toFixed(2);
                    total = parseFloat(atsValue) + parseFloat(pattern);
                    console.log(atsValue);
                    console.log(total.toFixed(2));
                    break;
            }
            console.log(pattern);
            total = parseFloat(pattern) + parseFloat(atsValue);
            document.getElementById("proventos").innerHTML = total.toFixed(2);
            break;

    }
}
