import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma/prisma.service';
import * as puppeteer from 'puppeteer';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class WebScrapingService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly mailerService: MailerService,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async extractNews() {
    const researchDetailArray =
      await this.prismaService.researchDetails.findMany({
        select: {
          term: true,
          user: {
            select: {
              email: true,
            },
          },
        },
      });
    console.log(researchDetailArray);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    for (const r of researchDetailArray) {
      await page.goto(
        `https://www.bing.com/news/search?q=${r.term}&qft=sortbydate%3d"1"`,
      );

      let htmlContent = '';

      const links = await page.$$eval('.news-card-body a.title', (links) => {
        return links.map((link) => {
          const description = link.parentElement.nextSibling;
          return {
            href: link.href,
            text: link.textContent,
            desc: description.textContent,
          };
        });
      });

      const infoMail = await this.mailerService.sendMail({
        to: 'viniciusdsv93@gmail.com',
        from: 'postmaster@sandbox92948a9a9f48423fbd41e13f306b6c55.mailgun.org',
        subject: `News - ${r.term} - ${new Date().toDateString()}`,
        html: htmlContent,
      });
      console.log({ infoMail });
    }
    await browser.close();
  }
}
