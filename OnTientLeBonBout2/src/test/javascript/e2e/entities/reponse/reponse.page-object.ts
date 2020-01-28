import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class ReponseComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-reponse div table .btn-danger'));
  title = element.all(by.css('jhi-reponse div h2#page-heading span')).first();

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

export class ReponseUpdatePage {
  pageTitle = element(by.id('jhi-reponse-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  intituleInput = element(by.id('field_intitule'));
  valideInput = element(by.id('field_valide'));
  questionSelect = element(by.id('field_question'));
  mediaSelect = element(by.id('field_media'));
  inviteSelect = element(by.id('field_invite'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIntituleInput(intitule) {
    await this.intituleInput.sendKeys(intitule);
  }

  async getIntituleInput() {
    return await this.intituleInput.getAttribute('value');
  }

  getValideInput(timeout?: number) {
    return this.valideInput;
  }

  async questionSelectLastOption(timeout?: number) {
    await this.questionSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async questionSelectOption(option) {
    await this.questionSelect.sendKeys(option);
  }

  getQuestionSelect(): ElementFinder {
    return this.questionSelect;
  }

  async getQuestionSelectedOption() {
    return await this.questionSelect.element(by.css('option:checked')).getText();
  }

  async mediaSelectLastOption(timeout?: number) {
    await this.mediaSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async mediaSelectOption(option) {
    await this.mediaSelect.sendKeys(option);
  }

  getMediaSelect(): ElementFinder {
    return this.mediaSelect;
  }

  async getMediaSelectedOption() {
    return await this.mediaSelect.element(by.css('option:checked')).getText();
  }

  async inviteSelectLastOption(timeout?: number) {
    await this.inviteSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async inviteSelectOption(option) {
    await this.inviteSelect.sendKeys(option);
  }

  getInviteSelect(): ElementFinder {
    return this.inviteSelect;
  }

  async getInviteSelectedOption() {
    return await this.inviteSelect.element(by.css('option:checked')).getText();
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

export class ReponseDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-reponse-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-reponse'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
