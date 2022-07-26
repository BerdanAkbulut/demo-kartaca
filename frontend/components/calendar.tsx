import React, { useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useQuery } from 'react-query';
import Cookies from 'js-cookie';
import Modal from './modal';
import CakeIcon from '@mui/icons-material/Cake';
import GroupsIcon from '@mui/icons-material/Groups';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import WorkIcon from '@mui/icons-material/Work';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteCalendar } from '../services/AuthService';
type Props = {};

const Calendar = (props: Props) => {
  const [state, setState] = useState<any>(null);
  const calendarRef = useRef(null);
  //   const {data,isLoading} = useQuery(
  //     'account',
  //     async () => {
  //       const res = await fetch('http://localhost:8080/account/get-by-email', {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({ email: parsedCookie.email }),
  //       });
  //     },
  //     {
  //       enabled: !!parsedCookie,
  //     }
  //   );
  const fetchData = async () => {
    const cookie = Cookies.get('user');
    const parsedCookie = cookie ? JSON.parse(cookie) : null;
    const res = await fetch('http://localhost:8080/account/get-by-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: parsedCookie.email }),
    });
    const data = await res.json();
    setState(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDateClick = (date: any) => {
    console.log(date);
  };

  const handleEventClick = (event: any | undefined) => {
    console.log(event);
  };

  const renderEventContent = (eventInfo: any | undefined) => {
    // console.log('id', eventInfo.event.id);
    const handleDelete = (id: string) => {
      let response: any = deleteCalendar(id, state.email);
      if (response) {
        window.location.reload();
      }
    };

    return (
      <div className="flex lg:flex-row sm:flex-col sm:gap-[1px] md:gap-[5px] items-center">
        {eventInfo.event.textColor === 'BIRTHDAY' ? (
          <CakeIcon fontSize="small" />
        ) : eventInfo.event.textColor === 'MEETING' ? (
          <GroupsIcon fontSize="small" />
        ) : eventInfo.event.textColor === 'STUDY' ? (
          <WorkIcon fontSize="small" />
        ) : (
          <AccessAlarmsIcon fontSize="small" />
        )}
        <span
          className={`${
            eventInfo.event.backgroundColor === 'NORMAL'
              ? 'bg-blue-500 rounded-[50%] w-[10px] h-[10px] inline-block'
              : eventInfo.event.backgroundColor === 'URGENT'
              ? 'bg-yellow-500 rounded-[50%] w-[10px] h-[10px] inline-block'
              : eventInfo.event.backgroundColor === 'VERYURGENT'
              ? 'bg-red-600 rounded-[50%] w-[10px] h-[10px] inline-block'
              : 'bg-green-600 rounded-[50%] w-[10px] h-[10px] inline-block'
          } `}
        ></span>
        <b className="sm:text-xs md:text-sm max-w-xl"> {eventInfo.timeText}</b>
        <i className="sm:text-xs md:text-sm">{eventInfo.event.title}</i>
        <span
          className="cursor-pointer hover:scale-125 transition-all ease-out"
          onClick={() => handleDelete(eventInfo.event.id)}
        >
          <DeleteIcon color="error" />
        </span>
      </div>
    );
  };

  return (
    <div className="p-4 ">
      {state && <Modal email={state.email} />}
      <div className="center-immediate flex flex-row gap-8 items-center">
        <p className="text-sm font-mono font-bold">Immediate:</p>
        <p className="text-xs font-mono">
          Normal:{' '}
          <span className="bg-blue-500  rounded-[50%] w-[15px] h-[15px] inline-block"></span>
        </p>
        <p className="text-xs font-mono">
          URGENT:{' '}
          <span className="bg-yellow-500 rounded-[50%] w-[15px] h-[15px] inline-block"></span>
        </p>
        <p className="text-xs font-mono">
          VERY URGENT:{' '}
          <span className="bg-red-600 rounded-[50%] w-[15px] h-[15px] inline-block"></span>
        </p>
      </div>

      {state && (
        <div className="">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, interactionPlugin]}
            selectable
            eventContent={renderEventContent}
            eventClick={handleEventClick}
            dateClick={handleDateClick}
            events={state.calendarList.map((calendar: any) => {
              return {
                id: calendar.id,
                title: calendar?.activity,
                start: calendar?.startDate,
                end: calendar?.endDate,
                color: calendar?.status,
                textColor: calendar?.type,
              };
            })}
          />
        </div>
      )}
    </div>
  );
};

export default Calendar;
