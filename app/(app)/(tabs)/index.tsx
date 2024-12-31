import CollectionCard from '@/components/cards/CollectionCard';
import FriendTitle from '@/components/text/FriendTitle';
import PageTitle from '@/components/text/PageTitle';
import Title from '@/components/text/Title';
import MainButton from '@/components/buttons/MainButton';
import { ScrollView, View, Modal, Pressable, Text } from 'react-native';
import { useSession } from '@/context/authContext';
import { useLocalSearchParams } from "expo-router";
import { useState, useEffect } from 'react';
import { renderModalContent } from '@/components/modals/AddFirstSneakersModal';

export default function Tab() {
    const params = useLocalSearchParams();
    const isNewUser = params.newUser === 'true';
    const { userCollection, userSneakers, userFriends } = useSession();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalStep, setModalStep] = useState<'index' | 'box' | 'noBox'>('index');

    useEffect(() => {
        console.log('userSneakers', userSneakers);
        if (isNewUser && (userSneakers && userSneakers.length === 0 || !userSneakers)) {
            setModalVisible(true);
        }
    }, [isNewUser, userSneakers]);

    return (
        <View className="flex-1">
            <ScrollView className="flex-1">
                <View className="flex-1 gap-10">
                    <PageTitle content="KicksFolio" />

                    <View className='flex-1 gap-32'>
                        <View className="flex-1 gap-4">
                            <Title content="My collection" />
                            <View className="flex-1 px-4">
                                <CollectionCard userCollection={userCollection} userSneakers={userSneakers} />
                            </View>
                        </View>

                        {userFriends && userFriends.length > 0 ? (
                            userFriends.map((friend) => (
                                <View className="flex-1 gap-4">
                                    <FriendTitle content={`${friend.username}`} />
                                    <CollectionCard userCollection={friend.collection} userSneakers={friend.sneakers} />
                                </View>
                            ))
                        ) : (
                            <View className="flex-1 gap-4 items-center justify-center">
                                <Title content="Add some friends" isTextCenter={true} />
                                <MainButton content="Browse" backgroundColor="bg-primary" onPressAction={() => {
                                    alert('Feature in development ...');
                                }} />
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>

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
        </View>
    );
}
