/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { MediaDynamiqueComponentsPage, MediaDynamiqueDeleteDialog, MediaDynamiqueUpdatePage } from './media-dynamique.page-object';

const expect = chai.expect;

describe('MediaDynamique e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let mediaDynamiqueUpdatePage: MediaDynamiqueUpdatePage;
  let mediaDynamiqueComponentsPage: MediaDynamiqueComponentsPage;
  let mediaDynamiqueDeleteDialog: MediaDynamiqueDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load MediaDynamiques', async () => {
    await navBarPage.goToEntity('media-dynamique');
    mediaDynamiqueComponentsPage = new MediaDynamiqueComponentsPage();
    await browser.wait(ec.visibilityOf(mediaDynamiqueComponentsPage.title), 5000);
    expect(await mediaDynamiqueComponentsPage.getTitle()).to.eq('onTientLeBonBoutApp.mediaDynamique.home.title');
  });

  it('should load create MediaDynamique page', async () => {
    await mediaDynamiqueComponentsPage.clickOnCreateButton();
    mediaDynamiqueUpdatePage = new MediaDynamiqueUpdatePage();
    expect(await mediaDynamiqueUpdatePage.getPageTitle()).to.eq('onTientLeBonBoutApp.mediaDynamique.home.createOrEditLabel');
    await mediaDynamiqueUpdatePage.cancel();
  });

  it('should create and save MediaDynamiques', async () => {
    const nbButtonsBeforeCreate = await mediaDynamiqueComponentsPage.countDeleteButtons();

    await mediaDynamiqueComponentsPage.clickOnCreateButton();
    await promise.all([mediaDynamiqueUpdatePage.setDureeSecondeInput('5')]);
    expect(await mediaDynamiqueUpdatePage.getDureeSecondeInput()).to.eq('5', 'Expected dureeSeconde value to be equals to 5');
    await mediaDynamiqueUpdatePage.save();
    expect(await mediaDynamiqueUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await mediaDynamiqueComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last MediaDynamique', async () => {
    const nbButtonsBeforeDelete = await mediaDynamiqueComponentsPage.countDeleteButtons();
    await mediaDynamiqueComponentsPage.clickOnLastDeleteButton();

    mediaDynamiqueDeleteDialog = new MediaDynamiqueDeleteDialog();
    expect(await mediaDynamiqueDeleteDialog.getDialogTitle()).to.eq('onTientLeBonBoutApp.mediaDynamique.delete.question');
    await mediaDynamiqueDeleteDialog.clickOnConfirmButton();

    expect(await mediaDynamiqueComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
