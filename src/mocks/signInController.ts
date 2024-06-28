import ResponseDTO from './responseDTO';

const signInResponseExample = {
  accessToken:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ0cm90aGNhbSIsImlhdCI6MTY4OTE2NTI2OCwic3ViIjoiMSIsImV4cCI6MTcwNDcxNzI2OCwibWVtYmVySWQiOjF9.N4vrCb0G6PJn0TYF4-679LjYUU1nHLv_jVD1ctDr8BU',
  refreshToken:
    'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODkxNjUyNjgsInN1YiI6IjEiLCJleHAiOjE2OTAzNzQ4NjgsIm1lbWJlcklkIjoxLCJyb2xlcyI6IlVTRVIifQ.U3hRxPtYYodjhehymNQqhB9JoQOea1uFlMYfjWZuToo',
  email: 'test@naver.com',
};

export function setupSignInMocks(mock) {
  mock
    .onPost('/auth/kakao/login')
    .reply(
      200,
      ResponseDTO(true, 'COMMON200', '성공입니다.', signInResponseExample),
    );
}
