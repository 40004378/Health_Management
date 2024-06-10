import { render, screen } from '@testing-library/react';
import ToolDetails from './toolsDetails'
 
 
 
 test('renders Tool Catalogue', () => {
   render(<ToolDetails />);
   // Check if the tool name and number are rendered
   const toolNameElement = screen.getByText('Tools Catalog');
   expect(toolNameElement).toBeInTheDocument();
 });

   test('renders ToolsCatalog component', async () => {
    render(<ToolDetails />);
    expect(screen.getByText(/Tools Details/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(/tool1/i)).toBeInTheDocument();
      expect(screen.getByText(/tool2/i)).toBeInTheDocument();
    });
  });
 
//  test('renders Tool Name and Number', () => {
//     render(<ToolDetails details={details }/>);
//     // Check if the tool name and number are rendered
//     const toolNameElement = screen.getByText(/Tool Name \| Number:/i);
//     expect(toolNameElement).toBeInTheDocument();
//   });
 
//  test('renders Category', () => {
//    render(<ToolDetails />);
//    // Check if the category is rendered
//    const categoryElement = screen.getByText(/Category:/i);
//    expect(categoryElement).toBeInTheDocument();
//  });
 
//  test('renders part produce', () => {
//     render(<ToolDetails />);
//     // Check if the tool name and number are rendered
//     const toolNameElement = screen.getByText(/What part Produce:/i);
//     expect(toolNameElement).toBeInTheDocument();
//   });
 
 
//   test('renders stroke count', () => {
//     render(<ToolDetails />);
//     // Check if the tool name and number are rendered
//     const toolNameElement = screen.getByText('Stroke count(Total # of shorts)');
//     expect(toolNameElement).toBeInTheDocument();
//   });
 
//   test('renders number of parts', () => {
//     render(<ToolDetails />);
//     // Check if the tool name and number are rendered
//     const toolNameElement = screen.getByTestId('test1');
//     expect(toolNameElement).toBeInTheDocument();
//   });
 
//   test('renders expected life', () => {
//     render(<ToolDetails />);
//     // Check if the tool name and number are rendered
//     const toolNameElement =screen.getByTestId("tool-life");
//     expect(toolNameElement).toBeInTheDocument();
//   });