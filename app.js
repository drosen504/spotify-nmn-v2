'use strict';
/* global $ */

//decode hash to extract token

function decodeURL() {  
  const hash = window.location.hash
    .substring(1)
    .split('&')
    .reduce(function (initial, item) {
      if (item) {
        var parts = item.split('=');
        initial[parts[0]] = decodeURIComponent(parts[1]);
      }
      return initial;
    }, {});
  return hash;
}
const hash = decodeURL();
window.location.hash = '';
 
// Set token. grab from URI hash
let _token = hash.access_token;
console.log(`token is ${_token}`);

let relatedArtistId;
let relatedArtistData;
let artistData;
let query;

function handleSpotifyLogin() {
  $('#js-login-button').click(event => {
    console.log('login button clicked');
    event.preventDefault();
    window.location = `${authorization.authEndpoint}?client_id=${authorization.clientId}&redirect_uri=${authorization.redirectUri}&response_type=token&show_dialog=true`;
  });
}

function watchSubmit() {
  $('.js-artist-search').submit(event => {
    console.log('submit button clicked');
    event.preventDefault();
    if (!_token) {
      window.location = `${authorization.authEndpoint}?client_id=${authorization.clientId}&redirect_uri=${authorization.redirectUri}&response_type=token&show_dialog=true`;
    } else {
      const queryBand = $(event.currentTarget).find('.js-query');
      query = queryBand.val();
      console.log(`You searched for ${query}`);  
      queryBand.val('');
      api.initialArtistSearch(query);
      $('#selection-view').hide();
      $('#feedback').show();
      $('#restart-nav').show();
      $('#song-view').show();
      handleNoFeedback();
      handleYesFeedback();
      handleRestartButton();
    }
  });
}

function handleNoFeedback() {
  $('#no-button').click(event => {
    console.log('No button clicked');
    api.initialArtistSearch(query);
  });
}

function handleYesFeedback() {
  $('#yes-button').click(event => {
    console.log(relatedArtistId);
    $('#artist-view').show();
    $('#feedback').hide();
    generator.postArtistInfo(relatedArtistData);

  });
}

function handleRestartButton() {
  $('#restart-button').click(event => {
    console.log('restarted!');
    $('#song-view').hide();
    $('#feedback').hide();
    $('#artist-view').hide();
    $('#restart-nav').hide();
    $('#selection-view').show();
  });
}

//random number function. used in API call to randomize artist/track played
function randomInteger(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

$(generator.initializePage);
$(watchSubmit);
$(handleSpotifyLogin);

