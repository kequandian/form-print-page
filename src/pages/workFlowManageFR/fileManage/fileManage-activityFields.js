import React from 'react';
import { PageHeader } from 'antd';
import BodyPage from './config/fileManage-activityFields';

import useBreadcrumb from '@/framework/useBreadcrumb';
import { useWillUnmount } from 'zero-element/lib/utils/hooks/lifeCycle';
import switchEndpoint from '@/components/switchEndpoint';

export default function WorkFlowListFRStep() {
    useBreadcrumb([
        { title: '首页', path: '/' },
        { title: '流程管理', path: '/workFlowManageFR' },
        { title: '表单模板管理', path: '/workFlowManageFR/fileManage' },
        { title: '绑定字段'},
    ]);
    useWillUnmount(switchEndpoint)

    return <PageHeader
        title="绑定字段"
        ghost={false}
        onBack={() => window.history.back()}
    >
        <BodyPage/>
    </PageHeader>
};
