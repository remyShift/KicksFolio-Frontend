import MainButton from '@/components/buttons/MainButton';
import { ScrollView, Text, View } from 'react-native';
import { useSession } from '@/context/authContext';
import PageTitle from '@/components/text/PageTitle';
import Title from '@/components/text/Title';
import SneakerCard from '@/components/cards/SneakerCard';

export default function Tab() {
  const { logout, user, userCollection, userSneakers } = useSession();

  return (
    <ScrollView className="flex-1">
      <View className="flex-1 gap-12">
        <PageTitle content="Profile" />
        <View className="flex-1 gap-12">
          <View className="flex-col gap-4">
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

            {userSneakers && userSneakers.length === 0 ? (
              <View className="flex-1 gap-8 items-center">
                <Title content='Add Sneakers' isTextCenter={true} />
                <MainButton content='Add Sneakers' backgroundColor='bg-primary' onPressAction={() => {
                  console.log('add sneakers');
                }} />
              </View>
            ) : (
              <View className="flex-1 gap-4">
                <Title content='Your Sneakers' isTextCenter={true} />
                {userSneakers?.map((sneaker) => (
                  <View key={sneaker.id} className="flex-1 px-4">
                    <SneakerCard sneaker={sneaker} />
                  </View>
                ))}
              </View>
            )}

            <View className="flex-1 w-full items-center">
              <MainButton content='Logout' backgroundColor='bg-gray-400' onPressAction={() => {
                setTimeout(() => {
                  logout();
                }, 300);
              }} />
            </View>
        </View>
      </View>
    </ScrollView>
  );
}
