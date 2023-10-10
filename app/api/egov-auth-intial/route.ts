// pages/api/callExternalAPI.ts


export const runtime = 'edge'


export async function POST(req: Request) {
  
  try {
    const jsonInput = await req.json();
    console.log('jsonInput', jsonInput);
    console.log('jsonInput.username', jsonInput.iin);
  const url1 = 'https://egov.nimbl.tv/api/user/login/';
  const postResponse = await fetch(url1, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 'iin': jsonInput.iin, 'password': jsonInput.password })
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
