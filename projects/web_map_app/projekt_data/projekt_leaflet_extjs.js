Ext.Loader.setConfig({
	enabled: true,
    paths: {
		'Ext.ux': 'ux'
	}
});

Ext.require([
    'Ext.container.Container',
    'Ext.panel.Panel',
    'Ext.grid.Panel',
	'Ext.window.*',
	'projekt_data.LMapPanel'
]);

Ext.application({
    name: 'FeatureGrids',
    launch: function() {
        var myPanel = Ext.create('Ext.panel.Panel', {
            region: 'center',
            height: 400,
            layout: 'fit',
			tbar: [
				{
					xtype: 'button',
					text: 'Show Gävle',
					listeners:{
					click: function(){
						updateMapLocation([60.67486, 17.14777], 13);
						}
					}
				},
				{
					xtype: 'button',
					text: 'Show Uppsala',
					listeners:{
					click: function(){
						updateMapLocation([59.859213, 17.641983], 13);
						}
					}
				},
				{
					xtype: 'button',
					text: 'Show Start Map',
					listeners:{
					click: function(){
						updateMapLocation([62.18, 15.58], 5);
						}
					}
				}
			],
			items: [
				{
					xtype: 'lmappanel'
				}
			]
        });
        
        var description = Ext.create('Ext.panel.Panel', {
            contentEl: 'description',
            region: 'east',
            title: 'Description',
            width: 400,
            border: false,
            bodyPadding: 5,
            autoScroll: true
        });		
		
        Ext.create('Ext.Viewport', {
            layout: 'border',
            items: [myPanel, description]
        });
		
		function updateMapLocation(location, zoom){
			var map = Ext.ComponentQuery.query('panel lmappanel')[0];
			map.getMap().setView(location, zoom);
		}
    }
});