import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { 
  addPackToLibrary, 
  removePackFromLibrary,
  convertPackFormat 
} from '../../../store/features/library/librarySlice';
import {PackMetadata } from '../../@types/pack';
import { useAppDispatch } from '../hooks';


export const useLibraryActions = (state, setState) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const handleCreateNew = useCallback(async () => {
    // Ouvrir l'éditeur de pack
    window.electron.openPackEditor();
  }, []);

  const handleOpenSample = useCallback(async () => {
    try {
      const result = await window.electron.openSamplePack();
      if (result.success) {
        toast.success(t('toasts.library.sampleOpened'));
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error(t('toasts.library.sampleOpenFailed'));
    }
  }, [t]);

  const handlePackAdd = useCallback(async (file: File) => {
    if (!file) return;

    try {
      await dispatch(addPackToLibrary({
        file,
        onProgress: (progress) => {
          // Gérer la progression
        }
      })).unwrap();
      toast.success(t('toasts.library.packAdded'));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error(t('toasts.library.addingFailed'));
    }
  }, [dispatch, t]);

  const handleRemoveFromLibrary = useCallback(async (pack: PackMetadata) => {
    try {
      await dispatch(removePackFromLibrary(pack.uuid)).unwrap();
      setState(prev => ({
        ...prev,
        showRemoveFromLibraryConfirmDialog: false,
        removingFromLibrary: null
      }));
      toast.success(t('toasts.library.packRemoved'));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error(t('toasts.library.removingFailed'));
    }
  }, [dispatch, setState, t]);

  const handleConvertPack = useCallback(async (pack: PackMetadata, targetFormat: string) => {
    try {
      await dispatch(convertPackFormat({ 
        uuid: pack.uuid, 
        format: targetFormat 
      })).unwrap();
      setState(prev => ({
        ...prev,
        confirmConversionDialog: { show: false, data: null }
      }));
      toast.success(t('toasts.library.packConverted'));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error(t('toasts.library.conversionFailed'));
    }
  }, [dispatch, setState, t]);

  return {
    handleCreateNew,
    handleOpenSample,
    handlePackAdd,
    handleRemoveFromLibrary,
    handleConvertPack
  };
};