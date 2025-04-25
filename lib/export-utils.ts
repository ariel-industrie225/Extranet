import jsPDF from 'jspdf';
import 'jspdf-autotable';

import * as XLSX from 'xlsx';
import { formatDate} from './formatters';

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

export const exportToExcel = (data: any[], filename: string) => {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, `${filename}.xlsx`);
};

export const exportToPDF = (data: any[], columns: string[], title: string, filename: string) => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(16);
  doc.text(title, 14, 20);
  
  // Add date
  doc.setFontSize(10);
  doc.text(`Généré le ${formatDate(new Date())}`, 14, 30);
  
  // Add table
  doc.autoTable({
    head: [columns],
    body: data.map(item => Object.values(item)),
    startY: 40,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [0, 123, 255] }
  });
  
  doc.save(`${filename}.pdf`);
};