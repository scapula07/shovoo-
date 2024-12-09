
import type { NextApiRequest, NextApiResponse } from 'next';
// import { shopify } from '@/utils/shopify';
// import { getSession } from '@/lib/sessionstorage';


// interface MyResponseBodyType {
//   products: {
//     /* ... */
//   };
// }


// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     const sessionId = await shopify.session.getCurrentId({
//         isOnline: true,
//         rawRequest: req,
//         rawResponse: res,
//       }) as string
    
//      const session = await getSession(sessionId);
 
//      const client = new shopify.clients.Rest({
//        session,
//      });

    
//      const response = await client.get({
//         path: 'products',
//       });
    
//     // response.body will be of type MyResponseBodyType
//     console.log(response,response.body.products);


//   }
  