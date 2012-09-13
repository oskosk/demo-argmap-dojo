dojo.require('argmap.layers');

dojo.provide('argmap.Map');
/**
 * @class ArgMap.Map
 * @private
 */
argmap.Map = OpenLayers.Class(OpenLayers.Map, {
	// options por default para el constructo
	// de OpenLayers.Map
	defaults: {
		div: 'mapcontainer',
		// TODO Chequear esto. Hacer la ruta más consistente
		theme: argmap.PATH.RESOURCES + 'js/OpenLayers-2.9/theme/default/style.css',
		//controles predeterminados
		controls: [
			// control de paneo y zoom
			new OpenLayers.Control.PanZoomBar({position: new OpenLayers.Pixel(0, 25)}),

			//El texto de autoría de la capa	
			new OpenLayers.Control.Attribution(),

			// El indicador en coordenadas de la posición del mouse.
			// Por default está en coordenadas decimales WGS 84
			new OpenLayers.Control.MousePosition(),

			// El cuadrito de selección de capas
			new OpenLayers.Control.LayerSwitcher({}),

			// El indicador de la escala actual
			new OpenLayers.Control.Scale(),

			// Este es el control que se encarga de responder
			// al uso del mouse
			new OpenLayers.Control.Navigation({
				//zoomBoxzoomBoxEnabled: true,
				zoomWheelEnabled: true,
				title: '',
				handleRightClicks: true,
					//esto no funciona... deberia, tambien quisiera definir el rightClick aca
				defaultClick: function (evt)  { alert('c'); },
				defaultDblRightClick: function (evt)  {	alert('Not yet');},
				dragPan: true, 
				dragPanOptions: {enableKinetic: true}
			})
		],

		//restrictedExtent: new OpenLayers.Bounds(-76, -66, -40.636, -15), 

		tileSize: new OpenLayers.Size(256, 256), 

		/**
		 * displayProjection es utilizada por ArgParser, MousePosition, Permalink Controls...
		 * @property
		 */
		displayProjection: new OpenLayers.Projection('EPSG:4326'), 
		
		units: "degrees",

		zoom:0,
		
		/** 
		 * resoluciones (escalas, o niveles de zoom) permitidas en el  mapa
		 *
		 */
		resolutions: [
			0.06288206988836649,
			0.025152827955346596,
			0.012576413977673298,
			0.0025152827955346596,
			0.0012576413977673298,
			6.288206988836649E-4,
			2.5152827955346593E-4,
			1.2576413977673296E-4,
			6.288206988836648E-5,
			2.5152827955346596E-5
		]
		//scales: [25000000, 10000000, 5000000, 1000000, 500000, 250000, 100000, 50000, 25000, 10000]
		,

		/**
		 * baseLayer no tiene sentido como opción de configuración enOpenLayers.Map
		 * Pero si el usuario pasa una layer así argmap.Map('mapDivId', {baseLayer: new OpenLayers.Layer..}
		 * entonces esa capa va a ser la capa base
		 */
		baseLayer:null,

		/**
		 * Centro inicial del mapa. Buenos Aires.
		 */
		center: new OpenLayers.LonLat(-58.67090, -32.71387),
		/**
		 * extent se puede pasar como option al constructor.
		 * @type OpenLayers.Bounds()
		 */
		extent: undefined
	},
	initialize: function(options)
	{
        var opts = {};
		OpenLayers.Util.extend(opts,this.defaults);
		OpenLayers.Util.extend(opts,options);
		// reseteo this.defaults y this.options así no quedan referencias colgadas
		this.defaults = undefined;
		options = undefined;
		
		if ( ! dojo.byId( opts.div ) ) {
			argmap.log( 'no existe el div #' + opts.div );
		}

		// Esto es  como hacer a = new OpenLayers.Map(div, options);
		OpenLayers.Map.prototype.initialize.apply(this, [opts.div, opts]);
		
		
		//ATADO-CON-ALAMBRE WARNING: el click esta bindeado al
		//callback del controls de navigation (4) para no disparar
		//los 2 clicks que componen el doble click
		var me = this;
		this.controls[5].handlers.click.callbacks.click = function(e) {
			me.onClick();
		}


		this.events.register('moveend',this, function(event) {
			this.onMoveEnd();
		});
		this.events.register('movestart',this, function(event) {
			this.onMoveStart();
		});
		this.events.register('addlayer',this, function(event) {
			this.onAddLayer();
		});
		this.events.register('removelayer',this, function(event) {
			this.onRemoveLayer();
		});

		// Si no se pasa baseLayer cargo la tiled del IGN por default
		// Ojo que OpenLayers.Map. no funciona así.
		// .baseLayer se setea solo cuando se le agrega una capa base
		// al mapa con .addLayer  no en el constructor.

		if ( ! this.baseLayer || ! this.baseLayer instanceof OpenLayers.Layer) {
			var baseLayer = argmap.layers.IGNTiled_WMS_4326;
		}

		// capa base
		this.addLayer( baseLayer );

		// acordarme de OpenLayers.Bounds.fromArray(); -- osk
		if (opts.extent instanceof OpenLayers.Bounds) {
			this.zoomToExtent(opts.extent);
		} else if (opts.center instanceof OpenLayers.LonLat) {
			this.setCenter(opts.center, opts.zoom);
		}
   
		dojo.publish("argmap.basemap.built", this );
	},
	onMoveStart: function() {},
	onMoveEnd:function() {},
	onAddLayer: function() {},
	onRemoveLayer: function() {},
	onClick: function() {}

});