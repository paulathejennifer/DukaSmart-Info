// import { render, screen, fireEvent } from '@testing-library/react';
// import InventoryPage from '../page';
// import { DashboardStateProvider } from '../../state-provider';
// import { Toaster } from '@/components/ui/toaster';

// // Mock the useDashboardState hook
// jest.mock('../../state-provider', () => {
//     const originalModule = jest.requireActual('../../state-provider');
//     const initialProducts = [
//         { id: "1", name: "Sunlight Soap", category: "Cleaning", quantity: 120, price: 50 },
//     ];
//     return {
//         ...originalModule,
//         useDashboardState: () => ({
//             products: initialProducts,
//             sales: [],
//             onUpdateProducts: jest.fn(),
//             onRecordSale: jest.fn(),
//         }),
//     };
// });

// describe('InventoryPage', () => {
//   beforeEach(() => {
//     render(
//         <DashboardStateProvider>
//           <InventoryPage />
//           <Toaster />
//         </DashboardStateProvider>
//     );
//   });

//   it('renders the inventory page title', () => {
//     expect(screen.getByRole('heading', { name: /manage inventory/i })).toBeInTheDocument();
//   });

//   it('renders the inventory table with products', () => {
//     expect(screen.getByText('Sunlight Soap')).toBeInTheDocument();
//   });

//   it('opens the Add Product dialog when "Add Product" is clicked', async () => {
//     fireEvent.click(screen.getByRole('button', { name: /add product/i }));
    
//     // Using findByRole to wait for the dialog to appear
//     const dialogTitle = await screen.findByRole('heading', { name: /add product/i });
//     expect(dialogTitle).toBeInTheDocument();
//   });
// });
