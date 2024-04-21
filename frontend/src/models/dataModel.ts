export function timeRemaining(dueDate: string, timeDue: string): string {
    function convertTo24Hour(time) {
        const [timePart, modifier] = time.split(' ');
        let [hours, minutes] = timePart.split(':');
        if (hours === '12') {
            hours = '00';
        }
        if (modifier === 'PM') {
            hours = parseInt(hours, 10) + 12;
        }
        return `${hours}:${minutes}`;
    }

    const time24 = convertTo24Hour(timeDue);
    const dateTimeString = `${dueDate} ${time24}`;
    const dueDateTime = new Date(dateTimeString);
    const now = new Date();

    if (isNaN(dueDateTime.getTime())) {
        return "Invalid due date and/or time";
    }

    const diffInMilliseconds = dueDateTime.getTime() - now.getTime();
    if (diffInMilliseconds < 0) {
        return "Due date passed!";
    }

    const diffInSeconds = diffInMilliseconds / 1000;
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

    if (diffInSeconds > 86400) {
        const days = Math.floor(diffInSeconds / 86400);
        return rtf.format(days, 'day');
    } else if (diffInSeconds > 3600) {
        const hours = Math.floor(diffInSeconds / 3600);
        return rtf.format(hours, 'hour');
    } else if (diffInSeconds > 60) {
        const minutes = Math.floor(diffInSeconds / 60);
        return rtf.format(minutes, 'minute');
    } else {
        const seconds = Math.floor(diffInSeconds);
        return rtf.format(seconds, 'second');
    }
}

export type TaskObj = {
    id: string;
    name: string;
    description: string;
    course_name: string;
    priority: string;
    due_date: string;
    time_due: string;
    time_remaining: string;
    subTasks: SubTaskObj[];
};

export type SubTaskObj = {
    id: string;
    text: string;
}

export type ColumnObj = {
    id: string;
    title: string;
    taskIds: string[];
    color: string;
};

export type Data = {
    columns: ColumnObj[];
    tasks: { [key: string]: TaskObj };
};