import { openLibraryOptions } from '@/services/openLibrary';
import { useQuery } from '@tanstack/react-query';

const useOpenLibrary = () => {
  return useQuery({
    ...openLibraryOptions,
  });
};

export default useOpenLibrary;
