dojo.require("dijit.MenuBar");
dojo.require("dijit.MenuBarItem");
dojo.require("dijit.PopupMenuBarItem");
dojo.require("dijit.Menu");
dojo.require("dijit.MenuItem");
dojo.require("dijit.PopupMenuItem");

dojo.provide('argmap.dijit.EditBar');

dojo.declare('argmap.dijit.EditBar', null, {
	menuBar:null,
	menus: {},

	constructor: function( map, options )
	{
		if (typeof map === undefined)  {
			alert('plop');
		}
		var domId = 'EditBarWrapper';
		dojo.place( dojo.create('div', { id: domId } ), map.div, 'first' );
		this.menuBar = new dijit.MenuBar(options, domId);
		this.menus.a = new dijit.Menu();
		console.log("a");
		var a = this.menus.a;

		a.addChild( new dijit.MenuItem({
			label:'Color'
		}));

		this.menuBar.addChild( new dijit.PopupMenuBarItem({
			label: 'coloror',
			popup: a
		}));

		//this.menuBar.placeAt("wrapper");
        this.menuBar.startup();


	}
});