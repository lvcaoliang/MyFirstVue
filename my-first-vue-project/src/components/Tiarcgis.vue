<template>
    <div id="map" class="map">
        <label>TileArcGISRest--非切片</label>
    </div>
</template>
<script>
import ol from '../../node_modules/openlayers';

export default {
    name: 'Tiarcgis',
    data() {
        return {
            map: {
                type: Object,
                default: {}
            },
            layers: [],
            // url: 'https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Specialty/ESRI_StateCityHighway_USA/MapServer'
             url:'http://129.0.8.19:6080/arcgis/rest/services/xh/500_note/MapServer'
        }
    },

    mounted() {
        this.layers = [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            }),
            new ol.layer.Tile({
                //加上就不出，不知道参数值如何确定，可能理解的有问题
                //extent: [-5120763, -9997963, 6120763, 9997964],
                source: new ol.source.TileArcGISRest({
                    url: this.url
                })
            })
        ];

        this.map = new ol.Map({
                layers: this.layers,
                target: 'map',
                view: new ol.View({
                    center: [13306659, 4215599],
                    zoom: 10
                })
            })
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>