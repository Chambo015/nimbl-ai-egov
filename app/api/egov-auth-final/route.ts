// pages/api/callExternalAPI.ts


export const runtime = 'edge'


export async function POST(req: Request) {
  
  try {
    const jsonInput = await req.json();
    console.log('jsonInput', jsonInput);
  const url1 = process.env.BACKEND_URL +  '/api/user/login/code/';
  const postResponse = await fetch(url1, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 'cookies': jsonInput.cookiesAll ,'iin': jsonInput.iin, 'code': jsonInput.smsCode, 'phone':  jsonInput.phoneNum})
  });
  const postResponseJson = await postResponse.json();
  console.log('postResponseJson', postResponseJson);

    return new Response(JSON.stringify(postResponseJson), {
      headers: { 'Content-Type': 'application/json' },
      });
  } catch (error) {
    console.log('Error here: ', error);
    return new Response(error as any);
  }
}
