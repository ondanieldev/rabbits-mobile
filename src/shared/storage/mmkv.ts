import { MMKV } from 'react-native-mmkv';

export const mmkvStorage = new MMKV({
  id: 'mmkv.default',
  encryptionKey: process.env.MMKV_ENCRYPTION_KEY,
});
