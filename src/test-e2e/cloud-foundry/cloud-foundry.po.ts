import { browser, promise } from 'protractor';
import { CFPage } from '../po/cf-page.po';
import { ListComponent } from '../po/list.po';

export class CloudFoundryPage extends CFPage {

  public list = new ListComponent();

  constructor() {
    super('/cloud-foundry');
  }

  isSummaryView(): promise.Promise<boolean> {
    return browser.getCurrentUrl().then(url => {
      return url.startsWith(browser.baseUrl + this.navLink) && url.endsWith('/summary');
    });
  }

}
