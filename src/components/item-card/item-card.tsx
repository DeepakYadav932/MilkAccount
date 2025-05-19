import React from "react";
import "./item-card.css";
import { Icon } from "../Icon/icon";
import { Sales } from "../../utils/models/sales";
import { InlineStyleObjectModel } from "../../utils/models/inline-style-model";
import logger from "../../services/logger/logger";
import { useAppDispatch, useAppSelector } from "../../hooks/useReduxHooks";
import salesService from "../../services/db/firebase/operations";
import { Severity, showToast } from "../../stores/toast/toastSlice";
import {
  setEditedItemId,
  setEditStateDate,
  setEditStateMonth,
  setEditStatePrice,
  setEditStateQuantity,
  setEditStateYear,
  setSales,
} from "../../stores/sales/salesSlice";
import {
  setOpenDeleteConfirmation,
  showEditRecordModal,
} from "../../stores/app-state/app-state-slice";
import { Modal } from "../modal/modal";

interface CardProps {
  item: Sales;
}

interface DeleteConfirmationProps {
  item: Sales;
}

/**
 * 
 * @param {Sales} item active item for which modal is poped up 
 * @returns React functional component tsx
 */

const DeleteConfirmationModal: React.FC<DeleteConfirmationProps> = ({ item }: Sales) => {

  const dispatch = useAppDispatch();
  const appStateStore = useAppSelector((state) => state.appState);
  const salesStore = useAppSelector((state) => state.sales);
  
  // attempt to delete the record
  const deleteRecord = async (event: Event) => {
    try {
      event.preventDefault()
      const itemId = item.id;
      const sales = salesStore.sales;
      const isDeleted = await salesService.delete(sales, itemId);
      if (isDeleted) {
        closeModal()
        dispatch(
          showToast({
            message: `Record deleted successfully.`,
            severity: Severity.SUCCESS,
            title: `Deleted`,
          })
        );
        const sales: Sales[] = await salesService.getAllSales();
        if (sales) {
          dispatch(setSales(sales));
        }
      }
    } catch (err) {
      logger.logError(`Unabled to delete record`, err);
    }
  };

  const closeModal = () => {
    dispatch(setOpenDeleteConfirmation(false));
  };
  try {
    return appStateStore.isDeleteConfirmationModalOpen ? (
      <form className="wrapper" onSubmit={deleteRecord}>
        <Modal
          isOpen={appStateStore.isDeleteConfirmationModalOpen}
          onClose={closeModal}
          title="Confirm Delete"
          children={
            <>
              <span>Delete Item?</span>
            </>
          }
        />
      </form>
    ) : null;
  } catch (err) {
    logger.logError(`Error rendering delete modal => item-card.tsx`, err);
  }
};

/**
 * Render a single card item of records
 * @param {CardItemProps} item, item of type Sales (open model for more info)
 * @returns {React.FC}
 */
export const ItemCard: React.FC<CardProps> = ({ item }: CardProps) => {
  const dispatch = useAppDispatch();

  const askDeleteConfirmation = () => {
    dispatch(setOpenDeleteConfirmation(true));
  };


  const openEditModal = () => {
    try {
      dispatch(showEditRecordModal(true))
      dispatch(setEditedItemId(item.id))
      dispatch(setEditStateDate(item.date));
      dispatch(setEditStateMonth(item.month));
      dispatch(setEditStateYear(item.year));
      dispatch(setEditStatePrice(item.pricePerKg));
      dispatch(setEditStateQuantity(item.pricePerKg));
    } catch (err) {
      logger.logError(`Error in openEditModal()`, err);
    }
  };
  try {
    return (
      <>
        <div className="card">
          <div className="card-content">
            <h2 className="card-title">{item.summary}</h2>
            <div className="card-field">
              <span className="label">Quantity</span>
              <span className="value">{item.quantity}</span>
            </div>
            <div className="card-field">
              <span className="label">Price Per Kg</span>
              <span className="value">{item.pricePerKg}</span>
            </div>
            <div className="card-field">
              <span className="label total">Total</span>
              <span className="value">Rs. {item.total}</span>
            </div>
            <div className="card-field">
              <span className="label">Date</span>
              <span className="value">
                {item.date}/{item.month}/{item.year}
              </span>
            </div>
          </div>
          <div className="card-actions padding-default">
            <Icon
              name="edit"
              externalStyle={styles.editIconStyle}
              onClick={openEditModal}
            />
            <Icon
              name="trash"
              externalStyle={styles.deleteIconStyle}
              onClick={askDeleteConfirmation}
            />
          </div>
        </div>

        <DeleteConfirmationModal item={item}/>
      </>
    );
  } catch (err) {
    logger.logError(`Error rendering item card => item-card.tsx`, err);
  }
};

const styles: InlineStyleObjectModel = {
  editIconStyle: {
    color: "blue",
  },
  deleteIconStyle: {
    color: "red",
  },
};
