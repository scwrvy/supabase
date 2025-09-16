import { IS_PLATFORM } from 'common'
import { useEffect } from 'react'
import { useTableEditorStateSnapshot } from 'state/table-editor'
import { QUICKSTART_URL_PARAM } from './constants'

/**
 * Hook to prefill the table editor with quickstart data when navigating from table quickstart.
 * This hook checks for quickstart data in sessionStorage and opens the table creation panel.
 * Can be removed after A/B test concludes.
 */
export const useTableEditorQuickstartPrefill = () => {
  const tableEditorSnap = useTableEditorStateSnapshot()

  useEffect(() => {
    if (!IS_PLATFORM) return

    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get(QUICKSTART_URL_PARAM) === 'true') {
      tableEditorSnap.onAddTable()

      // Clean up URL parameter after use
      urlParams.delete(QUICKSTART_URL_PARAM)
      const newUrl = `${window.location.pathname}${urlParams.toString() ? '?' + urlParams.toString() : ''}`
      window.history.replaceState({}, '', newUrl)
    }
  }, [tableEditorSnap])
}
