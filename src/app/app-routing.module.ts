import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './modules/home/home/home.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { SignupOptionComponent } from './modules/auth/signup-option/signup-option.component';
import { SignupComponent } from './modules/auth/signup/signup.component';
import { SignupSProviderComponent } from './modules/auth/signup-s-provider/signup-s-provider.component';
import { ServiceSelectComponent } from './modules/services/service-select/service-select.component';
import { MapServiceProviderComponent } from './modules/service-provider/map-service-provider/map-service-provider.component';
import { MapCustomerComponent } from './modules/customer/map-customer/map-customer.component';
import { TaskTimeCountdownComponent } from './modules/customer/task-time-countdown/task-time-countdown.component';
import { ServiceproviderDashboardComponent } from './modules/service-provider/dashboard/serviceprovider-dashboard/serviceprovider-dashboard.component';
import { CustomerDashboardComponent } from './modules/customer/dashboard/customer-dashboard/customer-dashboard.component';
import { CustomerOrdersComponent } from './modules/customer/customer-orders/customer-orders.component';
import { CustomerProfileComponent } from './modules/customer/customer-profile/customer-profile.component';
import { CustomerDhomeComponent } from './modules/customer/dashboard/pages/customer-dhome/customer-dhome.component';
import { CustomerDordersComponent } from './modules/customer/dashboard/pages/customer-dorders/customer-dorders.component';
import { CustomerDprofileComponent } from './modules/customer/dashboard/pages/customer-dprofile/customer-dprofile.component';
import { NotfoundComponent } from './modules/home/notfound/notfound.component';
import { ServiceproviderDhomeComponent } from './modules/service-provider/dashboard/pages/serviceprovider-dhome/serviceprovider-dhome.component';
import { ServiceproviderDordersComponent } from './modules/service-provider/dashboard/pages/serviceprovider-dorders/serviceprovider-dorders.component';
import { ServiceproviderDprofileComponent } from './modules/service-provider/dashboard/pages/serviceprovider-dprofile/serviceprovider-dprofile.component';
import { ServiceproviderListComponent } from './modules/customer/serviceprovider-list/serviceprovider-list.component';
import { ServiceproviderReportsComponent } from './modules/service-provider/serviceprovider-reports/serviceprovider-reports.component';
import { ServiceproviderTaskCountdownComponent } from './modules/service-provider/serviceprovider-task-countdown/serviceprovider-task-countdown.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignupOptionComponent },
  { path: 'register/general', component: SignupComponent },
  { path: 'register/sprovider', component: SignupSProviderComponent },
  { path: 'service', component: ServiceSelectComponent },
  { path: 'sp', component: ServiceproviderDashboardComponent, children: [
    { path: '', component: ServiceproviderDhomeComponent },
    { path: 'orders', component: ServiceproviderDordersComponent },
    { path: 'profile', component: ServiceproviderDprofileComponent },
    { path: 'reports', component: ServiceproviderReportsComponent },
    { path: 'map', component: MapServiceProviderComponent },
    { path: 'task/time', component: ServiceproviderTaskCountdownComponent },
    { path: '**', component: NotfoundComponent },
  ] },
  { path: 'cust', component: CustomerDashboardComponent,  children: [
    { path: '', component: ServiceSelectComponent },
    { path: 'asp/:category_id', component: ServiceproviderListComponent },
    { path: 'orders', component: CustomerDordersComponent },
    { path: 'profile', component: CustomerDprofileComponent },
    { path: 'map', component: MapCustomerComponent },
    { path: 'task/time', component: TaskTimeCountdownComponent },
    { path: '**', component: NotfoundComponent },
  ] },
  { path: '', component: HomeComponent },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
