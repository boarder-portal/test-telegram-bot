const Application = require('koa');
const bodyParser = require('koa-bodyparser');
const axios = require('axios');

const {
  PORT = 3001,
  TELEGRAM_BOT_ID
} = process.env;

console.log(`State up: ${new Date().toJSON()}`);

const app = new Application();

app
  .use(bodyParser())
  .use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      console.log(err);
    } finally {
      ctx.body = '';
    }
  })
  .use(async (ctx, next) => {
    if (ctx.url !== `/new-message/${TELEGRAM_BOT_ID}` || ctx.method !== 'POST') {
      return next();
    }

    console.log(JSON.stringify(ctx.request.body, null, 2));

    await next();
  })
  .listen(PORT, () => {
    console.log(`Telegram app listening on port ${PORT}!`);
  });
