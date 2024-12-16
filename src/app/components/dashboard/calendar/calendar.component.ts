import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Modal } from 'bootstrap';
import { EventService } from '../../../services/event/event-service.service';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FormsModule, FullCalendarModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  events: EventInput[] = []; 
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

  constructor(private eventService: EventService) {}


  ngOnInit() {
    this.loadEvents();
  }

 
  loadEvents(): void {
    this.eventService.getEvents().subscribe({
      next: (data) => {
        console.log('Datos recibidos del servicio:', data);
  
        this.events = data.events.map((event: any) => ({
          title: event.title,
          date: event.date,
          time: event.time, 
          start: `${event.date}T${event.time}`,
          description: event.description,
          fullName: event.fullName,
          idNumber: event.idNumber
        }));
  
        this.calendarOptions = { ...this.calendarOptions, events: this.events };
      },
      error: (error) => {
        console.error('Error al obtener los eventos:', error);
      }
    });
  }
  

  handleDateClick(arg: any) {
    this.newEvent = { title: '', date: arg.dateStr, time: '', description: '', fullName: '', idNumber: '' };
    const modalElement = document.getElementById('eventModal');
    if (modalElement) {
      this.eventModal = new Modal(modalElement);
      this.eventModal.show();
    }
  }

  addEvent() {
    const { title, date, time, description, fullName, idNumber } = this.newEvent;
    const eventDate = time ? `${date}T${time}` : date;

    const newEventData = {
      title,
      date: eventDate,
      description,
      fullName,
      idNumber
    };

    this.eventService.addEvent(newEventData).subscribe({
      next: (response) => {
        console.log('Evento agregado:', response);

        this.events = [...this.events, newEventData];
        this.calendarOptions = { ...this.calendarOptions, events: this.events };

        if (this.eventModal) {
          this.eventModal.hide();
        }
      },
      error: (error) => {
        console.error('Error al agregar el evento:', error);
      }
    });
  }

  // Método para manejar el clic en un evento y mostrar sus detalles
  handleEventClick(clickInfo: any) {
    this.selectedEvent = {
      title: clickInfo.event.title,
      start: clickInfo.event.start,
      description: clickInfo.event.extendedProps?.description || 'No hay descripción disponible',
      fullName: clickInfo.event.extendedProps?.fullName || 'No especificado',
      idNumber: clickInfo.event.extendedProps?.idNumber || 'No especificado'
    };
    const detailsModalElement = document.getElementById('eventDetailsModal');
    if (detailsModalElement) {
      this.detailsModal = new Modal(detailsModalElement);
      this.detailsModal.show();
    }
  }
}
