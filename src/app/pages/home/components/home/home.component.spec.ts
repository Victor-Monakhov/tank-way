// import {ComponentFixture, TestBed} from '@angular/core/testing';
// import {HomeComponent} from './home.component';
// import {AuthService} from '../../../../shared/services/auth.service';
// import {Router, RouterModule} from '@angular/router';
// import {
//   FacebookLoginProvider,
//   GoogleLoginProvider,
//   SocialAuthService,
//   SocialAuthServiceConfig,
//   SocialLoginModule
// } from 'angularx-social-login';
// import {LocalStorageService} from '../../../../shared/services/local-storage.service';
// import {LocalizationService} from '../../../../shared/services/internationalization/localization.service';
// import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
// import {VmForDirective} from "../../../../shared/directives/vm-for.directive";
// import {NgScrollbarModule} from 'ngx-scrollbar';
// import {TranslateModule} from '@ngx-translate/core';
// import {RouterTestingModule} from '@angular/router/testing';
// import {BrowserDynamicTestingModule} from "@angular/platform-browser-dynamic/testing";
// import createSpyObj = jasmine.createSpyObj;
//
// class AuthServiceStub {
// }
//
// class LocalStorageServiceStub {
// }
//
// class LocalizationServiceStub {
// }
//
// describe('HomeComponent', () => {
//   let fixture: ComponentFixture<HomeComponent>;
//   let component: HomeComponent;
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         NgScrollbarModule,
//         SocialLoginModule,
//         TranslateModule,
//         RouterTestingModule
//       ],
//       declarations: [
//         HomeComponent,
//         // VmForDirective
//       ],
//       providers: [
//         // Router,
//         {provide: SocialAuthService, useValue: new SocialAuthService({
//             autoLogin: false,
//              providers: []
//             //   {
//             //     id: GoogleLoginProvider.PROVIDER_ID,
//             //     provider: new GoogleLoginProvider(
//             //       '697267962581-foca2h6t0adjapalls9f9sv2oad9a1he.apps.googleusercontent.com'
//             //     )
//             //   },
//             //   {
//             //     id: FacebookLoginProvider.PROVIDER_ID,
//             //     provider: new FacebookLoginProvider(
//             //       '539128910997140'
//             //     )
//             //   }
//             // ]
//           } as SocialAuthServiceConfig)},
//         {provide: AuthService, useClass: AuthServiceStub},
//         {provide: LocalStorageService, useClass: LocalStorageServiceStub},
//         {provide: LocalizationService, useClass: LocalizationService}
//       ],
//       schemas: [CUSTOM_ELEMENTS_SCHEMA]
//     }).compileComponents();
//     fixture = TestBed.createComponent(HomeComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create "HomeComponent"', () => {
//     expect(component).toBeTruthy();
//   });
// })
