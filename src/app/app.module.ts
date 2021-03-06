﻿import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor, appInitializer } from './utils';
import {
  LoginViewComponent,
  AboutViewComponent,
  CreateClassViewComponent,
  CreateStudentViewComponent,
  DashboardViewComponent,
  MyMeetingRequestsViewComponent,
  ResetPasswordViewComponent,
  RegisterViewComponent,
  FindPartnerClassViewComponent,
  FindPartnerClassContentComponent,
  ForgotPasswordViewComponent,
  LandingViewComponent,
  LandingViewOfferingComponent,
  LandingViewTeamComponent,
  ProfileViewComponent,
  SettingsViewComponent,
  PlanMeetingViewComponent,
  DashboardContentComponent,
  PlanMeetingContentComponent,
  HeaderComponent,
  FooterComponent,
  LandingHeaderComponent,
  NavigationComponent,
  ProfileViewContentComponent,
  LandingHomeContentComponent,
  LandingOfferingContentComponent,
  LandingTeamContentComponent,
  MyConnectionRequestsViewComponent,
  ClassContactContentComponent,
  FindPartnerClassViewResultsComponent,
  FindPartnerClassResultsContentComponent,
  StudentHomeViewComponent,
  StudentNavigationComponent,
  StudentProfileViewComponent,
  StudentProfileContentComponent,
  StudentHomeContentComponent,
  StudentAssignmentsViewComponent,
  StudentMeetingsViewComponent,
  StudentAssignmentsContentComponent,
  StudentMeetingsContentComponent,
  CreateClassContentComponent,
  CreateStudentContentComponent,
  MyConnectionRequestsContentComponent,
  ProjectInfoContentComponent,
  MessageBoardComponent,
  DisplayPartnerClassInfoComponent,
  ClassInformationContentComponent,
  ConfirmDialogComponent
} from './components';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './material-module';
import { CustomLoginService } from '@app/services/custom';
import { UserService, ClassesService } from './services/swagger-api/api';
import { ClassInformationViewComponent } from './components/views/class-information-view/class-information-view.component';
import { BbbViewComponent } from './components/views/bbb-view/bbb-view.component';
import { GamesViewComponent } from './components/views/games-view/games-view.component';;

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
  ],
  declarations: [
    AppComponent,
    LandingViewComponent,
    LoginViewComponent,
    RegisterViewComponent,
    ForgotPasswordViewComponent,
    FooterComponent,
    HeaderComponent,
    LandingHeaderComponent,
    NavigationComponent,
    PlanMeetingViewComponent,
    PlanMeetingContentComponent,
    FindPartnerClassViewComponent,
    SettingsViewComponent,
    ProfileViewComponent,
    AboutViewComponent,
    CreateClassViewComponent,
    CreateStudentViewComponent,
    DashboardViewComponent,
    MyMeetingRequestsViewComponent,
    ResetPasswordViewComponent,
    DashboardContentComponent,
    ProfileViewContentComponent,
    LandingHomeContentComponent,
    LandingViewOfferingComponent,
    LandingViewTeamComponent,
    LandingTeamContentComponent,
    LandingOfferingContentComponent,
    MyConnectionRequestsViewComponent,
    FindPartnerClassContentComponent,
    ClassContactContentComponent,
    FindPartnerClassViewResultsComponent,
    FindPartnerClassResultsContentComponent,
    StudentHomeViewComponent,
    StudentNavigationComponent,
    StudentProfileViewComponent,
    StudentProfileContentComponent,
    StudentHomeContentComponent,
    StudentAssignmentsViewComponent,
    StudentMeetingsViewComponent,
    StudentMeetingsContentComponent,
    StudentAssignmentsContentComponent,
    CreateClassContentComponent,
    CreateStudentContentComponent,
    ClassInformationViewComponent,
    ClassInformationContentComponent,
    BbbViewComponent,
    GamesViewComponent,
    MyConnectionRequestsContentComponent,
    ProjectInfoContentComponent,
    MessageBoardComponent,
    DisplayPartnerClassInfoComponent,
    ConfirmDialogComponent
  ],
  entryComponents: [ConfirmDialogComponent],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [CustomLoginService, UserService, ClassesService],
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
