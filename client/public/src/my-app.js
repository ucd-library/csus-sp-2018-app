/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { setPassiveTouchGestures, setRootPath } from '@polymer/polymer/lib/utils/settings.js';
// import '@polymer/app-layout/app-drawer/app-drawer.js';
// import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
// import '@polymer/app-layout/app-header/app-header.js';
// import '@polymer/app-layout/app-header-layout/app-header-layout.js';
// import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
// import '@polymer/app-layout/app-toolbar/app-toolbar.js';
// import '@polymer/app-route/app-location.js';
// import '@polymer/app-route/app-route.js';
// import '@polymer/iron-pages/iron-pages.js';
// import '@polymer/iron-selector/iron-selector.js';
// import '@polymer/paper-icon-button/paper-icon-button.js';
// import './my-icons.js';
import {style, map}from 'leaflet';
import leafletDraw from 'leaflet-draw';
import leafletDrawCss from 'leaflet-draw/dist/leaflet.draw-src.css'
import leafletCss from 'leaflet/dist/leaflet.css'
import template from './my-app.html'
// const styleElement = document.createElement('dom-module')
//
// styleElement.innerHTML =`
//   <template>
//     <style>
//       ${leafletCss}
//     </style>
//   </template>
// `
// styleElement.register('shared-styles')


