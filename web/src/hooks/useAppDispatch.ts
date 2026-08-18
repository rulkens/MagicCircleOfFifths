import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store/createAppStore';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
