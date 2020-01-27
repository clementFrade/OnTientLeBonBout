import { element, by, ElementFinder } from 'protractor';

export class QuestionComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-question div table .btn-danger'));
  title = element.all(by.css('jhi-question div h2#page-heading span')).first();

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
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

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIntituleInput(intitule: string): Promise<void> {
    await this.intituleInput.sendKeys(intitule);
  }

  async getIntituleInput(): Promise<string> {
    return await this.intituleInput.getAttribute('value');
  }

  async mediaSelectLastOption(): Promise<void> {
    await this.mediaSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async mediaSelectOption(option: string): Promise<void> {
    await this.mediaSelect.sendKeys(option);
  }

  getMediaSelect(): ElementFinder {
    return this.mediaSelect;
  }

  async getMediaSelectedOption(): Promise<string> {
    return await this.mediaSelect.element(by.css('option:checked')).getText();
  }

  async themeSelectLastOption(): Promise<void> {
    await this.themeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async themeSelectOption(option: string): Promise<void> {
    await this.themeSelect.sendKeys(option);
  }

  getThemeSelect(): ElementFinder {
    return this.themeSelect;
  }

  async getThemeSelectedOption(): Promise<string> {
    return await this.themeSelect.element(by.css('option:checked')).getText();
  }

  async questionnaireSelectLastOption(): Promise<void> {
    await this.questionnaireSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async questionnaireSelectOption(option: string): Promise<void> {
    await this.questionnaireSelect.sendKeys(option);
  }

  getQuestionnaireSelect(): ElementFinder {
    return this.questionnaireSelect;
  }

  async getQuestionnaireSelectedOption(): Promise<string> {
    return await this.questionnaireSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class QuestionDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-question-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-question'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