class MyApp extends PolymerElement {
  static get template() {
    let tag = document.createElement('template');
    tag.innerHTML = `<style>${leafletCss}</style>${template}`;
    return tag;
  //   return html `
  //   <style include='shared-styles'></style>
  //   <div id='map' style='width: 900px; height: 500px'></div>
  //   `
    }
  ready(){
      super.ready();

      const iiif_svc = 'svc:iiif/full/full/0/default.jpg';
      const img_host = 'http://localhost:3000/fcrepo/rest/';


      var img_loc = 'collection/example_3-catalogs/catalogs/199/media/images/199-3';
      var src = img_host + img_loc + '/' + iiif_svc;


      var map = L.map(this.$.map, {
          drawControl: false,
          zoomSnap: .25,
          minZoom: -3.5,
          crs: L.CRS.Simple
      });


      var img = new Image();
      var imgH, imgW = 0;
      img.addEventListener("load",function(){
          imgH = this.naturalHeight;
          imgW = this.naturalWidth;
          var bounds = [[0,0], [imgH, imgW]];
          L.imageOverlay(src, bounds).addTo(map);
          map.fitBounds(bounds);
      });
      img.src = src;


      var drawnItems = new L.FeatureGroup();
      map.addLayer(drawnItems);
      var drawControl = new L.Control.Draw({
          draw: {
              polygon: false,
              marker: false,
              circle: false,
              polyline: false,
              circlemarker: false
          },
          edit: {
              featureGroup: drawnItems
          }
      });
      map.addControl(drawControl);


      map.on('draw:created', function(e) {
          var type = e.layerType,
              layer = e.layer;
          layer.on('click', clickBox);
          drawnItems.addLayer(layer);
      });


      var clickBox = function(event) {
          var coords = this.getLatLngs();
          var box = geo_to_pixel(coords[0]);
          //post(box);
          var popup = L.popup()
              .setLatLng(this._bounds._northEast)
              .setContent('<p><button type="button" onclick="post(box)">Send To Tesseract</button></p>')
              .openOn(map);
          console.log(coords);
          console.log(box);
          console.log(this);
          console.log("id: " + this.feature.properties.id);
      };


      function geo_to_pixel(geo){
          let sw = geo[0];
          let nw = geo[1];
          let ne = geo[2];
          let se = geo[3];

          let width = Math.round(se['lng'] - sw['lng']);
          let height = Math.round(ne['lat'] - se['lat']);
          let pixel = [Math.round(nw['lng']), Math.round(imgH - nw['lat'])];

          return [width,  height,  pixel];
      }


      function display_boxes(boxes){
          boxes.forEach(box => draw_to_map(box))
      }

      
      function draw_to_map(box){
          var p1 = [box._tesseract_request._box_y_loc,
              box._tesseract_request._box_x_loc
          ];
          var p2 = [box._tesseract_request._box_y_loc - box._tesseract_request._box_height,
              box._tesseract_request._box_x_loc + box._tesseract_request._box_width
          ];
          var box_bounds = [p1, p2];
          var layer = L.rectangle(box_bounds, {color: "red", weight: 1});

          var feature = layer.feature = layer.feature || {};

          feature.type = feature.type || "Feature";
          var props = feature.properties = feature.properties || {};
          props.id = box._box_id;

          layer.on('click', clickBox);
          drawnItems.addLayer(layer);
      }


      function post(data){
          let xhr = new XMLHttpRequest();

          xhr.open("POST", 'tesseract', true);
          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.onreadystatechange = function () {
              if (xhr.readyState === 4 && xhr.status === 200) {
                  console.log(this.responseText);
                  var newWin = open('url','windowName','height=300,width=300');
                  newWin.document.write(this.responseText);
              }
          };
          xhr.send(data);
      }


      //Todo: Add locations to hold box_list and/or LDP data
      //tests data
      var ldp_data = {
          "user": "sample user",
          "image_path": "collection/example_3-catalogs/catalogs/199/media/images/199-3",
          "image_file": "199-3.jpg",
          "image_height": 6000,
          "image_width": 4000,
          "time_stamp": "Wed Nov 07 2018",
          "box_list": [
              {
                  "_tesseract_request": {
                      "_image_path": "collection/example_3-catalogs/catalogs/199/media/images/199-3",
                      "_box_x_loc": 1520,
                      "_box_y_loc": 2300,
                      "_box_width": 1000,
                      "_box_height": 200,
                      "_rotation_angle": 0
                  },
                  "_corrected_data": null,
                  "_ocr_data": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\"\n    \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">\n<html xmlns=\"http://www.w3.org/1999/xhtml\" xml:lang=\"en\" lang=\"en\">\n <head>\n  <title></title>\n<meta http-equiv=\"Content-Type\" content=\"text/html;charset=utf-8\" />\n  <meta name='ocr-system' content='tesseract 4.0.0-beta.1-262-g555f' />\n  <meta name='ocr-capabilities' content='ocr_page ocr_carea ocr_par ocr_line ocrx_word'/>\n</head>\n<body>\n  <div class='ocr_page' id='page_1' title='image \"/tmp-app-files/6d846cbe-4690-4c05-9507-1f68e53381cf.jpg\"; bbox 0 0 900 400; ppageno 0'>\n   <div class='ocr_carea' id='block_1_1' title=\"bbox 54 185 664 235\">\n    <p class='ocr_par' id='par_1_1' lang='eng' title=\"bbox 54 185 664 235\">\n     <span class='ocr_line' id='line_1_1' title=\"bbox 54 185 664 235; baseline 0 -12; x_size 50; x_descenders 12; x_ascenders 12\"><span class='ocrx_word' id='word_1_1' title='bbox 54 186 103 223; x_wconf 92'>S4</span> <span class='ocrx_word' id='word_1_2' title='bbox 141 186 248 235; x_wconf 95'>High</span> <span class='ocrx_word' id='word_1_3' title='bbox 263 186 386 223; x_wconf 96'>Table</span> <span class='ocrx_word' id='word_1_4' title='bbox 402 186 501 223; x_wconf 96'>Fino</span> <span class='ocrx_word' id='word_1_5' title='bbox 516 185 664 234; x_wconf 96'>Sherry</span> \n     </span>\n    </p>\n   </div>\n   <div class='ocr_carea' id='block_1_2' title=\"bbox 57 302 811 357\">\n    <p class='ocr_par' id='par_1_2' lang='eng' title=\"bbox 57 302 811 357\">\n     <span class='ocr_line' id='line_1_2' title=\"bbox 57 302 811 357; baseline -0.011 -10; x_size 50; x_descenders 12; x_ascenders 13\"><span class='ocrx_word' id='word_1_6' title='bbox 57 310 104 347; x_wconf 88'>S5</span> <span class='ocrx_word' id='word_1_7' title='bbox 143 308 355 357; x_wconf 92'>Abingdon</span> <span class='ocrx_word' id='word_1_8' title='bbox 370 304 648 344; x_wconf 92'>Amontillado</span> <span class='ocrx_word' id='word_1_9' title='bbox 663 302 811 351; x_wconf 96'>Sherry</span> \n     </span>\n    </p>\n   </div>\n  </div>\n </body>\n</html>\n",
                  "_parsed_data": "S4 High Table Fino Sherry \n     \n    \n   \n   \n    \n     S5 Abingdon Amontillado Sherry",
                  "_box_id": 0
              },
              {
                  "_tesseract_request": {
                      "_image_path": "collection/example_3-catalogs/catalogs/199/media/images/199-3",
                      "_box_x_loc": 1000,
                      "_box_y_loc": 5000,
                      "_box_width": 1000,
                      "_box_height": 200,
                      "_rotation_angle": 0
                  },
                  "_corrected_data": null,
                  "_ocr_data": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\"\n    \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">\n<html xmlns=\"http://www.w3.org/1999/xhtml\" xml:lang=\"en\" lang=\"en\">\n <head>\n  <title></title>\n<meta http-equiv=\"Content-Type\" content=\"text/html;charset=utf-8\" />\n  <meta name='ocr-system' content='tesseract 4.0.0-beta.1-262-g555f' />\n  <meta name='ocr-capabilities' content='ocr_page ocr_carea ocr_par ocr_line ocrx_word'/>\n</head>\n<body>\n  <div class='ocr_page' id='page_1' title='image \"/tmp-app-files/6d846cbe-4690-4c05-9507-1f68e53381cf.jpg\"; bbox 0 0 900 400; ppageno 0'>\n   <div class='ocr_carea' id='block_1_1' title=\"bbox 54 185 664 235\">\n    <p class='ocr_par' id='par_1_1' lang='eng' title=\"bbox 54 185 664 235\">\n     <span class='ocr_line' id='line_1_1' title=\"bbox 54 185 664 235; baseline 0 -12; x_size 50; x_descenders 12; x_ascenders 12\"><span class='ocrx_word' id='word_1_1' title='bbox 54 186 103 223; x_wconf 92'>S4</span> <span class='ocrx_word' id='word_1_2' title='bbox 141 186 248 235; x_wconf 95'>High</span> <span class='ocrx_word' id='word_1_3' title='bbox 263 186 386 223; x_wconf 96'>Table</span> <span class='ocrx_word' id='word_1_4' title='bbox 402 186 501 223; x_wconf 96'>Fino</span> <span class='ocrx_word' id='word_1_5' title='bbox 516 185 664 234; x_wconf 96'>Sherry</span> \n     </span>\n    </p>\n   </div>\n   <div class='ocr_carea' id='block_1_2' title=\"bbox 57 302 811 357\">\n    <p class='ocr_par' id='par_1_2' lang='eng' title=\"bbox 57 302 811 357\">\n     <span class='ocr_line' id='line_1_2' title=\"bbox 57 302 811 357; baseline -0.011 -10; x_size 50; x_descenders 12; x_ascenders 13\"><span class='ocrx_word' id='word_1_6' title='bbox 57 310 104 347; x_wconf 88'>S5</span> <span class='ocrx_word' id='word_1_7' title='bbox 143 308 355 357; x_wconf 92'>Abingdon</span> <span class='ocrx_word' id='word_1_8' title='bbox 370 304 648 344; x_wconf 92'>Amontillado</span> <span class='ocrx_word' id='word_1_9' title='bbox 663 302 811 351; x_wconf 96'>Sherry</span> \n     </span>\n    </p>\n   </div>\n  </div>\n </body>\n</html>\n",
                  "_parsed_data": "S4 High Table Fino Sherry \n     \n    \n   \n   \n    \n     S5 Abingdon Amontillado Sherry",
                  "_box_id": 1
              }
          ]
      };

      var box_list = ldp_data.box_list;
      console.log(box_list);

      display_boxes(box_list);



      //Todo: allow leaflet-draw to interact with imported boxes


      //Todo: attach box_id to boxes


      //Todo: write GET request


      //Todo: write DELETE request


      //Todo: write Post request





/*

      //get specify nothing
      //delete send "box_id" : #
      //put "box_id" of box to edit, tesseract data in JSON of options to edit
      var map = L.map(this.$.map, {
          drawControl: false,
          zoomSnap: .25,
          minZoom: -3.5,
          crs: L.CRS.Simple
      });

      const iiif_svc = 'svc:iiif/full/full/0/default.jpg';
      const img_host = 'http://localhost:3000/fcrepo/rest/';

      var img_loc = 'collection/example_3-catalogs/catalogs/199/media/images/199-3';
      var src = img_host + img_loc + '/' + iiif_svc;

      // Create new image  object, this will allow the pre-caching of the image before it loads into leaflet
      // This allows us to take the dimensions of the image and use them to define the bounds of the leaflet "map"
      var img = new Image();
      var imgH, imgW = 0;
      img.addEventListener("load",function(){
          imgH = this.naturalHeight;
          imgW = this.naturalWidth;
          console.log("height: " + imgH + " width: " + imgW);
          var bounds = [[0,0], [imgH, imgW]];
          var image = L.imageOverlay(src, bounds).addTo(map);
          map.fitBounds(bounds);
      });
      img.src = src;


      // Add the leaflet draw API to the image to allow the creation of boxes
      var drawnItems = new L.FeatureGroup();
      map.addLayer(drawnItems);
      var drawControl = new L.Control.Draw({
          draw: {
              polygon: false,
              marker: false,
              circle: false,
              polyline: false,
              circlemarker: false
          },
          edit: {
              featureGroup: drawnItems
          }
      });
      map.addControl(drawControl);


      // Send created JSON object to server to be run in tesseract
      // for now, print response to console
      function post(data){
          let xhr = new XMLHttpRequest();

          xhr.open("POST", 'tesseract', true);
          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.onreadystatechange = function () {
              if (xhr.readyState === 4 && xhr.status === 200) {
                  console.log(this.responseText);
                  var newWin = open('url','windowName','height=300,width=300');
                  newWin.document.write(this.responseText);
              }
          };
          xhr.send(data);
      }


      var clickBox = function(event) {
          var coords = this.getLatLngs();
          var box = JSON.stringify(convert(coords[0]));
          post(box);
          var popup = L.popup()
              .setLatLng(this._bounds._northEast)
              .setContent('<p><button type="button" onclick="post(box)">Send To Tesseract</button></p>')
              .openOn(map);
      };


      // When a box is drawn on the image, same the box info (corners, dimensions, etc) create JSON object and
      // send to tesseract
      map.on('draw:created', function(e) {
          var type = e.layerType,
              layer = e.layer;
          layer.on('click', clickBox);
          drawnItems.addLayer(layer);
      });


      // Convert the coordinates generated by leaflet Draw into a format usable by tesseract
      // called in "map.on('draw:created', function(e)"
      function convert(coords){
          // lat = x, lon = y
          // rectangle drawn clockwise starting with south west corner
          // points need to be scaled up by 10 to equate to pixels
          let sw = upscale(coords[0]);
          let nw = upscale(coords[1]);
          let ne = upscale(coords[2]);
          let se = upscale(coords[3]);

          // Round values to remove any decimals, which would confuse tesseract
          let wdth = Math.round(se[0] - sw[0]);
          let hght = Math.round(ne[1] - se[1]);

          // leaflet calculates y as distance from bottom
          // tesseract y is distance from top
          // origin y = img height - northern most y coordinate
          let x_loc = Math.round(nw[0]);
          let y_loc = Math.round(imgH - nw[1]);

          let data_to_return = {
              image_path:img_loc,
              box_x_loc:x_loc,
              box_y_loc:y_loc,
              box_width:wdth,
              box_height:hght,
              rotation_angle:0

          };

          console.log(data_to_return);


          return data_to_return
      }

      // scales the coordinates from latLon to pixels
      function upscale(latLon) {
          return [latLon["lng"] * scaler, latLon["lat"] * scaler]
      }

   */
  }

}

window.customElements.define('my-app', MyApp);
