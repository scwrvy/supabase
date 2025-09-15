import { IS_PLATFORM } from 'common'
import type { TableField } from 'components/interfaces/TableGridEditor/SidePanelEditor/TableEditor/TableEditor.types'

/**
 * Hook to process quickstart data from sessionStorage and generate table fields.
 * Returns null if no quickstart data is found or if not on platform.
 * Can be removed after A/B test concludes.
 */
export const useProcessQuickstartData = (selectedSchema: string): TableField | null => {
  // Only process on platform
  if (!IS_PLATFORM) return null

  // Check for table quickstart data
  const quickstartDataStr = sessionStorage.getItem('table-quickstart-data')
  if (!quickstartDataStr) return null

  try {
    const quickstartData = JSON.parse(quickstartDataStr)

    // Create table fields from quickstart data
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

    const tableFields: TableField = {
      id: 0,
      name: quickstartData.tableName,
      comment: '',
      columns: columns,
      isRLSEnabled: true, // Enable RLS by default for quickstart tables
      isRealtimeEnabled: false,
    }

    // Clear the quickstart data after using it
    sessionStorage.removeItem('table-quickstart-data')

    return tableFields
  } catch (error) {
    console.error('Failed to parse quickstart data:', error)
    // Clear invalid data
    sessionStorage.removeItem('table-quickstart-data')
    return null
  }
}
