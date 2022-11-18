import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { Student } from '../models/student';
import { ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public myForm: FormGroup;
  public validationMessages: Object;
  user: string;
  pass: string;
  constructor(private studentService: StudentService, private fb: FormBuilder, private router: Router, private tc: ToastController) { }

  ngOnInit() {
    this.myForm = this.fb.group(
      {
        user: ["", Validators.compose([Validators.required])],
        pass: ["", Validators.compose([Validators.required])],
      });
    this.validationMessages = {
      user: [
        { type: 'required', message: "Usuario requerido" },
      ],
      pass: [
        { type: 'required', message: "contraseña requerida" },
      ]
    }
  }
  public async openWindow() {
     this.user = this.myForm.get("user").value
     this.pass = this.myForm.get("pass").value
    if (this.user == "admin" && this.pass == "admin") {
      this.router.navigate(['/home'])
    } else {
      if (this.alumnoValido()) {
        this.router.navigate(
          ['/view-student'],
          {
            queryParams: { cn: this.user.toString() }
          })
        this.user = ""
        this.pass = ""
      } else {
        let toast = await this.tc.create({
          message: 'Credenciales no válidas',
          duration: 1000
        });
        toast.present();
      }
    }
  }

  alumnoValido(): Boolean {
    console.log("Entra")
    let ts = this.studentService.getStudentByControlNumber(this.user)
    if (ts) {
      if (ts.nip.toString() == this.pass) {
        console.log(ts)
        return true
      } else {
        console.log("Contraseña")
        return false    
      }
    } else {
      console.log("No usuario")
      return false
    }
  }

  }