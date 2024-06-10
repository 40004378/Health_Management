import { render, screen } from '@testing-library/react';
import Header from './header';
 
test('renders AppBar with correct text', () => {
    render(<Header />);
 
    const honeywellText = screen.getByText('Honeywell');
    const dashboardText = screen.getByText('Tooling health dashboard');
 
    expect(honeywellText).toBeInTheDocument();
    expect(dashboardText).toBeInTheDocument();
});