<template>
    <div id="map" class="map">
        <label>TileArcGISRest--切片</label>
    </div>
</template>
<script>
import ol from '../../node_modules/openlayers';

export default {
    name: 'Tiarcgis2',
    data() {
        return {
            map: {
                type: Object,
                default: {}
            },
            layers: [],
            // url: 'https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Specialty/ESRI_StateCityHighway_USA/MapServer'
            url: 'http://129.0.8.19:6080/arcgis/rest/services/xh/500ti2/MapServer'
        }
    },

    mounted() {

        var attribution = new ol.Attribution({
            html: 'Copyright:日照港版权所有。'
        });
        var projection = ol.proj.get('EPSG:4326');
        var tileSize = 256;

        var urlTemplate = 'http://129.0.8.19:6080/arcgis/rest/services/xh/500ti2/MapServer/tile/{z}/{y}/{x}';

        this.map = new ol.Map({
            target: 'map',
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.XYZ({
                        attributions: [attribution],
                        maxZoom: 19,
                        minZoom:2,
                        projection: projection,
                        tileSize: tileSize,
                        tileUrlFunction: function(tileCoord) {
                            return urlTemplate.replace('{z}', (tileCoord[0]-1).toString())//z is the zoom level
                                .replace('{x}', tileCoord[1].toString())
                                .replace('{y}', (-tileCoord[2]-1).toString());
                        },
                        wrapX: true
                    })
                })
            ],
            view: new ol.View({
                center: [0, 0],
                projection: projection,
                zoom: 2,
                minZoom: 2
            })
        });

    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>