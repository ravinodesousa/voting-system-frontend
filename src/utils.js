const convertToLocal = (isoDateString) => {
  const date = new Date(isoDateString)
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }
  return new Intl.DateTimeFormat('default', options).format(date)
}

export { convertToLocal }
