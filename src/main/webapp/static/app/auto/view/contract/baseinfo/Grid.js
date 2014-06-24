Ext.define('App.view.contract.baseinfo.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.contract_baseinfo_grid',
    store: 'syj_contract',

    initComponent: function () {

        this.columns = [
            {text: '会议编号', width: 120, dataIndex: 'id'},
            {text: '会议名称', width: 130, dataIndex: 'name', sortable: true},
            {text: '工程名称', width: 130, dataIndex: 'project'},
            {text: '上传日期', width: 100, dataIndex: 'sign',
                renderer: Ext.util.Format.dateRenderer('Y-m-d')
            },
            {text: '备注',  flex: 1, dataIndex: 'remark'}
        ];

        this.viewConfig = {
            forceFit: true
        };

        this.callParent(arguments);
    }
});