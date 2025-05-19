import { helpers } from '../../../utils/helpers/helpers';
import { Sales } from '../../../utils/models/sales';
import logger from '../../logger/logger';
import { db } from './firebase-config';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';

export class SalesService {
  private readonly docRef;

  constructor() {
    const collectionName = import.meta.env.VITE_FIRESTORE_COLLECTION_NAME;
    const documentId = import.meta.env.VITE_FIRESTORE_DOCUMENT_ID;
    this.docRef = doc(db, collectionName, documentId);
  }

  private async getCurrentSales(): Promise<Sales[]> {
    const docSnap = await getDoc(this.docRef);
    if (!docSnap.exists()) return [];
    const data = docSnap.data();
    return data.sales || [];
  }

  public async getAllSales(): Promise<Sales[]> {
    try {
      return await this.getCurrentSales();
    } catch (error) {
      logger.logError({ error });
      return [];
    }
  }

  public async add(sale: Omit<Sales, 'id'>): Promise<boolean> {
    try {
      const newSale: Sales = { ...sale, id: helpers.generateUUID() };
      await updateDoc(this.docRef, {
        sales: arrayUnion(newSale),
      });
      return true;
    } catch (error) {
      logger.logError({ error });
      return false;
    }
  }

  public async update(currentSales: Sales[], updatedSale: Sales): Promise<boolean> {
    try {
      const updatedSales = currentSales.map(sale =>
        sale.id === updatedSale.id ? updatedSale : sale
      );
      await updateDoc(this.docRef, { sales: updatedSales });
      return true;
    } catch (error) {
      logger.logError({ error });
      return false;
    }
  }

  public async delete(currentSales:Sales[], saleId: string): Promise<boolean> {
    try {
      const updatedSales = currentSales.filter(sale => sale.id !== saleId);
      await updateDoc(this.docRef, { sales: updatedSales });
      return true;
    } catch (error) {
      logger.logError({ error });
      return false;
    }
  }
}

const salesService = new SalesService()
export default salesService;
