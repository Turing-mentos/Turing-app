import {axiosInstance} from '../utils/http';
import MockAdapter from 'axios-mock-adapter';

import {setupSignInMocks} from './signInController';
import {setupNotificationInMocks} from './notificationController';
import {setupProfileInMocks} from './profileController';
import {setupStudyRoomInMocks} from './studyRoomController';
import {setupReportInMocks} from './reportController';

const mock = new MockAdapter(axiosInstance, {delayResponse: 500});

setupSignInMocks(mock);
setupNotificationInMocks(mock);
setupProfileInMocks(mock);
setupStudyRoomInMocks(mock);
setupReportInMocks(mock);

export default mock;
