import { useEffect, useState } from 'react'
import Notification from '../ui/notification'
import css from './contact-form.module.css'

async function sendContactData(contactDetails) {
  const res = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(contactDetails),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const data = await res.json()

  if (!res.ok) throw new Error(data.message || 'Something went wrong')
}

export default function ContactForm() {
  const [enteredEmail, setEnteredEmail] = useState('')
  const [enteredName, setEnteredName] = useState('')
  const [enteredMessage, setEnteredMessage] = useState('')
  const [requestStatus, setRequestStatus] = useState('') // pending, success, error
  const [requestError, setRequestError] = useState('')

  useEffect(() => {
    if (requestStatus === 'success' || requestStatus === 'error') {
      const timer = setTimeout(() => {
        setRequestStatus(null)
        setRequestError(null)
      }, 3000)

      return () => clearInterval(timer)
    }
  }, [requestStatus])

  async function sendMessageHandler(e) {
    e.preventDefault()

    setRequestStatus('pending')
    try {
      await sendContactData({
        email: enteredEmail,
        name: enteredName,
        message: enteredMessage,
      })
      setRequestStatus('success')
      setEnteredName('')
      setEnteredEmail('')
      setEnteredMessage('')
    } catch (error) {
      setRequestStatus('error')
      setRequestError(error)
    }
  }

  let notification
  if (requestStatus == 'pending') {
    notification = {
      status: 'pending',
      title: 'Sending message',
      message: 'Your message is on its way',
    }
  }

  if (requestStatus == 'success') {
    notification = {
      status: 'success',
      title: 'Success!',
      message: 'Your message has been sent successfully',
    }
  }

  if (requestStatus == 'error') {
    notification = {
      status: 'error',
      title: 'Error',
      message: requestError,
    }
  }

  return (
    <section className={css.contact}>
      <h1>How can I help you?</h1>
      <form className={css.form} onSubmit={sendMessageHandler}>
        <div className={css.controls}>
          <div className={css.controls}>
            <label htmlFor='email'>Your email</label>
            <input
              type='email'
              id='email'
              required
              value={enteredEmail}
              onChange={(e) => setEnteredEmail(e.target.value)}
            />
          </div>
          <div className={css.controls}>
            <label htmlFor='name'>Your name</label>
            <input
              type='text'
              id='name'
              required
              value={enteredName}
              onChange={(e) => setEnteredName(e.target.value)}
            />
          </div>
        </div>
        <div className={css.control}>
          <label htmlFor='message'>Your message</label>
          <textarea
            id='message'
            rows='5'
            required
            value={enteredMessage}
            onChange={(e) => setEnteredMessage(e.target.value)}
          ></textarea>
        </div>

        <div className={css.actions}>
          <button>Send message</button>
        </div>
      </form>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  )
}
