import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class QuestionComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-question div table .btn-danger'));
  title = element.all(by.css('jhi-question div h2#page-heading span')).first();

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

export class QuestionUpdatePage {
  pageTitle = element(by.id('jhi-question-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  intituleInput = element(by.id('field_intitule'));
  mediaSelect = element(by.id('field_media'));
  themeSelect = element(by.id('field_theme'));
  questionnaireSelect = element(by.id('field_questionnaire'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIntituleInput(intitule) {
    await this.intituleInput.sendKeys(intitule);
  }

  async getIntituleInput() {
    return await this.intituleInput.getAttribute('value');
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

  async themeSelectLastOption(timeout?: number) {
    await this.themeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async themeSelectOption(option) {
    await this.themeSelect.sendKeys(option);
  }

  getThemeSelect(): ElementFinder {
    return this.themeSelect;
  }

  async getThemeSelectedOption() {
    return await this.themeSelect.element(by.css('option:checked')).getText();
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

export class QuestionDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-question-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-question'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
