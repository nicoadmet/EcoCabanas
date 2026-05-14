const { Builder, By, until } = require("selenium-webdriver");

async function loginFailTest() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Abrir login
    await driver.get("http://localhost:5173/login");

    // Email incorrecto
    await driver.findElement(By.name("email"))
      .sendKeys("fake@gmail.com");

    // Password incorrecta
    await driver.findElement(By.name("password"))
      .sendKeys("123456789");

    // Click login
    await driver.findElement(By.tagName("button"))
      .click();

    // Esperar
    await driver.sleep(3000);

    // Obtener URL actual
    const currentUrl = await driver.getCurrentUrl();

    // Verificar que SIGUE en login
    if (currentUrl.includes("/login")) {
      console.log("Test correcto: login rechazado");
    } else {
      console.log("ERROR: el login incorrecto pasó");
    }

  } catch (error) {
    console.log(error);

  } finally {
    await driver.sleep(3000);
    await driver.quit();
  }
}

loginFailTest();