import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FormsModule, FullCalendarModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  events: EventInput[] = [
    { 
      title: 'Evento de marketing',
      date: '2024-11-20',
      description: 'Reservar espacio para una jornada enfocada en el intercambio de ideas innovadoras y estrategias de marketing. Capacidad de la Sala: 100 personas',
      fullName: 'monica ardila', 
      idNumber: '12345678'
      },
      { 
        title: 'Conferencia Hábitos Saludables',
        date: '2024-11-22',
        description: 'Descripción del Evento 2',
        fullName: 'jose ',
        idNumber: '87654321'
      }  ];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay'
    },
    editable: true,
    selectable: true,
    events: this.events,
    dateClick: this.handleDateClick.bind(this), // clic en una fecha para agregar un evento
    eventClick: this.handleEventClick.bind(this) // evento para ver detalles
  };

  showEventForm = false;
  newEvent = { title: '', date: '', time: '', description: '', fullName: '', idNumber: '' };
  selectedEvent: any = {}; // Objeto para almacenar los detalles del evento seleccionado
  private eventModal!: Modal; // Modal para agregar eventos
  private detailsModal!: Modal; // Modal para mostrar detalles del evento

  // Método para manejar el clic en una fecha del calendario
  handleDateClick(arg: any) {
    // Establece la fecha en el nuevo evento y muestra la modal de creación de evento
    this.newEvent = { title: '', date: arg.dateStr, time: '', description: '',fullName: '', idNumber: ''  };
    const modalElement = document.getElementById('eventModal');
    if (modalElement) {
      this.eventModal = new Modal(modalElement);
      this.eventModal.show();
    }
  }

  // Método para agregar un nuevo evento al calendario
  addEvent() {
    const { title, date, time, description, fullName, idNumber } = this.newEvent;
    const eventDate = time ? `${date}T${time}` : date;

    // Agrega el nuevo evento a la lista de eventos
    this.events = [
      ...this.events,
      { title, date: eventDate, description, fullName, idNumber }
    ];

    // Actualiza las opciones del calendario para reflejar los nuevos eventos
    this.calendarOptions = {
      ...this.calendarOptions,
      events: this.events
    };

    // Oculta la modal de creación de evento después de agregar el evento
    if (this.eventModal) {
      this.eventModal.hide();
    }
  }

  // Método para manejar el clic en un evento y mostrar sus detalles
  handleEventClick(clickInfo: any) {
    // Asegúrate de que el evento seleccionado tenga la estructura correcta
    this.selectedEvent = {
      title: clickInfo.event.title,
      start: clickInfo.event.start,
      description: clickInfo.event.extendedProps?.description || 'No hay descripción disponible',
      fullName: clickInfo.event.extendedProps?.fullName || 'No especificado',
      idNumber: clickInfo.event.extendedProps?.idNumber || 'No especificado'
    };
    // Muestra la modal de detalles del evento
    const detailsModalElement = document.getElementById('eventDetailsModal');
    if (detailsModalElement) {
      this.detailsModal = new Modal(detailsModalElement);
      this.detailsModal.show();
    }
  }
  
}
