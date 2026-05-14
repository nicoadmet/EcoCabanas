const { Builder, until } = require("selenium-webdriver");

async function protectedRouteTest() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Entrar directamente al admin
    await driver.get("http://localhost:5173/adminPanel");

    // Esperar redirección
    await driver.wait(until.urlContains("/login"), 5000);

    const currentUrl = await driver.getCurrentUrl();

    if (currentUrl.includes("/login")) {
      console.log("Test correcto: ruta protegida funcionando");
    } else {
      console.log("ERROR: usuario entró sin login");
    }

  } catch (error) {
    console.log(error);

  } finally {
    await driver.sleep(3000);
    await driver.quit();
  }
}

protectedRouteTest();