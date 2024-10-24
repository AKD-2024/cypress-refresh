export class TeacherLoginPage {
    loginbtn = '[qid="home-2"]'; 
    username = "#gigya-loginID-56269462240752180";
    password = "#gigya-password-56383998600152700";
    cardloginbtn = '[value="Log in"]';
  
    loginTeacher() {
      cy.get(this.loginbtn).click();
      cy.get(this.username).type("testpt7@mailsac.com");
      cy.get(this.password).type("Compro11");
      cy.get(this.cardloginbtn).click();
    }
}
  