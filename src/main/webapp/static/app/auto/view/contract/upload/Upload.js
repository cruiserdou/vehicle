Ext.define('App.view.contract.upload.Upload', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.contract_upload',
    "iconCls": "icon_upload",
    layout: 'border',
    border: false,
    initComponent: function () {
        this.items = [
            {
                xtype: 'panel',
                region: 'center',
                flex: 2,
                layout: 'fit',
                border: false,
                items: [
                    {
                        xtype: 'form',
                        title: '添加会议记录',
                        bodyPadding: 30,
                        frame: true,
                        defaults: {
                            xtype: 'textfield',
                            labelWidth: 60
                        },
                        items: [
                            {
                                name: 'id',
                                anchor: '100%',
                                fieldLabel: '会议编号'
                            },{
                                name: 'name',
                                anchor: '100%',
                                fieldLabel: '会议名称'
                            },{
                                xtype: 'datefield',
                                anchor: '100%',
                                format: 'Y-m-d',
                                name: 'sign',
                                fieldLabel: '上传日期'
                            },{
                                xtype: 'filefield',
                                name: 'file',
                                fieldLabel: '文件上传',
                                msgTarget: 'side',
                                allowBlank: false,
                                anchor: '100%',
                                buttonText: '选择文件'
                            },{
                                xtype: 'textareafield',
                                name: 'remark',
                                anchor: '100%',
                                fieldLabel: '备注'
                            }
                        ],
                        buttons: [
                            {
                                text: '保存',
                                iconCls: 'icon_save',
                                handler: function(){
                                    var form = this.up('form').getForm();
                                    if (form.isValid()){
                                        form.submit({
                                            url: 'upload_file',
                                            waitMsg: '正在保存数据...',
                                            success: function(form, action){
                                                Ext.Msg.alert("成功", "文件上传成功!");
                                                Ext.getCmp('gird_upload').getStore().reload();
                                            },
                                            failure: function(form, action){
                                                Ext.Msg.alert("失败", "文件上传失败!");
                                            }
                                        });
                                    }
                                }
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'panel',
                layout: 'border',
                border: false,
                margin: '0 0 0 5',
                region: 'east',
                flex: 3,
                items: [
                    {
                        xtype: 'contract_upload_grid',
                        region: 'center',
                        flex: 3
                    }
                ]
            }
        ]
        this.callParent(arguments);
    }
});