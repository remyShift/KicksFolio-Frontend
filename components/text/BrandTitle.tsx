import { View, Text } from 'react-native';
import { Image } from 'expo-image';
export default function BrandTitle({ content, brandLogo }: { content: string, brandLogo: any }) {
    return (
        <View className="w-full flex justify-center overflow-hidden px-6">
            <Text className="font-syne-extrabold w-[200%] text-4xl text-primary opacity-15 absolute">
                {content.toUpperCase()}
            </Text>
            <View className="flex flex-row justify-between items-center">
                <Text className="font-syne-extrabold text-lg">
                    {content}
                </Text>
                <Image source={brandLogo} className="w-10 h-10 rounded-sm" contentFit="contain" cachePolicy={'memory-disk'}/>
            </View>
        </View>
    );
}
