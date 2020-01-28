import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class ThemeComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-theme div table .btn-danger'));
  title = element.all(by.css('jhi-theme div h2#page-heading span')).first();

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

export class ThemeUpdatePage {
  pageTitle = element(by.id('jhi-theme-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  intituleInput = element(by.id('field_intitule'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIntituleInput(intitule) {
    await this.intituleInput.sendKeys(intitule);
  }

  async getIntituleInput() {
    return await this.intituleInput.getAttribute('value');
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

export class ThemeDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-theme-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-theme'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
