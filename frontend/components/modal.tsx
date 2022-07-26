import React, { useState } from 'react';
import { PortalWithState } from 'react-portal';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import DatePicker from 'react-datepicker';
import { useMutation, UseMutationResult } from 'react-query';
import { addCalendar } from '../services/AuthService';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

type Props = { email: string };
type ICalendar = {
  id: string;
  activity: string;
  startDate: string;
  endDate: string;
  immediate: any;
  calendarType: any;
};
const Modal = ({ email }: Props) => {
  const [startTimeValue, setStartTimeValue] = React.useState<Date | null>(
    new Date()
  );
  const [endTimeValue, setEndTimeValue] = React.useState<Date | null>(
    new Date()
  );

  const [startDateState, setStartDateState] = useState(new Date());
  const [endDateState, setEndDateState] = useState(new Date());
  const { mutate, isError }: UseMutationResult<any, Error, any> = useMutation<
    any,
    Error,
    any
  >(async ({ id, activity, startDate, endDate, email, type, status }) => {
    addCalendar(email, id, activity, startDate, endDate, status, type);
  });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ICalendar>({ defaultValues: { immediate: 'NORMAL' } });

  const seperateMilisecond = (date: Date | null): string => {
    if (date) {
      const array = date.toLocaleTimeString().split(':');
      console.log(`${array[0]}:${array[1]}`);
      return `${array[0]}:${array[1]}`;
    }
    return '';
  };

  const onSubmit = handleSubmit(({ activity, immediate, calendarType }) => {
    console.log({
      startDate: `${startDateState.getFullYear()}-${
        startDateState.getMonth() + 1 < 10
          ? `0${startDateState.getMonth() + 1}`
          : startDateState.getMonth() + 1
      }-${
        startDateState.getDate() < 10
          ? `0${startDateState.getDate()}`
          : startDateState.getDate()
      } ${seperateMilisecond(startTimeValue)}`,
      endDate: `${endDateState.getFullYear()}-${
        endDateState.getMonth() + 1 < 10
          ? `0${endDateState.getMonth() + 1}`
          : endDateState.getMonth() + 1
      }-${
        endDateState.getDate() < 10
          ? `0${endDateState.getDate()}`
          : endDateState.getDate()
      } ${seperateMilisecond(endTimeValue)}`,
    });

    //console.log(startDateState.toLocaleDateString().replaceAll('.', '-'));
    //     console.log(
    //       `${startDateState.getFullYear()}-${
    //         startDateState.getMonth() + 1 < 10
    //           ? `0${startDateState.getMonth() + 1}`
    //           : startDateState.getMonth() + 1
    //       }-${
    //         startDateState.getDate() < 10
    //           ? `0${startDateState.getDate()}`
    //           : startDateState.getDate()
    //       } 12:45`
    //     );

    mutate({
      email,
      id: Math.floor(Math.random() * 1000),
      activity,
      startDate: `${startDateState.getFullYear()}-${
        startDateState.getMonth() + 1 < 10
          ? `0${startDateState.getMonth() + 1}`
          : startDateState.getMonth() + 1
      }-${
        startDateState.getDate() < 10
          ? `0${startDateState.getDate()}`
          : startDateState.getDate()
      } ${seperateMilisecond(startTimeValue)}`,
      endDate: `${endDateState.getFullYear()}-${
        endDateState.getMonth() + 1 < 10
          ? `0${endDateState.getMonth() + 1}`
          : endDateState.getMonth() + 1
      }-${
        endDateState.getDate() < 10
          ? `0${endDateState.getDate()}`
          : endDateState.getDate()
      } ${seperateMilisecond(endTimeValue)}`,
      type: calendarType,
      status: immediate,
    });
    window.location.reload();
  });

  function handleStartDate(date: Date) {
    setStartDateState(date);
    setEndDateState(date);
  }
  return (
    <PortalWithState closeOnOutsideClick={false} closeOnEsc>
      {({ openPortal, closePortal, isOpen, portal }) => (
        <React.Fragment>
          <button
            className="bg-black text-white p-2 rounded-md hover:opacity-80 transition-all ease-in-out duration-300"
            onClick={openPortal}
          >
            Add Calendar
          </button>
          {portal(
            <div className="center-div rounded-2xl px-2 py-16 relative  ">
              <span
                onClick={closePortal}
                className="absolute top-2 right-4 font-bold text-3xl cursor-pointer hover:opacity-50 transition-all duration-500"
              >
                X
              </span>
              <p className="text-center font-mono font-bold text-2xl  underline tracking-widest">
                Add Calendar
              </p>
              <form
                onSubmit={onSubmit}
                className="px-4 py-8 flex flex-col gap-4"
              >
                <TextField
                  {...register('activity', {
                    required: true,
                  })}
                  required
                  fullWidth
                  label="Activity"
                  autoFocus
                />
                <div className="flex flex-row items-center justify-between  gap-2">
                  <div className="flex flex-col gap-[1px]">
                    <span className="text-xs font-serif ">Start Date</span>
                    <DatePicker
                      required
                      className="z-[9999] cursor-pointer"
                      selected={startDateState}
                      onChange={(date: Date) => handleStartDate(date)}
                    />
                  </div>
                  <div className="flex flex-col gap-[1px]">
                    <span className="text-xs font-serif ">End Date</span>
                    <DatePicker
                      required
                      selected={endDateState}
                      className="z-[9999] cursor-pointer"
                      onChange={(date: Date) => setEndDateState(date)}
                    />
                  </div>
                </div>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <TimePicker
                    label="Start Time"
                    value={startTimeValue}
                    onChange={(newValue) => {
                      setStartTimeValue(newValue);
                      setEndTimeValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <TimePicker
                    label="End Time"
                    value={endTimeValue}
                    onChange={(newValue) => {
                      setEndTimeValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>

                <div className="flex flex-col gap-2">
                  <p className="text-xs font-mono">Type</p>
                  <select {...register('calendarType')}>
                    <option value="STUDY">Study</option>
                    <option value="BIRTHDAY">Birthday</option>
                    <option value="MEETING">Meeting</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
                <div className="flex flex-row gap-1 justify-between">
                  <p className="font-mono">Immediate : </p>
                  <div className="flex flex-col gap-1 text-xs font-mono items-center">
                    <span>Normal</span>
                    <input
                      {...register('immediate')}
                      type="radio"
                      value="NORMAL"
                      placeholder="Normal"
                    />
                  </div>
                  <div className="flex flex-col gap-1 text-xs font-mono items-center">
                    <span>Urgent</span>
                    <input
                      {...register('immediate')}
                      type="radio"
                      value="URGENT"
                    />
                  </div>
                  <div className="flex flex-col gap-1 text-xs font-mono items-center">
                    <span>Very Urgent</span>
                    <input
                      {...register('immediate')}
                      type="radio"
                      value="VERYURGENT"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="p-2 bg-black text-white text-center font-serif text-lg hover:scale-95 hover:opacity-80 transition-all ease-in-out"
                >
                  Save
                </button>
              </form>
            </div>
          )}
        </React.Fragment>
      )}
    </PortalWithState>
  );
};

export default Modal;
