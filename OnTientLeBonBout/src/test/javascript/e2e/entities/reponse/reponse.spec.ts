/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ReponseComponentsPage, ReponseDeleteDialog, ReponseUpdatePage } from './reponse.page-object';

const expect = chai.expect;

describe('Reponse e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let reponseUpdatePage: ReponseUpdatePage;
  let reponseComponentsPage: ReponseComponentsPage;
  let reponseDeleteDialog: ReponseDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Reponses', async () => {
    await navBarPage.goToEntity('reponse');
    reponseComponentsPage = new ReponseComponentsPage();
    await browser.wait(ec.visibilityOf(reponseComponentsPage.title), 5000);
    expect(await reponseComponentsPage.getTitle()).to.eq('onTientLeBonBoutApp.reponse.home.title');
  });

  it('should load create Reponse page', async () => {
    await reponseComponentsPage.clickOnCreateButton();
    reponseUpdatePage = new ReponseUpdatePage();
    expect(await reponseUpdatePage.getPageTitle()).to.eq('onTientLeBonBoutApp.reponse.home.createOrEditLabel');
    await reponseUpdatePage.cancel();
  });

  it('should create and save Reponses', async () => {
    const nbButtonsBeforeCreate = await reponseComponentsPage.countDeleteButtons();

    await reponseComponentsPage.clickOnCreateButton();
    await promise.all([
      reponseUpdatePage.setIntituleInput('intitule'),
      reponseUpdatePage.questionSelectLastOption(),
      reponseUpdatePage.mediaSelectLastOption(),
      reponseUpdatePage.inviteSelectLastOption()
    ]);
    expect(await reponseUpdatePage.getIntituleInput()).to.eq('intitule', 'Expected Intitule value to be equals to intitule');
    const selectedValide = reponseUpdatePage.getValideInput();
    if (await selectedValide.isSelected()) {
      await reponseUpdatePage.getValideInput().click();
      expect(await reponseUpdatePage.getValideInput().isSelected(), 'Expected valide not to be selected').to.be.false;
    } else {
      await reponseUpdatePage.getValideInput().click();
      expect(await reponseUpdatePage.getValideInput().isSelected(), 'Expected valide to be selected').to.be.true;
    }
    await reponseUpdatePage.save();
    expect(await reponseUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await reponseComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Reponse', async () => {
    const nbButtonsBeforeDelete = await reponseComponentsPage.countDeleteButtons();
    await reponseComponentsPage.clickOnLastDeleteButton();

    reponseDeleteDialog = new ReponseDeleteDialog();
    expect(await reponseDeleteDialog.getDialogTitle()).to.eq('onTientLeBonBoutApp.reponse.delete.question');
    await reponseDeleteDialog.clickOnConfirmButton();

    expect(await reponseComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
