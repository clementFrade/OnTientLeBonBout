import { element, by, ElementFinder } from 'protractor';

export class ThemeComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-theme div table .btn-danger'));
  title = element.all(by.css('jhi-theme div h2#page-heading span')).first();

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

export class ThemeUpdatePage {
  pageTitle = element(by.id('jhi-theme-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  intituleInput = element(by.id('field_intitule'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIntituleInput(intitule: string): Promise<void> {
    await this.intituleInput.sendKeys(intitule);
  }

  async getIntituleInput(): Promise<string> {
    return await this.intituleInput.getAttribute('value');
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

export class ThemeDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-theme-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-theme'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
