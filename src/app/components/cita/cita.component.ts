import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservasService } from 'src/app/services/reservas.service';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.css'],
})
export class CitaComponent implements OnInit {
  isLinear = false;

  firstFormGroup: FormGroup = this._formBuilder.group({
    nombre: ['', Validators.required],
    id: ['', Validators.required],
  });
  secondFormGroup: FormGroup = this._formBuilder.group({
    fecha: ['', Validators.required],
    descripcion: ['', Validators.required],
  });

  formCancelar: FormGroup = this._formBuilder.group({
    uuid: ['', Validators.required],
    observacion: ['', Validators.required],
  });

  //variables datetimepicker
  disableMinute = true;
  stepMinute = 0;
  enableMeridian = true;
  minDate = `${new Date().getFullYear()}-${(
    '0' +
    (new Date().getMonth() + 1)
  ).slice(-2)}-${('0' + new Date().getDate()).slice(-2)}`;

  defaultTime = [8, 0, 0];

  showForm = false;

  constructor(
    private _formBuilder: FormBuilder,
    private reservas: ReservasService
  ) {}

  ngOnInit(): void {
    console.log(this.minDate);
  }

  enviar() {
    console.log(
      'fecha',
      new Date(this.secondFormGroup.controls['fecha'].value).toISOString()
    );

    this.reservas
      .createReserva({
        nombre_solicitante: this.firstFormGroup.controls['nombre'].value,
        id_solicitante: this.firstFormGroup.controls['id'].value,
        fecha_cita: new Date(
          this.secondFormGroup.controls['fecha'].value
        ).toISOString(),
        descripcion: this.secondFormGroup.controls['descripcion'].value,
      })
      .subscribe({
        next: (res: any) => {
          if (res.status == 201) {
            //popup
            console.log('reserva creada', res);
            Swal.fire({
              title: 'Pedido exitoso',
              html: `<p class="swal2-text">Reserva creada con éxito. Id de reserva: ${res.uuid}. Conserva este id para cancelar tu reserva.</p>`,
              icon: 'success',
            });
          } else if (res.status == 409) {
            Swal.fire({
              title: 'Error!',
              text: 'Fecha y hora de reserva no disponible',
              icon: 'error',
              confirmButtonText: 'Ok',
            });

            console.log('ya existe reserva');
          }
        },
        complete: () => {}, // completeHandler
        error: (err) => {
          console.log('Error creando', err);
        }, // errorHandler
      });
  }

  cancelarReserva() {
    console.log('reserva cancelada');
    this.reservas
      .updateReservaStatus({
        uuid: this.formCancelar.controls['uuid'].value,
        status: 'cancelado',
        observacion: this.formCancelar.controls['observacion'].value,
        fecha: Date.now(),
      })
      .subscribe({
        next: (res: any) => {
          if (res.status == 200) {
            //popup
            console.log('reserva creada', res);
            Swal.fire({
              title: 'Cancelación exitosa',
              html: `<p class="swal2-text">Cita cancelada exitosamente.</p>`,
              icon: 'success',
            });
          }
        },
        complete: () => {}, // completeHandler
        error: (err) => {
          console.log('Error creando', err);
        }, // errorHandler
      });
  }
}
