import { element, by, ElementFinder } from 'protractor';

export class InviteComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-invite div table .btn-danger'));
  title = element.all(by.css('jhi-invite div h2#page-heading span')).first();

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

export class InviteUpdatePage {
  pageTitle = element(by.id('jhi-invite-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nomInput = element(by.id('field_nom'));
  prenomInput = element(by.id('field_prenom'));
  mailInput = element(by.id('field_mail'));
  mdpInput = element(by.id('field_mdp'));
  loginInput = element(by.id('field_login'));
  pointsInput = element(by.id('field_points'));
  questionnaireSelect = element(by.id('field_questionnaire'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNomInput(nom: string): Promise<void> {
    await this.nomInput.sendKeys(nom);
  }

  async getNomInput(): Promise<string> {
    return await this.nomInput.getAttribute('value');
  }

  async setPrenomInput(prenom: string): Promise<void> {
    await this.prenomInput.sendKeys(prenom);
  }

  async getPrenomInput(): Promise<string> {
    return await this.prenomInput.getAttribute('value');
  }

  async setMailInput(mail: string): Promise<void> {
    await this.mailInput.sendKeys(mail);
  }

  async getMailInput(): Promise<string> {
    return await this.mailInput.getAttribute('value');
  }

  async setMdpInput(mdp: string): Promise<void> {
    await this.mdpInput.sendKeys(mdp);
  }

  async getMdpInput(): Promise<string> {
    return await this.mdpInput.getAttribute('value');
  }

  async setLoginInput(login: string): Promise<void> {
    await this.loginInput.sendKeys(login);
  }

  async getLoginInput(): Promise<string> {
    return await this.loginInput.getAttribute('value');
  }

  async setPointsInput(points: string): Promise<void> {
    await this.pointsInput.sendKeys(points);
  }

  async getPointsInput(): Promise<string> {
    return await this.pointsInput.getAttribute('value');
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

export class InviteDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-invite-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-invite'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
