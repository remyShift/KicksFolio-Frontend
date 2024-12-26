import AddButton from '@/components/buttons/AddButton';
import MainButton from '@/components/buttons/MainButton';
import EditButton from '@/components/buttons/EditButton';
import LoveButton from '@/components/buttons/LoveButton';
import NextBackButton from '@/components/buttons/NextBackButton';
import ShareButton from '@/components/buttons/ShareButton';
import CollectionCard from '@/components/cards/CollectionCard';
import SneakerCard from '@/components/cards/SneakerCard';
import BrandTitle from '@/components/text/BrandTitle';
import FriendTitle from '@/components/text/FriendTitle';
import PageTitle from '@/components/text/PageTitle';
import SneakerTitle from '@/components/text/SneakerTitle';
import Title from '@/components/text/Title';
import { ScrollView, View } from 'react-native';

export default function Tab() {

    return (
        <ScrollView className="flex-1">
            <View className="flex-1 pt-20 gap-10">
                <PageTitle content="KicksFolio" />
                <Title content="My collection" />
                <Title content="Add some friends" isTextCenter={true} />
                <BrandTitle content="New Balance" />
                <FriendTitle content="remyShift" />
                <View className="px-5 gap-8">
                    <SneakerTitle content="New Balance 990v5" />
                    <MainButton content="Browse" onPress={() => {}} backgroundColor="bg-primary" />
                    <AddButton />
                    <View className="flex flex-row items-center gap-2">
                        <LoveButton />
                        <ShareButton />
                        <EditButton />
                        <NextBackButton />
                    </View>
                    <SneakerCard />
                    <CollectionCard />
                </View>
            </View>
        </ScrollView>
    );
}
