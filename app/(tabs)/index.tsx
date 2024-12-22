import { View, Text, StyleSheet } from 'react-native';
import PageTitle from '@/components/text/PageTitle';
import Title from '@/components/text/Title';
import BrandTitle from '@/components/text/BrandTitle';
import FriendTitle from '@/components/text/FriendTitle';

export default function Tab() {
    return (
        <View className="flex-1 items-center pt-20 gap-10">
            <PageTitle content="KicksFolio" />
            <Title content="My collection" />
            <Title content="Add some friends" isTextCenter={true} />
            <BrandTitle content="New Balance" />
            <FriendTitle content="remyShift" />
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