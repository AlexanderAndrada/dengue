import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-sintomas',
  templateUrl: './form-sintomas.component.html',
  styleUrls: ['./form-sintomas.component.scss']
})
export class FormSintomasComponent implements OnInit {

  formGroup : FormGroup;

  constructor(private _fb: FormBuilder,
    private _router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() : void {
    this.formGroup = this._fb.group({
      nauseas : [false],
      vomitos : [false],
      cabeza : [false],
      sarpullido : [false],
      ojos : [false],
      musculares : [false],
      description : ['']
    })
  }

  onSubmit() : void {
    
  }

  volver() : void {
    this._router.navigate(['dengue','usuario','dashboard']);
  }

}
