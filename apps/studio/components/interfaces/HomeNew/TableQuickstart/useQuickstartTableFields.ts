import { IS_PLATFORM } from 'common'
import { useEffect, useState, useRef } from 'react'
import type { TableField } from 'components/interfaces/TableGridEditor/SidePanelEditor/TableEditor/TableEditor.types'
import { generateTableField } from 'components/interfaces/TableGridEditor/SidePanelEditor/TableEditor/TableEditor.utils'
import type { TableField as QuickstartTableField } from './types'
import { QUICKSTART_DATA_KEY } from './constants'

/**
 * Hook to get table fields from quickstart data.
 * Returns table fields from quickstart data if available, otherwise returns default or null.
 * Can be removed after A/B test concludes.
 */
export const useQuickstartTableFields = (
  visible: boolean,
  isNewRecord: boolean,
  selectedSchema: string
): TableField | null => {
  const [tableFields, setTableFields] = useState<TableField | null>(null)
  const hasProcessedRef = useRef(false)

  useEffect(() => {
    if (!visible || !isNewRecord) {
      setTableFields(null)
      hasProcessedRef.current = false
      return
    }

    if (hasProcessedRef.current) {
      return
    }

    const quickstartDataStr = IS_PLATFORM ? sessionStorage.getItem(QUICKSTART_DATA_KEY) : null

    if (quickstartDataStr) {
      try {
        const quickstartData = JSON.parse(quickstartDataStr)

        const columns: TableField['columns'] = quickstartData.fields.map(
          (field: QuickstartTableField, index: number) => ({
            id: `column-${index}`,
            name: field.name,
            format: field.type,
            defaultValue: field.default,
            isNullable: field.nullable !== false,
            isUnique: field.unique || false,
            isIdentity: field.name === 'id' && field.type.toLowerCase().includes('int'),
            isPrimaryKey: field.name === 'id',
            comment: field.description || '',
            isNewColumn: true,
          })
        )

        const fields = {
          id: 0,
          name: quickstartData.tableName,
          schema: selectedSchema,
          comment: '',
          columns: columns,
          isRLSEnabled: true,
          isRealtimeEnabled: false,
        } as TableField

        setTableFields(fields)
        hasProcessedRef.current = true

        // Clear sessionStorage after successful processing
        sessionStorage.removeItem(QUICKSTART_DATA_KEY)
      } catch (error) {
        console.error('Error processing quickstart data:', error)
        setTableFields(generateTableField())
        hasProcessedRef.current = true
        sessionStorage.removeItem(QUICKSTART_DATA_KEY)
      }
    } else {
      // No quickstart data, use default
      setTableFields(generateTableField())
      hasProcessedRef.current = true
    }

    // This is a bit of a hack to get around a re-render bug that clears the fields in the
    // table editor.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSchema])

  return tableFields
}
