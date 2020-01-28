import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class MusiqueComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-musique div table .btn-danger'));
  title = element.all(by.css('jhi-musique div h2#page-heading span')).first();

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

export class MusiqueUpdatePage {
  pageTitle = element(by.id('jhi-musique-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  artisteInput = element(by.id('field_artiste'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setArtisteInput(artiste) {
    await this.artisteInput.sendKeys(artiste);
  }

  async getArtisteInput() {
    return await this.artisteInput.getAttribute('value');
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

export class MusiqueDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-musique-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-musique'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
