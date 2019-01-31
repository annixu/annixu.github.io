
            document.getElementById("title").style.color="red";
            document.getElementById("title").innerHTML = "Welcome Javascript";
                
            var username = "Anni"; 
            console.log("Anni")

            var myNumber = 42; 
            myNumber = myNumber + 10;

            console.log(myNumber);
            console.log(myNumber * 100)

            var big = myNumber > 100;
            console.log(big)

            var users = ["dave", "dan", "anni"];
            console.log(users[1]);

            var complexUser = {
                name: "Dave Landry",
                zip: 02138,
                color: "red",
                dog: true, 
                greet: function(greeting){
                    console.log(greeting + "Dave!")
                }
            };

            complexUser.greet("Goodbye");

            console.log(complexUser.color);


            var sayHello = function(name) {
                console.log("Hello " + name);
            }

            sayHello("Dave");
            sayHello("Lisa");
            sayHello(complexUser.name); 

            var plusTen = function(num){
                return num + 10
            }

            var newNum = plusTen(20);
            console.log(newNum)

            //Conditional Statement: evaluating logic //
            if (newNum >100) {
                console.log("Wow! Big Number!");
            }
            if(newNum > 50){
                console.log("ok, not too bad");
            }
            else {
                console.log ("not so big...");
            }

            var greaterThanTen = function(num){

                if (num > 10){
                    console.log("yes!");
                }
                else {
                    console.log("NO!");
                }
                return num > 10;
            }

            var checkNumber = greaterThanTen(20);

            console.log(checkNumber);


            //interacting with HTML//
