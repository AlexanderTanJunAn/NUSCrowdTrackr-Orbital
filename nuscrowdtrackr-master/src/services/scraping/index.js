import puppeteer from "puppeteer";

export const getData = async () => {
  try {
    let limit = 50;
    let url =
      "http://localhost:48462/v1/json/events?order=DESC&timeout=5&limit=" +
      limit;

    let browser = await puppeteer.launch();
    let page = await browser.newPage();

    await page.goto(url);

    const result = await page.evaluate(() => {
      const data = JSON.parse(document.querySelector("pre").innerText)
        .filter((rule) => {
          return rule.rule_name === "Enter" || rule.rule_name === "Exit";
        })
        .filter((origin) => {
          return origin.origin === "Pedestrian";
        });

      return data;
    });

    console.log("success");
    return result;
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong" };
  }
};
