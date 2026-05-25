import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { DepositComponent } from './components/deposit/deposit.component';
import { WithdrawComponent } from './components/withdraw/withdraw.component';
import { AuthGuard } from './guards/auth.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HistoryComponent } from './components/history/history.component';
import { TransferComponent } from './components/transfer/transfer.component';


const routes: Routes = [
  // 🔹 Default route
  { path: "", redirectTo: "login", pathMatch: "full" },

  // 🔓 Public routes
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },

  // 🔐 Protected routes
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "deposit",
    component: DepositComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "withdraw",
    component: WithdrawComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },

  // 🔐 Future / optional (enable when component exists)
  
  {
    path: 'transfer',
    component: TransferComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'history',
    component: HistoryComponent,
    canActivate: [AuthGuard]
  },
  

  // 🔹 Wildcard
  { path: "**", redirectTo: "login" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
