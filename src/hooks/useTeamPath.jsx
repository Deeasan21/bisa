import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

export function useTeamPath(org) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [generating, setGenerating] = useState(false);
  const [generateError, setGenerateError] = useState('');

  const { data: teamPath, isLoading } = useQuery({
    queryKey: ['teamPath', org?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('team_paths')
        .select('*')
        .eq('org_id', org.id)
        .maybeSingle();
      if (error) throw error;
      return data || null;
    },
    enabled: !!org?.id,
  });

  async function generatePath(focusArea, focusDescription) {
    if (!org || !user) return;
    setGenerating(true);
    setGenerateError('');
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch('/api/generate-team-path', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token || ''}`,
        },
        body: JSON.stringify({
          org_id: org.id,
          focus_area: focusArea,
          focus_description: focusDescription,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Generation failed');
      }
      await queryClient.invalidateQueries({ queryKey: ['teamPath', org.id] });
    } catch (e) {
      setGenerateError(e.message || 'Something went wrong');
    } finally {
      setGenerating(false);
    }
  }

  return { teamPath, isLoading, generating, generateError, generatePath };
}
