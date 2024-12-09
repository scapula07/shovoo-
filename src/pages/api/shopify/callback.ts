
import type { NextApiRequest, NextApiResponse } from 'next';
import { shopify } from '@/utils/shopify';
import memoryStore from '@/lib/memorystorage';
import { storeSession } from '@/lib/sessionstorage';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
      // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

      // // Allow specific HTTP methods
      // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

      // // Allow specific headers
      // res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    try {
      const callback = await shopify.auth.callback({
        rawRequest: req,
        rawResponse: res,
      });
      // Store session in your database (or memory/session storage if simpler)

      console.log(callback.session)
      await storeSession(callback.session);
     
      // Redirect the user to the app's entry page
      res.redirect('/editor/i'); // Customize the redirect route
    } catch (error) {
      console.error(error);
      res.status(500).send('Failed to complete OAuth process');
    }
  }
  