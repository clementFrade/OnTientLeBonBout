/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { MediaComponentsPage, MediaDeleteDialog, MediaUpdatePage } from './media.page-object';

const expect = chai.expect;

describe('Media e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let mediaUpdatePage: MediaUpdatePage;
  let mediaComponentsPage: MediaComponentsPage;
  let mediaDeleteDialog: MediaDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Media', async () => {
    await navBarPage.goToEntity('media');
    mediaComponentsPage = new MediaComponentsPage();
    await browser.wait(ec.visibilityOf(mediaComponentsPage.title), 5000);
    expect(await mediaComponentsPage.getTitle()).to.eq('onTientLeBonBoutApp.media.home.title');
  });

  it('should load create Media page', async () => {
    await mediaComponentsPage.clickOnCreateButton();
    mediaUpdatePage = new MediaUpdatePage();
    expect(await mediaUpdatePage.getPageTitle()).to.eq('onTientLeBonBoutApp.media.home.createOrEditLabel');
    await mediaUpdatePage.cancel();
  });

  it('should create and save Media', async () => {
    const nbButtonsBeforeCreate = await mediaComponentsPage.countDeleteButtons();

    await mediaComponentsPage.clickOnCreateButton();
    await promise.all([
      mediaUpdatePage.setAdresseInput('adresse'),
      mediaUpdatePage.setTypeInput('type'),
      mediaUpdatePage.setNomInput('nom')
    ]);
    expect(await mediaUpdatePage.getAdresseInput()).to.eq('adresse', 'Expected Adresse value to be equals to adresse');
    expect(await mediaUpdatePage.getTypeInput()).to.eq('type', 'Expected Type value to be equals to type');
    expect(await mediaUpdatePage.getNomInput()).to.eq('nom', 'Expected Nom value to be equals to nom');
    await mediaUpdatePage.save();
    expect(await mediaUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await mediaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Media', async () => {
    const nbButtonsBeforeDelete = await mediaComponentsPage.countDeleteButtons();
    await mediaComponentsPage.clickOnLastDeleteButton();

    mediaDeleteDialog = new MediaDeleteDialog();
    expect(await mediaDeleteDialog.getDialogTitle()).to.eq('onTientLeBonBoutApp.media.delete.question');
    await mediaDeleteDialog.clickOnConfirmButton();

    expect(await mediaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
