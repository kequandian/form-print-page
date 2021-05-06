import React from 'react';
import { Button } from 'antd';

export default (props) => {

  const { title = '导出', options = {}, className, namespace, handle, config, ...restProps } = props;

  console.log('title', title)
  console.log('options', options)
  console.log('className', className)
  console.log('namespace', namespace)
  console.log('handle', handle)
  console.log('config', config)
  console.log('restProps', restProps)

  return (
      <Button className={className}>pdf</Button>
  )
    
}