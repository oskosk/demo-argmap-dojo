//dojo.require('OpenLayers');

dojo.provide('argmap');
// Esto es para que los demás módulos se carguen desde esta base y no
// la del html que cargue este script. 
// TODO: Debería ser argmap.PATH.RESOURCES/js/ y creo que debería
// ir al final esta línea
dojo.registerModulePath('argmap', 'http://mapa.ign.gob.ar/apps/dojo/js/argmap');

argmap = {
	/**
	 * Algunas URL comunes
	 * @property
	 */
	PATH: {
		/**
		 * La URL a la API del IGN
		 * @property PATH.API
		 */
		API: 'http://api.ign.gob.ar/',
		/**
		 * La URL al directorio base de los recursos (sprites, logos, paletas, js)
		 * @property PATH.RESOURCES
		 */
		RESOURCES: 'http://mapa.ign.gob.ar/resources/',
		/**
		 * La URL al servicio WMS
		 * @property PATH.WMS
		 * @type String
		 */
		WMS: 'http://wms.ign.gob.ar/geoserver/wms',
		/**
		 * La URL del cache de tiles
		 * @property PATH.CACHE
		 * @type String
		 */
		CACHE: "http://wms.ign.gob.ar/geoserver/gwc/service/wms"
	},
	/**
	 * Log general a consola.
	 * 
	 * @param args {String} El mensaje a grabar
	 */
	log: function(args)
	{
		// TODO : agregar un log.history
		if (window.Debug && window.Debug.writeln) {
          window.Debug.writeln(args);
        } else if (window.console) {
          window.console.log(args);
		  //throw args;
        }
	}
};

dojo.require('argmap.OpenLayersOverrides');
dojo.require('argmap.Map');
dojo.require('argmap.toolsets.Draw');