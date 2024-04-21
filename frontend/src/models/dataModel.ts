export function timeRemaining(dueDate: string, timeDue: string): string {
    const dateTimeString = dueDate + ' ' + timeDue;
    const dueDateTime = new Date(dateTimeString);
    const now = new Date();

    const diffInMilliseconds = dueDateTime.getTime() - now.getTime();
    const diffInSeconds = diffInMilliseconds / 1000;

    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

    if (diffInSeconds > 86400) {
        const days = Math.floor(diffInSeconds / 86400);
        return rtf.format(days, 'day').split("in ")[1] + " left";
    } else if (diffInSeconds > 3600) {
        const hours = Math.floor(diffInSeconds / 3600);
        const minutes = Math.floor((diffInSeconds % 3600) / 60);
        return `${rtf.format(hours, 'hour').split("in ")[1]} and ${rtf.format(minutes, 'minute').split("in ")[1]} left`;
    } else if (diffInSeconds >= 60) {
        const minutes = Math.floor(diffInSeconds / 60);
        const seconds = Math.floor(diffInSeconds % 60);
        return `${rtf.format(minutes, 'minute').split("in ")[1]}${rtf.format(seconds, 'second').split("in ")[1] ? (" and " + rtf.format(seconds, 'second').split("in ")[1]) : ""} left`;
    } else {
        const seconds = Math.floor(diffInSeconds % 60);
        return `${rtf.format(seconds, 'second').split("in ")[1] ? (rtf.format(seconds, 'second').split("in ")[1] + " left") : "no time left!"}`
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
    subTasks: string[];
};

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