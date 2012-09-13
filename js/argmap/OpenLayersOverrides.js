dojo.provide('argmap.OpenLayersOverrides');

// Cambio DOTS PER INCH porque geoserver manda las resoluciones con este valor 
// en su demo
OpenLayers.DOTS_PER_INCH = 90.71428571428572;
// Cantidad de veces que OpenLayers va a intentar cargar una tile.
OpenLayers.IMAGE_RELOAD_ATTEMPTS = 5;
// Configuro el idiome de OpenLayers en español
OpenLayers.Lang.setCode('es');

// TODO Chequear esto. Hacer la ruta más consistente
OpenLayers.ImgPath = argmap.PATH.RESOURCES + 'js/OpenLayers-2.9/img/';
// idem