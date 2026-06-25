import { useEffect, useState, useCallback } from 'react';
import { supabase } from './supabase';
import type { Experience, Category } from './types';

export function useExperiences() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetch() {
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .order('rating', { ascending: false });

      if (cancelled) return;
      if (error) {
        setError(error.message);
      } else {
        setExperiences(data as Experience[]);
      }
      setLoading(false);
    }

    fetch();
    return () => {
      cancelled = true;
    };
  }, []);

  return { experiences, loading, error };
}

export function useExperiencesByCategory(category: Category | 'all') {
  const { experiences, loading, error } = useExperiences();

  const filtered = useCallback(
    (cats: Category | 'all') => {
      if (cats === 'all') return experiences;
      return experiences.filter((e) => e.category === cats);
    },
    [experiences],
  );

  return { experiences: filtered(category), loading, error };
}
