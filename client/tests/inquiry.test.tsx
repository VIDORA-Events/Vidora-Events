import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { InquiryPage } from '../src/pages/InquiryPage.js';
import * as api from '../src/services/api.js';

describe('InquiryPage — Sri Lanka Client Form', () => {
  it('renders all key inquiry fields correctly', () => {
    render(
      <BrowserRouter>
        <InquiryPage />
      </BrowserRouter>
    );

    expect(screen.getByText(/Plan Your Event With Us/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/e.g. Dilshan Perera/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/e.g. dilshan@gmail.com/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/e.g. 500,000 or 2,000/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Tell us what you have in mind/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit Event Inquiry/i })).toBeInTheDocument();
  });

  it('validates required fields before submitting', async () => {
    render(
      <BrowserRouter>
        <InquiryPage />
      </BrowserRouter>
    );

    const submitBtn = screen.getByRole('button', { name: /Submit Event Inquiry/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/Please enter your name/i)).toBeInTheDocument();
      expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Please enter your estimated minimum budget/i)).toBeInTheDocument();
    });
  });

  it('submits valid inquiry and displays polished confirmation screen', async () => {
    vi.spyOn(api, 'submitInquiry').mockResolvedValue({
      success: true,
      message: 'Inquiry received',
      data: {
        inquiryId: 'INQ-SL-101',
        fullName: 'Dilshan Perera',
        eventType: 'Weddings, Poruwa & Homecoming Receptions',
        receivedAt: new Date().toISOString(),
      },
    });

    render(
      <BrowserRouter>
        <InquiryPage />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/e.g. Dilshan Perera/i), {
      target: { value: 'Dilshan Perera' },
    });
    fireEvent.change(screen.getByPlaceholderText(/e.g. dilshan@gmail.com/i), {
      target: { value: 'dilshan@gmail.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/e.g. \+94 77 123 4567/i), {
      target: { value: '+94 77 123 4567' },
    });
    fireEvent.change(screen.getByPlaceholderText(/e.g. 500,000 or 2,000/i), {
      target: { value: '1,500,000' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Tell us what you have in mind/i), {
      target: { value: 'Looking for a beach hotel in Bentota for a 150-guest wedding and Poruwa ceremony.' },
    });

    const consentCheckbox = screen.getByLabelText(/Yes, please have a VIDORA event planner contact me/i);
    fireEvent.click(consentCheckbox);

    const submitBtn = screen.getByRole('button', { name: /Submit Event Inquiry/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/Thank you, Dilshan Perera!/i)).toBeInTheDocument();
      expect(screen.getByText(/INQ-SL-101/i)).toBeInTheDocument();
    });
  });
});
