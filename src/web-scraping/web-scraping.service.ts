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
    await page.goto('https://www.bing.com/news/search?q=technology');
    // const headingTexts = await page.evaluate(() => {
    //   const headingDivs = document.querySelectorAll('.news-card-body a');
    //   return headingDivs;
    //   // return Array.from(headingDivs, div => div.textContent);
    // });

    // // do something with the headingTexts
    // console.log(headingTexts);

    const links = await page.$$eval('.news-card-body a.title', links => {
      return links.map(link => {
        return {
          href: link.href,
          text: link.textContent
        }
      });
    });

    // do something with the links
    console.log(links);
  }
}
