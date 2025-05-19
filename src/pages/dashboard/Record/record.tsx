import React from "react";
import "./record.css";
import { ItemCard } from "../../../components/item-card/item-card";
import { useAppSelector } from "../../../hooks/useReduxHooks";
import { AppLoader } from "../../../components/app-loader/loader";
import { getFilteredSales, selectTotalPrice } from "../../../stores/sales/salesSlice";
import logger from "../../../services/logger/logger";
import { EmptyData } from "../../../components/empty-data/empty-data-";

interface TotalRowProps {}

/**
 * renders a horizotal row at the top of cards to show the total sales
 * @returns React funcitonal component tsx
 */

const TotalRow: React.FC<TotalRowProps> = () => {
  try {
    const totalPrice = useAppSelector(selectTotalPrice);
    return (
      <div className="full-width centered total-row-bg border-radius-default">
        <p>Total - {totalPrice} Rs</p>
      </div>
    );
  } catch (err) {
    logger.log(`Error rendering total row => record.tsx`, err);
  }
};

export const Record: React.FC = () => {
  const salesStore = useAppSelector((state) => state.sales);
  const sales = useAppSelector(getFilteredSales)
  if (salesStore.fetchingSales) {
    return <AppLoader />;
  }

  try {
    return sales.length > 0 ? (
      <section className="cards-container flex full-width">
        <TotalRow />
        {sales.map((item, index) => {
          return <ItemCard item={item} key={`${index}`} />;
        })}

        {/* <div className="centered full-width">
          Loading
        </div> */}
      </section>
    ) : (
      <EmptyData />
    );
  } catch (err) {
    logger.logError(`Error rendering page => record.tsx`, err);
  }
};
