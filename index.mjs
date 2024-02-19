import puppeteer from "puppeteer";

async function scrap(urls) {
  const browser = await puppeteer.launch({ headless: false });
  let page = await browser.newPage();
  for (let index = 0; index < urls.length; index++) {
    await send(page, urls[index]);
  }
  console.log("Whatsapp messages sent successfully.");
}

const send = async (page, url) => {
  await page.goto(url);
  await page.waitForFunction("window.alert");
  await page.focus("html");
  await page.keyboard.press("Enter");
  await page.waitForSelector('span[aria-label=" Delivered "]');
  await page.keyboard.press("Enter");
  await wait(10000);
};

const wait = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, time);
  });
};

try {
  scrap([
    "https://web.whatsapp.com/send?phone=+918840735987&text=Hello, this is a test message sent by a WhatsApp bot!",
    "https://web.whatsapp.com/send?phone=+919369816517&text=Hello, this is a test message sent by a WhatsApp bot!",
  ]);
} catch (e) {
  console.log(e);
}
