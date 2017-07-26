<template>
  <div id="map" class="map">
  <label>dymaic-git</label>
  </div>
</template>

<script>
import ol from '../../node_modules/openlayers';

 export default 
 {
	name: 'Dynamic',
	data() {
            return {
                map: {
                    type: Object,
                    default: {}
                },
                url:'https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/' +
          			'Specialty/ESRI_StateCityHighway_USA/MapServer',
          		layers:[]
            }
        },
    mounted() 
    {
    	this.layers=[
	        new ol.layer.Tile({
	          source: new ol.source.OSM()
	        }),
	        new ol.layer.Tile({
	          extent: [-13884991, 2870341, -7455066, 6338219],
	          source: new ol.source.TileArcGISRest({
	            url: this.url
	          })
	        })
	      ];

    	this.map = new ol.Map({
		        layers: this.layers,
		        target: 'map',
		        view: new ol.View({
		          center: [-10997148, 4569099],
		          zoom: 4
		        })
		      });
        }     
  }      

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
