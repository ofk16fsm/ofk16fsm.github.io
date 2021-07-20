var mymap, osm, popup, stamenLayer, hostelsLayer, hikingsLayer, hotelsLayer, restaurantsLayer, bufferedHiking, hikingBuffer, label, selected;

var info = document.getElementById('info');

/**
 * Instantiates a map object given the DOM ID of a <div> element and optionally an object literal with Map options.
 * @type {Map}
 */
mymap = L.map('map', {
	doubleClickZoom: false
}).setView(new L.LatLng( 62.18, 15.58), 5);

/**
 * URL Template for TileLayer.
 * @type {String}
 */
var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';


/**
 * It describes the layer data and is often a legal obligation towards copyright holders and tile providers.
 * @type {String}
 */
var osmAttrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';

/**
 * Create an osm.
 * @type {L.TileLayer}
 */
osm = new L.TileLayer(osmUrl, {
	minZoom: 5,
	maxZoom: 18,
	attribution: osmAttrib
}).addTo(mymap);

/**
 * Create second osm based on stamen's tiles.
 * @type {L.TileLayer}
 */
stamenLayer = new L.TileLayer('http://tile.stamen.com/terrain/{z}/{x}/{y}.png',{
	minZoom: 5,
	maxZoom: 18,
	attribution: osmAttrib
}).addTo(mymap);

/**
 * Create third osm with black and white.
 * @type {L.TileLayer}
 */
var OpenStreetMap_BlackAndWhite = new L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
	minZoom: 5,
    maxZoom: 18,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mymap);


// Create swipe to change between two osm TileLayers.
/*
var range = document.getElementById('swipe');

function clip() {
    var nw = mymap.containerPointToLayerPoint([0, 0]),
        se = mymap.containerPointToLayerPoint(mymap.getSize()),
        clipX = nw.x + (se.x - nw.x) * (range.value/100);

    stamenLayer.getContainer().style.clip = 'rect(' + [nw.y, clipX, se.y, nw.x].join('px,') + 'px)';
}

range['oninput' in range ? 'oninput' : 'onchange'] = clip;
mymap.on('move', clip);

clip();
*/

/**
 * Create a box on the map when you click.
 * @type {L.popup}
 */

popup = L.popup();


/**
 * Style for hikings.
 * @type {Object}
 */
var hikingsStyle = {
	color: "black",
	weight: 3,
	opacity: 0.8
};

/**
 * Style for selected hiking.
 * @type {Object}
 */
var selectedHikingStyle = {
	color: 'red',
	weight: 5,
	opacity: 0.8
};

/**
 * Style for buffer when user clicked a hiking.
 * @type {Object}
 */
var bufferStyle = {
	color: "#483D8B",
	weight: 5,
	opacity: 0.8
};

/**
 * Make first letter upper for layer's properties type.
 * @param  {string} inputString Gets string from layer's properties type
 * @return {string} inputString It returns string with first letter uppercase
 */
function capitalize(inputString){
	if(inputString == null){
		return "There is no text";
	}
	else{
		return inputString.charAt(0).toUpperCase() + inputString.slice(1);
	}
}

/**
 * Get hikings' properties type and name.
 *
 * @param  {Feature} Feature	Feature of hikings
 * @return {string} String Returns feature's type and name to info.innerHTML
 */
function getInfo(feature) {
	switch(feature.properties.type || feature.properties.Typ_av_led){
		case 'Vandringsled': return info.innerHTML += "<br>" + capitalize(feature.properties.Typ_av_led).bold() + ": " + feature.properties.Lednamn; break;
		case 'hotel': return info.innerHTML += "<br>" + capitalize(feature.properties.type).bold() + ": " + feature.properties.name; break;
		case 'hostel': return info.innerHTML += "<br>" + capitalize(feature.properties.type).bold() + ": " + feature.properties.name; break;
		case 'restaurant': return info.innerHTML += "<br>" + capitalize(feature.properties.type).bold() + ": " + feature.properties.name; break;
	}
}

/**
 * Get information on points.
 * @param  {Feature} Feature Feature of hotels, hostels and restaurants
 * @param  {GeoJSON} Layer   Layer of hotels, hostels and restaurants
 */
function onEachFeaturePoints(feature, layer){
	label = String(feature.properties.name); // Must convert to string, .bindTooltip can't use straight 'feature.properties.name'
	layer.bindTooltip(label);
	layer.on('click', function(){
		getInfo(feature);
	});
}

/**
 * Geojson layer for hostels.
 * @type {GeoJSON}
 */
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
}).addTo(mymap);

/**
 * Geojson layer for hotels.
 * @type {GeoJSON}
 */
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
}).addTo(mymap);

/**
 * Geojson layer for restaurants.
 * @type {GeoJSON}
 */
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
}).addTo(mymap);

/**
 * Set color when you hover over hikings.
 * @param  {Event} e Get hovered target's layer
 */
function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle({
        weight: 6,
        color: 'blue',
        dashArray: '',
        fillOpacity: 0.8
    });
}

