import MainButton from '@/components/buttons/MainButton';
import { Text, View } from 'react-native';
import { useSession } from '@/context/authContext';

export default function Tab() {
  const { logout } = useSession();

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="font-syne-extrabold text-2xl">Tab [User]</Text>
      <MainButton content='Logout' backgroundColor='bg-primary' onPress={() => {
        logout();
      }} />
    </View>
  );
}
