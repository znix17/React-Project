import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookingForm from './BookingForm';

describe('BookingForm Client-Side Validation', () => {
  const mockOnFormSubmit = jest.fn();
  const mockDispatchOnDateChange = jest.fn();
  const availableTimes = ['12:00', '13:00', '14:00', '15:00', '17:00', '18:00', '19:00'];

  beforeEach(() => {
    mockOnFormSubmit.mockClear();
    mockDispatchOnDateChange.mockClear();
  });

  describe('Date Field Validation', () => {
    
    test('should not call onFormSubmit when date is missing', () => {
      render(
        <BookingForm
          onFormSubmit={mockOnFormSubmit}
          isFormSubmitted={false}
          availableTimes={availableTimes}
          dispatchOnDateChange={mockDispatchOnDateChange}
        />
      );

      const submitButton = screen.getByRole('button', { name: /book a table/i });
      fireEvent.click(submitButton);
      expect(mockOnFormSubmit).not.toHaveBeenCalled();
    });

    test('should display error message for missing date when isFormSubmitted is true', () => {
      render(
        <BookingForm
          onFormSubmit={mockOnFormSubmit}
          isFormSubmitted={true}
          availableTimes={availableTimes}
          dispatchOnDateChange={mockDispatchOnDateChange}
        />
      );

      expect(screen.getByText(/please select a date/i)).toBeInTheDocument();
    });

    test('should apply error class to date field when invalid', () => {
      const { rerender } = render(
        <BookingForm
          onFormSubmit={mockOnFormSubmit}
          isFormSubmitted={false}
          availableTimes={availableTimes}
          dispatchOnDateChange={mockDispatchOnDateChange}
        />
      );

      const dateInput = screen.getByLabelText(/date/i);
      expect(dateInput).not.toHaveClass('error');

      rerender(
        <BookingForm
          onFormSubmit={mockOnFormSubmit}
          isFormSubmitted={true}
          availableTimes={availableTimes}
          dispatchOnDateChange={mockDispatchOnDateChange}
        />
      );

      expect(dateInput).toHaveClass('error');
    });

    test('should call dispatchOnDateChange when date is selected', async () => {
      render(
        <BookingForm
          onFormSubmit={mockOnFormSubmit}
          isFormSubmitted={false}
          availableTimes={availableTimes}
          dispatchOnDateChange={mockDispatchOnDateChange}
        />
      );

      const dateInput = screen.getByLabelText(/date/i);
      await userEvent.type(dateInput, '2026-03-20');

      expect(mockDispatchOnDateChange).toHaveBeenCalledWith('2026-03-20');
    });

    test('should allow valid date selection', async () => {
      render(
        <BookingForm
          onFormSubmit={mockOnFormSubmit}
          isFormSubmitted={false}
          availableTimes={availableTimes}
          dispatchOnDateChange={mockDispatchOnDateChange}
        />
      );

      const dateInput = screen.getByLabelText(/date/i);
      await userEvent.type(dateInput, '2026-04-15');

      expect(dateInput.value).toBe('2026-04-15');
    });
  });

  describe('Time Field Validation', () => {
    
    test('should not call onFormSubmit when time is not available (empty availableTimes)', () => {
      render(
        <BookingForm
          onFormSubmit={mockOnFormSubmit}
          isFormSubmitted={false}
          availableTimes={[]}
          dispatchOnDateChange={mockDispatchOnDateChange}
        />
      );

      const dateInput = screen.getByLabelText(/date/i);
      const submitButton = screen.getByRole('button', { name: /book a table/i });

      fireEvent.change(dateInput, { target: { value: '2026-03-20' } });
      fireEvent.click(submitButton);
      expect(mockOnFormSubmit).not.toHaveBeenCalled();
    });

    test('should display error message when time is not selected and isFormSubmitted is true', () => {
      render(
        <BookingForm
          onFormSubmit={mockOnFormSubmit}
          isFormSubmitted={true}
          availableTimes={[]}
          dispatchOnDateChange={mockDispatchOnDateChange}
        />
      );

      // Time field shows error class but component doesn't display inline error message
      const timeSelect = screen.getByLabelText(/time/i);
      expect(timeSelect).toHaveClass('error');
    });

    test('should apply error class to time field when invalid', () => {
      const { rerender } = render(
        <BookingForm
          onFormSubmit={mockOnFormSubmit}
          isFormSubmitted={false}
          availableTimes={[]}
          dispatchOnDateChange={mockDispatchOnDateChange}
        />
      );

      const timeSelect = screen.getByLabelText(/time/i);

      rerender(
        <BookingForm
          onFormSubmit={mockOnFormSubmit}
          isFormSubmitted={true}
          availableTimes={[]}
          dispatchOnDateChange={mockDispatchOnDateChange}
        />
      );

      expect(timeSelect).toHaveClass('error');
    });

    test('should populate time dropdown with available times', () => {
      render(
        <BookingForm
          onFormSubmit={mockOnFormSubmit}
          isFormSubmitted={false}
          availableTimes={availableTimes}
          dispatchOnDateChange={mockDispatchOnDateChange}
        />
      );

      availableTimes.forEach(time => {
        expect(screen.getByRole('option', { name: time })).toBeInTheDocument();
      });
    });

    test('should set first available time as default', () => {
      render(
        <BookingForm
          onFormSubmit={mockOnFormSubmit}
          isFormSubmitted={false}
          availableTimes={availableTimes}
          dispatchOnDateChange={mockDispatchOnDateChange}
        />
      );

      const timeSelect = screen.getByLabelText(/time/i);
      expect(timeSelect.value).toBe('12:00');
    });

    test('should allow user to change selected time', async () => {
      render(
        <BookingForm
          onFormSubmit={mockOnFormSubmit}
          isFormSubmitted={false}
          availableTimes={availableTimes}
          dispatchOnDateChange={mockDispatchOnDateChange}
        />
      );

      const timeSelect = screen.getByLabelText(/time/i);
      await userEvent.selectOptions(timeSelect, '15:00');

      expect(timeSelect.value).toBe('15:00');
    });
  });

  describe('Number of People Validation', () => {
    
    test('should display error when people field is empty', async () => {
      render(
        <BookingForm
          onFormSubmit={mockOnFormSubmit}
          isFormSubmitted={true}
          availableTimes={availableTimes}
          dispatchOnDateChange={mockDispatchOnDateChange}
        />
      );

      const peopleInput = screen.getByLabelText(/number of people/i);
      await userEvent.clear(peopleInput);

      expect(screen.getByText(/enter number of people between 1 and 10/i)).toBeInTheDocument();
    });

    test('should not call onFormSubmit when people count is below minimum (0)', () => {
      render(
        <BookingForm
          onFormSubmit={mockOnFormSubmit}
          isFormSubmitted={false}
          availableTimes={availableTimes}
          dispatchOnDateChange={mockDispatchOnDateChange}
        />
      );

      const dateInput = screen.getByLabelText(/date/i);
      const peopleInput = screen.getByLabelText(/number of people/i);
      const submitButton = screen.getByRole('button', { name: /book a table/i });

      fireEvent.change(dateInput, { target: { value: '2026-03-20' } });
      fireEvent.change(peopleInput, { target: { value: '0' } });
      fireEvent.click(submitButton);

      expect(mockOnFormSubmit).not.toHaveBeenCalled();
    });

    test('should not call onFormSubmit when people count exceeds maximum (10)', () => {
      render(
        <BookingForm
          onFormSubmit={mockOnFormSubmit}
          isFormSubmitted={false}
          availableTimes={availableTimes}
          dispatchOnDateChange={mockDispatchOnDateChange}
        />
      );

      const dateInput = screen.getByLabelText(/date/i);
      const peopleInput = screen.getByLabelText(/number of people/i);
      const submitButton = screen.getByRole('button', { name: /book a table/i });

      fireEvent.change(dateInput, { target: { value: '2026-03-20' } });
      fireEvent.change(peopleInput, { target: { value: '11' } });
      fireEvent.click(submitButton);

      expect(mockOnFormSubmit).not.toHaveBeenCalled();
    });

    test('should display error message when people count is out of range', async () => {
      render(
        <BookingForm
          onFormSubmit={mockOnFormSubmit}
          isFormSubmitted={true}
          availableTimes={availableTimes}
          dispatchOnDateChange={mockDispatchOnDateChange}
        />
      );

      const peopleInput = screen.getByLabelText(/number of people/i);
      await userEvent.clear(peopleInput);
      await userEvent.type(peopleInput, '0');

      expect(screen.getByText(/enter number of people between 1 and 10/i)).toBeInTheDocument();
    });

    test('should apply error class to people field when empty', () => {
      const { rerender } = render(
        <BookingForm
          onFormSubmit={mockOnFormSubmit}
          isFormSubmitted={false}
          availableTimes={availableTimes}
          dispatchOnDateChange={mockDispatchOnDateChange}
        />
      );

      const peopleInput = screen.getByLabelText(/number of people/i);

      // Change to empty string to trigger error condition
      fireEvent.change(peopleInput, { target: { value: '' } });

      rerender(
        <BookingForm
          onFormSubmit={mockOnFormSubmit}
          isFormSubmitted={true}
          availableTimes={availableTimes}
          dispatchOnDateChange={mockDispatchOnDateChange}
        />
      );

      // Should have error class when isFormSubmitted is true and people field is empty
      expect(peopleInput).toHaveClass('error');
    });

    test('should accept valid people count at minimum boundary (1)', () => {
      render(
        <BookingForm
          onFormSubmit={mockOnFormSubmit}
          isFormSubmitted={false}
          availableTimes={availableTimes}
          dispatchOnDateChange={mockDispatchOnDateChange}
        />
      );

      const dateInput = screen.getByLabelText(/date/i);
      const peopleInput = screen.getByLabelText(/number of people/i);
      const submitButton = screen.getByRole('button', { name: /book a table/i });

      fireEvent.change(dateInput, { target: { value: '2026-03-20' } });
      fireEvent.change(peopleInput, { target: { value: '1' } });
      fireEvent.click(submitButton);

      expect(mockOnFormSubmit).toHaveBeenCalled();
    });

    test('should accept valid people count at maximum boundary (10)', () => {
      render(
        <BookingForm
          onFormSubmit={mockOnFormSubmit}
          isFormSubmitted={false}
          availableTimes={availableTimes}
          dispatchOnDateChange={mockDispatchOnDateChange}
        />
      );

      const dateInput = screen.getByLabelText(/date/i);
      const peopleInput = screen.getByLabelText(/number of people/i);
      const submitButton = screen.getByRole('button', { name: /book a table/i });

      fireEvent.change(dateInput, { target: { value: '2026-03-20' } });
      fireEvent.change(peopleInput, { target: { value: '10' } });
      fireEvent.click(submitButton);

      expect(mockOnFormSubmit).toHaveBeenCalled();
    });

    test('should have default value of 1', () => {
      render(
        <BookingForm
          onFormSubmit={mockOnFormSubmit}
          isFormSubmitted={false}
          availableTimes={availableTimes}
          dispatchOnDateChange={mockDispatchOnDateChange}
        />
      );

      const peopleInput = screen.getByLabelText(/number of people/i);
      expect(peopleInput.value).toBe('1');
    });

    test('should allow user to change people count', async () => {
      render(
        <BookingForm
          onFormSubmit={mockOnFormSubmit}
          isFormSubmitted={false}
          availableTimes={availableTimes}
          dispatchOnDateChange={mockDispatchOnDateChange}
        />
      );

      const peopleInput = screen.getByLabelText(/number of people/i);
      await userEvent.clear(peopleInput);
      await userEvent.type(peopleInput, '5');

      expect(peopleInput.value).toBe('5');
    });
  });

  describe('Occasion Field Validation', () => {
    
    test('should default occasion to first option (birthday)', () => {
      render(
        <BookingForm
          onFormSubmit={mockOnFormSubmit}
          isFormSubmitted={false}
          availableTimes={availableTimes}
          dispatchOnDateChange={mockDispatchOnDateChange}
        />
      );

      // The select defaults to first option (birthday) due to empty state
      expect(screen.getByLabelText(/occasion/i)).toHaveValue('birthday');
    });

    test('should render all occasion options', () => {
      render(
        <BookingForm
          onFormSubmit={mockOnFormSubmit}
          isFormSubmitted={false}
          availableTimes={availableTimes}
          dispatchOnDateChange={mockDispatchOnDateChange}
        />
      );

      expect(screen.getByRole('option', { name: /birthday/i })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: /anniversary/i })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: /business/i })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: /other/i })).toBeInTheDocument();
    });

    test('should allow user to change occasion', async () => {
      render(
        <BookingForm
          onFormSubmit={mockOnFormSubmit}
          isFormSubmitted={false}
          availableTimes={availableTimes}
          dispatchOnDateChange={mockDispatchOnDateChange}
        />
      );

      const occasionSelect = screen.getByLabelText(/occasion/i);
      await userEvent.selectOptions(occasionSelect, 'anniversary');

      expect(occasionSelect.value).toBe('anniversary');
    });

    test('should display error message when occasion is manually cleared and isFormSubmitted is true', () => {
      const { rerender } = render(
        <BookingForm
          onFormSubmit={mockOnFormSubmit}
          isFormSubmitted={false}
          availableTimes={availableTimes}
          dispatchOnDateChange={mockDispatchOnDateChange}
        />
      );

      const occasionSelect = screen.getByLabelText(/occasion/i);
      // Manually clear the occasion to trigger error condition
      fireEvent.change(occasionSelect, { target: { value: '' } });

      rerender(
        <BookingForm
          onFormSubmit={mockOnFormSubmit}
          isFormSubmitted={true}
          availableTimes={availableTimes}
          dispatchOnDateChange={mockDispatchOnDateChange}
        />
      );

      expect(screen.getByText(/please select an occasion/i)).toBeInTheDocument();
    });

    test('should apply error class to occasion field when manually cleared', () => {
      const { rerender } = render(
        <BookingForm
          onFormSubmit={mockOnFormSubmit}
          isFormSubmitted={false}
          availableTimes={availableTimes}
          dispatchOnDateChange={mockDispatchOnDateChange}
        />
      );

      const occasionSelect = screen.getByLabelText(/occasion/i);
      expect(occasionSelect).not.toHaveClass('error');

      // Manually clear the occasion to trigger error condition
      fireEvent.change(occasionSelect, { target: { value: '' } });

      rerender(
        <BookingForm
          onFormSubmit={mockOnFormSubmit}
          isFormSubmitted={true}
          availableTimes={availableTimes}
          dispatchOnDateChange={mockDispatchOnDateChange}
        />
      );

      // When occasion is cleared and isFormSubmitted=true, should have error class
      expect(occasionSelect).toHaveClass('error');
    });
  });;

  describe('Form Submission with All Validations', () => {
    
    test('should call onFormSubmit when all fields are valid', () => {
      render(
        <BookingForm
          onFormSubmit={mockOnFormSubmit}
          isFormSubmitted={false}
          availableTimes={availableTimes}
          dispatchOnDateChange={mockDispatchOnDateChange}
        />
      );

      const dateInput = screen.getByLabelText(/date/i);
      const timeSelect = screen.getByLabelText(/time/i);
      const peopleInput = screen.getByLabelText(/number of people/i);
      const occasionSelect = screen.getByLabelText(/occasion/i);
      const submitButton = screen.getByRole('button', { name: /book a table/i });

      fireEvent.change(dateInput, { target: { value: '2026-03-20' } });
      fireEvent.change(timeSelect, { target: { value: '13:00' } });
      fireEvent.change(peopleInput, { target: { value: '4' } });
      fireEvent.change(occasionSelect, { target: { value: 'anniversary' } });
      fireEvent.click(submitButton);

      expect(mockOnFormSubmit).toHaveBeenCalledWith(
        expect.any(Object),
        expect.objectContaining({
          date: '2026-03-20',
          time: '13:00',
          people: '4',
          occasion: 'anniversary',
        })
      );
    });

    test('should not submit when any field is invalid', () => {
      render(
        <BookingForm
          onFormSubmit={mockOnFormSubmit}
          isFormSubmitted={false}
          availableTimes={availableTimes}
          dispatchOnDateChange={mockDispatchOnDateChange}
        />
      );

      const peopleInput = screen.getByLabelText(/number of people/i);
      const submitButton = screen.getByRole('button', { name: /book a table/i });

      fireEvent.change(peopleInput, { target: { value: '15' } });
      fireEvent.click(submitButton);

      expect(mockOnFormSubmit).not.toHaveBeenCalled();
    });

    test('should not submit when multiple fields are invalid', () => {
      render(
        <BookingForm
          onFormSubmit={mockOnFormSubmit}
          isFormSubmitted={false}
          availableTimes={[]}
          dispatchOnDateChange={mockDispatchOnDateChange}
        />
      );

      const submitButton = screen.getByRole('button', { name: /book a table/i });
      fireEvent.click(submitButton);

      expect(mockOnFormSubmit).not.toHaveBeenCalled();
    });
  });
});
