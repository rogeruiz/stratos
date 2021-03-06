import { inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CoreModule } from '../../core/core.module';
import { ApplicationStateService } from '../../shared/components/application-state/application-state.service';
import { EntityMonitorFactory } from '../../shared/monitors/entity-monitor.factory.service';
import { PaginationMonitorFactory } from '../../shared/monitors/pagination-monitor.factory';
import { GetApplication } from '../../store/actions/application.actions';
import { applicationSchemaKey, entityFactory } from '../../store/helpers/entity-factory';
import { AppStoreModule } from '../../store/store.module';
import { generateTestApplicationServiceProvider } from '../../test-framework/application-service-helper';
import { generateTestEntityServiceProvider } from '../../test-framework/entity-service.helper';
import { ApplicationService } from './application.service';
import { ApplicationEnvVarsService } from './application/application-tabs-base/tabs/build-tab/application-env-vars.service';

describe('ApplicationService', () => {

  const appId = '1';
  const cfId = '2';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        AppStoreModule,
        RouterTestingModule,
      ],
      providers: [
        generateTestEntityServiceProvider(
          appId,
          entityFactory(applicationSchemaKey),
          new GetApplication(appId, cfId)
        ),
        generateTestApplicationServiceProvider(cfId, appId),
        ApplicationStateService,
        ApplicationEnvVarsService,
        EntityMonitorFactory,
        PaginationMonitorFactory
      ]
    });
  });

  it('should be created', inject([ApplicationService], (service: ApplicationService) => {
    expect(service).toBeTruthy();
  }));
});
