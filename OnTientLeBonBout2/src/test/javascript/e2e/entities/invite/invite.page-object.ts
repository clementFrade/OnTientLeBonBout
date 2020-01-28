import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class InviteComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-invite div table .btn-danger'));
  title = element.all(by.css('jhi-invite div h2#page-heading span')).first();

  async clickOnCreateButton(timeout?: number) {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(timeout?: number) {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons() {
    return this.deleteButtons.count();
  }

  async getTitle() {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class InviteUpdatePage {
  pageTitle = element(by.id('jhi-invite-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nomInput = element(by.id('field_nom'));
  prenomInput = element(by.id('field_prenom'));
  mailInput = element(by.id('field_mail'));
  mdpInput = element(by.id('field_mdp'));
  loginInput = element(by.id('field_login'));
  pointsInput = element(by.id('field_points'));
  questionnaireSelect = element(by.id('field_questionnaire'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNomInput(nom) {
    await this.nomInput.sendKeys(nom);
  }

  async getNomInput() {
    return await this.nomInput.getAttribute('value');
  }

  async setPrenomInput(prenom) {
    await this.prenomInput.sendKeys(prenom);
  }

  async getPrenomInput() {
    return await this.prenomInput.getAttribute('value');
  }

  async setMailInput(mail) {
    await this.mailInput.sendKeys(mail);
  }

  async getMailInput() {
    return await this.mailInput.getAttribute('value');
  }

  async setMdpInput(mdp) {
    await this.mdpInput.sendKeys(mdp);
  }

  async getMdpInput() {
    return await this.mdpInput.getAttribute('value');
  }

  async setLoginInput(login) {
    await this.loginInput.sendKeys(login);
  }

  async getLoginInput() {
    return await this.loginInput.getAttribute('value');
  }

  async setPointsInput(points) {
    await this.pointsInput.sendKeys(points);
  }

  async getPointsInput() {
    return await this.pointsInput.getAttribute('value');
  }

  async questionnaireSelectLastOption(timeout?: number) {
    await this.questionnaireSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async questionnaireSelectOption(option) {
    await this.questionnaireSelect.sendKeys(option);
  }

  getQuestionnaireSelect(): ElementFinder {
    return this.questionnaireSelect;
  }

  async getQuestionnaireSelectedOption() {
    return await this.questionnaireSelect.element(by.css('option:checked')).getText();
  }

  async save(timeout?: number) {
    await this.saveButton.click();
  }

  async cancel(timeout?: number) {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class InviteDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-invite-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-invite'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
