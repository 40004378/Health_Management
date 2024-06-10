import { render, screen } from '@testing-library/react';
import Footer from './footer'
 
test('renders AppBar with correct text', () => {
    render(<Footer />);
    const Copyrightdata = screen.getByText('Copyright © 2024 Honeywell International Inc.');
    expect(Copyrightdata).toBeInTheDocument();
});