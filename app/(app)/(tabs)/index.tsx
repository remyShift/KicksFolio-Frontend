import CollectionCard from '@/components/cards/CollectionCard';
import FriendTitle from '@/components/text/FriendTitle';
import PageTitle from '@/components/text/PageTitle';
import Title from '@/components/text/Title';
import MainButton from '@/components/buttons/MainButton';
import { ScrollView, View } from 'react-native';
import { useSession } from '@/context/authContext';
import { router } from 'expo-router';

export default function Tab() {
    const { userCollection, userSneakers, userFriends } = useSession();

    return (
        <ScrollView className="flex-1">
            <View className="flex-1 pt-20 gap-10">
                <PageTitle content="KicksFolio" />

                <View className='flex-1 gap-32'>
                    <View className="flex-1 gap-4">
                        <Title content="My collection" />
                        <CollectionCard userCollection={userCollection} userSneakers={userSneakers} />
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
    );
}
