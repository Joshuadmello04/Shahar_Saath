import { View, Text, FlatList, Linking, Alert } from 'react-native';
import React from 'react';
import { styled } from 'nativewind';
import { Card } from 'react-native-paper';
import Header from '../../components/Header';

const videoTypes = [
  {
    type: 'Sewing Videos',
    videos: [
      { id: '1', title: 'Video 1', thumbnail: 'https://img.youtube.com/vi/OSv7GwqvDoI/default.jpg', url: 'https://www.youtube.com/watch?v=OSv7GwqvDoI' },
      { id: '2', title: 'Video 2', thumbnail: 'https://img.youtube.com/vi/a_SthPXtV6c/sddefault.jpg', url: 'https://www.youtube.com/watch?v=a_SthPXtV6c' },
      { id: '3', title: 'Video 3', thumbnail: 'https://img.youtube.com/vi/a_SthPXtV6c/sddefault.jpg', url: 'https://www.youtube.com/watch?v=a_SthPXtV6c' },
      { id: '4', title: 'Video 4', thumbnail: 'https://img.youtube.com/vi/a_SthPXtV6c/sddefault.jpg', url: 'https://www.youtube.com/watch?v=a_SthPXtV6c' },
      { id: '5', title: 'Video 5', thumbnail: 'https://img.youtube.com/vi/a_SthPXtV6c/sddefault.jpg', url: 'https://www.youtube.com/watch?v=a_SthPXtV6c' },
      { id: '6', title: 'Video 6', thumbnail: 'https://img.youtube.com/vi/a_SthPXtV6c/sddefault.jpg', url: 'https://www.youtube.com/watch?v=a_SthPXtV6c' },
    ],
  },
  {
    type: 'Exel Videos',
    videos: [
      { id: '7', title: 'Video 7', thumbnail: 'https://img.youtube.com/vi/ynnH3BWcH2w/default.jpg', url: 'https://youtu.be/ynnH3BWcH2w?si=Mf1dYJZSTD4t8_hF' },
      { id: '8', title: 'Video 8', thumbnail: 'https://img.youtube.com/vi/a_SthPXtV6c/sddefault.jpg', url: 'https://www.youtube.com/watch?v=a_SthPXtV6c' },
      { id: '9', title: 'Video 9', thumbnail: 'https://img.youtube.com/vi/a_SthPXtV6c/sddefault.jpg', url: 'https://www.youtube.com/watch?v=a_SthPXtV6c' },
      { id: '10', title: 'Video 10', thumbnail: 'https://img.youtube.com/vi/a_SthPXtV6c/sddefault.jpg', url: 'https://www.youtube.com/watch?v=a_SthPXtV6c' },
      { id: '11', title: 'Video 11', thumbnail: 'https://img.youtube.com/vi/a_SthPXtV6c/sddefault.jpg', url: 'https://www.youtube.com/watch?v=a_SthPXtV6c' },
    ],
  },
  {
    type: 'Purse Making Videos',
    videos: [
      { id: '12', title: 'Video 12', thumbnail: 'https://img.youtube.com/vi/kuZ0K1LzLXQ/mqdefault.jpg', url: 'https://youtu.be/kuZ0K1LzLXQ?si=vWcwgTffLjtP5knC' },
      { id: '13', title: 'Video 13', thumbnail: 'https://img.youtube.com/vi/a_SthPXtV6c/sddefault.jpg', url: 'https://www.youtube.com/watch?v=a_SthPXtV6c' },
      { id: '14', title: 'Video 14', thumbnail: 'https://img.youtube.com/vi/a_SthPXtV6c/sddefault.jpg', url: 'https://www.youtube.com/watch?v=a_SthPXtV6c' },
      { id: '15', title: 'Video 15', thumbnail: 'https://img.youtube.com/vi/a_SthPXtV6c/sddefault.jpg', url: 'https://www.youtube.com/watch?v=a_SthPXtV6c' },
      { id: '16', title: 'Video 16', thumbnail: 'https://img.youtube.com/vi/a_SthPXtV6c/sddefault.jpg', url: 'https://www.youtube.com/watch?v=a_SthPXtV6c' },
    ],
  },
];

export default function Course() {
  const StyledText = styled(Text);
  const StyledView = styled(View);

  const handlePress = async (url) => {
    const videoId = url.split('v=')[1].split('&')[0]; // Extract video ID from the URL
    const youtubeAppUrl = `vnd.youtube:${videoId}`; // YouTube app URL scheme
    const youtubeWebUrl = url; // Fallback web URL

    try {
      // Check if the YouTube app can be opened
      const supported = await Linking.canOpenURL(youtubeAppUrl);
      if (supported) {
        await Linking.openURL(youtubeAppUrl);
      } else {
        await Linking.openURL(youtubeWebUrl); // Fallback to web URL
      }
    } catch (error) {
      console.error('Failed to open video:', error);
    }
  };

  const renderVideos = ({ item }) => (
    <Card style={{ margin: 10, width: 200 }} onPress={() => handlePress(item.url)}>
      <Card.Cover source={{ uri: item.thumbnail }} />
      <Card.Content>
        <StyledText className='font-bold text-lg'>{item.title}</StyledText>
      </Card.Content>
    </Card>
  );

  const renderType = ({ item }) => (
    <StyledView className='mb-5'>
      <StyledText className='font-bold text-xl mb-2'>{item.type}</StyledText>
      <FlatList
        data={item.videos}
        renderItem={renderVideos}
        keyExtractor={(video) => video.id}
        horizontal
        contentContainerStyle={{ paddingVertical: 10 }}
      />
    </StyledView>
  );

  return (
    <>
      <Header />
      <StyledView className='flex-1'>
        <FlatList
          data={videoTypes}
          renderItem={renderType}
          keyExtractor={(type) => type.type}
          contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 20 }}
        />
      </StyledView>
    </>
  );
}
