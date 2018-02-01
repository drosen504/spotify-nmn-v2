'use strict';
/* global $ */

const generator = function() {
  return {
    handlePlayerWidget: function(trackId) {
      $('#song-view').html(`<iframe id="play-widget" src="https://open.spotify.com/embed?uri=spotify:track:${trackId}"
      frameborder="0" allowtransparency="true"></iframe>`);
    },
    postArtistInfo: function() {
      $('#artist-view').html('<p>Artist Info Placeholder</p>');
    } 
    
  

  // {
  //   initializePage: function() {
  //     console.log('Initial View Loaded');
  //     if (!_token) {
  //       $('#selection-view').hide();
  //       $('#song-view').hide();
  //       $('#feedback').hide();
  //       $('#artist-view').hide();
  //     } else {
  //       $('#landing-view').hide();
  //       $('#feedback').hide();
  //       $('#artist-view').hide();
  //     }
  //   }

  };
}(); 