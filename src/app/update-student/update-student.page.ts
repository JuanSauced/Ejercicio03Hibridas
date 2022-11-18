import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.page.html',
  styleUrls: ['./update-student.page.scss'],
})
export class UpdateStudentPage implements OnInit {
  public student: Student;
  public myForm: FormGroup;
  public validationMessages: Object;

  constructor(private service: StudentService, private fb: FormBuilder,
    private activatedRoute: ActivatedRoute, private tc: ToastController,private alertController: AlertController) { }

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
    this.activatedRoute.queryParams.subscribe((params) => {
      console.log(params.st);
      this.student=this.service.getStudentByControlNumber( params.st);
      this.setForm(this.student);

      });
  }

  async setForm(student:Student){
    this.myForm.controls['controlNumber'].setValue(student.controlnumber);
    this.myForm.controls['controlNumber'].disable();
    this.myForm.controls['name'].setValue(student.name);
    this.myForm.controls['curp'].setValue(student.curp);
    this.myForm.controls['age'].setValue(student.age);
    this.myForm.controls['nip'].setValue(student.nip);
    this.myForm.controls['email'].setValue(student.email);
    this.myForm.controls['career'].setValue(student.career)
    this.myForm.controls['photo'].setValue(student.photo);
  }

  async updateStudent(){
    if (this.myForm.valid) {
      console.log(this.myForm.get('controlNumber').value)
      let index = this.service.getStudentIndexByControlNumber(this.myForm.get('controlNumber').value);
      let studentsTemp = this.service.getStudents()
      studentsTemp[index] = {
        controlnumber: this.myForm.get('controlNumber').value,
        name: this.myForm.get('name').value,
        curp: this.myForm.get('curp').value,
        age: this.myForm.get('age').value,
        nip: this.myForm.get('nip').value,
        email: this.myForm.get('email').value,
        career: this.myForm.get('career').value,
        photo: this.myForm.get('photo').value
      }
      this.service.updateStudent(studentsTemp)
      this.myForm.reset();
      let toast = await this.tc.create({
        message: 'Estudiante actualizado',
        duration: 2000
      });
      toast.present();
      this.myForm.controls['controlNumber'].enable();
    } else {
      let toast = await this.tc.create({
        message: 'Verifique que todos los campos estén correctos',
        duration: 2000
      });
      toast.present();
    }
  }
  async recomendation() {
    const alert = await this.alertController.create({
      header: 'Importante',
      message: 'Modifique los campos necesarios para actualizar',
      buttons: ['OK'],
    });

    await alert.present();
  }
}
