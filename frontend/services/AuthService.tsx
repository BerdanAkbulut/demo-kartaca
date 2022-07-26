import { ILogin } from '../types/types';

export const login = async (
  email: string,
  password: string
): Promise<ILogin> => {
  // axios
  //   .post('http://localhost:8080/api/auth/login', {
  //     email: email,
  //     password: password,
  //   })
  //   .then((response) => response.data)
  //   .catch((error) => console.log(error));

  const res: Response = await fetch('http://localhost:8080/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email, password: password }),
  });

  if (res.ok) {
    return res.json();
  }

  throw new Error('login error');
};

export const registerAccount = async (
  email: string,
  firstName: string,
  lastName: string,
  password: string
): Promise<any> => {
  const res: Response = await fetch(
    'http://localhost:8080/account/add-account',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
      }),
    }
  );

  if (res.ok) {
    return res.json();
  }

  throw new Error('register error');
};
export const addCalendar = async (
  email: string,
  id: string,
  activity: string,
  startDate: string,
  endDate: string,
  status: string,
  type: string
): Promise<any> => {
  const res: Response = await fetch(
    'http://localhost:8080/api/calendar/add-calendar',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        calendar: {
          id: id.toString(),
          activity,
          startDate: startDate.toString(),
          endDate: endDate.toString(),
          status: status.toString(),
          type: type.toString(),
        },
      }),
    }
  );
  if (res.ok) {
    return res.json();
  }
  throw new Error('add calendar error');
};

export const deleteCalendar = async (
  id: string,
  email: string
): Promise<any> => {
  const res: Response = await fetch(
    `http://localhost:8080/account/delete-calendar`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, email }),
    }
  );
  if (res.status === 202) {
    return res;
  }
  throw new Error('delete calendar error');
};
// method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email: email, password: password }),
