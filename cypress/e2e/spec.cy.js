import { TeacherLoginPage } from "./pages/TeacherLoginPage.js";
import { RefreshLogicPage } from "./pages/refreshLogicPage.js";

const teacherLoginPage = new TeacherLoginPage();
const refreshLogicPage = new RefreshLogicPage();

describe("Release App", () => {
  it("teacher login", () => {
    cy.visit("https://release.cambridgeone.org", {
      headers: {
        "CF-Access-Client-Id": "caaa6c9ee84a2197731733daf066007e.access",
        "CF-Access-Client-Secret":
          "df1b11111cc4c4fbb4a1266273363e2de31cd3be6735fb2e9c67616bc7b6e6ee",
      },
    });
    cy.wait(5000);
    teacherLoginPage.loginTeacher();
    cy.wait(5000);
    cy.visit("https://release.cambridgeone.org/dashboard/teacher/library");
    cy.wait(2000);
    refreshLogicPage.start();
    cy.window().then((win) => {
      const finalCount = win.localStorage.getItem("refCount");
      cy.log(`Final refresh count: ${finalCount}`);
      expect(finalCount).to.be.null;
    });
  });
});
