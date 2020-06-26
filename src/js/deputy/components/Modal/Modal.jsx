import React, { useEffect, useImperativeHandle, useState, forwardRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes'
import './modal.scoped.scss'

export function Modal({ children, fade = false, defaultOpened = false }, ref) {
  const [isOpen, setIsOpen] = useState(defaultOpened)
  const [isBlock, setIsBlock] = useState(false)

  const close = useCallback(force => (!isBlock || force) && setIsOpen(false), [isBlock])

  useImperativeHandle(
    ref,
    () => ({
      open: () => setIsOpen(true),
      close: ({ force } = {}) => close(force),
      blockClose: () => setIsBlock(true),
      unBlockClose: () => setIsBlock(false)
    }),
    [close]
  )

  const handleEscape = useCallback(
    event => {
      if (event.keyCode === 27) close()
    },
    [close]
  )

  useEffect(() => {
    if (isOpen) document.addEventListener('keydown', handleEscape, false)
    return () => {
      document.removeEventListener('keydown', handleEscape, false)
    }
  }, [handleEscape, isOpen])

  return createPortal(
    isOpen ? (
      <div className={`modal ${fade ? 'modal-fade' : ''}`}>
        <div className="modal-overlay" onClick={close} />
        <span role="button" className="modal-close" aria-label="close" onClick={close}>
          <FontAwesomeIcon icon={faTimes} size="1x" fixedWidth />
        </span>
        <div className="modal-body">{React.cloneElement(children, { modalRef: ref })}</div>
      </div>
    ) : null,
    document.getElementById('root-modal')
  )
}

export default forwardRef(Modal)
