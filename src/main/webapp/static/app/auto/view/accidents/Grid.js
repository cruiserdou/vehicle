var sm = new Ext.selection.CheckboxModel({checkOnly: false});
Ext.define('App.view.accidents.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.accidents_grid',
    store: 'syj_custs',
    selModel: sm,
    id :'grid_custs',
    initComponent: function () {

        this.columns = [
            {text: '客户ID', width: 120, dataIndex: 'id'},
            {text: '客户名', width: 180, dataIndex: 'custname'},
            {text: '性别', width: 180, dataIndex: 'sex'},
            {text: '客户手机号', width: 80, dataIndex: 'card'},
            {text: '客户Email', width: 80, dataIndex: 'email'},
            {text: '客户联系地址', width: 260, dataIndex: 'address'},
            {text: '录入日期', width: 300, dataIndex: 'entry'},
            {text: '备注', width: 260, dataIndex: 'remark'}
        ];


        this.viewConfig = {
            forceFit: true
        };
        Ext.apply(this, {
            bbar: Ext.create('Ext.PagingToolbar', {
                store: 'syj_custs',
                displayInfo: true,
                displayMsg: '第 {0} 到 {1} 条数据, 共{2}条',
                emptyMsg: '无数据'
            }),
            columnLines: true,
            enableLocking: true
        });

        this.callParent(arguments);
    }
});