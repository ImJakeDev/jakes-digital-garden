import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchPosts = async () => {
  const response = axios.get('https://pokeapi.co/api/v2/pokemon/25');
  const data = await response;
  return data;
};

const useEmojiData = () => {
  return useQuery({
    queryKey: ['emojiObject'],
    queryFn: () => fetchPosts(),
  });
};

export default useEmojiData;
