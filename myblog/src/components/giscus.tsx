'use client'

import React, { useCallback, useContext, useEffect, useState } from 'react'
import { themeContext } from '../../lib/context.module'

const Giscus = () => {
  const { theme } = useContext(themeContext)

  const loadGiscus = useCallback(() => {
    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.setAttribute('data-repo', 'HyeongAn/myblog')
    script.setAttribute('data-repo-id', 'R_kgDOKKvKkA')
    script.setAttribute('data-input-position', 'bottom')
    script.setAttribute('data-lang', 'ko')
    script.setAttribute('data-category', 'Announcements')
    script.setAttribute('data-category-id', 'DIC_kwDOKKvKkM4CZn3P')
    script.setAttribute('data-theme', theme === 'dark' ? 'dark_dimmed' : 'light_protanopia')
    script.setAttribute('crossorigin', 'anonymous')
    script.setAttribute('data-mapping', 'pathname')
    script.setAttribute('data-reactions-enabled', '1')
    script.setAttribute('data-emit-metadata', '0')
    script.async = true

    const comments = document.getElementById('giscusComments')
    if (comments) comments.appendChild(script)

    return () => {
      const comments = document.getElementById('giscusComments')
      if (comments) comments.innerHTML = ''
    }
  }, [theme])

  useEffect(() => {
    loadGiscus()
  }, [loadGiscus])

  return <section id="giscusComments" />
}

export default Giscus
