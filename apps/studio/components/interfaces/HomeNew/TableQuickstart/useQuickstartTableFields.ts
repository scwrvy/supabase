import { IS_PLATFORM } from 'common'
import { useEffect, useState } from 'react'
import type { TableField } from 'components/interfaces/TableGridEditor/SidePanelEditor/TableEditor/TableEditor.types'
import { generateTableField } from 'components/interfaces/TableGridEditor/SidePanelEditor/TableEditor/TableEditor.utils'
import type { TableField as QuickstartTableField } from './types'
import { QUICKSTART_DATA_KEY } from './constants'

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

    const quickstartDataStr = IS_PLATFORM ? sessionStorage.getItem(QUICKSTART_DATA_KEY) : null

    if (quickstartDataStr) {
      try {
        const quickstartData = JSON.parse(quickstartDataStr)

        const columns = quickstartData.fields.map((field: QuickstartTableField, index: number) => ({
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

        // Clear sessionStorage after fields are set
        // This happens after the component has consumed the data
        sessionStorage.removeItem(QUICKSTART_DATA_KEY)
      } catch (error) {
        sessionStorage.removeItem(QUICKSTART_DATA_KEY)
        setTableFields(generateTableField())
      }
    } else {
      setTableFields(generateTableField())
    }
  }, [visible, isNewRecord, selectedSchema])

  return tableFields
}
