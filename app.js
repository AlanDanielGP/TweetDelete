// app.js

const Twit = require('twit');

// Configuración con tus credenciales de Twitter
const T = new Twit({
  consumer_key: 'glEdMVPitT1ToMhkFQKYcO4e0',
  consumer_secret: 'LU2KaB3M1ELaArPiNotdh2SOxCO5FdjsY5LdQVFQf6xlQoOyW3',
  access_token: '900003836705853441-qmjCohjMclzRuw32gZwu0wlpjEXjsZv',
  access_token_secret: 'ZkPTYPYIQfBFFZedA9VMGWNQqLUx4NxZBg777QOPRbbSA',
  timeout_ms: 60 * 1000,  // Tiempo de espera opcional
  strictSSL: true,  // Activar SSL estricto
});

// Función para obtener los tweets
const getTweets = async () => {
  try {
    const { data } = await T.get('statuses/user_timeline', { count: 200 });
    return data;
  } catch (error) {
    console.error('Error obteniendo tweets:', error);
    return [];
  }
};

// Función para eliminar un tweet
const deleteTweet = async (id) => {
  try {
    await T.post('statuses/destroy/:id', { id });
    console.log(`Tweet ${id} eliminado`);
  } catch (error) {
    console.error(`Error eliminando tweet ${id}:`, error);
  }
};

// Función principal
const main = async () => {
  const tweets = await getTweets();
  console.log(`Se encontraron ${tweets.length} tweets`);

  for (const tweet of tweets) {
    await deleteTweet(tweet.id_str);
  }
};

// Ejecutar la función principal
main();
