import { Component, OnInit } from "@angular/core";
import { AccountService } from "../../services/account.service";

@Component({
  selector: "app-history",
  templateUrl: "./history.component.html",
  styleUrls: ["./history.component.css"],
})
export class HistoryComponent implements OnInit {
  transactions: any[] = [];              // original
  filteredTransactions: any[] = [];      // NEW
  paginatedTransactions: any[] = [];     // NEW

  loading = true;

  // NEW: filter & pagination state
  selectedType: string = 'ALL';
  currentPage = 1;
  pageSize = 5;
  totalPages = 0;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.accountService.getTransactions().subscribe({
      next: (res) => {
        console.log("Transaction history response:", res);

        // ✅ keep original array
        this.transactions = res.sort(
          (a: any, b: any) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );

        // ✅ new derived logic
        this.applyFilter();
        this.loading = false;
      },
      error: (err) => {
        console.error("Failed to load transaction history", err);
        this.loading = false;
        alert("Failed to load transaction history");
      },
    });
  }

  // NEW
  applyFilter(): void {
    if (this.selectedType === 'ALL') {
      this.filteredTransactions = [...this.transactions];
    } else {
      this.filteredTransactions = this.transactions.filter(
        tx => tx.type === this.selectedType
      );
    }

    this.currentPage = 1;
    this.calculatePagination();
  }

  // NEW
  calculatePagination(): void {
    this.totalPages = Math.ceil(this.filteredTransactions.length / this.pageSize);
    this.updatePage();
  }

  // NEW
  updatePage(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedTransactions = this.filteredTransactions.slice(start, end);
  }

  // NEW
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePage();
    }
  }

  // NEW
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePage();
    }
  }
}
