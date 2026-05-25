import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AccountService } from "../../services/account.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {

  balance: number = 0;
  recentTransactions: any[] = [];

  constructor(
    private router: Router,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.loadSummary();
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  // 🔹 NEW (non-breaking)
  loadSummary(): void {
    this.accountService.getAccount().subscribe({
      next: (acc) => {
        this.balance = acc.balance;
      },
      error: () => {
        console.warn('Failed to load account balance');
      }
    });

    this.accountService.getTransactions().subscribe({
      next: (txs) => {
        this.recentTransactions = txs
          .sort(
            (a: any, b: any) =>
              new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          )
          .slice(0, 5);
      },
      error: () => {
        console.warn('Failed to load recent transactions');
      }
    });
  }
}
