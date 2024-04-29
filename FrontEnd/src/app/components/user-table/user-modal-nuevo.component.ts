import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, NgForm } from "@angular/forms";
import { MatDatepicker } from "@angular/material/datepicker";
import { MatOption, MatSelectChange } from "@angular/material/select";
import { MatDialog } from "@angular/material/dialog";
import { Subscription } from "rxjs";
@Component({
  selector: 'app-user-modal-nuevo',
  standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl: 'user-modal-nuevo.component.html'
})

export class UserModalNuevoComponent implements OnInit ,OnDestroy {


  constructor(private dialogRef: MatDialog){}
  @Output() cerrarModalEvent = new EventEmitter<void>();

  cerrarModal() {
    this.cerrarModalEvent.emit();
  }
  /*guardarLibro(form:NgForm){
    if(form.valid){
      const autorRequest = {

      };

      const libroRequest = {

      };


      this.bookService.guardarLibro(libroRequest);
      this.autorSubscription=this.bookService.guardarLibroLIstener().subscribe(()=>{
        this.dialogRef.closeAll();
      });
    }
  }
  selected(event:MatSelectChange){
    this.selectAutorTexto = (event.source.selected as MatOption).viewValue;
  }*/

  ngOnInit() {


  }

  ngOnDestroy() {

  }

 }

