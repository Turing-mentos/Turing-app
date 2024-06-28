import {axiosInstance} from '../utils/http';
import MockAdapter from 'axios-mock-adapter';

import {setupSignInMocks} from './signInController';

const mock = new MockAdapter(axiosInstance, {delayResponse: 500});

setupSignInMocks(mock);

export default mock;
