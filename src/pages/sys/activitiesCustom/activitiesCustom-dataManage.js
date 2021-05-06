import React from 'react';
import useBreadcrumb from '@/framework/useBreadcrumb';
import ProjectActivities from '@/pages/sys/activitiesCustom/config/dataManage';
    
export default (props) => {
    useBreadcrumb([
        { title: '首页', path: '/' },
        { title: '自定义表单', path: '/sys' },
        { title: '自定义表单', path: '/sys/activitiesCustom' },
        { title: '数据管理' },
    ]);

return <ProjectActivities />

}