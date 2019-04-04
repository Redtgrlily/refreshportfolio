//API KEY: J1SyymDV2Gvz811amlCHdUNCkTuASGgY

/*
have q, limit and rating
*/
$(document).ready(function(){
//variables
var actions = ["laugh", "sad","angry","love"]


//functions

//this is to show all the gif buttons
function displayGifButtons(){
    $("gifButtonsView").empty();//this removes any showing gifs so results are clean.
    for(var i = 0; i <actions.length; i++){
        var gifButton = $("<button>");
        gifButton.addClass("action");
        gifButton.addClass("btn btn-primary");
        gifButton.attr("data-name", actions[i]);
        gifButton.text(actions[i]);
        $("gifButtonsView").append(gifButton);
    }
}

//this is to add a new action button

function addNewButton(){
    $("#addGif").on("click", function(){
        var action = $("#action-input").val().trim();
        if (action == ""){
            return false; //this makes sure the user doesn't make an empty value button
        }
        actions.push(action);

        displayGifButtons();
        return false;
    });
}

//clear the button list

function removeLastButton(){
    $("removeGif").on("click", function(){
        actions.pop(action);
        displayGifButtons();
        return false;
    });
}

//to show all the gifs

function displayGifs(){
    var action = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+ action + "&api_key=J1SyymDV2Gvz811amlCHdUNCkTuASGgY&limit=5";
    console.log(queryURL); //make sure this is working

    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .done(function(response){
        console.log(response);
        $("#gifsView").empty();
        var results = response.data;
        if (results == ""){
            alert("Sorry, there's no gifs for this word.");
        }
        for (var i = 0; i<results.length; i++){

            var gifDiv = $("<div>"); //to put the gifs in
            gifDiv.addClass("gifDiv");
            //gif rating???
            var gifRating = $("<p>").text("Rating: " + results[i].rating);
            gifDiv.append(gifRating);
            //grab gif...
            var gifImage = $("<img>");
            gifImage.attr("src",results[i].images.fixed_height_small_still.url);//make them stand still and stay small
            gifImage.attr("data-still",results[i].images.fixed_height_small_still.url);
            gifImage.attr("data-animate",results[i].images.fixed_height_small.url);
            gifImage.attr("data-state","still");
            gifImage.addclass("image");
            gifDiv.append(gifImage);
            $("gifsView").prepend(gifDiv);
        }
    });
}

//Processes

displayGifButtons();
addNewButton();
removeLastButton();

$(document).on("click",".action",displayGifs());
$(document).on("click",".image",function(){
    var state = $(this).attr("data-state");
    if (state == "still"){
        $(this).attr("src",$(this).data("animate"));
        $(this).attr("data-state","animate");
    } else {
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state","still");
    }
});
});