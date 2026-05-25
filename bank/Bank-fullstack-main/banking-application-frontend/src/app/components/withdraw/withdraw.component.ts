import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AccountService } from "../../services/account.service";

@Component({
  selector: "app-withdraw",
  templateUrl: "./withdraw.component.html",
  styleUrls: ["./withdraw.component.css"],
})
export class WithdrawComponent {
  constructor(private accountService: AccountService) {}

  withdrawForm = new FormGroup({
    amount: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(1),
    ]),
  });

  onSubmit(): void {
    if (this.withdrawForm.invalid) {
      this.logFormErrors();
      this.withdrawForm.markAllAsTouched();
      return;
    }

    const amount = Number(this.withdrawForm.value.amount);

    this.accountService.withdraw(amount).subscribe({
      next: (res) => {
        console.log("Withdraw success");
        alert(res);
        this.withdrawForm.reset();
      },
      error: (err) => {
        console.error("Withdraw failed", err);
        alert(err?.error || "Withdraw failed");
      },
    });
  }

  private logFormErrors(): void {
    console.group("🚫 Withdraw Form Errors");

    const control = this.withdrawForm.get("amount");
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
