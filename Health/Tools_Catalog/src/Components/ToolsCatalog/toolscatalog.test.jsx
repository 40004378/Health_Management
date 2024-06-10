import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import ToolsCatalog from './toolsCatalog';
 
// Mock axios
jest.mock('axios');
 
const mockTools = [
  {
    id: 1,
    Toolname: 'tool1',
    catagory: 'casting',
    Whatpartproduce: 'Nails',
    Expected_useful_life: '5 years',
    imageUrl: 'hammer.jpg'
  },
  {
    id: 2,
    Toolname: 'tool2',
    catagory: 'Maintenance',
    Whatpartproduce: 'Screws',
    Expected_useful_life: '10 years',
    imageUrl: 'screwdriver.jpg'
  }
];
 
const mockRegions = [
  { category: 'America' },
  { category: 'Europe' }
];
 
describe('ToolsCatalog Component', () => {
  beforeEach(() => {
    axios.get.mockImplementation((url) => {
if (url === 'http://localhost:8000/GetToolList') {
        return Promise.resolve({ data: mockTools });
      }
if (url === 'http://localhost:8000/GetRegions') {
        return Promise.resolve({ data: mockRegions });
      }
    });
  });
 
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('renders ToolsCatalog with correct text', () => {
    render(<ToolsCatalog />);
 
    const ToolsCatalogtext = screen.getByText('Tools Catalog');
  expect(ToolsCatalogtext).toBeInTheDocument();
})
 
test('SearchInput Component', () => {
    render(<ToolsCatalog />);
 
    const inputElememt = screen.getByPlaceholderText('Search tool/equipment Name');
  expect(inputElememt).toBeInTheDocument();
})






  // test('renders ToolsCatalog component', async () => {
  //   render(<ToolsCatalog />);
  //   expect(screen.getByText(/Tools Catalog/i)).toBeInTheDocument();
  //   await waitFor(() => {
  //     expect(screen.getByText(/tool1/i)).toBeInTheDocument();
  //     expect(screen.getByText(/tool2/i)).toBeInTheDocument();
  //   });
  // });
 
  // test('renders search input', () => {
  //   render(<ToolsCatalog />);
  //   const searchInput = screen.getByPlaceholderText('Search tool/equipment Name');
  //   expect(searchInput).toBeInTheDocument();
  // });
 
  // test('search functionality', async () => {
  //   render(<ToolsCatalog />);
  //   const searchInput = screen.getByPlaceholderText('Search tool/equipment Name');
  //   fireEvent.change(searchInput, { target: { value: 'tool1' } });
  //   await waitFor(() => {
  //     expect(screen.getByText(/tool1/i)).toBeInTheDocument();
  //     expect(screen.queryByText(/tool2/i)).not.toBeInTheDocument();
  //   });
  // });
 
  // test('renders category buttons', async () => {
  //   render(<ToolsCatalog />);
  //   await waitFor(() => {
  //     expect(screen.getByText(/All/i)).toBeInTheDocument();
  //     expect(screen.getByText(/casting/i)).toBeInTheDocument();
  //     expect(screen.getByText(/Maintenance/i)).toBeInTheDocument();
  //   });
  // });
 
//   test('category filter functionality', async () => {
//     render(<ToolsCatalog />);
//     await waitFor(() => {
// fireEvent.click(screen.getByText(/Maintenance/i));
//     });
//     await waitFor(() => {
//       expect(screen.getByText(/tool1/i)).toBeInTheDocument();
//       expect(screen.queryByText(/tool2/i)).not.toBeInTheDocument();
//     });
//   });
 
  // test('renders region dropdown', async () => {
  //   render(<ToolsCatalog />);
  //   await waitFor(() => {
  //     expect(screen.getByText(/Region/i)).toBeInTheDocument();
  //     expect(screen.getByText(/America/i)).toBeInTheDocument();
  //     expect(screen.getByText(/Europe/i)).toBeInTheDocument();
  //   });
  // });
 
//   test('renders tool details on click', async () => {
//     render(<ToolsCatalog />);
//     await waitFor(() => {
// fireEvent.click(screen.getByAltText('Card Image'));
//     });
//     expect(screen.getByText(/Tool Details/i)).toBeInTheDocument();
//   });
});