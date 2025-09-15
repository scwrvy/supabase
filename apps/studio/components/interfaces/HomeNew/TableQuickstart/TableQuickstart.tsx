import { ArrowLeft } from 'lucide-react'
import { Button_Shadcn_ } from 'ui'
import { TemplateSelector } from './TemplateSelector'
import { AiPromptInput } from './AiPromptInput'
import { TablePicker } from './TablePicker'
import { GETTING_STARTED_WIDGET_COPY } from './constants'
import { useQuickstart } from './useQuickstart'

interface TableQuickstartProps {
  variant?: 'ai' | 'templates'
}

export const TableQuickstart = ({ variant = 'ai' }: TableQuickstartProps = {}) => {
  const {
    currentStep,
    candidates,
    loading,
    error,
    userInput,
    isGenerating,
    onTablesReady,
    handleAiGenerate,
    handleSelectTable,
    handleBack,
  } = useQuickstart()

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2>{GETTING_STARTED_WIDGET_COPY[variant]?.title}</h2>
        <p className="text-base text-foreground-light">
          {GETTING_STARTED_WIDGET_COPY[variant]?.description}
        </p>
      </div>

      <div>
        {/* Step 1: User input or selection screen */}
        {currentStep === 'input' && variant === 'ai' && (
          <AiPromptInput onGenerate={handleAiGenerate} isLoading={isGenerating} />
        )}

        {currentStep === 'input' && variant === 'templates' && (
          <TemplateSelector onSelect={onTablesReady} />
        )}

        {/* Step 2: Table preview grid */}
        {currentStep === 'preview' && (
          <div className="space-y-4">
            <div className="flex items-center justify-start">
              <Button_Shadcn_
                type="button"
                size="sm"
                onClick={handleBack}
                className="inline-flex items-center gap-1 hover:no-underline"
                disabled={loading}
                variant="ghost"
              >
                <ArrowLeft className="h-3 w-3" />
                <span>Back</span>
              </Button_Shadcn_>

              <p className="text-sm text-muted-foreground">
                {variant === 'ai'
                  ? `Select a table for "${userInput}" to customize in the table editor`
                  : 'Select a table to get started'}
              </p>
            </div>

            <TablePicker
              tables={candidates}
              onSelectTable={handleSelectTable}
              loading={loading}
            />

            {error && <div className="text-sm text-destructive text-center mt-3">{error}</div>}
          </div>
        )}
      </div>
    </div>
  )
}
