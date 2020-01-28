/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { InviteComponentsPage, InviteDeleteDialog, InviteUpdatePage } from './invite.page-object';

const expect = chai.expect;

describe('Invite e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let inviteUpdatePage: InviteUpdatePage;
  let inviteComponentsPage: InviteComponentsPage;
  let inviteDeleteDialog: InviteDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Invites', async () => {
    await navBarPage.goToEntity('invite');
    inviteComponentsPage = new InviteComponentsPage();
    await browser.wait(ec.visibilityOf(inviteComponentsPage.title), 5000);
    expect(await inviteComponentsPage.getTitle()).to.eq('onTientLeBonBoutApp.invite.home.title');
  });

  it('should load create Invite page', async () => {
    await inviteComponentsPage.clickOnCreateButton();
    inviteUpdatePage = new InviteUpdatePage();
    expect(await inviteUpdatePage.getPageTitle()).to.eq('onTientLeBonBoutApp.invite.home.createOrEditLabel');
    await inviteUpdatePage.cancel();
  });

  it('should create and save Invites', async () => {
    const nbButtonsBeforeCreate = await inviteComponentsPage.countDeleteButtons();

    await inviteComponentsPage.clickOnCreateButton();
    await promise.all([
      inviteUpdatePage.setNomInput('nom'),
      inviteUpdatePage.setPrenomInput('prenom'),
      inviteUpdatePage.setMailInput('mail'),
      inviteUpdatePage.setMdpInput('mdp'),
      inviteUpdatePage.setLoginInput('login'),
      inviteUpdatePage.setPointsInput('5'),
      inviteUpdatePage.questionnaireSelectLastOption()
    ]);
    expect(await inviteUpdatePage.getNomInput()).to.eq('nom', 'Expected Nom value to be equals to nom');
    expect(await inviteUpdatePage.getPrenomInput()).to.eq('prenom', 'Expected Prenom value to be equals to prenom');
    expect(await inviteUpdatePage.getMailInput()).to.eq('mail', 'Expected Mail value to be equals to mail');
    expect(await inviteUpdatePage.getMdpInput()).to.eq('mdp', 'Expected Mdp value to be equals to mdp');
    expect(await inviteUpdatePage.getLoginInput()).to.eq('login', 'Expected Login value to be equals to login');
    expect(await inviteUpdatePage.getPointsInput()).to.eq('5', 'Expected points value to be equals to 5');
    await inviteUpdatePage.save();
    expect(await inviteUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await inviteComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Invite', async () => {
    const nbButtonsBeforeDelete = await inviteComponentsPage.countDeleteButtons();
    await inviteComponentsPage.clickOnLastDeleteButton();

    inviteDeleteDialog = new InviteDeleteDialog();
    expect(await inviteDeleteDialog.getDialogTitle()).to.eq('onTientLeBonBoutApp.invite.delete.question');
    await inviteDeleteDialog.clickOnConfirmButton();

    expect(await inviteComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
