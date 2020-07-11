import React, { forwardRef, useImperativeHandle, useCallback, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'
import sheriffImg from '@img/sheriff.svg'
import { getTargets } from '../index'
import { setBrowserStorage, sendMessageToBackground } from '@utils/browser'
import './selection.scoped.scss'

function Selection({ video, name, defaultSelected }, ref) {
  const [selected, setSelected] = useState(defaultSelected)

  useImperativeHandle(
    ref,
    () => ({
      select: toggleStatus
    }),
    [toggleStatus]
  )

  const toggleStatus = useCallback(async () => {
    try {
      const targets = await getTargets()
      if (!targets.some(t => t.id === video.id)) targets.push(video)
      else {
        const index = targets.findIndex(t => t.id === video.id)
        targets.splice(index, 1)
      }
      await setBrowserStorage('local', { targets })
      await sendMessageToBackground('update-nb-targets', { nbTargets: targets.length })
      setSelected(targets.some(t => t.id === video.id))
    } catch (error) {
      console.warn(error)
    }
  }, [video])

  return (
    <span className="selection" data-name={name}>
      Add
      {!selected && <img className="selection-img" src={sheriffImg} />}
      {selected && <FontAwesomeIcon icon={faCheck} className="selection-svg" />}
    </span>
  )
}

export default forwardRef(Selection)
