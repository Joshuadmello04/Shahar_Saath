import { View, Text, FlatList} from 'react-native';
import React from 'react';
import { styled } from 'nativewind';
import { Card } from 'react-native-paper';
import Header from '../../components/Header';

const videoTypes = [
  {
    type: 'Type 1',
    videos: [
      { id: '1', title: 'Video 1', thumbnail: 'https://img.youtube.com/vi/a_SthPXtV6c/sddefault.jpg', url: 'https://www.youtube.com/watch?v=a_SthPXtV6c&pp=ygUMcmVhY3QgbmF0aXZl' },
      { id: '2', title: 'Video 2', thumbnail: 'https://img.youtube.com/vi/a_SthPXtV6c/sddefault.jpg', url: 'https://www.youtube.com/watch?v=a_SthPXtV6c&pp=ygUMcmVhY3QgbmF0aXZl' },
      { id: '3', title: 'Video 3', thumbnail: 'https://img.youtube.com/vi/a_SthPXtV6c/sddefault.jpg', url: 'https://www.youtube.com/watch?v=a_SthPXtV6c&pp=ygUMcmVhY3QgbmF0aXZl' },
      { id: '4', title: 'Video 4', thumbnail: 'https://img.youtube.com/vi/a_SthPXtV6c/sddefault.jpg', url: 'https://www.youtube.com/watch?v=a_SthPXtV6c&pp=ygUMcmVhY3QgbmF0aXZl' },
      { id: '5', title: 'Video 5', thumbnail: 'https://img.youtube.com/vi/a_SthPXtV6c/sddefault.jpg', url: 'https://www.youtube.com/watch?v=a_SthPXtV6c&pp=ygUMcmVhY3QgbmF0aXZl' },
      { id: '6', title: 'Video 6', thumbnail: 'https://img.youtube.com/vi/a_SthPXtV6c/sddefault.jpg', url: 'https://www.youtube.com/watch?v=a_SthPXtV6c&pp=ygUMcmVhY3QgbmF0aXZl' },

    ],
  },
  {
    type: 'Type 2',
    videos: [
      { id: '7', title: 'Video 7', thumbnail: 'https://img.youtube.com/vi/a_SthPXtV6c/sddefault.jpg', url: 'https://www.youtube.com/watch?v=a_SthPXtV6c&pp=ygUMcmVhY3QgbmF0aXZl' },
      { id: '8', title: 'Video 8', thumbnail: 'https://img.youtube.com/vi/a_SthPXtV6c/sddefault.jpg', url: 'https://www.youtube.com/watch?v=a_SthPXtV6c&pp=ygUMcmVhY3QgbmF0aXZl' },
      { id: '9', title: 'Video 9', thumbnail: 'https://img.youtube.com/vi/a_SthPXtV6c/sddefault.jpg', url: 'https://www.youtube.com/watch?v=a_SthPXtV6c&pp=ygUMcmVhY3QgbmF0aXZl' },
      { id: '10', title: 'Video 10', thumbnail: 'https://img.youtube.com/vi/a_SthPXtV6c/sddefault.jpg', url: 'https://www.youtube.com/watch?v=a_SthPXtV6c&pp=ygUMcmVhY3QgbmF0aXZl' },
      { id: '11', title: 'Video 11', thumbnail: 'https://img.youtube.com/vi/a_SthPXtV6c/sddefault.jpg', url: 'https://www.youtube.com/watch?v=a_SthPXtV6c&pp=ygUMcmVhY3QgbmF0aXZl' },
    ],
  },
  {
    type: 'Type 3',
    videos: [
      { id: '12', title: 'Video 12', thumbnail: 'https://img.youtube.com/vi/a_SthPXtV6c/sddefault.jpg', url: 'https://www.youtube.com/watch?v=a_SthPXtV6c&pp=ygUMcmVhY3QgbmF0aXZl' },
      { id: '13', title: 'Video 13', thumbnail: 'https://img.youtube.com/vi/a_SthPXtV6c/sddefault.jpg', url: 'https://www.youtube.com/watch?v=a_SthPXtV6c&pp=ygUMcmVhY3QgbmF0aXZl' },
      { id: '14', title: 'Video 14', thumbnail: 'https://img.youtube.com/vi/a_SthPXtV6c/sddefault.jpg', url: 'https://www.youtube.com/watch?v=a_SthPXtV6c&pp=ygUMcmVhY3QgbmF0aXZl' },
      { id: '15', title: 'Video 15', thumbnail: 'https://img.youtube.com/vi/a_SthPXtV6c/sddefault.jpg', url: 'https://www.youtube.com/watch?v=a_SthPXtV6c&pp=ygUMcmVhY3QgbmF0aXZl' },
      { id: '16', title: 'Video 16', thumbnail: 'https://img.youtube.com/vi/a_SthPXtV6c/sddefault.jpg', url: 'https://www.youtube.com/watch?v=a_SthPXtV6c&pp=ygUMcmVhY3QgbmF0aXZl' },
    ],
  },
];

export default function Course() {
  const StyledText = styled(Text);
  const StyledView = styled(View);

  const renderVideos = ({ item }) => (
    <Card style={{ margin: 10, width: 200}}>
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
        horizontal // Scroll horizontally for videos
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
