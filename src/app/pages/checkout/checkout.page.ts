import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.page.html",
  styleUrls: ["./checkout.page.scss"]
})
export class CheckoutPage implements OnInit {
  myForm: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      email: "",
      message: ""
    });

    this.myForm.valueChanges.subscribe(console.log);
  }
}
