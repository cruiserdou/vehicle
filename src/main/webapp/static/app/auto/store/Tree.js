Ext.define('App.store.Tree', {
    extend: 'Ext.data.TreeStore',
    model: 'App.model.Tree',
    proxy: {
        type: 'ajax',
        url: 'static/data/autotree.json'
    }
});