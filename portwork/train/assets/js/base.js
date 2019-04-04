
$("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainTime = moment($("#time-input").val().trim(), "HH:mm" ).format("HH:mm");
    var trainFrequency = $("#frequency-input").val().trim();
  
   
    var newTrain = {
      name: trainName,
      destination: trainDestination,
      time: trainTime,
      frequency: trainFrequency
    };
  
   
    database.ref().push(newTrain);
  
  
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
  });
  
      database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  
  
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var trainFrequency = childSnapshot.val().frequency;
  
      console.log(trainName);
        console.log(trainDestination);
        console.log(trainTime);
        console.log(trainFrequency);
  
  
  
      var tFrequency = trainFrequency;
  
     
      var firstTime = trainTime;
  
      
      var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    
      
      var currentTime = moment();
      
      
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
     
      
      var tRemainder = diffTime % tFrequency;
     
      
      var tMinutesTillTrain = tFrequency - tRemainder;
      
      console.log(tMinutesTillTrain)
      
      var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
  
      console.log(nextTrain)
      
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
    trainFrequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");
  });