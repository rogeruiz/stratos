
import {catchError, mergeMap} from 'rxjs/operators';
import { StartRequestAction, WrapperRequestActionSuccess, WrapperRequestActionFailed } from './../types/request.types';
import {
  IRequestAction
} from '../types/request.types';
import { endpointStoreNames } from '../types/endpoint.types';
import { SystemInfo, systemStoreNames } from './../types/system.types';
import { HttpClient } from '@angular/common/http';
import { GET_SYSTEM_INFO, GetSystemInfo, GetSystemSuccess, GetSystemFailed } from './../actions/system.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../app-state';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { GetAllEndpoints } from '../actions/endpoint.actions';

@Injectable()
export class SystemEffects {
  constructor(
    private httpClient: HttpClient,
    private actions$: Actions,
    private store: Store<AppState>
  ) { }

  static guid = 'info';

  @Effect() getInfo$ = this.actions$.ofType<GetSystemInfo>(GET_SYSTEM_INFO).pipe(
    mergeMap(action => {
      const apiAction = {
        entityKey: systemStoreNames.type,
        guid: SystemEffects.guid,
        type: action.type,
      } as IRequestAction;
      this.store.dispatch(new StartRequestAction(apiAction));
      const { associatedAction } = action;
      const actionType = 'fetch';
      this.store.dispatch(new StartRequestAction(associatedAction, actionType));
      return this.httpClient.get('/pp/v1/info').pipe(
        mergeMap((info: SystemInfo) => {
          return [
            new GetSystemSuccess(info, action.login, associatedAction),
            new WrapperRequestActionSuccess({ entities: {}, result: [] }, apiAction)
          ];
        }), catchError((e) => {
          return [
            new GetSystemFailed(),
            new WrapperRequestActionFailed('Could not get system endpoints', associatedAction),
            new WrapperRequestActionFailed('Could not fetch system info', apiAction)
          ];
        }), );
    }));
}
