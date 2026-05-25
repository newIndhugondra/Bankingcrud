import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AccountService } from "../../services/account.service";

@Component({
  selector: "app-transfer",
  templateUrl: "./transfer.component.html",
  styleUrls: ["./transfer.component.css"],
})
export class TransferComponent {
  constructor(private accountService: AccountService) {}

  transferForm = new FormGroup({
    targetAccountNumber: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(1),
    ]),
    amount: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(1),
    ]),
  });

  onSubmit(): void {
    if (this.transferForm.invalid) {
      this.logFormErrors();
      this.transferForm.markAllAsTouched();
      return;
    }

    const targetAccountNumber = Number(
      this.transferForm.value.targetAccountNumber
    );
    const amount = Number(this.transferForm.value.amount);

    this.accountService.transfer(targetAccountNumber, amount).subscribe({
      next: (res) => {
        console.log("Transfer successful");
        alert(res);
        this.transferForm.reset();
      },
      error: (err) => {
        console.error("Transfer failed", err);
        alert(err?.error || "Transfer failed");
      },
    });
  }

  private logFormErrors(): void {
    console.group("🚫 Transfer Form Errors");

    const targetCtrl = this.transferForm.get("targetAccountNumber");
    if (targetCtrl?.errors) {
      if (targetCtrl.errors["required"]) {
        console.error("[FORM INVALID] targetAccountNumber → required");
      }
      if (targetCtrl.errors["min"]) {
        console.error("[FORM INVALID] targetAccountNumber → invalid value");
      }
    }

    const amountCtrl = this.transferForm.get("amount");
    if (amountCtrl?.errors) {
      if (amountCtrl.errors["required"]) {
        console.error("[FORM INVALID] amount → required");
      }
      if (amountCtrl.errors["min"]) {
        console.error("[FORM INVALID] amount → must be greater than 0");
      }
    }

    console.groupEnd();
  }
}
