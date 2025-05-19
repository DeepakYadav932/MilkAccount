import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import logger from "../../services/logger/logger";
import {
  Sales,
  SalesDateFields,
  SalesDropdownItems,
} from "../../utils/models/sales";
import { RootState } from "../store";
import { dateHelpers } from "../../utils/helpers/date-helpers/date-helpers";

interface SalesState {
  sales: Sales[];
  fetchingSales: boolean;
  ddItems: SalesDropdownItems;
  editState: SalesDateFields;
  editedItemid: string;
}

// Initial state
const initialState: SalesState = {
  sales: [],
  fetchingSales: false,
  ddItems: {
    selectedMonth: dateHelpers.getCurrentMonthNumber(),
    selectedYear: 2025,
  },
  editedItemId: "",
  editState: {
    selectedDate: null,
    selectedMonth: null,
    selectedYear: null,
    selectedPrice: null,
    selectedQuantity: null,
  },
};

export const SalesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    setSales: (state, action: PayloadAction<Omit<Sales[], "total">>) => {
      try {
        const sales = action.payload;

        // calculate total price for every entry first
        const modifiedSales = sales.map((sale) => {
          return {
            ...sale,
            total: sale.pricePerKg * sale.quantity,
          };
        });

        // then set it to slice, easy huh :)
        state.sales = modifiedSales;
      } catch (err) {
        logger.logError(
          `Unable to set sales arry in salesSlice.ts -> setSales`,
          err
        );
      }
    },
    setSalesFetching(state, action: PayloadAction<boolean>) {
      state.fetchingSales = action.payload;
    },
    setDropdownItems(state, action: PayloadAction<SalesDropdownItems>) {
      state.ddItems.selectedMonth = +action.payload.selectedMonth;
      state.ddItems.selectedYear = +action.payload.selectedYear;
    },
    setEditStateDate(state, action: PayloadAction<number>) {
      state.editState.selectedDate = action.payload;
    },
    setEditStateMonth(state, action: PayloadAction<number>) {
      state.editState.selectedMonth = action.payload;
    },
    setEditStateYear(state, action: PayloadAction<number>) {
      state.editState.selectedYear = action.payload;
    },
    setEditStatePrice(state, action: PayloadAction<number>) {
      state.editState.selectedPrice = action.payload;
    },
    setEditStateQuantity(state, action: PayloadAction<number>) {
      state.editState.selectedQuantity = action.payload;
    },
    setEditedItemId(state, action: PayloadAction<string>) {
      state.editedItemid = action.payload;
    },
  },
});

export const {
  setSales,
  setSalesFetching,
  setEditStateDate,
  setEditStateMonth,
  setEditStateYear,
  setEditStatePrice,
  setEditStateQuantity,
  setEditedItemId,
  setDropdownItems,
} = SalesSlice.actions;
export const selectTotalPrice = (state: RootState): number =>
  getFilteredSales(state)?.reduce((sum, sale) => sum + (sale.total || 0), 0);

export const getSalesFormValues = (state: RootState): Sales => {
  const form = state.sales.editState;
  const editedItemId = state.sales.editedItemid;

  return {
    date: form.selectedDate,
    month: form.selectedMonth,
    year: form.selectedYear,
    pricePerKg: form.selectedPrice,
    quantity: form.selectedQuantity,
    ...(editedItemId && { id: editedItemId }),
  };
};

export const getFilteredSales = createSelector(
  [(state: RootState) => state.sales.sales, 
   (state: RootState) => state.sales.ddItems.selectedMonth,
   (state: RootState) => state.sales.ddItems.selectedYear],
  (sales, selectedMonth, selectedYear) => {
    return sales.filter((sale) => {
      if (selectedMonth !== undefined && selectedMonth !== 0 && sale.month !== selectedMonth) return false;
      if (selectedYear !== undefined && selectedYear !== 0 && sale.year !== selectedYear) return false;
      return true;
    });
  }
);


export const salesReducer = SalesSlice.reducer;