/**
 * Style resets when you leave hovering over hikings.
 * @param {Event} e Leave hovered target's layer
 */
function resetHighlight(e) {
    hikingsLayer.resetStyle(e.target);
}

/**
 * Get total counted points of features within buffered area.
 * @param  {int} totalOfFeatures Total of point features
 */
function getNumberOfPointsWithinBuffer(totalOfFeatures){
	if(totalOfFeatures > 1){
		info.innerHTML += "<br>" + totalOfFeatures + " points are inside the buffer.";
	}
	else {
		info.innerHTML += "<br>" + totalOfFeatures + " point are inside the buffer.";
	}
}

/**
 * GeoJSON layer for hikings.
 * @type {GeoJSON}
 */
hikingsLayer = L.geoJSON(hikings, {
	style: hikingsStyle,
	onEachFeature: onEachFeatureHikings
}).addTo(mymap);

/**
 * Get buffer around hiking when you click.
 * Check if some points are within hiking buffer.
 * @param  {Feature} Feature Feature of hikings
 * @param  {GeoJSON} Layer   Layer of hikings
 */
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
			mymap.fitBounds(layer.getBounds());
			var selectedHikingGeoJson = L.geoJSON(feature, {
				style: selectedHikingStyle
			}).addTo(mymap);

			bufferedHiking = turf.buffer(selectedHikingGeoJson.toGeoJSON(), 10, {units: 'kilometers'});
			hikingBuffer = L.geoJSON(bufferedHiking, {
				style: bufferStyle
			}).addTo(mymap);

			var ptsWithin = new Array();
			ptsWithin.push(turf.within(restaurantsLayer.toGeoJSON(), hikingBuffer.toGeoJSON()).features.length);
			ptsWithin.push(turf.within(hotelsLayer.toGeoJSON(), hikingBuffer.toGeoJSON()).features.length);
			ptsWithin.push(turf.within(hostelsLayer.toGeoJSON(), hikingBuffer.toGeoJSON()).features.length);

			// Function count number of points are within buffer polygon.
			const sumOfFeatures = arr => arr.reduce((a, b) => a + b, 0);
			var totalOfFeatures = sumOfFeatures(ptsWithin);
			
			// Shows how many points are within buffer.
			getNumberOfPointsWithinBuffer(totalOfFeatures);

			hikingBuffer.eachLayer(function(layer){
				hikingBuffer.on('click', function(e){
					getInfo(feature);
					getNumberOfPointsWithinBuffer(totalOfFeatures);

					// This is showing number of closest point layers to searched coordinate.
					var closestLayer = L.GeometryUtil.nClosestLayers(mymap.fitBounds(layer.getBounds()), hikingBuffer.getLayers()
					.concat(restaurantsLayer.getLayers(), hostelsLayer.getLayers(), hotelsLayer.getLayers()), e.latlng, totalOfFeatures);

					for(var id in closestLayer){
						info.innerHTML += "<br> " + capitalize(closestLayer[id].layer.feature.properties.type).bold() + ": "
						+ capitalize(closestLayer[id].layer.feature.properties.name)
						+ "<br><strong> Distance in pixels: </strong>" + closestLayer[id].distance.toFixed(2)
						+ "<br><strong>Distance in meters: </strong>" + L.GeometryUtil.length([e.latlng, closestLayer[id].latlng]).toFixed(2);
					}

					// This is using if layers are within searched coordinate and using pixlar.
					/*
					var layersWithins = L.GeometryUtil.layersWithin(mymap.fitBounds(layer.getBounds()), hikingBuffer.getLayers()
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

/**
 * Show coordinates from clicked point and popup.
 * Send also latlng to info.innerHTML.
 * @param  {Event} e Get coordinates from map
 */
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
		.openOn(mymap);
}

/**
 * Listener when you preclick on the map.
 * @type {Listener}
 */
mymap.on('preclick', onMapClick);

/**
 * Go back to original map after doubleclicked.
 * @type {Listener}
 */
mymap.on('dblclick', function(){
	if(selected){
		hikingsLayer.clearLayers();
		hikingsLayer.addData(hikings);
		mymap.fitBounds(hikingsLayer.getBounds());
		hikingBuffer.clearLayers();
	}
});

/**
 * Create object for different basemap layers.
 * @type {Object}
 */
var baseMaps = {
    "<strong><span style='color: gray'>Open Street Map</span></strong>": osm,
	"<strong><span style='color: green'>Terrain</span></strong>": stamenLayer,
    "<strong><span style='color: black'>OSM B&W</span></strong>":OpenStreetMap_BlackAndWhite
};

/**
 * Create object for showing different feature layers.
 * @type {Object}
 */
var overlayMaps = {
	"Hikings": hikingsLayer,
    "Restaurants":restaurantsLayer,
	"Hotels": hotelsLayer,
	"Hostels": hostelsLayer
};

/**
 * Controller for objects of baseMaps and overlayMaps.
 * @type {Controller}
 */
var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(mymap);
layerControl.expand();
