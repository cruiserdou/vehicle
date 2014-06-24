function upload_file(id, info, name) {
    if (document.getElementById('obt_cust_id').value == '') {
        Ext.Msg.alert("提示", "请选择客户或者生成客户编号！");
        return;
    }
    Ext.create('widget.window', {
        title: info + '--附件上传',
        modal: true,
        width: 480,
        height: 320,
        frame: false,
        border: false,
        layout: 'fit',
        items: [
            {
                xtype: 'panel',
                layout: 'border',
                dockedItems: [
                    {
                        xtype: 'toolbar',
                        dock: 'top',
                        border: true,
                        items: [
                            {
                                text: '保存',
                                iconCls: 'icon_save',
                                listeners: {
                                    click: function () {
                                        var cust_id = document.getElementById('obt_cust_id').value;
                                        if (cust_id != "") {
                                            var form = Ext.getCmp('obt_file_upload_form').getForm();
                                            if (form.isValid()) {
                                                form.submit({
                                                    url: 'upload_file',
                                                    params: {
                                                        cust_id: cust_id,
                                                        field_nm: name
                                                    },
                                                    method: 'POST',
                                                    waitMsg: '正在保存...',
                                                    success: function (form, action) {
                                                        Ext.Msg.alert("成功", "保存成功!");
                                                        Ext.getCmp('window_cust_file_grid').getStore().load({
                                                            params: {
                                                                cust_id: document.getElementById('obt_cust_id').value,
                                                                field_nm: name
                                                            }})
                                                    },
                                                    failure: function (form, action) {
                                                        Ext.Msg.alert("失败", "保存失败!");
                                                    }
                                                });
                                            }
                                        } else {
                                            Ext.Msg.alert("提示", "请生成客户编号后再上传附件");
                                        }

                                    }
                                }
                            },
                            {
                                text: '转发',
                                iconCls: 'icon_email'
                            }
                        ]}
                ],

                items: [
                    {
                        xtype: 'panel',
                        region: 'center',
                        border: false,
                        flex: 1,
                        layout: {
                            type: 'vbox',
                            align: 'stretch',
                            pack: 'start'
                        },
                        items: [
                            {
                                xtype: 'form',
                                id: 'obt_file_upload_form',
                                bodyPadding: 20,
                                margin: '2 2 2 2',
                                height: 70,
                                items: [
                                    {
                                        xtype: 'filefield',
                                        labelWidth: 60,
                                        name: 'file',
                                        fieldLabel: '文件上传',
                                        buttonText: '选择文件'
                                    }
                                ]
                            },
                            {
                                xtype: 'panel',
                                id: 'window_cust_file_preview',
                                margin: '2 2 2 2',
                                autoScroll: true,
                                tpl: Ext.create('Ext.XTemplate', addDocUploadTpl),
                                flex: 1
                            }
                        ]
                    },
                    Ext.create('Ext.grid.Panel', {
                        region: 'east',
                        id: 'window_cust_file_grid',
                        margin: '2 2 2 2',
                        store: 'Custfile',
                        columns: [
                            {
                                text: '文件名',
                                dataIndex: 'file_nm',
                                flex: 1
                            },
                            {
                                text: '操作',
                                dataIndex: 'file_nm',
                                flex: 1,
                                renderer: function (val) {
                                    return "<a target='_blank' href='static/upload/" + val + "'>打印</a>";
                                }
                            }
                        ],
                        listeners: {
                            itemclick: function (this_, record_) {
                                var bank_busi_panel = Ext.getCmp('window_cust_file_preview');
                                bank_busi_panel.tpl.overwrite(bank_busi_panel.body, record_.data);
                            },
                            afterrender: function () {
                                var store = this.getStore();
                                store.load({
                                    params: {
                                        cust_id: document.getElementById('obt_cust_id').value,
                                        field_nm: name
                                    },
                                    callback: function (records, operation, success) {
                                        if (success) {
                                            var bank_busi_panel = Ext.getCmp('window_cust_file_preview');
                                            bank_busi_panel.tpl.overwrite(bank_busi_panel.body, records[0].getData());
                                        }
                                    }
                                });
                            }
                        },
                        width: 200
                    })
                ]
            }
        ]
    }).show(Ext.get(id));
};


