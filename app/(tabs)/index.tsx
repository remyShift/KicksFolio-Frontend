import { View, Text, StyleSheet } from 'react-native';
import MainTitle from '@/components/text/MainTitle';
import Title from '@/components/text/Title';
import BrandTitle from '@/components/text/BrandTitle';

export default function Tab() {
    return (
        <View className="flex-1 items-center pt-20 gap-10">
            <MainTitle>KicksFolio</MainTitle>
            <Title content="My collection" />
            <Title content="Add some friends" isTextCenter={true} />
            <BrandTitle content="New Balance" />
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