
//Create our map, set draw control to display drawing toolbar
var map = L.map('map', { drawControl: true , crs: L.CRS.Simple}).setView([-41.2858, 174.78682], 5);
mapLink =
  '<a href="http://openstreetmap.org">OpenStreetMap</a>';
L.tileLayer(
  'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
  }).addTo(map);

//Add leaflet.draw
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

var drawControl = new L.Control.Draw({
  edit: {
    featureGroup: drawnItems
  }
});
map.addControl(drawControl);

map.on('draw:created', function(e) {
  var type = e.layerType,
  layer = e.layer;
  var shape = layer.toGeoJSON()
  var shape_for_db = JSON.stringify(shape);
  console.log(shape_for_db);
  drawnItems.addLayer(layer);
});


//Add image overlay

var imageUrl = '199-2.jpg';
var imageBounds = [-41.2858, 174.78682];
L.imageOverlay(imageUrl, imageBounds).addTo(map);
