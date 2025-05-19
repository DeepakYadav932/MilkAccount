
export interface Sales {
  id: string;
  pricePerKg: number;
  quantity: number;
  total: number;
  date: number;
  month: boolean;
  year: number;
}

export interface SalesDropdownItems{
  selectedMonth: number;
  selectedYear: number;
}

export interface SalesDateFields extends SalesDropdownItems {
  selectedDate: number;

  selectedPrice: number;
  selectedQuantity: number;
}