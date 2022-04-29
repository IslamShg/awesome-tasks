import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useLayoutsActions } from '../features/layouts'

export const useGlobalShortcuts = () => {
  const prevClickedKey = useRef<string>('')
  const ctrlKeys = useMemo(() => ['Control', 'Meta'], [])
  const { toggleSidebar } = useLayoutsActions()

  const onKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (ctrlKeys.includes(prevClickedKey.current) && e.key === '\\') {
        toggleSidebar()
        prevClickedKey.current = ''
        return
      }
      prevClickedKey.current = e.key
    },
    [ctrlKeys]
  )

  useEffect(() => {
    window.addEventListener('keydown', onKeyPress)
    return () => window.removeEventListener('keydown', onKeyPress)
  }, [onKeyPress])
}
