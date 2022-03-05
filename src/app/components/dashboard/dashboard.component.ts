import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import { ReservasService } from '../../services/reservas.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  reservas: any[] = [];
  config: any;
  showInput = false;
  observacion = '';
  selectedItem: any;
  token: any;

  constructor(
    private reservaService: ReservasService,
    private authService: AuthService
  ) {
    this.token = this.authService.getToken();
  }

  ngOnInit(): void {
    this.list();
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.reservas.length,
    };
  }

  list() {
    this.reservaService.getReservas(this.token).subscribe({
      next: (res: any) => {
        this.reservas = res;
      },
      complete: () => {}, // completeHandler
      error: (err) => {
        console.log('Error listando pedidos', err);
      }, // errorHandler
    });
  }

  pageChanged(event: any) {
    this.config.currentPage = event;
  }

  selectItem(item: any) {
    this.showInput = true;
    this.selectedItem = item;
  }

  cambiarStatus() {
    this.showInput = false;
    if (this.selectedItem.status == 'activo') {
      this.reservaService
        .updateReservaStatus({
          uuid: this.selectedItem.uuid,
          status: 'completado',
          observacion: this.observacion,
          fecha: Date.now(),
        })
        .subscribe({
          next: (res: any) => {
            if (res.status == 200) {
              Swal.fire({
                title: 'Exito',
                html: `<p class="swal2-text">Estado actualizado exitosamente.</p>`,
                icon: 'success',
              });
            }
          },
          complete: () => {
            this.observacion = '';
            this.list();
          }, // completeHandler
          error: (err) => {
            console.log('Error creando', err);
          }, // errorHandler
        });
    } else if (this.selectedItem.status == 'reservado') {
      this.reservaService
        .updateReservaStatus({
          uuid: this.selectedItem.uuid,
          status: 'activo',
          observacion: this.observacion,
          fecha: Date.now(),
        })
        .subscribe({
          next: (res: any) => {
            if (res.status == 200) {
              Swal.fire({
                title: 'Exito',
                html: `<p class="swal2-text">Estado actualizado exitosamente.</p>`,
                icon: 'success',
              });
            }
          },
          complete: () => {
            this.observacion = '';
            this.list();
          }, // completeHandler
          error: (err) => {
            console.log('Error creando', err);
          }, // errorHandler
        });
    }
  }
}
