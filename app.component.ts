import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { APP_PROVIDERS } from './app.providers';

import { Http, Response, Headers } from '@angular/http';
import{ServiceHelper} from '../app/common/ServiceHelper/Service/ServiceHelper.Component';
import { RuntimeCompiler} from '@angular/compiler/src/runtime_compiler';
// import {AppSetting} from './AppSettings';


@Component({
  moduleId: module.id,
  selector: 'my-app',
  template: `<router-outlet></router-outlet>`,
  directives: [ROUTER_DIRECTIVES,ServiceHelper],
  providers: [APP_PROVIDERS]
})
export class AppComponent {
serviceHelper: ServiceHelper;
  constructor(private _http: Http,private _runtimeCompiler: RuntimeCompiler) {
    this.serviceHelper = new ServiceHelper();
    this._runtimeCompiler.clearCache();
    console.log("calling appComponent component" + new Date());  
    this.serviceHelper.getUserId(this._http);
  }
  
}
