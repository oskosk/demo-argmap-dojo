dojo.provide('argmap.layers');

argmap.layers = {
	// Capa WMS del IGN Argentina. SRS EPSG:4326, desde geowebcache.
	IGNTiled_WMS_4326: new OpenLayers.Layer.WMS("Base IGN, SRS EPSG:4326", argmap.PATH.CACHE,	{  layers: ['SIGN'],format: "image/png8" }, {buffer:0, transitionEffect: 'resize', attribution:'Mapa base - Instituto Geográfico Nacional - 2010'} ),
	IGNTiled_WMS_900913: new OpenLayers.Layer.WMS("Base IGN, Spherical Mercator", argmap.PATH.CACHE,	{  layers: ['SIGN'],format: "image/png8" }, {buffer:2, transitionEffect: 'resize', attribution:'<img style="height:20px" src="http://mapa.ign.gob.ar/resources/img/ign-logo.png"/>Instituto Geográfico Nacional - 2011'} )	
};
