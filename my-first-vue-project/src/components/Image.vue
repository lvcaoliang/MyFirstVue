<template>
    <div id="map" class="map">
        <label>image</label>
        <select v-model="selected" v-on:change="onChange">
            <option v-for="option in options" v-bind:value="option.value">
                {{ option.text }}
            </option>
        </select>
    </div>
</template>
<script>
import ol from '../../node_modules/openlayers';

export default {
    name: 'Image',
    data() {
        return {
            map: {
                type: Object,
                default: {}
            },
            layers: [],
            selected: 'Road',
            options: [
                { text: 'Road', value: 'Road' },
                { text: 'Aerial', value: 'Aerial' },
                { text: 'AerialWithLabels', value: 'AerialWithLabels' },
                { text: 'collinsBart', value: 'collinsBart' },
                { text: 'ordnanceSurvey', value: 'ordnanceSurvey' }
            ]
        }
    },

    mounted() {
        // this.layers = [
        //     new ol.layer.Tile({
        //         visible: false,
        //         preload: Infinity,
        //         source: new ol.source.BingMaps({
        //             key: 'AvzM4FgDkpuZwkwP9DPDUwq15NUTJxHNyyUHGSXiA9JwAtAinnlPS31PvwB3hcWh',
        //             imagerySet: 'Road'
        //         })
        //     })
        // ];

        var i, ii;
        for (i = 0, ii = this.options.length; i < ii; i = i + 1) {
            this.layers.push(new ol.layer.Tile({
                visible: false,
                preload: Infinity,
                source: new ol.source.BingMaps({
                    key: 'AvzM4FgDkpuZwkwP9DPDUwq15NUTJxHNyyUHGSXiA9JwAtAinnlPS31PvwB3hcWh',
                    imagerySet: this.options[i].value
                    // use maxZoom 19 to see stretched tiles instead of the BingMaps
                    // "no photos at this zoom level" tiles
                    // maxZoom: 19
                })
            }));
        }

        //this.layers[2].setVisible(true);

        this.map = new ol.Map({
            layers: this.layers,
            // Improve user experience by loading tiles while dragging/zooming. Will make
            // zooming choppy on mobile or slow devices.
            loadTilesWhileInteracting: true,
            target: 'map',
            view: new ol.View({
                center: [-6655.5402445057125, 6709968.258934638],
                zoom: 13
            })
        });
    },
    methods: {
        onChange() {
            for (var i = 0, ii = this.options.length; i < ii; i++) {
                if (this.options[i].value == this.selected) {
                    this.layers[i].setVisible(true);
                } else {
                    this.layers[i].setVisible(false);
                }
            }
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>