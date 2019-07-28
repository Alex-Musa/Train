$(document).ready(function () {


    var firebaseConfig = {
        apiKey: "AIzaSyDAyV71Jc0OzIoVxLycE47UMsYCqRpkYCw",
        authDomain: "train-c6384.firebaseapp.com",
        databaseURL: "https://train-c6384.firebaseio.com",
        projectId: "train-c6384",
        storageBucket: "",
        messagingSenderId: "455426081059",
        appId: "1:455426081059:web:2540970dcc0dac66"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);


    var database = firebase.database();




    // 2. Button for adding Employees
    $("#add-employee-btn").on("click", function (event) {
        event.preventDefault();


        event.preventDefault();
        var tName = $("#tName").val();
        var dest = $("#dest").val();
        var startTime = $("#startTime").val();
        var freq = $("#freq").val();
        var firstTimeConverted = moment(startTime, "HH:mm").subtract(1, "years");
        var currentTime = moment();
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        var tRemainder = diffTime % freq;
        var minAway = freq - tRemainder;

        var nextTrain = moment().add(minAway, "minutes");
        var next = moment(nextTrain).format("HH:mm")
        console.log(minAway)
        console.log(next)

        console.log("Hello");









        // Grabs user input
        var empName = $("#Train-name-input").val().trim();
        var empRole = $("#Destination-input").val().trim();
        var empStart = moment($("#startTime").val().trim(), "MM/DD/YYYY").format("X");
        var empRate = $("#freq").val().trim();

        // Creates local "temporary" object for holding employee data
        var newEmp = {
            name: empName,
            role: empRole,
            start: empStart,
            rate: empRate
        };

        // Uploads employee data to the database
        database.ref().push(newEmp);

        // Logs everything to console
        console.log(newEmp.name);
        console.log(newEmp.role);
        console.log(newEmp.start);
        console.log(newEmp.rate);

        alert("Employee successfully added");

        // Clears all of the text-boxes
        $("#employee-name-input").val("");
        $("#role-input").val("");
        $("#start-input").val("");
        $("#rate-input").val("");
    });

    // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
    database.ref().on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val());

        // Store everything into a variable.
        var empName = childSnapshot.val().name;
        var empRole = childSnapshot.val().role;
        var empStart = childSnapshot.val().start;
        var empRate = childSnapshot.val().rate;

        // Employee Info
        console.log(empName);
        console.log(empRole);
        console.log(empStart);
        console.log(empRate);

        // Prettify the employee start
        var empStartPretty = moment.unix(empStart).format("MM/DD/YYYY");

        // Calculate the months worked using hardcore math
        // To calculate the months worked
        var empMonths = moment().diff(moment(empStart, "X"), "months");
        console.log(empMonths);

        // Calculate the total billed rate
        var empBilled = empMonths * empRate;
        console.log(empBilled);

        // Create the new row
        var newRow = $("<tr>").append(
            $("<td>").text(empName),
            $("<td>").text(empRole),
            $("<td>").text(empStartPretty),
            $("<td>").text(empMonths),
            $("<td>").text(empRate),
            $("<td>").text(empBilled)
        );

        // Append the new row to the table
        $("#employee-table > tbody").append(newRow);
    });


})