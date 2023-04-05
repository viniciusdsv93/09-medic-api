import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma/prisma.service';
import * as puppeteer from 'puppeteer';

@Injectable()
export class WebScrapingService {
  constructor(private readonly prismaService: PrismaService) { }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async extractNews() {
    const researchDetailArray = await this.prismaService.researchDetails.findMany({
      select: {
        term: true,
        user: {
          select: {
            email: true
          }
        },
      }
    });
    console.log(researchDetailArray)
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.google.com/search?q=term&source=lnms&tbm=nws');
    // const headingTexts = await page.evaluate(() => {
    //   const headingDivs = document.querySelectorAll('a["data-jrwt"="1"]');
    //   return Array.from(headingDivs, div => div.textContent);
    // });

    // // do something with the headingTexts
    // console.log(headingTexts);

    const links = await page.$$eval('a[data-jrwt="1"]', links => {
      return links.map(link => link.href);
    });

    // do something with the links
    console.log(links);
  }
}
