$(document).ready(function (){
var topics = ["The Legend of Zelda", "Super Smash Brothers", "Nintendo Switch", "Apple Computers", "Playstation", "Coding", "The Big Lebowski", "The Decemberists", "The Office", "Parks and Rec", "The Good Place", "Star Wars"];
if(typeof localStorage.topics !== "undefined"){
    topics = JSON.parse(localStorage.getItem("topics"));
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
          var gifList = response.data;
          if(!$("#maintain").prop("checked")) {
                $("#gif-area").empty();
            }
          gifList.forEach(function(element){
            var newGif = $(`<div class="col-md-3"><div class="card" style="width: 100%;"><img src="${element.images.original_still.url}" class="card-img-top gif-card" alt="${element.slug}" data-playing="${element.images.original.url}" data-stopped="${element.images.original_still.url}" data-state="stopped"><h5 class="card-title">Title: "${element.title}"</h5><p class="card-text">Rating: ${element.rating}</p></div>`);
            $("#gif-area").prepend(newGif);
          });
      });
});

$(document.body).on("click", ".gif-card", function () {
    if($(this).attr("data-state") === "stopped"){
        $(this).attr("data-state", "playing");
        $(this).attr("src", $(this).attr("data-playing"));
    } else {
        $(this).attr("data-state", "stopped");
        $(this).attr("src", $(this).attr("data-stopped"));
    };
});

$("#limit-button").on("click", function () {
    event.preventDefault();
    gifLimit = $("#limit-number").val();
    $("#limit-number").val("");
});

$("#search-button").on("click", function () {
    event.preventDefault();
    var newTerm = $("#search-term").val();
    $("#search-term").val("");
    topics.push(newTerm);
    localStorage.setItem("topics", JSON.stringify(topics));
    $("#button-area").empty();
    renderButtons();
});

$("#reset-list").on("click", function () {
    event.preventDefault();
    localStorage.clear();
    $("#button-area").empty();
    topics = ["The Legend of Zelda", "Super Smash Brothers", "Nintendo Switch", "Apple Computers", "Playstation", "Coding", "The Big Lebowski", "The Decemberists", "The Office", "Parks and Rec", "The Good Place", "Star Wars"];
    renderButtons();
});
});