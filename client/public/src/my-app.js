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
      let ldp_data = null;


      var img_loc = 'collection/example_3-catalogs/catalogs/199/media/images/199-3';
      var src = img_host + img_loc + '/' + iiif_svc;

      request("GET", '');



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
          var coords = layer.getLatLngs();
          var box = geo_to_pixel(coords[0]);
          //post(box);
          request("POST", box);

      });


      var clickBox = function(event) {
          var coords = this.getLatLngs();
          var box = geo_to_pixel(coords[0]);
          //post(box);
          // request("POST", box);
          var popup = L.popup()
              .setLatLng(this._bounds._northEast)
              .setContent('<p><button type="button" onclick="post(box)">Send To Tesseract</button></p>')
              .openOn(map);

          let clicked_box_id = this.feature.properties.id;
          let box_list = ldp_data.box_list;

          console.log("THIS IS MY BOX LIST:", box_list)

          for(var i in box_list){
              if (box_list[i]['_box_id'] == clicked_box_id){
                  console.log(box_list[i]['_parsed_data']);
                  setData(box_list[i]['_parsed_data']);
              }
          }


          console.log("Box ID: " + this.feature.properties.id);

      };


      function geo_to_pixel(geo) {
          let sw = geo[0];
          let nw = geo[1];
          let ne = geo[2];
          let se = geo[3];

          let width = Math.round(se['lng'] - sw['lng']);
          let height = Math.round(ne['lat'] - se['lat']);
          let x_coord = Math.round(nw['lng']);
          let y_coord = Math.round(imgH - nw['lat']);

          return {
              image_path: img_loc,
              box_x_loc: x_coord,
              box_y_loc: y_coord,
              box_width: width,
              box_height: height,
              rotation_angle: 0
          };
      }


      function display_boxes(boxes){
          console.log('Drawing Boxes');
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


      function request(call, data, redraw=true){
          let xhr = new XMLHttpRequest();
          xhr.open(call, 'tesseract', true);
          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.onreadystatechange = function () {
              if (xhr.readyState === 4 && xhr.status === 200) {
                  ldp_data = JSON.parse(this.responseText);
                  if (redraw){
                      let box_list = ldp_data['box_list'];
                      display_boxes(box_list);
                  }
                  console.log(ldp_data);
              };
          };
          xhr.send(JSON.stringify(data));
      }

      let self = this;
      function setData(data){
          self.setProperties({
              text_val: data
          })
      }


      if (ldp_data) {
          display_boxes(ldp_data.box_list);
      }


      //Todo: write GET request


      //Todo: write DELETE request

  }

}

window.customElements.define('my-app', MyApp);
