import { Injectable } from '@angular/core';
import { Student } from "../models/student";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private students: Student[];

  constructor() {
    this.students = [
      {
        controlnumber: "02400391",
        age: 38,
        career: "ISC",
        curp: "LOPJ770826HTSPRS68",
        email: "Elertro@ittepic.edu.mx",
        name: "Electro eltrico electrolitico",
        nip: 717,
        photo: 'https://picsum.photos/600/?random=1'
      }, 
      {
        controlnumber: "18401202",
        age: 28,
        career: "IM",
        curp: "SAGJ991012HNTCRN03",
        email: "elspoderman@ittepic.edu.mx",
        name: "peter parker",
        nip: 818,
        photo: 'https://picsum.photos/600/?random=2'
      },
      {
        controlnumber: "22400391",
        age: 18,
        career: "IC",
        curp: "CURL770826MCSRZS65",
        email: "pelirroja@ittepic.edu.mx",
        name: "mary jane wattson",
        nip: 919,
        photo: 'https://picsum.photos/600/?random=3'
      }
    ];
  }

  public getStudents(): Student[]{
    return this.students;
  }

  public removeStudent(pos: number): Student[]{
    this.students.splice(pos, 1);
    return this.students;
  }

  public getStudentByControlNumber(controlnumber: string): Student {
    let item: Student = this.students.find((student)=> {
      return student.controlnumber===controlnumber;
    });
    return item;
  }
  public newStudent(student:Student):void{
    this.students.push(student);
  }

  public updateStudent(st:Student[]){
    this.students = st;
  }
  public getStudentIndexByControlNumber(cn: string): number {
    console.log(cn)
    let index = this.students.findIndex(
      (student) => {
        return student.controlnumber===cn;
      }
    );
    return index
  }


}
