(function() {
  'use strict';

  var movies = [];
  var idArr = [];

  var renderMovies = function() {
    $('#listings').empty();

    for (var movie of movies) {
      var $col = $('<div class="col s6">');
      var $card = $('<div class="card hoverable">');
      var $content = $('<div class="card-content center">');
      var $title = $('<h6 class="card-title truncate">');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie.Title
      });

      $title.tooltip({ delay: 50, });
      $title.text(movie.Title);

      var $poster = $('<img class="poster">');

      $poster.attr({
        src: movie.Poster,
        alt: `${movie.Poster} Poster`
      });

      $content.append($title, $poster);
      $card.append($content);

      var $action = $('<div class="card-action center">');
      var $plot = $('<a class="waves-effect waves-light btn modal-trigger">');

      $plot.attr('href', `#${movie.imdbID}`);
      $plot.attr('id', `#${movie.imdbID}`); //contains the id of the the individual movie
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      var $modal = $(`<div id="${movie.imdbID}" class="modal">`);
      var $modalContent = $('<div class="modal-content">');
      var $modalHeader = $('<h4>').text(movie.Title);
      var $movieYear = $('<h6>').text(`Released in ${movie.Year}`);
      var $modalText = $('<p>').text(movie.Plot);
      //NEED ID OF THE $MODAL DIV WHEN THE "PLOT" BUTTON

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    } //end for
  }; //end renderMovies()

  // Listen for submissions on the search form. Prevent the default action.
  $('#submit').on('click', function(event) {
    event.preventDefault();
    // Clear previous search results
    movies = [];
    // Validate the user input is not blank.
    if ( $("#search")[0].value === "") {
      Materialize.toast('Enter a movie', 5000);
    } else {
      // Get user input
      let movie = $('#search')[0].value;
      // Send an HTTP request to the [OMDB API](http://omdbapi.com/) search endpoint.
      let $xhr = $.getJSON('http://www.omdbapi.com/?s=' + movie);
      $xhr.done(function(data) {
        if ($xhr.status !== 200) {
          return;
        }
        for (let i = 0; i < data.Search.length; i++) {
            if (data.Search[i].Title === undefined) {
                alert('invalid movie name')
            } else {
                // Handle the HTTP response by pushing a new, well-formed `movie` object into the global `movies` array.
                movies.push(data.Search[i]);
                }
            }
        // Render the `movies` array to the page by calling the `renderMovies()` function with no arguments.
        renderMovies();
      });
    }
  });
})();

//***Bonus***
// - Use the movie's unique imdb ID to send an HTTP request to the [OMDB API](http://omdbapi.com/) id endpoint.
// - Handle the HTTP response by pushing a new, well-formed JavaScript object into the global `movies` array.
// - Render the `movies` array to the page by calling the `renderMovies()` function with no arguments.
