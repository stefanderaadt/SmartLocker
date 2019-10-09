import React, { Fragment } from 'react';

import EditCaregiver from './EditCaregiverDialog';
import EditSmartLocker from './EditSmartLockerDialog';
import EditSchedule from './EditScheduleDialog';

const Dialogs = () => (
    <Fragment>
        <EditCaregiver />
        <EditSmartLocker />
        <EditSchedule />
    </Fragment>
);

export default Dialogs;
