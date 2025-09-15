import { useState } from 'react'
import { useRouter } from 'next/router'
import { useParams } from 'common'
import type { TableSuggestion } from './types'
import { SOCIAL_MEDIA_TABLES } from './mockData'

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
    // TODO [Sean]: Replace timeout with actual AI API call
    setTimeout(() => {
      onTablesReady(SOCIAL_MEDIA_TABLES, prompt)
    }, 1500)
  }

  const handleSelectTable = async (table: TableSuggestion) => {
    setSelectedTable(table)
    setLoading(true)
    setError(null)

    try {
      // Store the table definition in sessionStorage
      const quickstartData = {
        tableName: table.tableName,
        fields: table.fields,
      }
      sessionStorage.setItem('table-quickstart-data', JSON.stringify(quickstartData))

      // Navigate to editor with a flag to open the create table panel
      router.push(`/project/${projectId}/editor?openCreateTable=true`)
    } catch (e: any) {
      setError(e?.message ?? 'Failed to create table')
      setLoading(false)
      setCurrentStep('preview')
    }
  }

  const handleBack = () => {
    if (currentStep === 'preview') {
      setCurrentStep('input')
      setCandidates([])
      setError(null)
    }
  }

  return {
    // State
    currentStep,
    candidates,
    selectedTable,
    loading,
    error,
    userInput,
    isGenerating,

    // Handlers
    onTablesReady,
    handleAiGenerate,
    handleSelectTable,
    handleBack,
  }
}
