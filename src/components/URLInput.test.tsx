import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { URLInput } from './URLInput';

describe('URLInput', () => {
  test('renders with the initial URL value', () => {
    const initialUrl = 'https://example.com/initial.pdf';
    const handleUrlChange = jest.fn();
    
    render(<URLInput url={initialUrl} onUrlChange={handleUrlChange} />);

    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveValue(initialUrl);
  });

  test('calls onUrlChange when the input value changes', () => {
    const handleUrlChange = jest.fn();
    render(<URLInput url="" onUrlChange={handleUrlChange} />);

    const inputElement = screen.getByPlaceholderText(/enter document url/i);
    
    const newUrl = 'https://export.arxiv.org/pdf/1706.03762';

    // Simulate a user typing in the input field
    fireEvent.change(inputElement, { target: { value: newUrl } });

    // Assert that the callback was called with the new value
    expect(handleUrlChange).toHaveBeenCalledTimes(1);
    expect(handleUrlChange).toHaveBeenCalledWith(newUrl);
  });

  test('renders with a custom placeholder text', () => {
    const customPlaceholder = 'Enter your PDF link here';
    render(<URLInput url="" onUrlChange={jest.fn()} placeholder={customPlaceholder} />);

    const inputElement = screen.getByPlaceholderText(customPlaceholder);
    expect(inputElement).toBeInTheDocument();
  });
});