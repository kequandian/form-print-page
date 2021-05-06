import React from 'react';
import ProjectActivities from '@/pages/workFlowManageFR/activitiesFR/config/ActivitiesFR/design';

import useBreadcrumb from '@/framework/useBreadcrumb';
    
export default (props) => {

    useBreadcrumb([
        { title: '可视化设计' ,path: '/workFlowManageFR/activitiesFR-design'},
    ]);

    return (
        <ProjectActivities />
    )
}