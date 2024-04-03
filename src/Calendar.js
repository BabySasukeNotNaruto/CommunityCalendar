import React, { useState } from 'react';
import './Calendar.css';

const Calendar = () => {
    const [date, setDate] = useState(new Date());
    const [events, setEvents] = useState({
        '2024-04-10': [
            { eventText: 'Event 1', communityCode: '999' },
            { eventText: 'Event 2', communityCode: '402' }
        ],
        '2024-04-15': [
            { eventText: 'Event 3', communityCode: '007' }
        ],
        '2024-04-20': [
            { eventText: 'Hard-coded Event 1', communityCode: '999' },
            { eventText: 'Hard-coded Event 2', communityCode: '402' },
            { eventText: 'Hard-coded Event 3', communityCode: '007' }
        ]
    });
    const [errorMessage, setErrorMessage] = useState("");
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const handlePrevDay = () => {
        setDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1));
    };

    const handleNextDay = () => {
        setDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1));
    };

    const handleDayClick = (day) => {
        setDate(new Date(date.getFullYear(), date.getMonth(), day));
    };

    const handleEventSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const eventText = form.event.value.trim();
        const communityCode = form.communityCode.value.trim();

        if (!eventText || !communityCode || !["999", "402", "007"].includes(communityCode)) {
            setErrorMessage("Invalid community code");
            return;
        }

        const eventDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()).toISOString();
        const updatedEvents = {
            ...events,
            [eventDate]: [...(events[eventDate] || []), { eventText, communityCode }]
        };
        setEvents(updatedEvents);
        form.reset();
        setErrorMessage("");
    };

const renderCalendar = () => {
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const days = [];
    let dayIndex = 0;

    for (let i = 0; i < 6; i++) {
        const week = [];

        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDayOfMonth) {
                week.push(<div key={`empty-${j}`} className="day empty"></div>);
            } else if (dayIndex < daysInMonth) {
                const day = dayIndex + 1;
                const eventDate = new Date(date.getFullYear(), date.getMonth(), day).toISOString();
                const dayEvents = events[eventDate] || [];

                week.push(
                    <div key={day} className={`day ${date.getDate() === day ? 'selected' : ''}`} onClick={() => handleDayClick(day)}>
                        <div>{day}</div>
                        {dayEvents.map((event, index) => (
                            <div key={index} className="event">{event.eventText}</div>
                        ))}
                    </div>
                );
                dayIndex++;
            } else {
                week.push(<div key={`empty-${j}`} className="day empty"></div>);
            }
        }

        days.push(<div key={`week-${i}`} className="week">{week}</div>);
    }

    return days;
};
   

    return (
        <div className="calendar">
            <div className="header">
                <button onClick={handlePrevDay} className="nav-btn">Prev</button>
                <div>{date.toLocaleDateString('default', { month: 'long', year: 'numeric' })}</div>
                <button onClick={handleNextDay} className="nav-btn">Next</button>
            </div>
            <div className="days-of-week">
                {daysOfWeek.map((day) => (
                    <div key={day} className="day-of-week">{day}</div>
                ))}
            </div>
            <div className="days">{renderCalendar()}</div>
            <form className="event-form" onSubmit={handleEventSubmit}>
                <label>
                    Event:
                    <input type="text" name="event" />
                </label>
                <label>
                    Community Code:
                    <input type="text" name="communityCode" />
                </label>
                <button type="submit" className="button">Add Event</button>
                {errorMessage && <div className="error">{errorMessage}</div>}
            </form>
        </div>
    );
};

export default Calendar;
