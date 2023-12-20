import { Injectable } from '@nestjs/common';
import { Builder, By, until, WebDriver } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome'

@Injectable()
export class ScrapingService {
  async scraping(linkedinurl: string) {
    const options = new chrome.Options();
    options.addArguments('--headless');
    options.addArguments('--disable-dev-shm-usage')

    const driver: WebDriver = new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();

    try {
      await driver.get(linkedinurl);
      driver.wait(until.elementLocated(By.className('profile')));

      const nameElement = await driver.findElement(By.className('name'));
      const username = await nameElement.getText();

      const avatarElement = await driver.findElement(By.className('avatar'));
      const avatar = await avatarElement.getAttribute('src');
      console.log(avatar, username);
      return { username, avatar };
    } finally {
      await driver.quit();
    }
  }
}
