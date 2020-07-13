import React, { useRef, useImperativeHandle, forwardRef, useState, useEffect, useCallback } from 'react'
import Modal from '../Modal/Modal'
import Button from '../Button/Button'
import './dialog.scoped.scss'

function Dialog(props, ref) {
  const [hasConfirmed, setHasConfirmed] = useState(null)
  const modal = useRef(null)
  const promise = useRef({
    pending: null,
    resolve: null
  })

  useEffect(() => {
    if (hasConfirmed !== null) {
      promise.current.resolve(hasConfirmed)
      modal.current.close()
      setHasConfirmed(null)
    } else {
      promise.current.pending = new Promise(resolve => {
        promise.current.resolve = resolve
      })
    }
  }, [hasConfirmed])

  const onClose = useCallback(() => {
    setHasConfirmed(false)
  }, [])

  useImperativeHandle(
    ref,
    () => ({
      ask: () => {
        modal.current.open()
        return promise.current.pending
      }
    }),
    []
  )

  return (
    <Modal ref={modal} onClose={onClose}>
      <div className="dialog">
        <h3>Confirmation</h3>
        <p className="dialog-text">{props.children}</p>
        <div className="dialog-footer">
          <Button onClick={() => setHasConfirmed(false)}>Cancel</Button>
          <Button color="blue" onClick={() => setHasConfirmed(true)}>
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default forwardRef(Dialog)
