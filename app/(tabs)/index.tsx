import { View, Text, StyleSheet } from 'react-native';
import PageTitle from '@/components/text/PageTitle';
import Title from '@/components/text/Title';
import BrandTitle from '@/components/text/BrandTitle';
import FriendTitle from '@/components/text/FriendTitle';
import SneakerTitle from '@/components/text/SneakerTitle';
import BrowseButton from '@/components/buttons/BrowseButton';
import AddButton from '@/components/buttons/AddButton';
import LoveButton from '@/components/buttons/LoveButton';
import ShareButton from '@/components/buttons/ShareButton';

export default function Tab() {
    return (
        <View className="flex-1 pt-20 gap-10">
            <PageTitle content="KicksFolio" />
            <Title content="My collection" />
            <Title content="Add some friends" isTextCenter={true} />
            <BrandTitle content="New Balance" />
            <FriendTitle content="remyShift" />
            <View className="px-5 gap-8">
                <SneakerTitle content="New Balance 990v5" />
                <BrowseButton />
                <AddButton />
                <View className="flex flex-row items-center gap-2">
                    <LoveButton />
                    <ShareButton />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});