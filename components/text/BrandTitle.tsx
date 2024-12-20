import { View, Image, Text } from "react-native";

export default function BrandTitle({ content }: { content: string }) {
    return (
        <View className="w-full justify-center overflow-hidden px-6">
            <Text className="font-syne-extrabold w-[200%] text-4xl text-primary opacity-10 absolute">
                {content.toUpperCase()}
            </Text>
            <View className="flex-row justify-between items-center">
                <Text className="font-syne-extrabold text-lg">
                    {content}
                </Text>
                <Image source={require('@/assets/images/brands/brand-logo.png')} className="w-10 h-10" />
            </View>
        </View>
    );
}