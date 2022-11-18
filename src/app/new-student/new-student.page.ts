import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.page.html',
  styleUrls: ['./new-student.page.scss'],
})
export class NewStudentPage implements OnInit {

  public student: Student;
  public service: StudentService;
  public myForm: FormGroup;
  public validationMessages: Object;



  constructor(private studenteService: StudentService, private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,private alertController: AlertController) { }

  ngOnInit() {
    this.recomendation()
    this.myForm = this.fb.group(
      {
        controlNumber: ["", Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('^[0-9]+$')])],
        name: ["", Validators.compose([Validators.required])],
        curp: ["", Validators.compose([Validators.required, Validators.minLength(18), Validators.maxLength(18), Validators.pattern(/^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/)])],
        age: ["", Validators.compose([Validators.required, Validators.min(18)])],
        nip: ["", Validators.compose([Validators.required, Validators.min(10), Validators.max(9999)])],
        email: ["", Validators.compose([Validators.required, Validators.pattern('^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$')])],
        photo: ["", Validators.compose([Validators.required, Validators.pattern(/https?:\/\/[\w\-\.]+\.\w{2,5}\/?\S*/)])],
        career: ["", Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(3)])]
      }
    );
    this.validationMessages = {
      controlNumber: [
        { type: 'required', message: "Número de control obligatorio" },
        { type: 'minlength', message: "El número de control debe ser de 8 digitos" },
        { type: 'maxlength', message: "El número de control debe ser de 8 digitos" },
        { type: 'pattern', message: "El número de control está mal formado" }
      ],
      name: [
        { type: 'required', message: "Nombre obligatorio" }
      ],
      curp: [
        { type: 'required', message: "La curp es obligatoria" },
        { type: 'minlength', message: "La curp debe ser de 18 digitos" },
        { type: 'maxlength', message: "La curp debe ser de 18 digitos" },
        { type: 'pattern', message: "La curp está mal formada" }
      ],
      age: [
        { type: 'required', message: "La edad es obligatoria" },
        { type: 'min', message: "La edad debe ser mayor a 17" },
      ],
      nip: [
        { type: 'required', message: "El nip es obligatorio" },
        { type: 'min', message: "El nip debe ser mayor a 9" },
        { type: 'max', message: "El nip debe ser menor a 9999" }
      ],
      email: [
        { type: 'required', message: "Correo obligatorio" },
        { type: 'pattern', message: "El correo está mal formado" }
      ],
      photo: [
        { type: 'required', message: "foto obligatoria" },
        { type: 'pattern', message: "El url está mal formado" }
      ],
      career: [
        { type: 'required', message: "Escoja una carrera" },
        { type: 'minLength', message: "Escoja una carrera" },
        { type: 'maxLength', message: "Escoja una carrera" }
      ]

    }
  }



  public newStudent(): void {
    let stud: Student = {
      controlnumber: this.myForm.get('controlNumber').value,
      name: this.myForm.get("name").value,
      email: this.myForm.get("email").value,
      age: this.myForm.get("age").value,
      career: this.myForm.get('career').value,
      photo: this.myForm.get("photo").value,
      nip: this.myForm.get("nip").value,
      curp: this.myForm.get("curp").value
    }
    console.log(stud);
    this.studenteService.newStudent(stud);
    this.myForm.get('controlNumber').setValue('');
    this.myForm.get('name').setValue('');
    this.myForm.get('email').setValue('');
    this.myForm.get('age').setValue('');
    this.myForm.get('career').setValue('');
    this.myForm.get('photo').setValue('');
    this.myForm.get('nip').setValue('');
    this.myForm.get('curp').setValue('');

    this.myForm.reset()

  }
  async searchStudent() {
    let search: Student;
    let cont = ""
    cont = this.myForm.get('controlNumber').value;
    search = this.service.getStudentByControlNumber(cont.toString());
    console.log(search)
    /*this.myForm.controls['name'].setValue(search.name);
    this.myForm.controls['curp'].setValue(search.curp);
    this.myForm.controls['age'].setValue(search.age);
    this.myForm.controls['nip'].setValue(search.nip);
    this.myForm.controls['email'].setValue(search.email);
    this.myForm.controls['career'].setValue(search.career)
    this.myForm.controls['photo'].setValue(search.photo);
    this.but= true;*/
  }
  async recomendation() {
    const alert = await this.alertController.create({
      header: 'Importante',
      message: 'Inserte todos campos para insertar un alumno',
      buttons: ['OK'],
    });

    await alert.present();
  }

}
