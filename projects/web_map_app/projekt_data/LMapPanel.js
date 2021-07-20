Ext.define('projekt_data.LMapPanel', {
    extend: 'Ext.panel.Panel',    
    alias: 'widget.lmappanel',    
    requires: ['Ext.window.MessageBox'],
	config:{
		initialLocation: [62.18, 15.58],
		initialZoomLevel: 5,
		map: null,
		useCurrentLocation: false,
		tileLayerUrl: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
		tileLayerStyle: 997,
		tileMinZoom: 5,
		tileMaxZoom: 18,
		attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
	},
	afterRender: function(t, eOpts){
		this.callParent(arguments);

		var leafletRef = window.L;
		if (leafletRef == null){
			this.update("No leaflet library loaded");
		} else {
			var info = document.getElementById('info');
			var map = L.map(this.getId(),{
				doubleClickZoom: false
			});
			this.setMap(map);

			var initialLocation = this.getInitialLocation();
			var initialZoomLevel = this.getInitialZoomLevel();
			if (initialLocation && initialZoomLevel){
				map.setView(initialLocation, initialZoomLevel);
			} else {
				map.fitWorld();
			}

			var osm = L.tileLayer(this.getTileLayerUrl(), {
				styleId: this.getTileLayerStyle(),
				minZoom: this.getTileMinZoom(),
				maxZoom: this.getTileMaxZoom(),
				attribution: this.getAttribution()
			}).addTo(map);
			// Create another osm.
			var stamenLayer = new L.TileLayer('http://tile.stamen.com/terrain/{z}/{x}/{y}.png',{
				minZoom: this.getTileMinZoom(),
				maxZoom: this.getTileMaxZoom(),
				attribution: this.getAttribution()
			}).addTo(map);

			// Create another osm.
			var OpenStreetMap_BlackAndWhite = new L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
				minZoom: this.getTileMinZoom(),
				maxZoom: this.getTileMaxZoom(),
				attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
			}).addTo(map);

			/*
			var range = document.getElementById('swipe');

			function clip() {
				var nw = map.containerPointToLayerPoint([0, 0]),
					se = map.containerPointToLayerPoint(map.getSize()),
					clipX = nw.x + (se.x - nw.x) * (range.value/100);

				stamenLayer.getContainer().style.clip = 'rect(' + [nw.y, clipX, se.y, nw.x].join('px,') + 'px)';
			}

			range['oninput' in range ? 'oninput' : 'onchange'] = clip;
			map.on('move', clip);

			clip();
			*/
			popup = L.popup();

			// Style for hikings.
			var hikingsStyle = {
				color: "black",
				weight: 3,
				opacity: 0.8
			};

			// Style for selected hiking
			var selectedHikingStyle = {
				color: 'red',
				weight: 5,
				opacity: 0.8
			};

			// Buffer style for clicked hiking.
			var bufferStyle = {
				color: "#483D8B",
				weight: 5,
				opacity: 0.8
			};

			// Make first letter uppercase.
			function capitalize(inputString){
				if(inputString == null){
					return "There is no text";
				}
				else{
					return inputString.charAt(0).toUpperCase() + inputString.slice(1);
				}
			}

			// Get feature's name
			function getInfo(feature) {
				switch(feature.properties.type || feature.properties.Typ_av_led){
					case 'Vandringsled': return info.innerHTML += "<br>" + capitalize(feature.properties.Typ_av_led).bold() + ": " + feature.properties.Lednamn; break;
					case 'hotel': return info.innerHTML += "<br>" + capitalize(feature.properties.type).bold() + ": " + feature.properties.name; break;
					case 'hostel': return info.innerHTML += "<br>" + capitalize(feature.properties.type).bold() + ": " + feature.properties.name; break;
					case 'restaurant': return info.innerHTML += "<br>" + capitalize(feature.properties.type).bold() + ": " + feature.properties.name; break;
				}
			}

			// Function for showing information on points.
			function onEachFeaturePoints(feature, layer){
				label = String(feature.properties.name); // Must convert to string, .bindTooltip can't use straight 'feature.properties.name'
				layer.bindTooltip(label);
				layer.on('click', function(){
					getInfo(feature);
				});
			}


			// Geojson layer for hostels.
			hostelsLayer = L.geoJSON(hostels, {
				pointToLayer: function(feature,latlng){
					label = String(feature.properties.name); // Must convert to string, .bindTooltip can't use straight 'feature.properties.name'
					return new L.CircleMarker(latlng, {
						color: 'yellow',
						fillColor: "#ff7800",
						radius: 4,
					}).bindTooltip(label, {permanent: false, opacity: 0.7}).openTooltip();
				},
				onEachFeature: onEachFeaturePoints
			}).addTo(map);

			// Geojson layer for hotels.
			hotelsLayer = L.geoJSON(hotels, {
				pointToLayer: function(feature,latlng){
					label = String(feature.properties.name); // Must convert to string, .bindTooltip can't use straight 'feature.properties.name'
					return new L.CircleMarker(latlng, {
						color: 'navy',
						fillColor: "#ff7800",
						radius: 4,
					}).bindTooltip(label, {permanent: false, opacity: 0.7}).openTooltip();
				},
				onEachFeature: onEachFeaturePoints
			}).addTo(map);

			// Geojson layer for restaurants.
			restaurantsLayer = L.geoJSON(restaurants, {
				pointToLayer: function(feature, latlng) {
					label = String(feature.properties.name);
					return new L.CircleMarker(latlng, {
						color: 'red',
						fillColor: "ff7200",
						radius: 4,
					}).bindTooltip(label, {permanent: false, opacity: 0.7}).openTooltip();
				},
				onEachFeature: onEachFeaturePoints
			}).addTo(map);

			function highlightFeature(e) {
				var layer = e.target;
				layer.setStyle({
					weight: 6,
					color: 'blue',
					dashArray: '',
					fillOpacity: 0.8
				});
			}

			function resetHighlight(e) {
				hikingsLayer.resetStyle(e.target);
			}

			function getNumberOfPointsWithinBuffer(totalOfFeatures){
				if(totalOfFeatures > 1){
					info.innerHTML += "<br>" + totalOfFeatures + " points are inside the buffer.";
				}
				else {
					info.innerHTML += "<br>" + totalOfFeatures + " point are inside the buffer.";
				}
			}


			function onEachFeatureHikings(feature, layer){
				label = String(feature.properties.Lednamn); // Must convert to string, .bindTooltip can't use straight 'feature.properties.Lednamn'
				layer.bindTooltip(label);
				layer.on({
					mouseover: highlightFeature,
					mouseout: resetHighlight,
					click: function(){
						getInfo(feature);
						selected = true;
						hikingsLayer.clearLayers();
						hikingsLayer.addData(feature);
						map.fitBounds(layer.getBounds());			
						var selectedHikingGeoJson = L.geoJSON(feature, {
							style: selectedHikingStyle
						}).addTo(map);

						bufferedHiking = turf.buffer(selectedHikingGeoJson.toGeoJSON(), 10, {units: 'kilometers'});
						hikingBuffer = L.geoJSON(bufferedHiking, {
							style: bufferStyle
						}).addTo(map);

						var ptsWithin = [];
						ptsWithin.push(turf.within(restaurantsLayer.toGeoJSON(), hikingBuffer.toGeoJSON()).features.length);
						ptsWithin.push(turf.within(hotelsLayer.toGeoJSON(), hikingBuffer.toGeoJSON()).features.length);
						ptsWithin.push(turf.within(hostelsLayer.toGeoJSON(), hikingBuffer.toGeoJSON()).features.length);

						// Function count number of points are within buffer polygon.
						const sumOfFeatures = arr => arr.reduce((a, b) => a + b, 0);
						var totalOfFeatures = sumOfFeatures(ptsWithin);
						getNumberOfPointsWithinBuffer(totalOfFeatures);

						hikingBuffer.eachLayer(function(layer){
							hikingBuffer.on('click', function(e){
								getInfo(feature);
								getNumberOfPointsWithinBuffer(totalOfFeatures);

								// This is showing number of closest point layers to searched coordinate.
								var closestLayer = L.GeometryUtil.nClosestLayers(map.fitBounds(layer.getBounds()), hikingBuffer.getLayers()
								.concat(restaurantsLayer.getLayers(), hostelsLayer.getLayers(), hotelsLayer.getLayers()), e.latlng, totalOfFeatures);

								for(var id in closestLayer){
									info.innerHTML += "<br> " + capitalize(closestLayer[id].layer.feature.properties.type).bold() + ": "
									+ capitalize(closestLayer[id].layer.feature.properties.name)
									+ "<br><strong> Distance in pixels: </strong>" + closestLayer[id].distance.toFixed(2)
									+ "<br><strong>Distance in meters: </strong>" + L.GeometryUtil.length([e.latlng, closestLayer[id].latlng]).toFixed(2);
								}

								// This is using if layers are within searched coordinate and using pixlar.
								/*
								var layersWithins = L.GeometryUtil.layersWithin(map.fitBounds(layer.getBounds()), hikingBuffer.getLayers()
								.concat(restaurantsLayer.getLayers(), hostelsLayer.getLayers(), hotelsLayer.getLayers()), e.latlng, 4);

								for(var id in layersWithins){
									info.innerHTML += "<br> " + capitalize(layersWithins[id].layer.feature.properties.type).bold() + ": "
									+ capitalize(layersWithins[id].layer.feature.properties.name)
									+ "<br><strong> Distance in pixels: </strong>" + layersWithins[id].distance.toFixed(2)
									+ "<br><strong>Distance in meters: </strong>" + L.GeometryUtil.length([e.latlng, layersWithins[id].latlng]).toFixed(2);
								}
								*/

							});
						});
					}
				});
			}

			hikingsLayer = L.geoJSON(hikings, {
				style: hikingsStyle,
				onEachFeature: onEachFeatureHikings
			}).addTo(map);


			// Function for showing coordinates and popup.
			function onMapClick(e){
				var coordinate = e.latlng.toString().split(',');
				var lat = coordinate[0].split('(');
				var lng = coordinate[1].split(')');
				var latlng = "You preclicked the map at <br><strong>Latitude: </strong>" + lat[1]
				+ "<br><strong>Longitude: </strong>" + lng[0];
				info.innerHTML = latlng;
				popup
					.setLatLng(e.latlng)
					.setContent(latlng)
					.openOn(map);
			}

			// Use function onMapClick.
			map.on('preclick', onMapClick);

			// Go back to original maps.
			map.on('dblclick', function(){
				if(selected){
					hikingsLayer.clearLayers();
					hikingsLayer.addData(hikings);
					map.fitBounds(hikingsLayer.getBounds());
					hikingBuffer.clearLayers();
				}
			});

			// Create different base maps.
			var baseMaps = {
				"<strong><span style='color: gray'>Open Street Map</span></strong>": osm,
				"<strong><span style='color: green'>Terrain</span></strong>": stamenLayer,
				"<strong><span style='color: black'>OSM B&W</span></strong>":OpenStreetMap_BlackAndWhite
			};

			// Create different feature layers.
			var overlayMaps = {
				"Hikings": hikingsLayer,
				"Restaurants":restaurantsLayer,
				"Hotels": hotelsLayer,
				"Hostels": hostelsLayer
			};

			//Add layer control
			var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);
			layerControl.expand();


	if (this.getUseCurrentLocation() == true){
				map.locate({
					setView: true
				});
			}
		}
	},
	onResize: function(w, h, oW, oH){
		this.callParent(arguments);
		var map = this.getMap();
		if (map){
			map.invalidateSize();
		}
	}

});