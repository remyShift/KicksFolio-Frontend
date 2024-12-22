import { View, Text, Image } from 'react-native';

export default function BrandTitle({ content, isTextCenter = false }: { content: string, isTextCenter?: boolean }) {
    return (
        <View className="w-full flex justify-center overflow-hidden px-6">
            <Text className="font-syne-extrabold w-[200%] text-4xl text-primary opacity-15 absolute">
                {content.toUpperCase()}
            </Text>
            <View className="flex flex-row justify-between items-center">
                <Text className={`font-syne-extrabold text-lg ${isTextCenter ? 'text-center' : ''}`}>
                    {content}
                </Text>
                <Image source={require('@/assets/images/adaptive-icon.png')} className="w-10 h-10" />
            </View>
        </View>
    );
}
