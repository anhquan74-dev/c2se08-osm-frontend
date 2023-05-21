import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';

const ElasticSearch = () => {
  useEffect(() => {
    (async () => {
      const res = await axios.post(
        'https://localhost:9200/posts/_search',
        {
          query: {
            bool: {
              should: [
                {
                  match: {
                    title: 'máy xe',
                  },
                },
                {
                  match: {
                    content: 'nước ngập hư',
                  },
                },
              ],
            },
          },
          highlight: {
            pre_tags: ['<strong>'],
            post_tags: ['</strong>'],
            fields: {
              title: {},
              content: {},
            },
          },
        },

        {
          proxy: {
            protocol: 'https',
            host: '127.0.0.1',
            // hostname: '127.0.0.1' // Takes precedence over 'host' if both are defined
            port: 9200,
          },
          auth: {
            username: 'elastic',
            password: '8ZNgdsUIWNo5vx5RDTsw',
          },
          headers: { 'Access-Control-Allow-Origin': '*' },
        }
      );
      console.log(res);
    })();
  }, []);

  return <div>ElasticSearch</div>;
};

export default ElasticSearch;
