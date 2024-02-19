import puppeteer from "puppeteer";

async function scrap(urls) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  try {
    for (let index = 0; index < urls.length; index++) {
      await send(page, urls[index]);
    }
    console.log("Done");
  } catch (error) {
    console.error("Error occurred:", error);
  } finally {
    await browser.close();
  }
}

const send = async (page, url) => {
  await page.goto(url);
  await page.waitForFunction("window.alert");
  // await page.focus('div[tabindex="-1"]');
  // Enter button not working...
  await page.keyboard.press("Enter");
  let success = false;
  for (let i = 0; i < 3; i++) {
    // Retry up to 3 times
    try {
      await page.focus('div[tabindex="-1"]');
      await page.waitForSelector('div[class="do8e0lj9 l7jjieqr k6y3xtnu"]', {
        timeout: 10000,
      }); // Try with a shorter timeout
      success = true;
      break; // Exit loop if selector is found
    } catch (error) {
      console.error(
        `Attempt ${i + 1}: Error occurred while waiting for selector:`,
        error
      );
      // Wait for a short interval before retrying
      await wait(2000); // Wait for 2 seconds before retrying
    }
  }
  if (!success) {
    console.error("Failed to find selector after multiple attempts.");
    return; // Exit function if selector is not found after multiple attempts
  }
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
