const { Builder, By, until } = require("selenium-webdriver");

async function loginTest() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Abrir login
    await driver.get("http://localhost:5173/login");

    // Escribir email
    await driver.findElement(By.name("email"))
      .sendKeys("user@gmail.com");

    // Escribir contraseña
    await driver.findElement(By.name("password"))
      .sendKeys("User1234");

    // Click en botón
    await driver.findElement(By.tagName("button"))
      .click();

    // Esperar redirección
    await driver.wait(until.urlIs("http://localhost:5173/"), 5000);

    console.log("Login exitoso");

  } catch (error) {
    console.log("Error en el test");
    console.log(error);

  } finally {
    await driver.sleep(5000);
    await driver.quit();
  }
}

loginTest();