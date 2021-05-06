import React, { useState, useEffect,useRef } from 'react';
import { message } from 'antd';
import { history } from 'umi';
import Generator from 'fr-generator';
import copyTOClipboard from 'copy-text-to-clipboard';

import { defaultSettings, defaultCommonSettings, defaultGlobalSettings } from './settings';

import { setPageData, getPageData, clearPageData, getHooks } from 'zero-element/lib/Model';

import promiseAjax from '@/utils/promiseAjax';
import { get as getEndpoint } from 'zero-element/lib/utils/request/endpoint';

import { widgets as customWidgets} from './components';

const Demo = (props) => {

  const { subData } = props;

  // const ref = useRef();


  const { API, custActivityId } = subData;
  console.log(subData);


  // const [submitData, setSubmitData] = useState('');

  // useEffect(_ => {
  //   setSubmitData(subData);
  // }, [submitData])

  function createFR(submitData) {
    const apiUrl = `${getEndpoint()}${API.createAPI}`
    const queryData = submitData;
    handleRequest(apiUrl, queryData, { method: 'POST' })
  }

  function updateFR(submitData) {
    const updateAPI = API.updateAPI;
    const formatApi = updateAPI.replace('(id)', custActivityId);
    const apiUrl = `${getEndpoint()}${formatApi}`
    const queryData = submitData;
    console.log('queryData = ', queryData)
    handleRequest(apiUrl, queryData, { method: 'PUT' })
  }


  function handleRequest(apiUrl, queryData, other) {
    promiseAjax(apiUrl, queryData, other)
      .then(resp => {
        if (resp && resp.code === 200) {
          console.log("保存成功")
          history.push(goBack());
        } else {
          console.warn('保存失败 = ', resp.message);
        }
      })
  }

  function onSubimit(schema) {
    if (validateSchema(schema)) {
      if (API.createAPI) {
        subData.tableJson = schema;
        createFR(subData);
      } else if (API.updateAPI) {
        subData.tableJson = schema;
        updateFR(subData);
      }
    }
  }

  //properties
  function validateSchema(schema) {
    const schemaJson = strToJson(schema);
    if (schemaJson && JSON.stringify(schemaJson) != '{}') {
      const propertiesJSon = schemaJson.schema.properties;
      if (JSON.stringify(propertiesJSon) != '{}') {
        for (var index in propertiesJSon) {
          // console.log(index ,":", propertiesJSon[index]);
          if (index == '') {
            message.error(`标题为 ${propertiesJSon[index].title} 的组件配置, ID 不能为空`);
            return false;
          }
        }
      }
    }
    return true;
  }

  const customBtns = [
    true, true, false, true,
    {
      text: '保存',
      saveClick: (schema) => {
        // copyTOClipboard(schema);
        // submitData.frJson = strToJson(schema);
        // setSubmitData(submitData);
        // console.log(schema);
        // alert("复制成功")
        // console.log('submitData = ', submitData)
        // setPageData(namespace, 'formData', submitData);
        onSubimit(schema)
      },
    },
  ]

  //字符串 转 json
  function strToJson(str) {
    var json = eval('(' + str + ')');
    return json;
  }

  function goBack(){
    const pathname = location.pathname;
    const pathList = pathname.split('/');
    let goBackUrl = '';
    if(pathList){
      if(pathList.length == 3){
        goBackUrl = `/${pathList[1]}`
      }else if(pathList.length > 3){
        goBackUrl = `/${pathList[1]}/${pathList[2]}`;
      }
    }
    return goBackUrl;
  }

  
  return (
    <div style={{ height: '100vh' }}>
      <Generator
        defaultValue={subData.tableJson ? (strToJson(subData.tableJson)) : null}
        // ref={ref}
        widgets={customWidgets}
        formData={"测试"}
        settings={defaultSettings}
        commonSettings={defaultCommonSettings}
        globalSettings={defaultGlobalSettings}
        extraButtons={customBtns}
        />
    </div>
  );
  
};
export default Demo;