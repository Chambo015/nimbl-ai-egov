// pages/api/callExternalAPI.ts

export const runtime = 'edge'

export async function POST(req: Request) {
  try {
    const jsonInput = await req.json()
    console.log('jsonInput', jsonInput)
    console.log('jsonInput.username', jsonInput.cookies)
    // 10.131.2.83 185.125.91.142
    // https://egov.nimbl.tv/
    // https://egov.nimbl.tv/
    const url1 = process.env.BACKEND_URL + '/api/service/forma2/'
    const postResponse = await fetch(url1, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 'cookies': jsonInput.cookies })
    })
    const postResponseJson = await postResponse.json()
    console.log('postResponseJson', postResponseJson)

    return new Response(JSON.stringify(postResponseJson), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.log('Error here: ', error)
    return new Response(error as any)
  }
}
