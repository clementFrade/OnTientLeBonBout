import { element, by, ElementFinder } from 'protractor';

export class MediaDynamiqueComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-media-dynamique div table .btn-danger'));
  title = element.all(by.css('jhi-media-dynamique div h2#page-heading span')).first();

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

export class MediaDynamiqueUpdatePage {
  pageTitle = element(by.id('jhi-media-dynamique-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  dureeSecondeInput = element(by.id('field_dureeSeconde'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setDureeSecondeInput(dureeSeconde: string): Promise<void> {
    await this.dureeSecondeInput.sendKeys(dureeSeconde);
  }

  async getDureeSecondeInput(): Promise<string> {
    return await this.dureeSecondeInput.getAttribute('value');
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

export class MediaDynamiqueDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-mediaDynamique-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-mediaDynamique'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
