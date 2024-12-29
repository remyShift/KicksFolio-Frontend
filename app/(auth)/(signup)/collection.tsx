import { View, Text, TextInput, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import MainButton from "@/components/buttons/MainButton";
import { useState, useRef } from "react";
import PageTitle from "@/components/text/PageTitle";
import ErrorMsg from "@/components/text/ErrorMsg";

export default function Collection() {
    const [isCollectionNameFocused, setIsCollectionNameFocused] = useState(false);
    const [isCollectionNameError, setIsCollectionNameError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const scrollViewRef = useRef<ScrollView>(null);

    return (
        <KeyboardAvoidingView 
            className="flex-1 bg-background" 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
            <ScrollView 
                ref={scrollViewRef}
                className='flex-1'
                keyboardShouldPersistTaps="handled"
                scrollEnabled={isCollectionNameFocused}>
                <View className="flex-1 items-center gap-12 p-4 pt-20 bg-background">
                    <PageTitle content='Welcome to KicksFolio !' />
                    <View className='flex justify-center items-center gap-8 w-full mt-32'>
                        <ErrorMsg content={errorMsg} display={errorMsg !== ''} />
                        <Text className="text-lg font-spacemono-bold">Please give a name to your collection :</Text>
                        <TextInput
                            placeholder="Collection name"
                            className={`bg-white rounded-md p-3 w-2/3 font-spacemono-bold ${
                                isCollectionNameError ? 'border-2 border-red-500' : ''
                            } ${isCollectionNameFocused ? 'border-2 border-primary' : ''}`}
                        />
                        <MainButton 
                            content='Next' 
                            backgroundColor='bg-primary' 
                            onPressAction={() => {
                                alert('Next');
                                }} 
                        />
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}