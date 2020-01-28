/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { MusiqueComponentsPage, MusiqueDeleteDialog, MusiqueUpdatePage } from './musique.page-object';

const expect = chai.expect;

describe('Musique e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let musiqueUpdatePage: MusiqueUpdatePage;
  let musiqueComponentsPage: MusiqueComponentsPage;
  let musiqueDeleteDialog: MusiqueDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Musiques', async () => {
    await navBarPage.goToEntity('musique');
    musiqueComponentsPage = new MusiqueComponentsPage();
    await browser.wait(ec.visibilityOf(musiqueComponentsPage.title), 5000);
    expect(await musiqueComponentsPage.getTitle()).to.eq('onTientLeBonBoutApp.musique.home.title');
  });

  it('should load create Musique page', async () => {
    await musiqueComponentsPage.clickOnCreateButton();
    musiqueUpdatePage = new MusiqueUpdatePage();
    expect(await musiqueUpdatePage.getPageTitle()).to.eq('onTientLeBonBoutApp.musique.home.createOrEditLabel');
    await musiqueUpdatePage.cancel();
  });

  it('should create and save Musiques', async () => {
    const nbButtonsBeforeCreate = await musiqueComponentsPage.countDeleteButtons();

    await musiqueComponentsPage.clickOnCreateButton();
    await promise.all([musiqueUpdatePage.setArtisteInput('artiste')]);
    expect(await musiqueUpdatePage.getArtisteInput()).to.eq('artiste', 'Expected Artiste value to be equals to artiste');
    await musiqueUpdatePage.save();
    expect(await musiqueUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await musiqueComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Musique', async () => {
    const nbButtonsBeforeDelete = await musiqueComponentsPage.countDeleteButtons();
    await musiqueComponentsPage.clickOnLastDeleteButton();

    musiqueDeleteDialog = new MusiqueDeleteDialog();
    expect(await musiqueDeleteDialog.getDialogTitle()).to.eq('onTientLeBonBoutApp.musique.delete.question');
    await musiqueDeleteDialog.clickOnConfirmButton();

    expect(await musiqueComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
