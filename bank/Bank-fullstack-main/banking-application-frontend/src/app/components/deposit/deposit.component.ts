import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AccountService } from "../../services/account.service";

@Component({
  selector: "app-deposit",
  templateUrl: "./deposit.component.html",
  styleUrls: ["./deposit.component.css"],
})
export class DepositComponent {
  constructor(private accountService: AccountService) {}

  depositForm = new FormGroup({
    amount: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(1),
    ]),
  });

  onSubmit(): void {
    if (this.depositForm.invalid) {
      this.logFormErrors();
      this.depositForm.markAllAsTouched();
      return;
    }

    const amount = Number(this.depositForm.value.amount);

    this.accountService.deposit(amount).subscribe({
      next: (res) => {
        console.log("Deposit success");
        alert(res);
        this.depositForm.reset();
      },
      error: (err) => {
        console.error("Deposit failed", err);
        alert(err?.error || "Deposit failed");
      },
    });
  }

  private logFormErrors(): void {
    console.group("🚫 Deposit Form Errors");

    const control = this.depositForm.get("amount");
    if (control?.errors) {
      if (control.errors["required"]) {
        console.error("[FORM INVALID] amount → required");
      }
      if (control.errors["min"]) {
        console.error("[FORM INVALID] amount → must be greater than 0");
      }
    }

    console.groupEnd();
  }
}
