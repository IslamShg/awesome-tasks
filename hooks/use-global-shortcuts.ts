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
        return
      }
      prevClickedKey.current = e.key
    },
    [ctrlKeys, toggleSidebar]
  )

  const onKeyUp = useCallback(
    (e: KeyboardEvent) => {
      if (ctrlKeys.includes(prevClickedKey.current)) {
        prevClickedKey.current = ''
      }
    },
    [ctrlKeys]
  )

  useEffect(() => {
    window.addEventListener('keydown', onKeyPress)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('keydown', onKeyPress)
      window.removeEventListener('keydown', onKeyUp)
    }
  }, [onKeyPress, onKeyUp])
}
