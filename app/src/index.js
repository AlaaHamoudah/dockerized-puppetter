const puppeteer = require("puppeteer");
const request = require("request-promise-native");
const getContainerIP = require("./util/getContainerIP");
const fs = require("fs");

(async () => {
  // Workaround for https://github.com/GoogleChrome/puppeteer/issues/2242
  const chrome = await getContainerIP("chrome");

  const options = {
    uri: `http://${chrome}:9222/json/version`,
    json: true,
    resolveWithFullResponse: true
  };

  request(options)
    .then(res => {
      let webSocket = res.body.webSocketDebuggerUrl;
      console.log(`WebsocketUrl: ${webSocket}`);

      (async () => {
        try {
          const browser = await puppeteer.connect({
            browserWSEndpoint: webSocket
          });
          // const browser = await puppeteer.launch({ headless: true });
          const [page] = await browser.pages();

          page.setJavaScriptEnabled(true);
          var base = process.env.PWD;
          var contentHtml = fs.readFileSync(base + "/src/demo.html", "utf8");
          await page.setContent(contentHtml);
          //  console.log(contentHtml)
          // await page.exposeFunction("domEventListener", domEventListener);
          await page.exposeFunction(
            "pagePuppeteerMutationListener",
            async () => {
              const pdf = await page.pdf({ format: "A4" });

              fs.writeFile("./src/test.pdf", pdf, function(err) {
                if (err) {
                  return console.log(err);
                }

                console.log("The file was saved!");
              });
            //  await browser.close();
            }
          );

          await page.evaluate(
         
            async function() {
   
              console.log("woo I run inside a browser");
              document.addEventListener('DOMContentLoaded', (event) => {
              const target = document.querySelector("#results");
              const observer = new MutationObserver(mutationsList => {
                for (const mutation of mutationsList) {
                  window.pagePuppeteerMutationListener(
                    console.log(document.querySelector("#results"))
                  );
                }
              });
              observer.observe(target, { childList: true });
        
            });
          });
          // page.on("console", msg => {
          //   for (let i = 0; i < msg.args().length; ++i) console.log(`${msg.args()[i]}`);
          // });
        } catch (e) {
          console.log(e);
        }
      })();
    })
    .catch(err => {
      console.log(err.message);
    });
})();

function domEventListener() {}
