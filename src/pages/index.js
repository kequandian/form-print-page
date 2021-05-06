import React from 'react';
import { history } from 'umi';
import win from 'zero-element/lib/utils/window';

import { getToken } from 'zero-element/lib/utils/request/token';

export default function () {
  // if (win.ZEle.indexPage) {
  //   history.push(win.ZEle.indexPage);
  // }

  if (getToken()) {
    history.push('/sys/activitiesCustom/activitiesCustom-design');
  } else {
    history.push('/sys/activitiesCustom/activitiesCustom-design');
  }

  return (
    <div>
      首页
    </div>
  );
}
