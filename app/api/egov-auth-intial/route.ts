// pages/api/callExternalAPI.ts


export const runtime = 'edge'


export async function POST(req: Request) {
  
  try {
    const jsonInput = await req.json();
    // console.log('jsonInput', jsonInput);
    // console.log('jsonInput.username', jsonInput.username);

    const url = "https://idp.egov.kz/idp/validate-pass";
  const url9 = "https://idp.egov.kz/idp/sign-in";

  const headers1 = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
    'Referer': 'https://egov.kz'
  };

  // First GET request
  const getResponse = await fetch(url9, { headers: headers1 });
  // console.log(getResponse);
  // console.log(getResponse.headers, getResponse.headers.get('set-cookie'));

  // Update headers for POST request
  const headers2 = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
    'Referer' : 'https://idp.egov.kz/idp/sign-in',
    'Host' : 'idp.egov.kz',
    'Origin' : 'https://idp.egov.kz/',
  }
  // headers['Host'] = 'idp.egov.kz';
  // headers['Origin'] = 'https://idp.egov.kz/';
  // headers['Referer'] = 'https://idp.egov.kz/idp/sign-in';

  const username = '980403350842';
  const password = 'd9jGShNE';
  const payload = {
    'lvl': '2',
    'username': username,
    'password': password,
    'submit': 'Войти в систему'
  };

  // POST request
  const postResponse = await fetch(url, {
    method: 'POST',
    headers: headers2,
    body: JSON.stringify(payload)
  });

  // console.log(postResponse.headers, postResponse.headers.get('set-cookie'));
  // console.log(headers2);
    // cookies = responseFirst.headers.get('set-cookie') || cookies;
    // console.log('cookies2', cookies);
    // const data = await responseFirst.json();
    // console.log(data);
    return new Response(JSON.stringify({'hello':'dsfsfd'}), {
      headers: { 'Content-Type': 'application/json' },
      });
  } catch (error) {
    console.log('Error here: ', error);
    return new Response(error as any);
  }
}
