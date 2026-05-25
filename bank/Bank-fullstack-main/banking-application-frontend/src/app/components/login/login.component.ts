import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService, LoginRequest } from "../../services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  loginForm = new FormGroup({
    username: new FormControl("", [
      Validators.required,
      Validators.minLength(5),
    ]),
    password: new FormControl("", [Validators.required]),
  });

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.logFormErrors();
      this.loginForm.markAllAsTouched();
      return;
    }

    const payload: LoginRequest = {
      username: this.loginForm.value.username!,
      password: this.loginForm.value.password!,
    };

    this.authService.login(payload).subscribe({
      next: () => {
        console.log("Login successful");
        this.router.navigate(["/dashboard"]);
      },
      error: (err) => {
        console.error("Login failed", err);

        if (err.status === 401) {
          alert("Invalid username or password");
        } else {
          alert("Login failed. Please try again.");
        }
      },
    });
  }

  private logFormErrors(): void {
    console.group("🚫 Login Form Validation Errors");

    Object.keys(this.loginForm.controls).forEach((field) => {
      const control = this.loginForm.get(field);
      if (!control || !control.invalid || !control.errors) {
        return;
      }

      const errors = control.errors;

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
          default:
            console.error(`[FORM INVALID] ${field} → ${errorKey}`);
        }
      });
    });

    console.groupEnd();
  }

  goToRegister(): void {
    this.router.navigate(["/register"]);
  }
}
