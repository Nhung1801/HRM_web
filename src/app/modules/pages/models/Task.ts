interface Task {
  title: string;
  startDate: Date;
  endDate: Date;
}

interface CalendarDay {
  date: Date;
  tasks: Task[];
}
