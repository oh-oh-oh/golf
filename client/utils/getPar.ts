import { Course } from '@/contexts';

export const getPar = (data: Course['data']): number =>
  data.reduce((total, { par }) => (total += par.reduce((a, b) => a + b)), 0);
