import { render, screen } from '@testing-library/react';
import App from './App';


describe('App', () => {
  it('should render', () => {
    render(<App />);
    expect(screen.getByText('COUNTERS')).toBeInTheDocument();
    expect(screen.getByText('TASKS')).toBeInTheDocument();
  });
});
