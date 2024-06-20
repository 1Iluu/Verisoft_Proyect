import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { PacienteService } from '../../../services/paciente.service';
import { Paciente } from '../../../models/paciente';
import { Users } from '../../../models/users';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-listarpaciente',
  standalone: true,
  imports: [MatTableModule,
    RouterLink,
    MatButtonModule, 
    CommonModule
  ],
  templateUrl: `./listarpaciente.component.html`,
  styleUrl: './listarpaciente.component.css'
})
export class ListaPacienteComponent implements OnInit {
  displayedColumns: string[] = 
  [
  'idPaciente',
  'user', 
  'contactoEmergencia', 
  'estado',
  'accion01',
  'accion02'
  ];

  dataSource:MatTableDataSource<Paciente> = new MatTableDataSource()
  constructor(private pS:PacienteService ){}
  ngOnInit(): void {
    this.pS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
    })
    this.pS.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
    })
  }
  deletes(id:number){
    this.pS.delete(id).subscribe((data)=>{
      this.pS.list().subscribe((data)=>{
        this.pS.setList(data)
      })
    })
  }
  filter(en: any) {
    this.dataSource.filter = en.target.value.trim();
  }
}

