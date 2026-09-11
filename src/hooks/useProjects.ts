import { useState, useEffect, useCallback } from 'react'
import { supabase, Project } from '../lib/supabase'

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProjects = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { data, error: sbError } = await supabase
        .from('projects')
        .select('*')
        .order('order_index', { ascending: true })
      if (sbError) throw sbError
      setProjects(data ?? [])
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to fetch projects')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  return { projects, loading, error, refetch: fetchProjects }
}
