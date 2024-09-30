import { useState } from 'react';
import { useRouter } from 'next/router';

interface Habit {
  name: string;
  category: string;
  startDate: string;
  frequency: string;
  goal: string;
}

const NewHabitPage = () => {
  const router = useRouter();
  const [habit, setHabit] = useState<Habit>({
    name: '',
    category: '',
    startDate: '',
    frequency: '',
    goal: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHabit({ ...habit, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch('http://localhost:3000/habits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...habit, userID: 1 }), // Assuming userID is 1
    })
      .then(() => router.push('/habits'))
      .catch((error) => console.error('Error creating habit:', error));
  };

  return (
    <div
      style={{
        padding: '2rem',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f0f0f0',
        minHeight: '100vh',
      }}
    >
      <h1 style={{ color: '#333' }}>New Habit</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
        {/* Name Field */}
        <div style={{ marginBottom: '1rem' }}>
          <label
            style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#333',
            }}
          >
            Name:
          </label>
          <input
            name="name"
            value={habit.name}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.5rem',
              fontSize: '1rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              backgroundColor: '#fff',
              color: '#000',
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            backgroundColor: '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Create Habit
        </button>
      </form>
    </div>
  );
};

export default NewHabitPage;
