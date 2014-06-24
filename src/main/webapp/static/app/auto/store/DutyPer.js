/**
 * Created by dou on 14-1-19.
 */
Ext.define('App.store.DutyPer', {
    extend: 'Ext.data.Store',
    model: 'App.model.DutyPer',
    proxy: {
        type: 'ajax',
        url: '/teldata/data/q_bd_duty.action',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            root: 'list'
        }
    },
    autoLoad: true
});