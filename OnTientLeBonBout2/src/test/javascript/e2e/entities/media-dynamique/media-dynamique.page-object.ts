import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class MediaDynamiqueComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-media-dynamique div table .btn-danger'));
  title = element.all(by.css('jhi-media-dynamique div h2#page-heading span')).first();

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

export class MediaDynamiqueUpdatePage {
  pageTitle = element(by.id('jhi-media-dynamique-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  dureeSecondeInput = element(by.id('field_dureeSeconde'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setDureeSecondeInput(dureeSeconde) {
    await this.dureeSecondeInput.sendKeys(dureeSeconde);
  }

  async getDureeSecondeInput() {
    return await this.dureeSecondeInput.getAttribute('value');
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

export class MediaDynamiqueDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-mediaDynamique-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-mediaDynamique'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
