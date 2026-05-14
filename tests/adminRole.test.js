const { Builder, By, until } = require("selenium-webdriver");

async function adminRoleTest() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Abrir login
    await driver.get("http://localhost:5173/login");

    // LOGIN ADMIN
    await driver.findElement(By.name("email"))
      .sendKeys("nico@gmail.com");

    await driver.findElement(By.name("password"))
      .sendKeys("Gato1234");

    await driver.findElement(By.tagName("button"))
      .click();

    // Esperar login
    await driver.wait(until.urlIs("http://localhost:5173/"), 5000);

    // Entrar al admin
    await driver.get("http://localhost:5173/adminPanel");

    // Esperar carga
    await driver.sleep(3000);

    // Verificar URL
    const currentUrl = await driver.getCurrentUrl();

    if (currentUrl.includes("/admin")) {
      console.log("Test correcto: admin autorizado");
    } else {
      console.log("ERROR: admin no pudo entrar");
    }

  } catch (error) {
    console.log(error);

  } finally {
    await driver.sleep(3000);
    await driver.quit();
  }
}

adminRoleTest();