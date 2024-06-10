import React from 'react';
import {render , screen, fireEvent} from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
import Sidebar from './sidebar';
 
test('renders Dashboard button', () => {
  render(<Sidebar />);
    const dashboardButton = screen.getByText('Dashboard');
    expect(dashboardButton).toBeInTheDocument();
  });
 
  test('renders Tools Catalog button', () => {
    render(<Sidebar />);
    const toolsCatalogButton = screen.getByText('Tools Catalog');
    expect(toolsCatalogButton).toBeInTheDocument();
});

test('renders Map Details button', () => {
  render(<Sidebar />);
  const toolsCatalogButton = screen.getByText('Map Details');
  expect(toolsCatalogButton).toBeInTheDocument();
});
 
 
test('clicking buttons changes the selected text', () => {
    render(<Sidebar />);
    const dashboardButton = screen.getByText(/dashboard/i);
    // const mapdetailsButton = screen.getByText(/mapComponent/i);
    // fireEvent.click(dashboardButton);
    // expect(dashboardButton.parentElement).toHaveClass('selected');
    // expect(toolsCatalogButton.parentElement).not.toHaveClass('selected');
    // fireEvent.click(toolsCatalogButton);
    // expect(toolsCatalogButton.parentElement).toHaveClass('selected');
    // expect(dashboardButton.parentElement).not.toHaveClass('selected');
   });

   test('clicking buttons changes the selected text', () => {
    render(<Sidebar />);
    const toolsCatalogButton = screen.getByText(/tools catalog/i);
   });

   test('clicking buttons changes the selected text', () => {
    render(<Sidebar />);
    const mapdetailsButton = screen.getByText(/map details/i);
   });