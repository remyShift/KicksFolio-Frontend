import MainButton from '@/components/buttons/MainButton';
import { ScrollView, Text, View, Modal } from 'react-native';
import { useSession } from '@/context/authContext';
import PageTitle from '@/components/text/PageTitle';
import Title from '@/components/text/Title';
import SneakerCard from '@/components/cards/SneakerCard';
import AddButton from '@/components/buttons/AddButton';
import { Pressable } from 'react-native';
import { useState } from 'react';
import { renderModalContent } from '@/components/modals/AddSneakersModal';

export default function User() {
  const { logout, user, userSneakers } = useSession();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalStep, setModalStep] = useState<'index' | 'box' | 'noBox'>('index');

  return (
    <>
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

              {userSneakers && userSneakers.length === 0 || !userSneakers ? (
                <View className="flex-1 gap-8 items-center">
                  <Title content='Add Sneakers' isTextCenter={true} />
                  <MainButton content='Add' backgroundColor='bg-primary' onPressAction={() => {
                    setModalStep('index');
                    setModalVisible(true);
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

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <Pressable 
              className="flex-1 bg-black/50" 
              onPress={() => setModalVisible(false)}
          >
              <View className="flex-1 justify-end">
                  <Pressable 
                      className="h-[80%] bg-background rounded-t-3xl p-4"
                      onPress={(e) => {
                          e.stopPropagation();
                      }}
                  >
                      {renderModalContent({ 
                          modalStep,
                          setModalStep,
                          closeModal: () => setModalVisible(false) 
                      })}
                  </Pressable>
              </View>
            </Pressable>
          </Modal>
      </ScrollView>

      <AddButton onPress={() => {
        setModalVisible(true);
      }}/>
    </>
  );
}
