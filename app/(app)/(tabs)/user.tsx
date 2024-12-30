import MainButton from '@/components/buttons/MainButton';
import { Text, View } from 'react-native';
import { useSession } from '@/context/authContext';
import PageTitle from '@/components/text/PageTitle';
import Title from '@/components/text/Title';

export default function Tab() {
  const { logout, user, userCollection, userSneakers } = useSession();

  return (
    <View className="flex-1 pt-20">
      <PageTitle content="Profile" />
      <View className="flex-1 gap-12 mt-12">
        <View className="flex-1 gap-4">
          <Title content={user?.username || ''} />

          <View className="flex-row justify-between w-full px-4 gap-4 items-center">
            <View className='w-24 h-24 bg-primary rounded-full'></View>

            <View className="flex-row w-full gap-10">
              <View>
                <Text className="font-spacemono-bold text-lg text-center">{userSneakers?.length || '0'}</Text>
                <Text className="font-spacemono text-base text-center">sneakers</Text>
              </View>

              <View>
                <Text className="font-spacemono-bold text-lg text-center">0</Text>
                <Text className="font-spacemono text-base text-center">friends</Text>
              </View>

              <View>
                <Text className="font-spacemono-bold text-lg text-center">$0</Text>
                <Text className="font-spacemono text-base text-center">value</Text>
              </View>
            </View>
          </View>
        </View>

        <View className="flex-1 gap-8 items-center">
          <Title content='Add Sneakers' isTextCenter={true} />
          <MainButton content='Add Sneakers' backgroundColor='bg-primary' onPressAction={() => {
            console.log('add sneakers');
          }} />
        </View>

        <View className="flex-1 w-full items-center">
          <MainButton content='Logout' backgroundColor='bg-gray-400' onPressAction={() => {
            setTimeout(() => {
              logout();
            }, 300);
          }} />
        </View>
      </View>
    </View>
  );
}
