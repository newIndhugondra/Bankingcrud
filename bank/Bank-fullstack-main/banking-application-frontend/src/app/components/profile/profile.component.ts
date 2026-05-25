import { Component, OnInit } from "@angular/core";
import { AccountService } from "../../services/account.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  account: any = null;
  loading = true;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.accountService.getAccount().subscribe({
      next: (res) => {
        console.log("Profile loaded");
        this.account = res;
        this.loading = false;
      },
      error: (err) => {
        console.error("Failed to load profile", err);
        this.loading = false;
        alert("Failed to load profile");
      },
    });
  }
}
