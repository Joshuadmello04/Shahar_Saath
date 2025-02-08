import { View, Text, FlatList, Linking, Alert, ScrollView } from 'react-native';
import React, {useEffect } from 'react';
import { styled } from 'nativewind';
import { Card } from 'react-native-paper';
import Header from '../../components/Header';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from "expo-router";

const videoTypes = [
  {
    type: 'Sewing Videos',
    videos: [
      { id: '1', title: 'Beginner Sewing', thumbnail: 'https://img.youtube.com/vi/OSv7GwqvDoI/hqdefault.jpg', url: 'https://www.youtube.com/watch?v=OSv7GwqvDoI' },
      { id: '2', title: 'Advanced Techniques', thumbnail: 'https://img.youtube.com/vi/a_SthPXtV6c/hqdefault.jpg', url: 'https://www.youtube.com/watch?v=a_SthPXtV6c' },
    ],
  },
  {
    type: 'Excel Tutorials',
    videos: [
      { id: '3', title: 'Excel Basics', thumbnail: 'https://img.youtube.com/vi/ynnH3BWcH2w/hqdefault.jpg', url: 'https://youtu.be/ynnH3BWcH2w' },
      { id: '4', title: 'Pivot Tables', thumbnail: 'https://img.youtube.com/vi/a_SthPXtV6c/hqdefault.jpg', url: 'https://www.youtube.com/watch?v=a_SthPXtV6c' },
    ],
  },
  {
    type: 'Purse Making',
    videos: [
      { id: '5', title: 'Leather Purse Design', thumbnail: 'https://img.youtube.com/vi/kuZ0K1LzLXQ/hqdefault.jpg', url: 'https://youtu.be/kuZ0K1LzLXQ' },
      { id: '6', title: 'Hand-Stitched Bags', thumbnail: 'https://img.youtube.com/vi/a_SthPXtV6c/hqdefault.jpg', url: 'https://www.youtube.com/watch?v=a_SthPXtV6c' },
    ],
  },
];

export default function Course() {
  const StyledText = styled(Text);
  const StyledView = styled(View);

  const checkAuth = async () => {
    const token = await AsyncStorage.getItem('token');
  
    if (!token) {
      router.replace('/login');
      return;
    }
  
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/auth/validate-token`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (response.status !== 200) {
        await AsyncStorage.removeItem('token');
        router.replace('/login');
      }
    } catch (error) {
      console.error('Token validation failed:', error);
      await AsyncStorage.removeItem('token');
      router.replace('/login');
    }
  };
  
  // Run checkAuth on mount
  useEffect(() => {
    checkAuth();
  }, []);
  
  const handlePress = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Cannot open video link.');
      }
    } catch (error) {
      console.error('Failed to open video:', error);
    }
  };

  const renderVideos = ({ item }) => (
    <Card style={{ margin: 10, width: 220, backgroundColor: '#1A1F36', borderRadius: 15, elevation: 5 }} onPress={() => handlePress(item.url)}>
      <Card.Cover source={{ uri: item.thumbnail }} style={{ borderTopLeftRadius: 15, borderTopRightRadius: 15 }} />
      <Card.Content>
        <StyledText className='font-bold text-lg text-white mt-2'>{item.title}</StyledText>
      </Card.Content>
    </Card>
  );

  const renderType = ({ item }) => (
    <StyledView className='mb-6'>
      <StyledText className='font-bold text-xl text-white mb-3'>{item.type}</StyledText>
      <FlatList
        data={item.videos}
        renderItem={renderVideos}
        keyExtractor={(video) => video.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 10 }}
      />
    </StyledView>
  );

  return (
    <LinearGradient colors={['#0F172A', '#1E293B']} style={{ flex: 1 }}>
      <Header />
        <StyledText className='text-center text-2xl font-bold text-blue-400 mb-5'>Educational Courses</StyledText>
        <FlatList
          data={videoTypes}
          renderItem={renderType}
          keyExtractor={(type) => type.type}
          contentContainerStyle={{ paddingBottom: 50 }}
        />
    </LinearGradient>
  );
}
