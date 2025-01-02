import { View, Text, ImageBackground } from 'react-native';

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
                <ImageBackground source={brandLogo} className="w-10 h-10 rounded-sm" resizeMode="contain"/>
            </View>
        </View>
    );
}
