jQuery(function($) {
  var map, kitties, mapDiv;
  mapDiv = $("#kitty_map");
  kitties = [];
  function zoomGlobal() {
    map.setZoom(3);
  }
  function saveProgress() { // TODO: save mined kitties
    alert("Shh shhh. Just keep it to yourself for now.");
  }
  function mineKitty() {
    var kitty = getKittyInStreetView();
    if (kitty) {
      if ("this kitty has not been found yet") { // TODO: check if kitty has been mined
        kitties.push(kitty);
        var kittyJSON = JSON.stringify(kitty);
        // TODO: store kittyJSON for the masses
        $(".kitty-list").append('<li class="kitty" data-kitty="'+kittyJSON.replace(/"/g, '&quot;')+'"></li>');
        $(".kitty-counter").text(kitties.length);
      } else {
        alert("Popular Kitty! This kitty has already been mined.");
      }
    }
  }
  function getKittyInStreetView() {
    var kitty;
    if (!map.streetView.getVisible()) {
      window.alert("You must be in Street View to MINE KITTY");
    } else if (map.streetView.getZoom() < 2) {
      window.alert("Are you sure that's a kitty? Get a closer look!");
    } else {
      kitty = {
        position: map.streetView.getPosition(),
        pov: map.streetView.getPov()
      };
    }
    return kitty;
  }
  function showKittyInStreetView(kitty) {
    map.streetView.setVisible(true);
    map.streetView.setPosition(new google.maps.LatLng(kitty.position.b, kitty.position.d));
    map.streetView.setPov(kitty.pov);
  }
  function clickKitty(event) {
    showKittyInStreetView($(event.target).data('kitty'));
  }
  function setupMap() {
    var mapOptions = {
      center: new google.maps.LatLng(19.4, 12.5),
      zoom: 3
    };
    map = new google.maps.Map(document.getElementById("kitty_map"), mapOptions);
    window.map = map;
  }
  function setupButtons() {
    $(".mine-kitty").click(mineKitty);
    $(".save-progress").click(saveProgress);
    $("nav").on('click', '.kitty', clickKitty);
  }
  function init() {
    setupMap();
    setupButtons();
  }
  google.maps.event.addDomListener(window, 'load', init);
});
