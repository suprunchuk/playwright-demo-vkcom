import { test, expect } from "@playwright/test";

test("заголовок вкладки должен содержать слово ВКонтакте", async ({ page }) => {
    //Открываем страницу vk
    await page.goto("https://vk.com/");

    // Ожидаем, что заголовок вкладки должен содержать подстроку
    await expect(page).toHaveTitle(/ВКонтакте/);
});

test("проверка ссылок продуктов для мобильных устройств", async ({ page }) => {
    await page.goto("https://vk.com/");

    // Ждем, пока не откроется всплывающее окно (popup) при клике на кнопку "Google Play"
    const page1Promise = page.waitForEvent("popup");

    // Кликаем на кнопку "Google Play"
    await page.getByRole("button", { name: "Google Play" }).click();

    // Ожидаем открытия страницы и сохраняем ссылку
    const page1 = await page1Promise;

    // Проверяем, что URL содержит ожидаемый домен Google Play
    expect(page1.url()).toContain("play.google.com");

    //Закрываем страницу
    await page1.close();

    // Аналогичные действия для кнопки "RuStore"
    const page2Promise = page.waitForEvent("popup");
    await page.getByRole("button", { name: "RuStore" }).click();
    const page2 = await page2Promise;
    expect(page2.url()).toContain("apps.rustore.ru");
    await page2.close();

    // Аналогичные действия для кнопки "App Store"
    const page3Promise = page.waitForEvent("popup");
    await page.getByRole("button", { name: "App Store" }).click();
    const page3 = await page3Promise;
    expect(page3.url()).toContain("apple.com");
    await page3.close();
});

test('открывается ли страница ввода пароля при вводе телефона', async ({ page }) => {
  await page.goto('https://vk.com/');

  // Поле ввода телефона должно отображаться на странице
  await expect(page.getByPlaceholder('Телефон или почта')).toBeVisible();

  // Активируем инпут нажатием на него
  await page.getByPlaceholder('Телефон или почта').click();

  // Вводим телефон
  await page.getByPlaceholder('Телефон или почта').fill('+79999999999');

  // Нажимаем кнопку войти
  await page.getByRole('button', { name: 'Войти' }).click();

  // Ожидаем, что название окна на странице отображается
  await expect(page.getByText('Введите пароль')).toBeVisible();

  // Ожидаем, что инпут ввода пароля виден пользователю
  await expect(page.getByPlaceholder('Введите пароль')).toBeVisible();
});