$(document).ready(function (){
var topics = ["The Legend of Zelda", "Super Smash Brothers", "Nintendo Switch", "Apple Computers", "Playstation", "Coding", "The Big Lebowski", "The Decemberists", "The Office", "Parks and Rec", "The Good Place", "Star Wars"];
if(typeof localStorage.topics !== "undefined"){
    topics = localStorage.getItem("topics");
};
var apiKey = "api_key=fjZDB3KgrG7UOjBcD3hTIaQfUsIemsu6";
var gifLimit = 10;
var limitURL = "&limit=";
var domain = "https://api.giphy.com/v1/gifs/search?";

renderButtons();

function renderButtons() {
    topics.forEach(function(element){
        var newButton = $(`<button class="topic-button" value="${element}">${element}</button>`);
        $("#button-area").append(newButton);
    }) 
}

$(document.body).on("click", ".topic-button", function () {
    var query = `&q=${$(this).val()}`
    var queryURL = domain + apiKey + query + limitURL + gifLimit;
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
          console.log(response);
          var gifList = response.data;
          gifList.forEach(function(element){
            var newGif = $(`<div class="col-md-3"><img src="${element.images.original_still.url}" alt="${element.slug}" width="100%"><p>Rating: ${element.rating}</p></div>`);
            $("#gif-area").prepend(newGif);
          });
      });
});

});