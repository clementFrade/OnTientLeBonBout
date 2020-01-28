import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class MediaStatiqueComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-media-statique div table .btn-danger'));
  title = element.all(by.css('jhi-media-statique div h2#page-heading span')).first();

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

export class MediaStatiqueUpdatePage {
  pageTitle = element(by.id('jhi-media-statique-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
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

export class MediaStatiqueDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-mediaStatique-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-mediaStatique'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
