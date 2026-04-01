
import promptSync from "prompt-sync"
const internetAllowance = 2000.00;
const eClubContribution = 1500.00;
const STAMP_DUTY =  25.00

let basicSalary, tax, epf;

const prompt = promptSync();
basicSalary  = Number(prompt("Enter the basic salary : "));
basicSalary = basicSalary.toFixed(2);

function inputValidation(basicSalary){
    if(basicSalary <= 0 ){
        console.log("Salary can't be a negative value!");
        return false;
    } 
    else if(basicSalary > 0  && basicSalary < 30000){
        console.log("As per SL labour law, monthly basic salary should be greater than 30,000!!!");
        return false;
    } 
    else{
        return true;
    }
}

function calcEpf(){
    return ((basicSalary - internetAllowance)*0.08).toFixed(2);
}

function proceed(){
    if(!inputValidation(basicSalary)){
        return;
    }
    epf = calcEpf();
    console.log(`EPF Deduction = ${epf}`);
}


// Invoke functions after this line
// ------------------------------------------------------------------------


proceed();