export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  stock: number;
  minStock: number;
  price: number;
  warehouse: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
  lastUpdated: string;
}

export interface Warehouse {
  id: string;
  name: string;
  location: string;
  capacity: number;
  used: number;
  items: number;
  status: 'active' | 'maintenance' | 'full';
}

export interface ActivityEntry {
  id: string;
  action: string;
  product: string;
  quantity: number;
  user: string;
  timestamp: string;
  type: 'entry' | 'exit' | 'adjustment' | 'transfer';
}

export interface StockMovement {
  id: string;
  date: string;
  type: 'entry' | 'exit' | 'transfer' | 'adjustment';
  quantity: number;
  warehouse: string;
  reference: string;
  user: string;
}

export const products: Product[] = [
  { id: 'P001', name: 'Industrial Bearing 6205', sku: 'BRG-6205-ZZ', category: 'Bearings', stock: 1250, minStock: 200, price: 8.50, warehouse: 'Warehouse A', status: 'in-stock', lastUpdated: '2026-02-10' },
  { id: 'P002', name: 'Hydraulic Hose 1/2"', sku: 'HYD-050-R2', category: 'Hydraulics', stock: 85, minStock: 100, price: 24.00, warehouse: 'Warehouse A', status: 'low-stock', lastUpdated: '2026-02-09' },
  { id: 'P003', name: 'Steel Flange DN50', sku: 'FLG-DN50-PN16', category: 'Flanges', stock: 430, minStock: 50, price: 32.00, warehouse: 'Warehouse B', status: 'in-stock', lastUpdated: '2026-02-10' },
  { id: 'P004', name: 'Pneumatic Cylinder 50mm', sku: 'PNC-050-100', category: 'Pneumatics', stock: 0, minStock: 20, price: 145.00, warehouse: 'Warehouse C', status: 'out-of-stock', lastUpdated: '2026-02-08' },
  { id: 'P005', name: 'Gasket Set NBR 4"', sku: 'GSK-NBR-100', category: 'Seals', stock: 2100, minStock: 500, price: 3.20, warehouse: 'Warehouse A', status: 'in-stock', lastUpdated: '2026-02-10' },
  { id: 'P006', name: 'V-Belt A68', sku: 'VBT-A68', category: 'Belts', stock: 45, minStock: 50, price: 12.80, warehouse: 'Warehouse B', status: 'low-stock', lastUpdated: '2026-02-07' },
  { id: 'P007', name: 'Linear Guide Rail 500mm', sku: 'LGR-500-H', category: 'Linear Motion', stock: 18, minStock: 10, price: 89.00, warehouse: 'Warehouse C', status: 'in-stock', lastUpdated: '2026-02-10' },
  { id: 'P008', name: 'Ball Screw SFU1605', sku: 'BSC-1605-500', category: 'Linear Motion', stock: 12, minStock: 5, price: 67.50, warehouse: 'Warehouse C', status: 'in-stock', lastUpdated: '2026-02-09' },
  { id: 'P009', name: 'Coupling Jaw Type L100', sku: 'CPL-L100-AL', category: 'Couplings', stock: 0, minStock: 15, price: 28.00, warehouse: 'Warehouse A', status: 'out-of-stock', lastUpdated: '2026-02-06' },
  { id: 'P010', name: 'Oil Seal 35x52x7', sku: 'OIL-35527-NBR', category: 'Seals', stock: 890, minStock: 200, price: 2.10, warehouse: 'Warehouse B', status: 'in-stock', lastUpdated: '2026-02-10' },
];

export const warehouses: Warehouse[] = [
  { id: 'W001', name: 'Warehouse A', location: 'Buenos Aires, AR', capacity: 10000, used: 7850, items: 3420, status: 'active' },
  { id: 'W002', name: 'Warehouse B', location: 'Rosario, AR', capacity: 5000, used: 4800, items: 1890, status: 'full' },
  { id: 'W003', name: 'Warehouse C', location: 'Cordoba, AR', capacity: 8000, used: 2100, items: 945, status: 'active' },
  { id: 'W004', name: 'Warehouse D', location: 'Mendoza, AR', capacity: 3000, used: 0, items: 0, status: 'maintenance' },
];

export const recentActivity: ActivityEntry[] = [
  { id: 'A001', action: 'Stock entry', product: 'Industrial Bearing 6205', quantity: 500, user: 'Carlos M.', timestamp: '10 min ago', type: 'entry' },
  { id: 'A002', action: 'Stock exit', product: 'Hydraulic Hose 1/2"', quantity: 25, user: 'Maria L.', timestamp: '32 min ago', type: 'exit' },
  { id: 'A003', action: 'Transfer', product: 'Steel Flange DN50', quantity: 100, user: 'Pablo R.', timestamp: '1 hr ago', type: 'transfer' },
  { id: 'A004', action: 'Adjustment', product: 'Gasket Set NBR 4"', quantity: -15, user: 'Ana G.', timestamp: '2 hr ago', type: 'adjustment' },
  { id: 'A005', action: 'Stock entry', product: 'V-Belt A68', quantity: 200, user: 'Carlos M.', timestamp: '3 hr ago', type: 'entry' },
];

export const stockMovements: StockMovement[] = [
  { id: 'M001', date: '2026-02-10', type: 'entry', quantity: 500, warehouse: 'Warehouse A', reference: 'PO-2026-0145', user: 'Carlos M.' },
  { id: 'M002', date: '2026-02-09', type: 'exit', quantity: -200, warehouse: 'Warehouse A', reference: 'SO-2026-0089', user: 'Maria L.' },
  { id: 'M003', date: '2026-02-08', type: 'transfer', quantity: -100, warehouse: 'Warehouse B', reference: 'TR-2026-0023', user: 'Pablo R.' },
  { id: 'M004', date: '2026-02-07', type: 'entry', quantity: 750, warehouse: 'Warehouse A', reference: 'PO-2026-0142', user: 'Ana G.' },
  { id: 'M005', date: '2026-02-06', type: 'adjustment', quantity: -15, warehouse: 'Warehouse A', reference: 'ADJ-2026-0011', user: 'Carlos M.' },
  { id: 'M006', date: '2026-02-05', type: 'exit', quantity: -300, warehouse: 'Warehouse A', reference: 'SO-2026-0085', user: 'Maria L.' },
];

export const categories = ['Bearings', 'Hydraulics', 'Flanges', 'Pneumatics', 'Seals', 'Belts', 'Linear Motion', 'Couplings'];
