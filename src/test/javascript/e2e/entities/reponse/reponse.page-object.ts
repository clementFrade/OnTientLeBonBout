import { element, by, ElementFinder } from 'protractor';

export class ReponseComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-reponse div table .btn-danger'));
  title = element.all(by.css('jhi-reponse div h2#page-heading span')).first();

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

export class ReponseUpdatePage {
  pageTitle = element(by.id('jhi-reponse-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  intituleInput = element(by.id('field_intitule'));
  valideInput = element(by.id('field_valide'));
  mediaSelect = element(by.id('field_media'));
  inviteSelect = element(by.id('field_invite'));
  questionSelect = element(by.id('field_question'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIntituleInput(intitule: string): Promise<void> {
    await this.intituleInput.sendKeys(intitule);
  }

  async getIntituleInput(): Promise<string> {
    return await this.intituleInput.getAttribute('value');
  }

  getValideInput(): ElementFinder {
    return this.valideInput;
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

  async inviteSelectLastOption(): Promise<void> {
    await this.inviteSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async inviteSelectOption(option: string): Promise<void> {
    await this.inviteSelect.sendKeys(option);
  }

  getInviteSelect(): ElementFinder {
    return this.inviteSelect;
  }

  async getInviteSelectedOption(): Promise<string> {
    return await this.inviteSelect.element(by.css('option:checked')).getText();
  }

  async questionSelectLastOption(): Promise<void> {
    await this.questionSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async questionSelectOption(option: string): Promise<void> {
    await this.questionSelect.sendKeys(option);
  }

  getQuestionSelect(): ElementFinder {
    return this.questionSelect;
  }

  async getQuestionSelectedOption(): Promise<string> {
    return await this.questionSelect.element(by.css('option:checked')).getText();
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

export class ReponseDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-reponse-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-reponse'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
