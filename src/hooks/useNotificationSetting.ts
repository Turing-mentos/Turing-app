import {useState, useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';

export default function useNotificationSetting() {
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);

  async function checkNotificationEnabled() {
    try {
      const status = await messaging().hasPermission();
      setIsNotificationEnabled(status === 1 ? true : false);
    } catch (err) {
      console.log('checkNotificationEnabled() error:' + err);
    }
  }

  useEffect(() => {
    checkNotificationEnabled();
  }, []);

  return {
    isNotificationEnabled,
  };
}
