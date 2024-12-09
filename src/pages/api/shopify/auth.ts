
import type { NextApiRequest, NextApiResponse } from 'next';
// import { shopify } from '@/utils/shopify';



// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//      console.log(req.query.shop ,'shop')
//     //  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

//     //  // Allow specific HTTP methods
//     //  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
   
//     //  // Allow specific headers
//     //  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
   
//     await shopify.auth.begin({
//       shop: shopify.utils.sanitizeShop(req.query.shop as string, true),
//       callbackPath: '/api/shopify/callback',
//       isOnline: true,
//       rawRequest: req,
//       rawResponse: res,
//     });
//   }
  
