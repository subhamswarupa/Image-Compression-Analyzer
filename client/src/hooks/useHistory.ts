import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/api/client';
import type { HistoryEntry } from '@/types';

export function useHistory() {
  const queryClient = useQueryClient();

  const { data: history = [], isLoading, error } = useQuery<HistoryEntry[]>({
    queryKey: ['history'],
    queryFn: api.getHistory,
    refetchOnWindowFocus: false,
  });

  const deleteMutation = useMutation({
    mutationFn: api.deleteHistoryItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['history'] });
    },
  });

  const clearMutation = useMutation({
    mutationFn: api.clearHistory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['history'] });
    },
  });

  return {
    history,
    isLoading,
    error,
    deleteItem: deleteMutation.mutate,
    clearHistory: clearMutation.mutate,
    isDeleting: deleteMutation.isPending,
    isClearing: clearMutation.isPending,
  };
}
