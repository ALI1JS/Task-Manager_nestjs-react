import { Injectable } from '@nestjs/common';
import { Builder, By, until, WebDriver } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';

@Injectable()
export class ScrapingService {
  async scraping(linkedinurl: string) {
    const options = new chrome.Options();
    // options.addArguments('--headless');
    // options.addArguments('--disable-dev-shm-usage');

    const driver: WebDriver = new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
    try {
      await driver.get(linkedinurl);

      const profileName = await driver.wait(
        until.elementLocated(By.css('.t-16')),
      );
      console.log(await driver.getPageSource());
      const username: string = await profileName.getText();

      const profileImage = await driver.wait(
        until.elementLocated(By.css('.feed-identity-module__member-photo')),
      );
      const avatar = await profileImage.getAttribute('src');
      console.log(avatar, username);
      return { username, avatar };
    } finally {
      await driver.quit();
    }
  }
}
