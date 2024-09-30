import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Habit {
  habitID: number;
  name: string;
}

const HabitsPage = () => {
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/habits')
      .then((response) => response.json())
      .then((data) => setHabits(data))
      .catch((error) => console.error('Error fetching habits:', error));
  }, []);

  return (
    <div
      style={{
        padding: '2rem',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f0f0f0',
        minHeight: '100vh',
      }}
    >
      <h1 style={{ color: '#333' }}>Habits</h1>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {habits.map((habit) => (
          <li key={habit.habitID} style={{ marginBottom: '0.5rem' }}>
            <Link href={`/habits/${habit.habitID}`}>
              <p
                style={{
                  color: '#0070f3',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  margin: 0,
                }}
              >
                {habit.name}
              </p>
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/habits/new">
        <p
          style={{
            display: 'inline-block',
            marginTop: '1rem',
            color: 'green',
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
        >
          Add New Habit
        </p>
      </Link>
    </div>
  );
};

export default HabitsPage;
