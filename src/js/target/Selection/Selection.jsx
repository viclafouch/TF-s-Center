import React, { useState, forwardRef, useImperativeHandle, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'
import sheriffImg from '@img/sheriff.svg'
import { getTargets } from '../index'
import { setBrowserStorage } from '@utils/browser'
import './selection.scoped.scss'

function Selection({ video, isDefaultSelected, name }, ref) {
  const [isSelected, setIsSelected] = useState(isDefaultSelected)

  useImperativeHandle(
    ref,
    () => ({
      select: toggleStatus
    }),
    [toggleStatus]
  )

  const toggleStatus = useCallback(async () => {
    try {
      const currentTargets = await getTargets()
      if (!currentTargets.some(t => t.id === video.id)) currentTargets.push(video)
      else {
        const index = currentTargets.findIndex(t => t.id === video.id)
        currentTargets.splice(index, 1)
      }
      await setBrowserStorage('local', { targets: currentTargets })
      setIsSelected(prevState => !prevState)
    } catch (error) {
      console.warn(error)
    }
  }, [video])

  return (
    <span className="selection" data-name={name}>
      Add To Targets
      {!isSelected && <img className="selection-img" src={sheriffImg} />}
      {isSelected && <FontAwesomeIcon icon={faCheck} className="selection-svg" />}
    </span>
  )
}

export default forwardRef(Selection)
