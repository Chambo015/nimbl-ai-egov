// pages/api/callExternalAPI.ts

export const runtime = 'edge'

export async function POST(req: Request) {
  try {
    const jsonInput = await req.json()
    console.log('jsonInput', jsonInput)
    // console.log('jsonInput.username', jsonInput.cookies)
    // 10.131.2.83 185.125.91.142
    // https://egov.nimbl.tv/
    // https://egov.nimbl.tv/
    let url1 = ''
    if (jsonInput.serviceType === 'narko') {
      url1 = 'https://egov.nimbl.tv/api/service/psycho/narco/code/'
    } else if (jsonInput.serviceType === 'forma-2') {
      // https://egov.nimbl.tv
      // https://egov.nimbl.tv
      url1 = 'https://egov.nimbl.tv/api/service/forma2/code/'
    }
    
    const postResponse = await fetch(url1, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 'cookies': jsonInput.cookies, 'code': jsonInput.smsCode, 'page_query_url': jsonInput.pageQueryURL })
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
