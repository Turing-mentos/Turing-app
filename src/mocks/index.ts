import {axiosInstance} from '../utils/http';
import MockAdapter from 'axios-mock-adapter';

import {setupSignInMocks} from './signInController';
import {setupNotificationInMocks} from './notificationController';

const mock = new MockAdapter(axiosInstance, {delayResponse: 500});

setupSignInMocks(mock);
setupNotificationInMocks(mock);

export default mock;
