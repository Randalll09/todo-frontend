import * as React from "react"

const DESKTOP_QUERY = "(min-width: 900px)"

/** Picks the desktop sidebar shell vs. the mobile bottom-nav shell by viewport width. */
function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = React.useState(
    () => typeof window !== "undefined" && window.matchMedia(DESKTOP_QUERY).matches
  )

  React.useEffect(() => {
    const mql = window.matchMedia(DESKTOP_QUERY)
    const onChange = () => setIsDesktop(mql.matches)
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return isDesktop
}

export { useIsDesktop }
