import messaging from '@react-native-firebase/messaging';

export async function fetchFcmToken() {
  const token = await messaging().getToken();

  return token;
}
