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
      const img_host = 'http://digital.ucdavis.edu/fcrepo/rest/';
      let ldp_data = null;

      let img_loc = null;


      var map = L.map(this.$.map, {

          drawControl: false,
          zoomSnap: .25,
          minZoom: -3.5,
          crs: L.CRS.Simple
      });


      let img = new Image();
      let imgH, imgW = 0;

      request("GET", '', false, true)

      L.EditToolbar.Delete.include({
          removeAllLayers: false
      });

      let drawnItems = new L.FeatureGroup();
      map.addLayer(drawnItems);
      let drawControl = new L.Control.Draw({
          draw: {
              polygon: false,
              marker: false,
              circle: false,
              polyline: false,
              circlemarker: false
          },
          edit: {
              featureGroup: drawnItems,
              edit: false
          }
      });
      map.addControl(drawControl);


      // Create new box
      map.on('draw:created', function(e) {
          let type = e.layerType,
              layer = e.layer;
          layer.on('click', clickBox);
          drawnItems.addLayer(layer);
          let coords = layer.getLatLngs();
          let box = geo_to_pixel(coords[0]);
          request("POST", box);
      });



      // Edit existing box
      map.on('draw:edited', function(e){
          console.log("Edited")
      });

      // Delete existing box
      map.on('draw:deleted', function(e){
          let layers = e.layers;
          let deleted_boxes = [];

          layers.eachLayer(function (layer) {
              deleted_boxes.push(layer.feature.properties.id)
          });
          let to_delete = {id_list: deleted_boxes};
          request("DELETE", to_delete);
      });


      //select existing box
      let clickBox = function(event) {
          let coords = this.getLatLngs();
          let box = geo_to_pixel(coords[0]);

          console.log("Clicked box: " + this);

          let clicked_box_id = this.feature.properties.id;
          let box_list = ldp_data.box_list;

          for(var i in box_list){
              if (box_list[i]['_box_id'] === clicked_box_id){

                  console.log(box_list[i]['_parsed_data']);
                  setData(box_list[i]['_parsed_data']);
              }
          }
          console.log("Box ID: " + this.feature.properties.id);

      };

      //convert geoJSON coordinates to pixel coordinates on image
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


      // Draw boxes from box_list on image
      function display_boxes(boxes){
          console.log('Drawing Boxes');
          drawnItems.clearLayers()
          boxes.forEach(box => draw_to_map(box))
      }


      // Convert pixel coordinates of box to geoJSON and draw
      function draw_to_map(box){
          console.log("From LDP :" + box);
          let p1 = [imgH - box._tesseract_request._box_y_loc,
              box._tesseract_request._box_x_loc
          ];
          let p2 = [imgH - (box._tesseract_request._box_y_loc + box._tesseract_request._box_height),
              box._tesseract_request._box_x_loc + box._tesseract_request._box_width
          ];
          let box_bounds = [p1, p2];
          console.log(box_bounds);
          let layer = L.rectangle(box_bounds, {color: "green", weight: 1});

          let feature = layer.feature = layer.feature || {};
          feature.type = feature.type || "Feature";
          let props = feature.properties = feature.properties || {};
          props.id = box._box_id;

          layer.on('click', clickBox);
          drawnItems.addLayer(layer);
      }

      function addImage(img, src, map) {
          img.addEventListener("load", function () {
              imgH = this.naturalHeight;
              imgW = this.naturalWidth;
              let bounds = [[0, 0], [imgH, imgW]];
              L.imageOverlay(src, bounds).addTo(map);
              map.fitBounds(bounds);
          });
      }


      function request(call, data, redraw=true, init=false){
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
                  if(init){
                      img_loc = ldp_data.image_path;
                      let src = img_host + ldp_data.image_path + '/' + iiif_svc;
                      console.log("SOURCE", src);
                      addImage(img, src, map);
                      img.src = src;
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

  }

}

window.customElements.define('my-app', MyApp);
