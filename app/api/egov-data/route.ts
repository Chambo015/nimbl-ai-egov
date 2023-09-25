// pages/api/callExternalAPI.ts


export const runtime = 'edge'


export async function GET(req: Request) {
    const url = 'https://egov.kz/services/P7.04/rest/request-states/101000017445390';

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'max-age=0',
        'Connection': 'keep-alive',
        'Cookie': 'LTT=1695602827303; LTT=1695598869892; LTT=1695602821432; egov-client-type=PORTAL; has_js=1; _zero_cc=3130e7da9ec946; _ym_uid=1688119813100933963; _ym_d=1688119813; cookiesession1=678B770FB8F9203568A7DD3F91240EAE; SERVERID=s2; locale=ru; egovLang=ru; _ga_S8DBY0BCG8=GS1.1.1689973006.42.0.1689973006.0.0.0; egov-client-type=PORTAL; SSESSf0d09e6725a5b1994b1b0ab11a8d594d=CSeVEB42OC0KALxNfy0J-T3H12DZ6JnfpZl7yaBx8IA; _ym_isad=1; _gid=GA1.2.2114047367.1695598502; _zero_ss=6510d5acdffea.1695602093.1695602093.1; _ym_visorc=b; _ga_8ZM6JMFLGM=GS1.1.1695602092.65.1.1695602093.59.0.0; _ga=GA1.2.1145254019.1688119813; SSO=05d7e0de-b6b8-4db2-99a5-91b238ce1027', // Replace with your cookies
        'Host': 'egov.kz',
        'Sec-Ch-Ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
        'Sec-Ch-Ua-Mobile': '?1',
        'Sec-Ch-Ua-Platform': '"Android"',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Mobile Safari/537.36'
      },
    });

    const data = await response.json();
    return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
        });
  } catch (error) {
    console.log(error);
    return new Response(error as any);
  }
}
