dojo.provide('argmap.toolsets.Draw');

/**
 * Set de herramientas que permite la creación de geometrías
 * dibujándolas sobre una capa argmap.layers.FeatureLayer
 * Puntos, polilineas y polígonos
 */

dojo.declare('argmap.toolsets.Draw', null, {

	_geometryType: false,
	/**
	 * El OpenLayers.Control actual
	 */
	OLControl: null,

	/**
	 * Referencia a los handlers para los eventos de
	 * los OpenLayers.Control
	 */
	_OLControlHandlers: [],

	/**
	 * La capa que recibe los controles
	 */
	OLVectorLayer: null,
	/**
	 * La referencia al mapa sobre el cual dibujar
	 */
	map: null,
	/**
	 * el constructor
	 * @param {argmap.Map} map El mapa al cual asociar las herramientas
	 * @param {Object} options
	 */
	constructor: function(map, options)
	{
		this.map = map;
		
		dojo.safeMixin(this, options);

		this._createVectorLayer(map);

		return this;
	},

	/**
	 * Agrega un OpenLayers.Control al mapa y lo activa.
	 *
	 */
	activate: function(geometryType, options)
	{
		if (this._geometryType)	{
			this.deactivate();
		}
		var Draw=argmap.toolsets.Draw;

		switch(geometryType) {
			case Draw.POINT:
				this._activatePoint();
				break;
			case Draw.LINE:
			case Draw.POLYLINE:
				this._activatePolyline();
				break;
			case Draw.POLYGON:
				this._activatePolygon();
				break;
			default:
				console.error("tipo de geometría inválido");
				break;
		}
		this._geometryType = geometryType;
		this._attachEvents();
		this.onActivate();
	},
	deactivate: function(toolType)
	{
		this.finishDrawing();
		this._dettachEvents();
		this.onDeactivate();
	},
	_attachEvents: function()
	{
		this.OLControl.events.register('featureadded', this, function() { this.onDrawEnd});
	},
	_dettachEvents: function()
	{
	},
	/**
	 * Agrega la capa vectorial a map.
	 * @param {argmap.Map] map el mapa al cual agregar la capa. 
	 */
	_createVectorLayer: function()
	{
		this.OLVectorLayer = new OpenLayers.Layer.Vector(
			'capa del set de herramientas de dibujo',
			{displayInLayerSwitcher: false}
		);

		this.map.addLayer( this.OLVectorLayer );
	},
	_activatePoint: function()
	{				
		this.OLControl = new OpenLayers.Control.DrawFeature(
			this.OLVectorLayer,
			OpenLayers.Handler.Point
		);
		this.map.addControl( this.OLControl );
		this.OLControl.activate();
	},

	_activatePolyline: function()
	{
		this.OLControl = new OpenLayers.Control.DrawFeature(
			this.OLVectorLayer,
			OpenLayers.Handler.Path
		);
		this.map.addControl( this.OLControl );
		this.OLControl.activate();
	},
	_activatePolygon: function()
	{
		this.OLControl = new OpenLayers.Control.DrawFeature(
			this.OLVectorLayer,
			OpenLayers.Handler.Polygon
		);
		this.map.addControl( this.OLControl );
		this.OLControl.activate();
	},
	
	/**
	 * Desactiva el control	y lo saca
	 */
	finishDrawing: function()
	{
		if ( this.OLControl ) {
			this.OLControl.deactivate();
			this.map.removeControl( this.OLControl );
		}
		this.OLControl = null;
		this.onDrawEnd();
	},

	onActivate: function() {},
	onDeactivate: function() {},
	onDrawEnd: function(event) {}

});

/**
 *Constantes de la clase
 */
dojo.mixin(argmap.toolsets.Draw, {
	// Dibuja una línea
	LINE: 'line',
	// Dibjuna una features de multiples puntos
	MULTI_POINT: 'multipoint',
	// Dibuja un punto
	POINT: 'point',
	//Dibujo un poligono
	POLYGON	: 'polygon',
	//Dibuja una polilínea
	POLYLINE: 'polyline'
	// El tipo actual de geometría seleccionado
});