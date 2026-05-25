import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService, RegisterRequest } from "../../services/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent {
  constructor(private authService: AuthService, private router: Router) {}

  registerForm = new FormGroup({
    username: new FormControl("", [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
      Validators.pattern(/^[a-zA-Z0-9_]+$/),
    ]),

    email: new FormControl("", [Validators.required, Validators.email]),

    password: new FormControl("", [
      Validators.required,
      Validators.pattern(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=]).{8,}$/
      ),
    ]),

    initialBalance: new FormControl(0, [
      Validators.required,
      Validators.min(0),
    ]),

    fullName: new FormControl("", [Validators.required]),

    dateOfBirth: new FormControl("", [Validators.required]),

    residentialAddress: new FormControl("", [Validators.required]),

    idType: new FormControl("", [Validators.required]),

    idNo: new FormControl("", [Validators.required]),
  });

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.logFormErrors();
      this.registerForm.markAllAsTouched();
      return;
    }

    const payload: RegisterRequest = {
      username: this.registerForm.value.username!,
      email: this.registerForm.value.email!,
      password: this.registerForm.value.password!,
      initialBalance: Number(this.registerForm.value.initialBalance),
      fullName: this.registerForm.value.fullName!,
      dateOfBirth: this.registerForm.value.dateOfBirth!,
      residentialAddress: this.registerForm.value.residentialAddress!,
      idType: this.registerForm.value.idType as any,
      idNo: this.registerForm.value.idNo!,
    };

    this.authService.register(payload).subscribe({
      next: (res) => {
        console.log("Registration successful");
        alert(res);
        this.router.navigate(["/login"]);
      },
      error: (err) => {
        console.error("Registration failed", err);
        alert(err?.error || "Registration failed");
      },
    });
  }

  /**
   * Logs detailed validation errors for each invalid field
   */
  private logFormErrors(): void {
    console.group("🚫 Registration Form Validation Errors");

    Object.keys(this.registerForm.controls).forEach((field) => {
      const control = this.registerForm.get(field);

      if (!control || !control.invalid) {
        return;
      }

      const errors = control.errors;
      if (!errors) {
        return;
      }

      Object.keys(errors).forEach((errorKey) => {
        switch (errorKey) {
          case "required":
            console.error(`[FORM INVALID] ${field} → required`);
            break;

          case "minlength":
            console.error(
              `[FORM INVALID] ${field} → minlength (${errors["minlength"].requiredLength})`
            );
            break;

          case "maxlength":
            console.error(
              `[FORM INVALID] ${field} → maxlength (${errors["maxlength"].requiredLength})`
            );
            break;

          case "pattern":
            console.error(`[FORM INVALID] ${field} → pattern mismatch`);
            break;

          case "email":
            console.error(`[FORM INVALID] ${field} → invalid email format`);
            break;

          case "min":
            console.error(
              `[FORM INVALID] ${field} → minimum value (${errors["min"].min})`
            );
            break;

          default:
            console.error(`[FORM INVALID] ${field} → ${errorKey}`);
        }
      });
    });

    console.groupEnd();
  }

  goToLogin(): void {
    this.router.navigate(["/login"]);
  }
}
