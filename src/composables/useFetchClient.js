function statusErrorHandler(error) {
  console.error(error)
}

function getFetchOptions({ method, headers, body }) {
  const defaultHeaders = {
    'Content-Type': 'application/json'
  }

  if (method === 'GET') {
    return {
      method,
      headers: { ...defaultHeaders, ...headers }
    }
  } else {
    return {
      method,
      headers: { ...defaultHeaders, ...headers },
      body: JSON.stringify({
        ...body
        // userData: telegramStore.initData
      })
    }
  }
}

async function useFetchClient({
  baseUrl = '',
  endpoint = '',
  method = 'POST',
  headers = {},
  body = null
}) {
  const initData = getFetchOptions({ method, headers, body })

  try {
    const response = await fetch(`${baseUrl}${endpoint}`, initData)
    const result = await response.json()

    if (result.err) {
      console.error(result.err.message)
    }

    return result
  } catch (error) {
    statusErrorHandler(error)
    throw error
  }
}

export default useFetchClient
