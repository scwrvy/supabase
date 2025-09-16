import { useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import { useParams } from 'common'
import type { TableSuggestion } from './types'
import { SOCIAL_MEDIA_TABLES } from './mockData'
import { QUICKSTART_DATA_KEY, QUICKSTART_URL_PARAM } from './constants'

export const useQuickstart = () => {
  const router = useRouter()
  const { ref } = useParams()
  const projectId = ref as string

  const [currentStep, setCurrentStep] = useState<'input' | 'preview'>('input')
  const [candidates, setCandidates] = useState<TableSuggestion[]>([])
  const [selectedTable, setSelectedTable] = useState<TableSuggestion | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [userInput, setUserInput] = useState<string>('')
  const [isGenerating, setIsGenerating] = useState(false)

  const onTablesReady = (
    tables: TableSuggestion[] = SOCIAL_MEDIA_TABLES,
    input: string = 'social media app with posts and comments'
  ) => {
    setCandidates(tables)
    setUserInput(input)
    setCurrentStep('preview')
    setIsGenerating(false)
  }

  const handleAiGenerate = (prompt: string) => {
    setIsGenerating(true)
    setTimeout(() => {
      onTablesReady(SOCIAL_MEDIA_TABLES, prompt)
    }, 1500)
  }

  const handleSelectTable = useCallback(async (table: TableSuggestion) => {
    setSelectedTable(table)
    setLoading(true)
    setError(null)

    try {
      const quickstartData = {
        tableName: table.tableName,
        fields: table.fields,
      }

      try {
        const dataStr = JSON.stringify(quickstartData)
        sessionStorage.setItem(QUICKSTART_DATA_KEY, dataStr)
      } catch (storageError) {
        // Handle sessionStorage errors (quota exceeded, disabled, etc.)
        const errorMessage = storageError instanceof Error
          ? `Storage error: ${storageError.message}`
          : 'Failed to save table data. Please check your browser settings.'
        setError(errorMessage)
        setLoading(false)
        return
      }

      router.push(`/project/${projectId}/editor?${QUICKSTART_URL_PARAM}=true`)
    } catch (e) {
      const errorMessage = e instanceof Error
        ? e.message
        : 'Failed to navigate to table editor'
      setError(errorMessage)
      setLoading(false)
      setCurrentStep('preview')
    }
  }, [projectId, router])

  const handleBack = () => {
    if (currentStep === 'preview') {
      setCurrentStep('input')
      setCandidates([])
      setError(null)
    }
  }

  return {
    currentStep,
    candidates,
    selectedTable,
    loading,
    error,
    userInput,
    isGenerating,
    onTablesReady,
    handleAiGenerate,
    handleSelectTable,
    handleBack,
  }
}
