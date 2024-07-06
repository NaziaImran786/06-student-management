#! /usr/bin/env node
import inquirer from 'inquirer';


class Student {
    name: string
    id : number
    courses : string
    balance : number
    fees_paid : "Paid" | "unpaid"

    constructor( 
        name: string,
        id : number,
        courses : string,
        balance : number,
        fees_paid : "Paid" | "unpaid", 
    ){
        this.name = name
        this.id = id
        this.courses = courses
        this.balance = balance
        this.fees_paid = fees_paid    
    }
}

//-----------------------------variables--------------------------------------
let std_name = ""
let std_id = 10000
let course = ""
let balance = 0
let fees_paid: "Paid" | "unpaid" = "unpaid"
let std_info_array = []
let names_array: any[] = []
let std_status
let running: boolean = true

//----------------------------------------------options------------------------------------------------------------
do {
    let options = await inquirer.prompt({
        name: "ans",
        type: "list",
        message: "please select one option",
        choices: ["Enroll", "show status", "Exit"]
    })
 //-----------------------------------Enroll-------------------------------------
    if(options.ans === "Enroll"){
     //---------------------------------name------------------------------------    
        let question1 = await inquirer.prompt({
            name: "name",
            type: "input",
            message: "Please enter your name:"
        })

        if(question1.name){
            std_name = question1.name
            std_id = ++std_id
        }else{
            console.log("Please enter valid name");            
        }

        //----------------------------------course------------------------------------
        let question2 = await inquirer.prompt({
            name: "course",
            type: "list",
            message:"Please select course",
            choices: ["IT", "English", "cooking"]
        })

        if(question2.course === "IT"){
            let question = await inquirer.prompt({
                name: "IT",
                type: "confirm",
                message: "Do you want to enroll in this course for $1000?"
            })
            if(question.IT === true){
                balance = 10000
                fees_paid = "Paid"
                course = "IT"
            }

        }else if(question2.course === "English"){
            let question = await inquirer.prompt({
                name: "Englis",
                type: "confirm",
                message: "Do you want to enroll in this course for $5000?"
            })
            if(question.Englis === true){
                balance = 5000
                fees_paid = "Paid"
                course = "English"
            }

        }else if(question2.course === "cooking"){
            let question = await inquirer.prompt({
                name: "cooking",
                type: "confirm",
                message: "Do you want to enroll in this course for $2000?"
            })
            if(question.cooking === true){
                balance = 2000
                fees_paid = "Paid"
                course = "cooking"
            }
        }

        const std_info = new Student(std_name,std_id,course,balance,fees_paid)
        std_info_array.push(std_info)
    }
    //---------------------------------------------show status-------------------------------------
    else if(options.ans === "show status"){
        names_array = std_info_array.map((obj) => obj.name)
        let question3 = await inquirer.prompt({
            name: "name",
            type: "list",
            message: "Please select name",
            choices: names_array
        })

        std_status = std_info_array.find((obj) => obj.name === question3.name)
        console.log(std_status);        
    }

    //------------------------------------------Exit-------------------------------------
    else if(options.ans === "Exit"){
        running = false
        console.log("Thank you for using Student Management");
        
    }

} while (running)