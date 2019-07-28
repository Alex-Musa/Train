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
        var tName = $("#Train-name-input").val();
        var Destination = $("#Destination-input").val();
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

        console.log("test");

        // Grabs user input
        var tName = $("#Train-name-input").val().trim();
        var Destination = $("#Destination-input").val().trim();
        var startTime = moment($("#startTime").val().trim(), "MM/DD/YYYY").format("X");
        var freq = $("#freq").val().trim();

        // Creates local "temporary" object for holding employee data
        var TrainInfo = {
            TrainName: tName,
            Destination: Destination,
            startTime: startTime,
            Frequency: freq,
            trainTime: next,
            nextTrain: minAway
        };

        // Uploads employee data to the database
        database.ref().push(TrainInfo);

        // Logs everything to console
        console.log(TrainInfo.TrainName);
        console.log(TrainInfo.Destination);
        console.log(TrainInfo.startTime);
        console.log(TrainInfo.Frequency);
        console.log(TrainInfo.trainTime);
        console.log(TrainInfo.nextTrain);

        // Clears all of the text-boxes
        $("#Train-name-input").val("");
        $("#Destination-input").val("");
        $("#startTime").val("");
        $("#freq").val("");
    });





    // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
    database.ref().on("child_added", function (childSnapshot) {
        var datainfo = childSnapshot.val();

        console.log(datainfo.minAway)

        // Store everything into a variable.
        var TrainName = childSnapshot.val().tName;
        var Destination = childSnapshot.val().Destination;
        var startTime = childSnapshot.val().startTime;
        var Frequency = childSnapshot.val().freq;

        // Create the new row
        var newRow = $("<tr>").append(
            $("<td>").text(TrainName),
            $("<td>").text(Destination),
            $("<td>").text(startTime),
            $("<td>").text(empMonths),
            $("<td>").text(Frequency),
            $("<td>").text(trainTime),
            $("<td>").text(nextTrain)
        );

        // Append the new row to the table
        $("#employee-table > tbody").append(newRow);
    });


    // database.ref().on("child_added", function (snapshot) {
    //     var sv = snapshot.val();

    //     console.log(sv.minAway)
    //     $("table tbody").append("<tr><th>" + sv.TrainName + "</th><td>" + sv.Destination + "</td><td>" + sv.Frequency + "</td><td>" + sv.trainTime + "</td><td>" + sv.nextTrain + "</td></tr>");


    // })


})