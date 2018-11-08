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
    tag.innerHTML = template;
    return tag;
    }

    static get properties() {
      return {
        test: { type: String, value: {}, notify: true },
      }
    }


  ready(){
      super.ready();

      let map = L.map(this.$.map, { drawControl: false , crs: L.CRS.Simple});

      const iiif_svc = 'svc:iiif/full/full/0/default.jpg';
      const tsrct = 'svc:tesseract/full/full/0/default.jpg';
      const scaler = 10; //scale difference between pixels and lat/lon

      var img_host = 'http://localhost:3000/fcrepo/rest/';
      var img_loc = 'collection/example_3-catalogs/catalogs/199/media/images/199-3';
      var src = img_host + img_loc + '/' + iiif_svc;




      // Create new image  object, this will allow the pre-caching of the image before it loads into leaflet
      // This allows us to take the dimensions of the image and use them to define the bounds of the leaflet "map"
      var img = new Image();
      var imgH, imgW = 0;
      img.addEventListener("load",function(){
          imgH = this.naturalHeight;
          imgW = this.naturalWidth;
          let bounds = [[0,0], [imgH/scaler, imgW/scaler]];
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
                  var myObj = JSON.parse(this.responseText);
                  // this.setProperties({test:myObj._parsed_data});
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
      }


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
      this.setProperties({
          text_val: 'test'
      })
  }
}

window.customElements.define('my-app', MyApp);
