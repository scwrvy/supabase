import { IS_PLATFORM } from 'common'
import { useEffect, useState } from 'react'
import type { TableField } from 'components/interfaces/TableGridEditor/SidePanelEditor/TableEditor/TableEditor.types'
import { generateTableField } from 'components/interfaces/TableGridEditor/SidePanelEditor/TableEditor/TableEditor.utils'

/**
 * Hook to get table fields from quickstart data when the panel becomes visible.
 * Returns default table fields if no quickstart data is found.
 * Can be removed after A/B test concludes.
 */
export const useQuickstartTableFields = (
  visible: boolean,
  isNewRecord: boolean,
  selectedSchema: string
): TableField | null => {
  const [tableFields, setTableFields] = useState<TableField | null>(null)

  useEffect(() => {
    if (!visible || !isNewRecord) {
      setTableFields(null)
      return
    }

    // Check for quickstart data
    const quickstartDataStr = IS_PLATFORM ? sessionStorage.getItem('table-quickstart-data') : null

    if (quickstartDataStr) {
      try {
        const quickstartData = JSON.parse(quickstartDataStr)

        // Create columns from quickstart data
        const columns = quickstartData.fields.map((field: any, index: number) => ({
          id: `column-${index}`,
          name: field.name,
          format: field.type,
          defaultValue: field.default,
          isNullable: field.nullable !== false,
          isUnique: false,
          isIdentity: field.name === 'id' && field.type.toLowerCase().includes('int'),
          isPrimaryKey: field.name === 'id',
          comment: field.description || '',
          isNewColumn: true,
        }))

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

        // Clear the data after using it
        sessionStorage.removeItem('table-quickstart-data')
      } catch (error) {
        console.error('Failed to parse quickstart data:', error)
        sessionStorage.removeItem('table-quickstart-data')
        // Fall back to default
        setTableFields(generateTableField())
      }
    } else {
      // No quickstart data, use default
      setTableFields(generateTableField())
    }
  }, [visible, isNewRecord, selectedSchema])

  return tableFields
}