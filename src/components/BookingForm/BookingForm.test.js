import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookingForm from './BookingForm';

describe('BookingForm Component', () => {
  const mockOnFormSubmit = jest.fn();
  const mockDispatchOnDateChange = jest.fn();
  const availableTimes = ["12:00", "13:00", "14:00", "15:00", "17:00", "18:00", "19:00"];

  const defaultProps = {
    onFormSubmit: mockOnFormSubmit,
    isFormSubmitted: false,
    availableTimes: availableTimes,
    dispatchOnDateChange: mockDispatchOnDateChange,
  };

  beforeEach(() => {
    mockOnFormSubmit.mockClear();
    mockDispatchOnDateChange.mockClear();
  });

  describe('Component Rendering', () => {
    test('renders BookingForm component with all form fields', () => {
      render(<BookingForm {...defaultProps} />);
      
      expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/time/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/number of people/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/occasion/i)).toBeInTheDocument();
    });

    test('renders submit button with correct text', () => {
      render(<BookingForm {...defaultProps} />);
      expect(screen.getByRole('button', { name: /book a table/i })).toBeInTheDocument();
    });

    test('renders date label as visible indicator of component mount', () => {
      render(<BookingForm {...defaultProps} />);
      const dateLabel = screen.getByText(/Date/i);
      expect(dateLabel).toBeInTheDocument();
    });
  });

  describe('Default Values and Initialization', () => {
    test('sets default people value to 1', () => {
      render(<BookingForm {...defaultProps} />);
      const peopleInput = screen.getByLabelText(/number of people/i);
      expect(peopleInput.value).toBe('1');
    });

    test('sets first available time as default', () => {
      render(<BookingForm {...defaultProps} />);
      const timeSelect = screen.getByLabelText(/time/i);
      expect(timeSelect.value).toBe('12:00');
    });

    test('sets default occasion to birthday', () => {
      render(<BookingForm {...defaultProps} />);
      const occasionSelect = screen.getByLabelText(/occasion/i);
      expect(occasionSelect.value).toBe('birthday');
    });

    test('populates time dropdown with available times', () => {
      render(<BookingForm {...defaultProps} />);
      availableTimes.forEach(time => {
        expect(screen.getByRole('option', { name: time })).toBeInTheDocument();
      });
    });
  });

  describe('Form Interaction', () => {
    test('updates date value when user selects a date', async () => {
      render(<BookingForm {...defaultProps} />);
      const dateInput = screen.getByLabelText(/date/i);
      
      await userEvent.type(dateInput, '2026-03-20');
      expect(dateInput.value).toBe('2026-03-20');
    });

    test('calls dispatchOnDateChange when date is selected', async () => {
      render(<BookingForm {...defaultProps} />);
      const dateInput = screen.getByLabelText(/date/i);
      
      await userEvent.type(dateInput, '2026-03-20');
      expect(mockDispatchOnDateChange).toHaveBeenCalledWith('2026-03-20');
    });

    test('updates time value when user selects a time', async () => {
      render(<BookingForm {...defaultProps} />);
      const timeSelect = screen.getByLabelText(/time/i);
      
      await userEvent.selectOptions(timeSelect, '15:00');
      expect(timeSelect.value).toBe('15:00');
    });

    test('updates people value when user enters a number', async () => {
      render(<BookingForm {...defaultProps} />);
      const peopleInput = screen.getByLabelText(/number of people/i);
      
      await userEvent.clear(peopleInput);
      await userEvent.type(peopleInput, '6');
      expect(peopleInput.value).toBe('6');
    });

    test('updates occasion value when user selects an occasion', async () => {
      render(<BookingForm {...defaultProps} />);
      const occasionSelect = screen.getByLabelText(/occasion/i);
      
      await userEvent.selectOptions(occasionSelect, 'anniversary');
      expect(occasionSelect.value).toBe('anniversary');
    });

    test('allows valid people numbers between 1-10', async () => {
      render(<BookingForm {...defaultProps} />);
      const peopleInput = screen.getByLabelText(/number of people/i);
      
      for (let i = 1; i <= 10; i++) {
        await userEvent.clear(peopleInput);
        await userEvent.type(peopleInput, String(i));
        expect(peopleInput.value).toBe(String(i));
      }
    });
  });

  describe('Occasion Options', () => {
    test('renders all occasion options', () => {
      render(<BookingForm {...defaultProps} />);
      
      expect(screen.getByRole('option', { name: /birthday/i })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: /anniversary/i })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: /business/i })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: /other/i })).toBeInTheDocument();
    });
  });

  describe('Form Submission', () => {
    test('submits form with valid data', async () => {
      render(<BookingForm {...defaultProps} />);
      
      const dateInput = screen.getByLabelText(/date/i);
      const timeSelect = screen.getByLabelText(/time/i);
      const peopleInput = screen.getByLabelText(/number of people/i);
      
      await userEvent.type(dateInput, '2026-03-15');
      await userEvent.selectOptions(timeSelect, '15:00');
      await userEvent.clear(peopleInput);
      await userEvent.type(peopleInput, '4');
      
      fireEvent.click(screen.getByRole('button', { name: /book a table/i }));
      
      await waitFor(() => {
        expect(mockOnFormSubmit).toHaveBeenCalledWith(
          expect.any(Object),
          {
            date: '2026-03-15',
            time: '15:00',
            people: '4',
            occasion: 'birthday',
          }
        );
      });
    });

    test('does not submit when date is missing', async () => {
      render(<BookingForm {...defaultProps} />);
      
      const timeSelect = screen.getByLabelText(/time/i);
      const peopleInput = screen.getByLabelText(/number of people/i);
      
      await userEvent.selectOptions(timeSelect, '15:00');
      await userEvent.clear(peopleInput);
      await userEvent.type(peopleInput, '4');
      
      fireEvent.click(screen.getByRole('button', { name: /book a table/i }));
      expect(mockOnFormSubmit).not.toHaveBeenCalled();
    });

    test('does not submit when people count is invalid', async () => {
      render(<BookingForm {...defaultProps} />);
      
      const dateInput = screen.getByLabelText(/date/i);
      const peopleInput = screen.getByLabelText(/number of people/i);
      
      await userEvent.type(dateInput, '2026-03-15');
      await userEvent.clear(peopleInput);
      await userEvent.type(peopleInput, '15');
      
      fireEvent.click(screen.getByRole('button', { name: /book a table/i }));
      expect(mockOnFormSubmit).not.toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    test('handles empty availableTimes gracefully', () => {
      render(<BookingForm {...defaultProps} availableTimes={[]} />);
      const timeSelect = screen.getByLabelText(/time/i);
      expect(screen.getByRole('option', { name: /loading times/i })).toBeInTheDocument();
    });

    test('handles rapid date changes', async () => {
      render(<BookingForm {...defaultProps} />);
      const dateInput = screen.getByLabelText(/date/i);
      
      await userEvent.type(dateInput, '2026-03-15');
      await userEvent.clear(dateInput);
      await userEvent.type(dateInput, '2026-04-20');
      
      expect(dateInput.value).toBe('2026-04-20');
      expect(mockDispatchOnDateChange).toHaveBeenCalled();
    });
  });
});
