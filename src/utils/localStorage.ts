export const getFromStorage = (key: string) => {
  const item = localStorage.getItem(key)
  return item ? JSON.parse(item) : null
}

export const saveToStorage = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data))
}
