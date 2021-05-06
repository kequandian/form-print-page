// 只需写配置，方便可扩展
export const defaultCommonSettings = {
    $id: {
      title: 'ID',
      description: '数据存储的名称/英文/必填',
      type: 'string',
      'ui:widget': 'idInput',
    },
    title: {
      title: '标题',
      type: 'string',
    },
    // description: {
    //   title: '说明',
    //   type: 'string',
    // },
    'ui:width': {
      title: '元素宽度',
      type: 'string',
      'ui:widget': 'percentSlider',
    },
    'ui:labelWidth': {
      title: '标签宽度',
      description: '默认值120',
      type: 'number',
      'ui:widget': 'slider',
      max: 400,
      'ui:options': {
        hideNumber: true,
      },
    },
    'ui:default': {
      title: '默认值',
      type: 'string',
    },
    'ui:readonly': {
      title: '置灰',
      type: 'boolean',
    },
  };
  
  // widget 用于schema中每个元素对应的右侧配置知道用哪个setting
  
  export const defaultPlugin = [
    {
      text:"图像",
      name:"Image",
      widget:"Image",
      schema:{
        type:"string",
        "ui:widget":"Image",
        "ui:width":"120px",
      },
      setting:{
        "pictureUrl":{
          title:"图片地址",
          type:"string",
        }
      }
    },
    {
      text:"输入框",
      name:"text",
      widget:"input",
      schema:{
        title:"输入框",
        type:'string',
        componentType:"input",
      },
      setting: {
        'ui:options': {
          title: '特殊选项',
          type: 'object',
          'ui:labelWidth': 80,
          properties: {
            allowClear: {
              title: '是否带清除按钮',
              description: '填写内容后才会出现x哦',
              type: 'boolean',
            },
            addonBefore: {
              title: '前tab',
              type: 'string',
              default:'http://'
            },
            addonAfter: {
              title: '后tab',
              type: 'string',
              default:'.com'
            },
            prefix: {
              title: '前缀',
              type: 'string',
            },
            suffix: {
              title: '后缀',
              type: 'string',
            },
            minLength: {
              title: '最短字数',
              type: 'number',
            },
            maxLength: {
              title: '最长字数',
              type: 'number',
            },
          }
        }
      }
    },
    {
      text:"二维码",
      name:"QRcode",
      widget:"QRcode",
      schema:{
        type:"string",
        "ui:widget":"QRcode",
        "ui:width":"120px",
      },
      setting:{
        "QRcodeUrl":{
          title:"二维码地址",
          type:"string",
        }
      }
    },
    {
      text:"数字框",
      type:"number",
      widget:"number",
      schema:{
        title:"数字框",
        type:"number",
        componentType: 'number'
      },
    },
    {
      text: '时间框',
      name: 'Time',
      schema: {
        title: '时间框',
        type: 'string',
        format: 'date',
      },
    },
    {
      text: '备注',
      name: 'placeholder',
      widget: 'textarea',
      schema: {
        title: '备注',
        type: 'string',
        format: 'textarea',
        componentType: 'text-area'
      },
    },
    {
      text: '下拉单选框',
      name: 'select',
      widget: 'select',
      schema: {
        title: '支付方式',
        type: 'string',
        enum: ['a', 'b', 'c'],
        enumNames: ['年结', '月结', '日结'],
        componentType: 'select'
      },
      setting: {
        enum: {
          title: '选项名称',
          type: 'array',
          enum: [],
          'ui:widget': 'select',
          'ui:options': {
            mode: 'tags',
          },
        },
        // enumNames: {
        //   title: '选项名称',
        //   type: 'array',
        //   enum: [],
        //   'ui:widget': 'select',
        //   'ui:options': {
        //     mode: 'tags',
        //   },
        // },
      },
    },
    {
      text:'电子签章',
      name:"EleSign",
      widget:"Elesign",
      schema:{
        type:'string',
        'ui:widget':'Elesign',
        "ui:width":"220px"
      },
      setting:{
        "src":{
          title:'签章图片地址',
          type:'string',
        }
      }
    },
    {
      text:'金额',
      name:"Money",
      schema:{
        type:"object",
        title:"金额",
        properties:{
          tags:{
            type:'input',
            enum:['$','￥'],
            'ui:width':'20%'
          },
          money:{
            type:"number",
            componentType: 'number',
            'ui:width':"80%"
          }
        }
      }
    }
  ]

  export const layouts = [
    {
      text: '表单容器',
      name: 'object',
      schema: {
        title: '表单容器',
        type: 'object',
        properties: {},
      },
      widget: 'map',
      setting: {},
    },
  ]
  
  export const defaultSettings = [
    {
      title:"打印单组件",
      widgets: defaultPlugin
    },
    {
      title:"布局组件",
      widgets: layouts
    }
  ];
  
  export const defaultGlobalSettings = {
    type: 'object',
    properties: {
      column: {
        title: '整体布局',
        type: 'string',
        enum: [1, 2, 3],
        enumNames: ['一行一列', '一行二列', '一行三列'],
        'ui:options': {
          placeholder: '默认一行一列',
        },
      },
    //   labelWidth: {
    //     title: '标签宽度',
    //     type: 'number',
    //     'ui:widget': 'slider',
    //     max: 300,
    //     'ui:options': {
    //       hideNumber: true,
    //     },
    //   },
      displayType: {
        title: '标签展示模式',
        type: 'string',
        enum: ['row', 'column'],
        enumNames: ['同行', '单独一行'],
        'ui:widget': 'radio',
      },
    },
  };
  