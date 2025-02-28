import { useState } from 'react';
import { useAppSelector } from '../../hooks';
import { LibraryFilters, PackLibraryState, } from '../../../@types/pack';


export const usePackLibrary = () => {
  
  const {device, library} = useAppSelector(state => state);


  const [filters, setFilters] = useState<LibraryFilters>({
    searchTerm: '',
    ageMin: 0,
    ageMax: 12
  });

  const [state, setState] = useState<PackLibraryState>({
    showRemoveFromLibraryConfirmDialog: false,
    showRemoveFromDeviceConfirmDialog: false,
    removingFromLibrary: null,
    removingFromDevice: null,
    dragging: null,
    reordering: null,
    beforeReordering: null,
    allowEnrichedDialog: {
      show: false,
      data: null
    },
    confirmConversionDialog: {
      show: false,
      data: null
    },
    searchTerm: '',
    ageMinFilter: 0,
    ageMaxFilter: 12
  });

  return {
    state,
    setState,
    device,
    library,
    filters,
    setFilters
  };
};