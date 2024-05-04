
const {_electron: electron} = require('playwright');
const libnut = require("../..");
const {POS_X, POS_Y, WIDTH, HEIGTH, TITLE} = require("./constants");

const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

let app;
let page;
let windowHandle;

const APP_TIMEOUT = 10000;

beforeEach(async () => {
    app = await electron.launch({args: ['main.js']});
    page = await app.firstWindow({timeout: APP_TIMEOUT});
    windowHandle = await app.browserWindow(page);
    await page.waitForLoadState("domcontentloaded");
    await windowHandle.evaluate((win) => {
        win.minimize();
        win.restore();
        win.focus();
    });
});

describe("getWindows", () => {
    it("should list our started application window", () => {
        // GIVEN

        // WHEN
        const windowNames = libnut.getWindows().map(handle => libnut.getWindowTitle(handle));

        // THEN
        expect(windowNames).toContain(TITLE);
    });
});
