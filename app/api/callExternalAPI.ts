// pages/api/callExternalAPI.ts

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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
        'Cookie': 'LTT=1695598915017; LTT=1695598869892; LTT=1695598901468; egov-client-type=PORTAL; has_js=1; _zero_cc=3130e7da9ec946; _ym_uid=1688119813100933963; _ym_d=1688119813; cookiesession1=678B770FB8F9203568A7DD3F91240EAE; SERVERID=s2; locale=ru; egovLang=ru; _ga_S8DBY0BCG8=GS1.1.1689973006.42.0.1689973006.0.0.0; egov-client-type=PORTAL; SSESSf0d09e6725a5b1994b1b0ab11a8d594d=CSeVEB42OC0KALxNfy0J-T3H12DZ6JnfpZl7yaBx8IA; _ym_isad=1; _ym_visorc=b; _gid=GA1.2.2114047367.1695598502; SSO=1df9caaa-abc7-4689-b706-beeda9b3195e; _zero_ss=6510c7a5e1fe2.1695598501.1695599753.7; _ga=GA1.1.1145254019.1688119813; _ga_8ZM6JMFLGM=GS1.1.1695598501.64.1.1695599755.58.0.0', // Replace with your cookies
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
      }
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from external API' });
  }
}
