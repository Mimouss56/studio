import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchLibrary } from '../../store/features/library/librarySlice';

export const useLibrary = () => {
  const dispatch = useAppDispatch();
  const { metadata, packs, status, error } = useAppSelector(state => state.library);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchLibrary());
    }
  }, [dispatch, status]);

  return {
    metadata,
    packs,
    isLoading: status === 'loading',
    error
  };
};