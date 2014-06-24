function upload_file(id, info, name) {
    if (document.getElementById('obt_cust_id').value == '') {
        Ext.Msg.alert("��ʾ", "��ѡ��ͻ��������ɿͻ���ţ�");
        return;
    }
    Ext.create('widget.window', {
        title: info + '--�����ϴ�',
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
                                text: '����',
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
                                                    waitMsg: '���ڱ���...',
                                                    success: function (form, action) {
                                                        Ext.Msg.alert("�ɹ�", "����ɹ�!");
                                                        Ext.getCmp('window_cust_file_grid').getStore().load({
                                                            params: {
                                                                cust_id: document.getElementById('obt_cust_id').value,
                                                                field_nm: name
                                                            }})
                                                    },
                                                    failure: function (form, action) {
                                                        Ext.Msg.alert("ʧ��", "����ʧ��!");
                                                    }
                                                });
                                            }
                                        } else {
                                            Ext.Msg.alert("��ʾ", "�����ɿͻ���ź����ϴ�����");
                                        }

                                    }
                                }
                            },
                            {
                                text: 'ת��',
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
                                        fieldLabel: '�ļ��ϴ�',
                                        buttonText: 'ѡ���ļ�'
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
                                text: '�ļ���',
                                dataIndex: 'file_nm',
                                flex: 1
                            },
                            {
                                text: '����',
                                dataIndex: 'file_nm',
                                flex: 1,
                                renderer: function (val) {
                                    return "<a target='_blank' href='static/upload/" + val + "'>��ӡ</a>";
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
        title: id + '--�����ϴ�',
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
                                text: '����',
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
                                                    waitMsg: '���ڱ���...',
                                                    success: function (form, action) {
                                                        Ext.Msg.alert("�ɹ�", "����ɹ�!");
                                                        Ext.getCmp('window_cust_file_grid').getStore().load({
                                                            params: {
                                                                cust_id: document.getElementById('obt_cust_id').value,
                                                                field_nm: name
                                                            }})
                                                    },
                                                    failure: function (form, action) {
                                                        Ext.Msg.alert("ʧ��", "����ʧ��!");
                                                    }
                                                });
                                            }
                                        } else {
                                            Ext.Msg.alert("��ʾ", "�����ɿͻ���ź����ϴ�����");
                                        }

                                    }
                                }
                            },
                            {
                                text: 'ת��',
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
                                        fieldLabel: '�ļ��ϴ�',
                                        buttonText: 'ѡ���ļ�'
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
                                text: '�ļ���',
                                dataIndex: 'file_nm',
                                flex: 1
                            },
                            {
                                text: '����',
                                dataIndex: 'file_nm',
                                flex: 1,
                                renderer: function (val) {
                                    return "<a target='_blank' href='static/upload/" + val + "'>��ӡ</a>";
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
