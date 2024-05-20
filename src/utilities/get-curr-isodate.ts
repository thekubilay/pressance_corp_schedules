const GET_CURR_ISO_DATE = (date: Date) => {
  const d: string = new Date(date.getTime() + 9 * 60 * 60 * 1000).toISOString().split('T')[0]
  const time: string = new Date(new Date().getTime() + 9 * 60 * 60 * 1000).toISOString().split('T')[1]
  return `${d} ${time}`
}

export default GET_CURR_ISO_DATE