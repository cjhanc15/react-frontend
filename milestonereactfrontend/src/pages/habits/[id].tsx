import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

interface Habit {
  habitID: number;
  name: string;
  category: string;
  startDate: string;
  frequency: string;
  goal: string;
}

const EditHabitPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [habit, setHabit] = useState<Habit | null>(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3000/habits/${id}`)
        .then((response) => setHabit(response.data))
        .catch((error) => console.error('Error fetching habit:', error));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (habit) {
      setHabit({ ...habit, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (habit) {
      axios
        .put(`http://localhost:3000/habits/${habit.habitID}`, habit)
        .then(() => router.push('/habits'))
        .catch((error) => console.error('Error updating habit:', error));
    }
  };

  const handleDelete = () => {
    if (habit) {
      axios
        .delete(`http://localhost:3000/habits/${habit.habitID}`)
        .then(() => router.push('/habits'))
        .catch((error) => console.error('Error deleting habit:', error));
    }
  };

  if (!habit) {
    return <div style={{ padding: '2rem' }}>Loading...</div>;
  }

  return (
    <div
      style={{
        padding: '2rem',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f0f0f0',
        minHeight: '100vh',
      }}
    >
      <h1 style={{ color: '#333' }}>Edit Habit</h1>
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
            marginRight: '1rem',
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            backgroundColor: '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Save
        </button>
        <button
          type="button"
          onClick={handleDelete}
          style={{
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            backgroundColor: '#e00',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Delete Habit
        </button>
      </form>
    </div>
  );
};

export default EditHabitPage;
