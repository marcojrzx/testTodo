const puppeteer = require('puppeteer');
const env = require('dotenv/config');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://randomtodolistgenerator.herokuapp.com/library');
  await page.waitForSelector('div.tasks-card-container.row');
  
  let titles = await page.$$eval('div.card-body', cards => {
      let title = cards.map(el => el.querySelector('div.flexbox.task-title > div').textContent)
      return title;
  });
  let texts = await page.$$eval('div.card-body', cards => {
     
    let text = cards.map(el => el.querySelector('p.card-text').textContent)
    return text;
  });
  const page2 = await browser.newPage();
  await page2.goto('https://todoist.com/auth/login');
  
  await page2.waitForSelector('div.KBVfMsb._84ffebbc.f9408a0e._33e3ad63');
  await page2.click('input#labeled-input-1');
  await page2.keyboard.type(`${process.env.USER}@gmail.com`);
  await page2.click('input#labeled-input-3');
  await page2.keyboard.type(`${process.env.CONTRA}`);
  await page2.click('button.nFxHGeI.S7Jh9YX.PjStieI._7a2031d6.a878a9a4._34ac3da9.f9408a0e._8c75067a');
  await saveTodo(titles, texts, page2);

  

  async function saveTodo(titles, textos, page2)  {
    try {
        await page2.waitForTimeout(3000);
        for (let index = 0; index < 6; index++) {
            await page2.keyboard.press('q');
            await page2.waitForTimeout(3000);
            await page2.click('div.public-DraftStyleDefault-block.public-DraftStyleDefault-ltr');
            await page2.keyboard.type(titles[index]);
            await page2.click('div.f9408a0e._6e9db9aa._6cad1a19 textarea.task_editor__description_field.no-focus-marker');
            await page2.keyboard.type(textos[index]);
            await page2.click('button._7a2031d6.a878a9a4._949f7858.f9408a0e._56a651f6');
            await page2.waitForTimeout(2000);
            if (index == 5) {
                await page2.screenshot({ path: 'example.png' });
                browser.close();
            }
      }
    } catch (error) {
        console.log(error);
        await page2.screenshot({ path: 'example.png' });
    }
  
 }

})();