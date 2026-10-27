import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

// The built-in multilingual tokenizer supports both Chinese and English.
export const { GET } = createFromSource(source, {
  search: {
    threshold: 0,
    tolerance: 0,
  },
});
