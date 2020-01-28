/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { MediaStatiqueComponentsPage, MediaStatiqueDeleteDialog, MediaStatiqueUpdatePage } from './media-statique.page-object';

const expect = chai.expect;

describe('MediaStatique e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let mediaStatiqueUpdatePage: MediaStatiqueUpdatePage;
  let mediaStatiqueComponentsPage: MediaStatiqueComponentsPage;
  let mediaStatiqueDeleteDialog: MediaStatiqueDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load MediaStatiques', async () => {
    await navBarPage.goToEntity('media-statique');
    mediaStatiqueComponentsPage = new MediaStatiqueComponentsPage();
    await browser.wait(ec.visibilityOf(mediaStatiqueComponentsPage.title), 5000);
    expect(await mediaStatiqueComponentsPage.getTitle()).to.eq('onTientLeBonBoutApp.mediaStatique.home.title');
  });

  it('should load create MediaStatique page', async () => {
    await mediaStatiqueComponentsPage.clickOnCreateButton();
    mediaStatiqueUpdatePage = new MediaStatiqueUpdatePage();
    expect(await mediaStatiqueUpdatePage.getPageTitle()).to.eq('onTientLeBonBoutApp.mediaStatique.home.createOrEditLabel');
    await mediaStatiqueUpdatePage.cancel();
  });

  it('should create and save MediaStatiques', async () => {
    const nbButtonsBeforeCreate = await mediaStatiqueComponentsPage.countDeleteButtons();

    await mediaStatiqueComponentsPage.clickOnCreateButton();
    await promise.all([]);
    await mediaStatiqueUpdatePage.save();
    expect(await mediaStatiqueUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await mediaStatiqueComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last MediaStatique', async () => {
    const nbButtonsBeforeDelete = await mediaStatiqueComponentsPage.countDeleteButtons();
    await mediaStatiqueComponentsPage.clickOnLastDeleteButton();

    mediaStatiqueDeleteDialog = new MediaStatiqueDeleteDialog();
    expect(await mediaStatiqueDeleteDialog.getDialogTitle()).to.eq('onTientLeBonBoutApp.mediaStatique.delete.question');
    await mediaStatiqueDeleteDialog.clickOnConfirmButton();

    expect(await mediaStatiqueComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
