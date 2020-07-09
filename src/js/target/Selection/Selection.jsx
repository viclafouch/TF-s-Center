import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'
import sheriffImg from '@img/sheriff.svg'
import { setBrowserStorage } from '@utils/browser'
import './selection.scoped.scss'

function Selection({ video, targets, name }, ref) {
  const [isSelected, setIsSelected] = useState(targets.some(t => t.id === video.id))

  useImperativeHandle(
    ref,
    () => ({
      select: () => setIsSelected(prevState => !prevState)
    }),
    []
  )

  useEffect(() => {
    const currentTargets = [...targets]
    if (isSelected) currentTargets.push(video)
    else {
      const index = currentTargets.findIndex(t => t.id === video.id)
      currentTargets.splice(index, 1)
    }
    setBrowserStorage('local', {
      targets: currentTargets
    })
  }, [isSelected, video, targets])

  return (
    <span className="selection" data-name={name}>
      Add To Targets
      {!isSelected && <img className="selection-img" src={sheriffImg} />}
      {isSelected && <FontAwesomeIcon icon={faCheck} className="selection-svg" />}
    </span>
  )
}

export default forwardRef(Selection)