function pub_upload_file(id) {
    Ext.create('widget.window', {
        title: id + '--附件上传',
        modal: true,
        width: 480,
        height: 320,
        frame: false,
        border: false,
        layout: 'fit',
        items: [
            {
                xtype: 'panel',
                layout: 'border',
                dockedItems: [
                    {
                        xtype: 'toolbar',
                        dock: 'top',
                        border: true,
                        items: [
                            {
                                text: '保存',
                                iconCls: 'icon_save',
                                listeners: {
                                    click: function () {
                                        var cust_id = document.getElementById('obt_cust_id').value;
                                        if (cust_id != "") {
                                            var form = Ext.getCmp('obt_file_upload_form').getForm();
                                            if (form.isValid()) {
                                                form.submit({
                                                    url: 'upload_file',
                                                    method: 'POST',
                                                    waitMsg: '正在保存...',
                                                    success: function (form, action) {
                                                        Ext.Msg.alert("成功", "保存成功!");
                                                        Ext.getCmp('window_cust_file_grid').getStore().load({
                                                            params: {
                                                                cust_id: document.getElementById('obt_cust_id').value,
                                                                field_nm: name
                                                            }})
                                                    },
                                                    failure: function (form, action) {
                                                        Ext.Msg.alert("失败", "保存失败!");
                                                    }
                                                });
                                            }
                                        } else {
                                            Ext.Msg.alert("提示", "请生成客户编号后再上传附件");
                                        }

                                    }
                                }
                            },
                            {
                                text: '转发',
                                iconCls: 'icon_email'
                            }
                        ]}
                ],

                items: [
                    {
                        xtype: 'panel',
                        region: 'center',
                        border: false,
                        flex: 1,
                        layout: {
                            type: 'vbox',
                            align: 'stretch',
                            pack: 'start'
                        },
                        items: [
                            {
                                xtype: 'form',
                                id: 'obt_file_upload_form',
                                bodyPadding: 20,
                                margin: '2 2 2 2',
                                height: 70,
                                items: [
                                    {
                                        xtype: 'filefield',
                                        labelWidth: 60,
                                        name: 'file',
                                        fieldLabel: '文件上传',
                                        buttonText: '选择文件'
                                    }
                                ]
                            },
                            {
                                xtype: 'panel',
                                id: 'window_cust_file_preview',
                                margin: '2 2 2 2',
                                autoScroll: true,
                                tpl: Ext.create('Ext.XTemplate', addDocUploadTpl),
                                flex: 1
                            }
                        ]
                    },
                    Ext.create('Ext.grid.Panel', {
                        region: 'east',
                        id: 'window_cust_file_grid',
                        margin: '2 2 2 2',
                        store: 'Custfile',
                        columns: [
                            {
                                text: '文件名',
                                dataIndex: 'file_nm',
                                flex: 1
                            },
                            {
                                text: '操作',
                                dataIndex: 'file_nm',
                                flex: 1,
                                renderer: function (val) {
                                    return "<a target='_blank' href='static/upload/" + val + "'>打印</a>";
                                }
                            }
                        ],
                        listeners: {
                            itemclick: function (this_, record_) {
                                var bank_busi_panel = Ext.getCmp('window_cust_file_preview');
                                bank_busi_panel.tpl.overwrite(bank_busi_panel.body, record_.data);
                            },
                            afterrender: function () {
                                var store = this.getStore();
                                store.load({
                                    params: {
                                        cust_id: document.getElementById('obt_cust_id').value,
                                        field_nm: name
                                    },
                                    callback: function (records, operation, success) {
                                        if (success) {
                                            var bank_busi_panel = Ext.getCmp('window_cust_file_preview');
                                            bank_busi_panel.tpl.overwrite(bank_busi_panel.body, records[0].getData());
                                        }
                                    }
                                });
                            }
                        },
                        width: 200
                    })
                ]
            }
        ]
    }).show(Ext.get(id));
};
