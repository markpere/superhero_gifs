$(document).ready(function(){
	//Initial array of superheroes
	var superheroes = ["Batman", "Black Panther", "Thor", "Spiderman", "Doctor Strange", "Deadpool", "Captain America", "Wolverine", "Hawkeye", "Hulk", "Nightwing", "Superman"];
	// Function for displaying superhero data
	function renderButtons() {
		// Deleting the superhero buttons prior to adding new superhero buttons
		$("#superhero-view").empty();
		// Looping through the array of superheroes
		for (var i = 0; i < superheroes.length; i++) {
			// Then dynamically generate buttons for each superhero in the array
			var a = $("<button>"); // creates a new button
			var b = $("button"); // is a selector
			// adding a class
			a.addClass("superhero");
			//adding a data-attribute with a value of the superhero at index i
			a.attr("data-superhero", superheroes[i]);
			// providing the button's text with a value of the superhero at index i
			a.text(superheroes[i]);

			$("#superhero-view").append($("<button>").addClass("superhero").attr("data-superhero", superheroes[i]).text(superheroes[i]));
			// Adding the button to the HTML
			// $("#superhero-view").append(a);
		} //ends for loop
	} // ends renderButtons function

	// Functions to handle the event where one button is clicked
	$("#add-superhero").on("click", function(event) {
		//event.preventDefault prevents the form from trying to subit itself.
		// using a form so that the user can hit enter instead of clicking the button if they want
		event.preventDefault();
		// This line will grab the text from the input box
		var superhero = $("#superhero-input").val().trim();
		// The superhero from the text box is then added to the array
		superheroes.push(superhero);
		//calling renderButtons handles the processing of the superhero array
		renderButtons();

	})//ends on click event listener
	// Call the renderButtons function to display the initial list of superheroes
	renderButtons();


	//Event listener for button elements
	$("#superhero-view").on("click", "button", function() {
		//this refers tp the button that was clicked
		var superhero = $(this).data("superhero");
		// building the URL to search Giphy for the superhero
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + superhero + "&api_key=dc6zaTOxFJmzC&limit=10";
		// AJAX GET request
		$.ajax({
			url: queryURL,
			method: "GET"
		})//ends AJAX request

		//after the data comes back from the Giphy API
		.done(function(response) {
			//storing an array of results in the results variable
			var results = response.data;
			//looping over every result item
			for (var i = 0; i < results.length; i++) {
				//Only taking action if the photo has an appropriate rating
				if (results[i].rating !== "r" && results[i].rating !== "pg-13"){
					//creating a div with the class "item"
					var gifDiv = $("<div class='item'>");
					//storing the result item's rating
					var rating = results[i].rating;
					//creating a paragraph tag with the result item's rating
					var p = $("<p>").text("Rating: " + rating);
					//creating an image tag
					var personImage = $("<img>");
					//giving the image tag a source attribute of a property pulled off the result item
					personImage.attr("src", results[i].images.fixed_height.url);
					//Add a class to each gif of "gif"
					personImage.addClass("gif");
					//Adding the still and animate attributes
					// personImage.attr("data-still", results[i].images.original_still.url);
					// personImage.attr("data-animate", results[i].images.original_animate.url);
					// Appending the paragraph and personImage we created to the "gifDiv" div we created
					gifDiv.append(p);
					gifDiv.append(personImage);
					//prepending the gifDiv to the "#gifs-appear-here" div in the HTML
					$("#gifs-appear-here").prepend(gifDiv);
				}//ends if statement
			} //ends for loop
		})//ends response function
	}) //ends on click function

	//Now I need to add the start/stop functionality on click
	$(".gif").on("click", function() {
		//Looking for the state of the gif
		var state = $(this).attr("data-state");
		//Setting up an if statement for the state of the gif
		if (state === "still") {
			$(this).attr("src", $(this).data("animate"));
			$(this).attr("data-state", "animate");
		} //ends the if statement
		else {
			//If the clicked image's state is still, update its src attribute to what its data-animate value is.
			//Then, set the image's data-state to animate
			$(this).attr("src", $(this).data("still"));
			$(this).attr("data-state", "still");
		} //ends the else statement
	});//Ends pause on click function
});













