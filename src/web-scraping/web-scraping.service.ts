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
    await page.goto(`https://www.bing.com/news/search?q=chatgpt&qft=sortbydate%3d"1"`);

    const links = await page.$$eval('.news-card-body a.title', links => {
      return links.map(link => {
        const description = link.parentElement.nextSibling;
        console.log({description})
        console.log({link})
        return {
          href: link.href,
          text: link.textContent,
          desc: description.textContent
        }
      });
    });

    console.log(links);
  }
}
