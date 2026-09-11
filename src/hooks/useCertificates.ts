import { useState, useEffect, useCallback } from 'react'
import { supabase, Certificate } from '../lib/supabase'

export function useCertificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCertificates = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { data, error: sbError } = await supabase
        .from('certificates')
        .select('*')
        .order('created_at', { ascending: false })
      if (sbError) throw sbError
      setCertificates(data ?? [])
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to fetch certificates')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCertificates()
  }, [fetchCertificates])

  return { certificates, loading, error, refetch: fetchCertificates }
}
