import { MMKV } from 'react-native-mmkv';

export const mmkvStorage = new MMKV({
  id: 'habits',
  encryptionKey: process.env.MMKV_ENCRYPTION_KEY,
});
