import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';

import {
  EventSettingsModel,
  DayService,
  WeekService,
  WorkWeekService,
  MonthService,
  AgendaService,
  ResizeService,
  DragAndDropService,
  ScheduleComponent,
  ActionEventArgs,
} from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [MatTooltipModule],
  providers: [
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    AgendaService,
    ResizeService,
    DragAndDropService,
  ],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {}
  public selectedDate: Date = new Date(2020, 9, 30);
  public eventSettings: EventSettingsModel = {
    dataSource: [
      {
        Id: 1,
        Subject: 'Testing Event',
        StartTime: new Date(2020, 9, 30, 14, 0),
        EndTime: new Date(2020, 9, 30, 14, 50),
        RecurrenceRule: 'FREQ=WEEKLY;BYDAY=FR;INTERVAL=1;',
        RecurrenceException: '20201106T130000Z',
        IsReadonly: true,
        description: 'test',
      },
    ],
  };

  @ViewChild('schedule', { static: false })
  public scheduleObj: ScheduleComponent;

  onPopupOpen(args) {
    console.log('popUp args', args.data);
    console.log('getEvent result', this.scheduleObj.getEvents(args.data));
  }

  onActionComplete(args: ActionEventArgs): void {
    console.log('actionComplete', args.requestType, args);

    switch (args.requestType) {
      case 'viewNavigate':
      case 'dateNavigate':
        this.scheduleObj.refresh();
        break;
      case 'toolBarItemRendered':
        break;
      default:
    }
  }
}
