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

        var TimeConvert = moment(startTime, "HH:mm").subtract(1, "years");
        var diff = moment().diff(moment(TimeConvert), "minutes");
        var remainder = diff % freq;
        var awayTime = freq - remainder;

        var nextTrain = moment().add(awayTime, "minutes");
        var next = moment(nextTrain).format("HH:mm")
        console.log(awayTime)
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
            nextTrain: awayTime
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



    database.ref().on("child_added", function (snapshot) {
        console.log(childSnapshot.val());


        var TrainName = childSnapshot.val().tName;
        var Destination = childSnapshot.val().Destination;
        var startTime = childSnapshot.val().startTime;
        var Frequency = childSnapshot.val().freq;
        var nextTrain = childSnapshot.val().awayTime;





















        // var sv = snapshot.val();

        // console.log(sv.minAway)
        // $("table tbody").append("<tr><th>" + sv.TrainName + "</th><td>" + sv.Destination + "</td><td>" + sv.Frequency + "</td><td>" + sv.trainTime + "</td><td>" + sv.nextTrain + "</td></tr>");


    })


})