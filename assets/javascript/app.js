$(document).ready(function (){
var topics = ["The Legend of Zelda", "Super Smash Brothers", "Dragon Quest XI", "Apple", "Playstation", "Coding", "The Big Lebowski", "The Decemberists", "The Office", "Parks and Rec", "The Good Place", "Star Wars"];
if(typeof localStorage.topics !== "undefined"){
    topics = localStorage.getItem("topics");
};
var apiKey = "api_key=fjZDB3KgrG7UOjBcD3hTIaQfUsIemsu6&q=";
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
    
});

});