import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookingForm from './BookingForm';

describe('BookingForm Client-Side Validation', () => {
  const mockOnFormSubmit = jest.fn();
  const mockDispatchOnDateChange = jest.fn();
  const availableTimes = ['12:00', '13:00', '14:00', '15:00'];

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock window.alert
    global.alert = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  // Test: Missing date validation
  test('should show alert and not call onFormSubmit when date is missing', async () => {
    render(
      <BookingForm
        onFormSubmit={mockOnFormSubmit}
        isFormSubmitted={false}
        availableTimes={availableTimes}
        dispatchOnDateChange={mockDispatchOnDateChange}
      />
    );

    const submitButton = screen.getByRole('button', { name: /book a table/i });

    // Click submit without entering date
    fireEvent.click(submitButton);

    // Verify alert was called with missing date
    expect(global.alert).toHaveBeenCalledWith(expect.stringContaining('Date'));
    // Verify onFormSubmit was NOT called
    expect(mockOnFormSubmit).not.toHaveBeenCalled();
  });

  // Test: Missing time validation
  test('should show alert when time is not selected (empty)', async () => {
    render(
      <BookingForm
        onFormSubmit={mockOnFormSubmit}
        isFormSubmitted={false}
        availableTimes={[]} // no times available!
        dispatchOnDateChange={mockDispatchOnDateChange}
      />
    );

    const dateInput = screen.getByLabelText(/Date/i);
    const submitButton = screen.getByRole('button', { name: /book a table/i });

    // Fill in date
    fireEvent.change(dateInput, { target: { value: '2024-03-20' } });

    // Submit without time (because no times were available to auto-select)
    fireEvent.click(submitButton);

    expect(global.alert).toHaveBeenCalledWith(expect.stringContaining('Time'));
    expect(mockOnFormSubmit).not.toHaveBeenCalled();
  });

  // Test: Invalid number of people (below minimum)
  test('should show alert when number of people is below minimum (1)', async () => {
    render(
      <BookingForm
        onFormSubmit={mockOnFormSubmit}
        isFormSubmitted={false}
        availableTimes={availableTimes}
        dispatchOnDateChange={mockDispatchOnDateChange}
      />
    );

    const dateInput = screen.getByLabelText(/Date/i);
    const peopleInput = screen.getByLabelText(/Number of people/i);
    const submitButton = screen.getByRole('button', { name: /book a table/i });

    // Fill in date
    fireEvent.change(dateInput, { target: { value: '2024-03-20' } });

    // Set people to 0 (invalid)
    fireEvent.change(peopleInput, { target: { value: '0' } });

    fireEvent.click(submitButton);

    expect(global.alert).toHaveBeenCalledWith(expect.stringContaining('Number of people'));
    expect(mockOnFormSubmit).not.toHaveBeenCalled();
  });

  // Test: Invalid number of people (above maximum)
  test('should show alert when number of people exceeds maximum (10)', async () => {
    render(
      <BookingForm
        onFormSubmit={mockOnFormSubmit}
        isFormSubmitted={false}
        availableTimes={availableTimes}
        dispatchOnDateChange={mockDispatchOnDateChange}
      />
    );

    const dateInput = screen.getByLabelText(/Date/i);
    const peopleInput = screen.getByLabelText(/Number of people/i);
    const submitButton = screen.getByRole('button', { name: /book a table/i });

    // Fill in date
    fireEvent.change(dateInput, { target: { value: '2024-03-20' } });

    // Set people to 11 (above max)
    fireEvent.change(peopleInput, { target: { value: '11' } });

    fireEvent.click(submitButton);

    expect(global.alert).toHaveBeenCalledWith(expect.stringContaining('Number of people'));
    expect(mockOnFormSubmit).not.toHaveBeenCalled();
  });

  // Test: Missing occasion validation
  test('should show alert when occasion is not selected', async () => {
    render(
      <BookingForm
        onFormSubmit={mockOnFormSubmit}
        isFormSubmitted={false}
        availableTimes={availableTimes}
        dispatchOnDateChange={mockDispatchOnDateChange}
      />
    );

    const dateInput = screen.getByLabelText(/Date/i);
    const occasionSelect = screen.getByLabelText(/Occasion/i);
    const submitButton = screen.getByRole('button', { name: /book a table/i });

    // Fill in date
    fireEvent.change(dateInput, { target: { value: '2024-03-20' } });

    // Clear occasion (set to empty string)
    fireEvent.change(occasionSelect, { target: { value: '' } });

    fireEvent.click(submitButton);

    expect(global.alert).toHaveBeenCalledWith(expect.stringContaining('Occasion'));
    expect(mockOnFormSubmit).not.toHaveBeenCalled();
  });

  // Test: Multiple missing fields validation
  test('should show alert listing all missing/invalid fields', async () => {
    render(
      <BookingForm
        onFormSubmit={mockOnFormSubmit}
        isFormSubmitted={false}
        availableTimes={[]} // time will be missing
        dispatchOnDateChange={mockDispatchOnDateChange}
      />
    );

    const submitButton = screen.getByRole('button', { name: /book a table/i });

    // Try to submit with ALL fields missing/empty
    fireEvent.click(submitButton);

    // Alert should mention multiple missing fields
    expect(global.alert).toHaveBeenCalled();
    const alertCall = global.alert.mock.calls[0][0];
    expect(alertCall).toContain('Date');
    expect(alertCall).toContain('Time');
  });

  // Test: Valid form submission
  test('should call onFormSubmit when all fields are valid', async () => {
    render(
      <BookingForm
        onFormSubmit={mockOnFormSubmit}
        isFormSubmitted={false}
        availableTimes={availableTimes}
        dispatchOnDateChange={mockDispatchOnDateChange}
      />
    );

    const dateInput = screen.getByLabelText(/Date/i);
    const timeSelect = screen.getByLabelText(/Time/i);
    const peopleInput = screen.getByLabelText(/Number of people/i);
    const occasionSelect = screen.getByLabelText(/Occasion/i);
    const submitButton = screen.getByRole('button', { name: /book a table/i });

    // Fill in all fields with valid values
    fireEvent.change(dateInput, { target: { value: '2024-03-20' } });
    fireEvent.change(timeSelect, { target: { value: '13:00' } });
    fireEvent.change(peopleInput, { target: { value: '4' } });
    fireEvent.change(occasionSelect, { target: { value: 'anniversary' } });

    // Submit form
    fireEvent.click(submitButton);

    // Verify onFormSubmit was called with correct form values
    expect(mockOnFormSubmit).toHaveBeenCalledWith(
      expect.any(Object),
      expect.objectContaining({
        date: '2024-03-20',
        time: '13:00',
        people: '4',
        occasion: 'anniversary',
      })
    );
    // Alert should NOT be called on valid submission
    expect(global.alert).not.toHaveBeenCalled();
  });

  // Test: Valid number of people (edge cases)
  test('should accept valid number of people (1 and 10)', async () => {
    const { rerender } = render(
      <BookingForm
        onFormSubmit={mockOnFormSubmit}
        isFormSubmitted={false}
        availableTimes={availableTimes}
        dispatchOnDateChange={mockDispatchOnDateChange}
      />
    );

    const dateInput = screen.getByLabelText(/Date/i);
    const peopleInput = screen.getByLabelText(/Number of people/i);
    const submitButton = screen.getByRole('button', { name: /book a table/i });

    // Test minimum valid value (1)
    fireEvent.change(dateInput, { target: { value: '2024-03-20' } });
    fireEvent.change(peopleInput, { target: { value: '1' } });
    fireEvent.click(submitButton);

    expect(mockOnFormSubmit).toHaveBeenCalled();
    expect(global.alert).not.toHaveBeenCalled();

    // Reset mocks for next scenario
    jest.clearAllMocks();

    // Test maximum valid value (10)
    fireEvent.change(peopleInput, { target: { value: '10' } });
    fireEvent.click(submitButton);

    expect(mockOnFormSubmit).toHaveBeenCalled();
    expect(global.alert).not.toHaveBeenCalled();
  });

  // Test: Empty date input
  test('should validate empty date field', async () => {
    render(
      <BookingForm
        onFormSubmit={mockOnFormSubmit}
        isFormSubmitted={false}
        availableTimes={availableTimes}
        dispatchOnDateChange={mockDispatchOnDateChange}
      />
    );

    const submitButton = screen.getByRole('button', { name: /book a table/i });

    // Submit without setting date
    fireEvent.click(submitButton);

    expect(global.alert).toHaveBeenCalledWith(expect.stringContaining('Date'));
    expect(mockOnFormSubmit).not.toHaveBeenCalled();
  });

  // Test: Inline error messages display
  test('should display inline error messages when isFormSubmitted is true', async () => {
    render(
      <BookingForm
        onFormSubmit={mockOnFormSubmit}
        isFormSubmitted={true}
        availableTimes={availableTimes}
        dispatchOnDateChange={mockDispatchOnDateChange}
      />
    );

    // With isFormSubmitted=true and empty fields, error messages should show
    const errorTexts = screen.getAllByText(/Please select|Enter number/i);
    expect(errorTexts.length).toBeGreaterThan(0);
  });
});
