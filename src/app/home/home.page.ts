import { Component } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Student } from "../models/student";
import { StudentService } from "../services/student.service";
import { AlertController } from "@ionic/angular";
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { NewStudentPage } from '../new-student/new-student.page';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public students: Student[];
  public myForm:FormGroup;
  public validationMessages:Object;

  constructor(private studentService: StudentService, private alertController: AlertController, 
    private router: Router,private fb:FormBuilder, private tc: ToastController) {
    this.students = this.studentService.getStudents();
    this.myForm=this.fb.group(
      { 
        controlNumber:["",Validators.compose([Validators.required,Validators.minLength(8),Validators.maxLength(8),Validators.pattern('^[0-9]+$')])]
      }
    );
    this.validationMessages={
      controlNumber:[
        {type:'required',message:"Número de control obligatorio"},
        {type:'minlength',message:"El número de control debe ser de 8 digitos"},
        {type:'maxlength',message:"El número de control debe ser de 8 digitos"},
        {type:'pattern',message:"El número de control está mal formado"}
      ]

  }
}

  public async removeStudent(pos: number) {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      subHeader: '¿Estás seguro que deseas eliminar?',
      message: 'Esto es una confirmación',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: () => {
            this.students = this.studentService.removeStudent(pos);
          }
        }
      ]
    });

    await alert.present();
  }

  public getStudentByControlNumber(cn: string): void {
    //console.log(this.studentService.getStudentByControlNumber(cn));
    this.router.navigate(['/view-student'], {
      queryParams: { cn: cn },
    });
  }

  public addStudent(){
    this.router.navigate(['/new-student'])
  }
 
 async searchStudent(){
    if (this.myForm.controls['controlNumber'].valid) {
      let st: Student;
      st = this.studentService.getStudentByControlNumber(this.myForm.get('controlNumber').value)
      if (!st) {
        let toast = await this.tc.create({
          message: 'Estudiante no encontrado',
          duration: 2000
        });
        toast.present();
        this.myForm.reset();
      } else {
        console.log(st)
        /*this.myForm.controls['controlNumber'].disable();
        this.myForm.controls['name'].setValue(st.name);
        this.myForm.controls['curp'].setValue(st.curp);
        this.myForm.controls['edad'].setValue(st.age);
        this.myForm.controls['nip'].setValue(st.nip);
        this.myForm.controls['email'].setValue(st.email);
        this.myForm.controls['career'].setValue(st.career)
        this.myForm.controls['photo'].setValue(st.photo);*/
        this.router.navigate(['/update-student'], {
          queryParams: { st: st.controlnumber },
        });
        this.myForm.get('controlNumber').setValue('')
      }
    } else {
      let toast = await this.tc.create({
        message: 'Verifique que el número de control sea válido',
        duration: 2000
      });
      toast.present();
    }
  }
}
