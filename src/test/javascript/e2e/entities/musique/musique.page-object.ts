import { element, by, ElementFinder } from 'protractor';

export class MusiqueComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-musique div table .btn-danger'));
  title = element.all(by.css('jhi-musique div h2#page-heading span')).first();

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

export class MusiqueUpdatePage {
  pageTitle = element(by.id('jhi-musique-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  artisteInput = element(by.id('field_artiste'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setArtisteInput(artiste: string): Promise<void> {
    await this.artisteInput.sendKeys(artiste);
  }

  async getArtisteInput(): Promise<string> {
    return await this.artisteInput.getAttribute('value');
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

export class MusiqueDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-musique-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-musique'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
