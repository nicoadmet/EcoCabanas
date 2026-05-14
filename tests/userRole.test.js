const { Builder, By, until } = require("selenium-webdriver");

async function userRoleTest() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Abrir login
    await driver.get("http://localhost:5173/login");

    // LOGIN CON USUARIO NORMAL
    await driver.findElement(By.name("email"))
      .sendKeys("user@gmail.com");

    await driver.findElement(By.name("password"))
      .sendKeys("User1234");

    await driver.findElement(By.tagName("button"))
      .click();

    // Esperar login
    await driver.wait(until.urlIs("http://localhost:5173/"), 5000);

    // Intentar entrar al admin
    await driver.get("http://localhost:5173/adminPanel");

    // Esperar redirección
    await driver.wait(until.urlIs("http://localhost:5173/"), 5000);

    const currentUrl = await driver.getCurrentUrl();

    if (currentUrl === "http://localhost:5173/") {
      console.log("Test correcto: usuario bloqueado del admin");
    } else {
      console.log("ERROR: usuario común entró al admin");
    }

  } catch (error) {
    console.log(error);

  } finally {
    await driver.sleep(3000);
    await driver.quit();
  }
}

userRoleTest();