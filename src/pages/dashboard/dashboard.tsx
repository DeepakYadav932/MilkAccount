import React, { useCallback, useEffect } from "react";
import "./dashboard.css";
// import { getSales } from "../../services/db/firebase/operations";
import { Header } from "../../components/header/header";
import {
  MONTH_OPTIONS,
  MonthPicker,
  YEAR_OPTIONS,
} from "../../components/month-picker/month-picker";
import { SideBar } from "../../components/sidebar/sidebar";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/useReduxHooks";
import { Modal } from "../../components/modal/modal";
import { InputField } from "../../components/input-field/input-field";
import { DropdownMenu } from "../../components/dropdown/dropdown";
import salesService from "../../services/db/firebase/operations";
import {
  getSalesFormValues,
  setEditedItemId,
  setEditStateDate,
  setEditStateMonth,
  setEditStatePrice,
  setEditStateQuantity,
  setEditStateYear,
  setSales,
  setSalesFetching,
} from "../../stores/sales/salesSlice";
import { Sales } from "../../utils/models/sales";
import logger from "../../services/logger/logger";
import { dateHelpers } from "../../utils/helpers/date-helpers/date-helpers";
import { helpers } from "../../utils/helpers/helpers";
import { Severity, showToast } from "../../stores/toast/toastSlice";
import {
  showAddRecordModal,
  showEditRecordModal,
} from "../../stores/app-state/app-state-slice";

interface AddOrEditRecordModalprops {}

/**
 * renders the Add or Edit record form inside the modal
 * @returns Reacty Function Component tsx
 */
const AddOrEditRecordModal: React.FC<AddOrEditRecordModalprops> = () => {
  const salesStore = useAppSelector((state) => state.sales);
  const appStateStore = useAppSelector((state) => state.appState);
  const salesFields = useAppSelector(getSalesFormValues);
  const dispatch = useAppDispatch();

  const closeEditing = useCallback(() => {
    dispatch(showAddRecordModal(false));
    dispatch(showEditRecordModal(false));
  }, [dispatch]);

  const onRecordSubmit = async (e: Event) => {
    try {
      e.preventDefault();
      const isFormValid = helpers.isSalesFormValid(salesFields);
      if (!isFormValid) {
        dispatch(
          showToast({
            title: `Error`,
            message: `Values are not valid`,
            severity: Severity.ERROR,
          })
        );
        return;
      }
      // move forward to add/edit record to database
      if (appStateStore.isAddingRecord) {
        // Adding new item
        const isAdded: boolean = await salesService.add(salesFields);
        if (isAdded) {
          dispatch(
            showToast({
              message: `Record added successfully.`,
              severity: Severity.SUCCESS,
              title: `Added`,
            })
          );
          dispatch(showAddRecordModal(false));
        }
      } else {
        //editing
        const isUpdated: boolean = await salesService.update(
          salesStore.sales,
          salesFields
        );
        if (isUpdated) {
          dispatch(
            showToast({
              message: `Record Updated successfully.`,
              severity: Severity.SUCCESS,
              title: `Updated`,
            })
          );
          dispatch(showEditRecordModal(false));
          dispatch(setEditedItemId(''))
        }
      }
      const sales: Sales[] = await salesService.getAllSales();
      if (sales) {
        dispatch(setSales(sales));
      }
    } catch (err) {
      logger.logError(`Error in dashboard.tsx => onRecordSubmit`, err);
    }
  };

  const onDateChange = (date: number) => {
    dispatch(setEditStateDate(+date));
  };

  const onMonthChange = (month: number) => {
    dispatch(setEditStateMonth(+month));
  };
  const onYearChange = (year: number) => {
    dispatch(setEditStateYear(+year));
  };
  const onPriceChange = (price: number) => {
    dispatch(setEditStatePrice(+price));
  };
  const onQuantityChange = (quantity: number) => {
    dispatch(setEditStateQuantity(+quantity));
  };

  try {
    return appStateStore.isAddingRecord || appStateStore.isEditingRecord ? (
      <form className="wrapper" onSubmit={onRecordSubmit}>
        <Modal
          isOpen={appStateStore.isAddingRecord || appStateStore.isEditingRecord}
          title={appStateStore.isAddingRecord ? "Add Record" : "Update Record"}
          onClose={closeEditing}
          children={
            <>
              <span className="flex flex-column">
                <span className="picker-container">
                  <label className="picker-label">Choose Date</label>
                  <DropdownMenu
                    ddData={dateHelpers.getMonthDates(
                      salesStore.ddItems.selectedMonth
                    )}
                    value={salesStore.editState.selectedDate}
                    onChange={onDateChange}
                  />
                </span>
                <span className="picker-container">
                  <label className="picker-label">Choose Month</label>
                  <DropdownMenu
                    ddData={MONTH_OPTIONS}
                    value={salesStore.editState.selectedMonth}
                    onChange={onMonthChange}
                  />
                </span>
                <span>
                  <label className="picker-label">Choose Year</label>
                  <DropdownMenu
                    ddData={YEAR_OPTIONS}
                    value={salesStore.editState.selectedYear}
                    onChange={onYearChange}
                  />
                </span>
              </span>
              <InputField
                isNumeric
                label="Price Per Kg"
                value={salesStore.editState.selectedPrice}
                onChange={onPriceChange}
              />
              <InputField
                isNumeric
                label="Quantity"
                value={salesStore.editState.selectedQuantity}
                onChange={onQuantityChange}
              />
            </>
          }
        />
      </form>
    ) : null;
  } catch (err) {
    logger.logError(`Error rendering add or edit modal => dashboard.tsx`, err);
  }
};

/**
 * renders Dashboard Page
 *
 * @returns {React.FC}
 */
const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        dispatch(setSalesFetching(true));
        const sales: Sales[] = await salesService.getAllSales();
        if (sales) {
          dispatch(setSales(sales));
        }
      } catch (err) {
        logger.logError(`Error in fetchRecords => dashboard.tsx`, err);
      } finally {
        dispatch(setSalesFetching(false));
      }
    };
    fetchRecords();
  }, []);

  try {
    return (
      <main className="full-height flex">
        <SideBar />
        <Header />
        <div className="month-picker-container flex-column">
          <MonthPicker />
        </div>
        <div className="main-section flex">
          <Outlet />
        </div>

        <AddOrEditRecordModal />
      </main>
    );
  } catch (err) {
    logger.logError(`Error rendering page => dashboard.tsx`, err);
  }
};

export default Dashboard;
