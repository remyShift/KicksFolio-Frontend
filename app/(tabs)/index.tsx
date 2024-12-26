import AddButton from '@/components/buttons/AddButton';
import BrowseButton from '@/components/buttons/BrowseButton';
import EditButton from '@/components/buttons/EditButton';
import LoveButton from '@/components/buttons/LoveButton';
import NextBackButton from '@/components/buttons/NextBackButton';
import ShareButton from '@/components/buttons/ShareButton';
import CollectionCard from '@/components/cards/CollectionCard';
import SneakerCard from '@/components/cards/SneakerCard';
import ProtectedRoute from '@/components/ProctectedRoute';
import BrandTitle from '@/components/text/BrandTitle';
import FriendTitle from '@/components/text/FriendTitle';
import PageTitle from '@/components/text/PageTitle';
import SneakerTitle from '@/components/text/SneakerTitle';
import Title from '@/components/text/Title';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function Tab() {

    return (
        <ProtectedRoute>
            <ScrollView className="flex-1">
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
                            <EditButton />
                            <NextBackButton />
                        </View>
                        <SneakerCard />
                        <CollectionCard />
                    </View>
                </View>
            </ScrollView>
        </ProtectedRoute>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});