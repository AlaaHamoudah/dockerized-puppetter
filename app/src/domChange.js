'use strict';

const puppeteer = require('puppeteer');
const fs = require("fs");

(async function main() {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const [page] = await browser.pages();

    await page.setBypassCSP(true);
    var base = process.env.PWD;

    var contentHtml =   fs.readFileSync(base + "/demo.html", "utf8");
    await page.setContent(contentHtml);

    await page.exposeFunction('pagePuppeteerMutationListener',async ()=>{
      const pdf = await page.pdf({ format: "A4" });
 
      
        fs.writeFile("./test.pdf", pdf, function(err) {
        if (err) {
            return console.log(err);
        }
      
        console.log("The file was saved!");
        })
        await browser.close();
    });

    await page.evaluate(() => {
      const target = document.querySelector('#results');
      const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
          window.pagePuppeteerMutationListener(
          
          );
        }
      });
      observer.observe(
        target,
        { childList: true },
      );
    });

    page.on("console", msg => {
        for (let i = 0; i < msg.args().length; ++i) console.log(`${msg.args()[i]}`);
      });

      
  } catch (err) {
    console.error(err);
  }


})();

async function printMyFile(page, browser){
 
     
        
 
}